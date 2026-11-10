---
title: "Trying to get SuperMimic working in JAX"
description: "A quick experiment with learned humanoid dynamics, some state and normalization tricks, and a lot still left to do."
reading_time: 8
policy_demos:
  - title: Dance
    video: /assets/videos/supermimic/policy_dance.mp4
    poster: /assets/images/supermimic/policy_dance.jpg
    caption: "Thirty seconds of dance1_subject1. Cyan is the reference motion; the solid robot is the policy in simulation."
  - title: Dance, second motion
    video: /assets/videos/supermimic/policy_dance2.mp4
    poster: /assets/images/supermimic/policy_dance2.jpg
    caption: "A different dance clip, dance2_subject1, using the same policy checkpoint."
  - title: Jumps
    video: /assets/videos/supermimic/policy_jumps.mp4
    poster: /assets/images/supermimic/policy_jumps.jpg
    caption: "Thirty continuous seconds of jumps1_subject1, with no resets or tracking failure in this excerpt."
  - title: Fighting
    video: /assets/videos/supermimic/policy_fight.mp4
    poster: /assets/images/supermimic/policy_fight.jpg
    caption: "fight1_subject5: turning and whole-body motion over a 30-second excerpt."
  - title: Fighting and sports
    video: /assets/videos/supermimic/policy_sports.mp4
    poster: /assets/images/supermimic/policy_sports.jpg
    caption: "Thirty seconds of fightAndSports1_subject1. Shared world coordinates keep position drift visible."
  - title: "Fall and get up: a failure case"
    video: /assets/videos/supermimic/policy_getup.mp4
    poster: /assets/images/supermimic/policy_getup.jpg
    caption: "Tracking failure occurs at about 37 seconds into fallAndGetUp1_subject1. The excerpt spans 15–45 seconds and continues after failure, without resetting."
model_demos:
  - title: "Walking: simulation versus prediction"
    video: /assets/videos/supermimic/world_model.mp4
    poster: /assets/images/supermimic/world_model.jpg
    caption: "Simulation is on the left; the learned model is on the right. Both receive the same actions. Predictions are reseeded from simulation every 32 steps."
  - title: "Dancing: simulation versus prediction"
    video: /assets/videos/supermimic/world_model_dance.mp4
    poster: /assets/images/supermimic/world_model_dance.jpg
    caption: "The same diagnostic on dance2_subject1. Shown at half speed, with no reference overlay."
---

I came across [SuperMimic](https://supermimic.github.io/) and mostly just wanted to check how this actually works. Can I learn a model of a humanoid, take gradients through its predictions, and use that to make a policy track motion?

So I tried putting it together in JAX. A bit of wiring things up, a bunch of small tricks, quite a few bad rollouts, and eventually the G1 started doing something reasonable.

**This is very much WIP.** This was an attempt to understand the method and get the whole loop working. The code is here: [supermimic_jax](https://github.com/ravi-varikuti/supermimic_jax).

## What I was trying to do

The setup is a 29-DoF Unitree G1 tracking retargeted LAFAN1 motions. MuJoCo MJX with Warp handles the actual simulation, and JAX/Flax handles the policy and world model.

The basic loop is pretty simple to describe:

1. Run the policy in simulation and put the transitions in replay.
2. Train the world model to predict what happens after an action.
3. Let the policy try actions inside that learned model, and backpropagate through the predicted motion and rewards.
4. Update the policy, collect more data, and repeat.

Getting those pieces to agree with each other took more effort than writing that list. The policy has to see the same kind of observations during imagination that it sees in simulation. Actions need to mean the same thing in both places. The reward calculation also needs to match.

For this run, the policy acts at 50 Hz across 256 parallel environments. It sees a short observation history and future reference frames, then outputs joint-position offsets around a nominal pose.

## The states and normalization rabbit hole

A lot of what I ended up trying was around state representation and normalization.

The physical state has positions, a quaternion, joint angles, and velocities. These have different units and very different scales. Asking one network to predict changes in all of them needs some care, especially once its predictions start feeding back into its next input.

I tried moving the dynamics features into a local frame. The model gets root height, heading-independent orientation, local velocities, and joint states, along with the action and physical context. Absolute XY position and heading are left out of those state features. Moving the robot across the floor should not require learning a new set of dynamics.

The model predicts increments, and I compose rotation updates rather than directly adding arbitrary values to quaternion components. I also use running statistics for the state features and prediction targets, with separate statistics for policy observations and goals. These are updated from collected data and saved with the checkpoint.

None of this is a magic fix. It is just some of the plumbing I worked through to get a useful learning setup. A model can look okay for one step and still drift badly when you keep feeding its output back in.

## A few other things I tried

I used a bent nominal pose and per-motor action scales, so the same policy output does not blindly mean the same offset for every joint. There is also a model-only warm-up before the actor starts learning through the model.

For dynamics fitting, I use eight-step autoregressive sequences instead of only comparing isolated one-step predictions. For policy learning, I use 32-step imagined rollouts. The model weights stay fixed during the actor update, but gradients still flow through its predictions to the actions.

I also kept rewards analytical. The model predicts the physical state, differentiable kinematics reconstructs body motion, and the same tracking reward is used in simulation and imagination. There is a critic at the end of the imagined rollout, and a smooth survival term to discourage trajectories that are heading toward a tracking failure.

These are the kinds of details I kept poking at while getting the loop running. I still need proper ablations to say which changes help the most.

## The bits I had to fill in myself

One thing I should make clear: I did not get every detail below straight out of the paper. The [paper and appendices](https://arxiv.org/pdf/2610.28480) give the training loop and a lot of useful settings, but I still had to make choices when turning that into code. Here are the main ones I have not verified against an official implementation:

- **Exactly what goes into the state and goals.** I use local state features, increment predictions, quaternion composition, and 73 values per future goal frame. The paper specifies ten future reference frames, but that does not completely pin down my feature layout.
- **Normalization and loss scaling.** Running state/target statistics, separate policy observation/goal statistics, and per-quantity scale floors are choices in this implementation. I would not assume this is exactly how the original code handles mixed units and prediction errors.
- **How soft failures are computed.** I turn height and tilt errors into survival probabilities with sigmoids. The smoothing widths, 0.025 m for height and 0.08 for tilt error, are settings I chose here. The paper allows analytical heads; that does not prescribe this particular formula.
- **How reset scores get updated.** I followed the paper's reset-sampling mixture, but used completed-episode returns with an EMA coefficient of 0.1 and an accumulated history of difficulty weights. Those estimator details are choices I filled in.
- **Warm-up and update bookkeeping.** I use 500 model-only update blocks before actor learning, then two update blocks per five collected control steps. Those warm-up settings and that interpretation of the update clock need a more careful comparison with the original setup.

The [state/model code](https://github.com/ravi-varikuti/supermimic_jax/blob/main/world_model.py), [termination rules](https://github.com/ravi-varikuti/supermimic_jax/blob/main/terminations.py), and [reset sampler](https://github.com/ravi-varikuti/supermimic_jax/blob/main/reset_sampling.py) make those choices explicit.

I also reduced the batches and environment count to fit the 3090, and tried a Koopman model on the side. That Koopman experiment is an extra in this repo; the paper describes an MLP dynamics model, and all the results here use the MLP too.

So this is where some of the trial and error came in. These choices helped me put together a working experiment, but I still need ablations and a closer implementation check before saying which tricks really matter. That is part of the fuller reimplementation I want to do next.

## What does the world model actually predict?

Here are two comparisons. Simulation is on the left and the learned model is on the right. Both get exactly the same actions.

<div class="research-gallery">
{% for demo in page.model_demos %}
  {% include research-demo.html demo=demo %}
{% endfor %}
</div>

One detail worth being clear about: these predictions are reseeded from the simulator every 32 steps. Between those resets, the model uses only its own predicted states. At 50 Hz, that is 0.64 seconds of open-loop prediction. The videos play at half speed.

That felt surprisingly short to me at first. But the policy gets a fresh observation every 20 milliseconds when it runs. The world model is helping train that feedback policy; it does not need to predict an entire dance before the robot can act.

Of course, a nice-looking half-second prediction does not tell me everything. I also care about the rewards and gradients the model gives the policy. That is something I want to look at more carefully.

## How the run looks so far

This run used **one RTX 3090 with 24 GB VRAM**. The dynamics MLP has three 2,048-wide hidden layers, with smaller batches than the paper-sized preset.

<figure class="research-figure">
  <a href="{{ '/assets/images/supermimic/training-progress.png' | relative_url }}">
    <img src="{{ '/assets/images/supermimic/training-progress.png' | relative_url }}" alt="Training reward, world-model loss, evaluation return, and failed clips against elapsed training time on an RTX 3090" loading="lazy" width="1920" height="1120">
  </a>
  <figcaption>The current run against wall-clock time. Reward and model loss include unsmoothed traces and 100-iteration moving averages. Click to open the full-size figure.</figcaption>
</figure>

The log covers about 2.69 hours after setup and warm-up. That clock includes earlier evaluations and checkpoint saves; each evaluation point uses the timestamp recorded just before it runs.

At iteration 12,000, the mean full-clip evaluation score was around 0.65, with 13 failures across 40 motions. Those are the same motions used for training, so this is a check of training-motion coverage. I have not done a held-out validation study yet.

## Some policy rollouts

These are all 30-second excerpts from the same checkpoint, with no resets. Cyan is the reference. Both robots are shown in the same world coordinates, so you can see the position drift instead of hiding it.

<div class="research-gallery">
{% for demo in page.policy_demos %}
  {% include research-demo.html demo=demo %}
{% endfor %}
</div>

The jump and fighting/sports excerpts look promising. Fall-and-get-up still needs work: the video marks the tracking failure and keeps going so you can see what happened. Even in the successful excerpts, there is plenty of room to improve the tracking.

These videos use native CPU MuJoCo for playback, while training and the saved full-clip evaluation use MJX Warp.

## Where this is going

The [repo](https://github.com/ravi-varikuti/supermimic_jax) has the training loop, configs, replay, world-model and policy updates, and checkpoint viewers. There are 56 passing CPU tests for the smaller pieces. I also tried an experimental Koopman model, but everything shown here uses the MLP.

I mostly wanted to see the idea working and understand where it gets tricky. There is still a lot to clean up, especially contact-rich prediction, get-up motions, and evaluation beyond the training clips.

**Still WIP. I am planning a fuller reimplementation in the coming week**, with a cleaner setup, more careful checks against the method, and better experiments. I will update this as I go.
