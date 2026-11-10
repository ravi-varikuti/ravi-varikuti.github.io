# Ravi Varikuti — Personal Academic Website

A minimal black-and-white Jekyll website for GitHub Pages. The design uses Newsreader for editorial headings, DM Sans for interface text, and IBM Plex Mono for labels.

## Before publishing

Search the project for these placeholders and replace them:

- `ravi@example.com` — your real email address
- `ravivarikuti` — your exact GitHub username, if different
- `Google Scholar` and `CV` links marked with `#`
- Sample biography, research projects, and blog post

If your GitHub username is not `ravivarikuti`, also change `url` in `_config.yml` and rename the repository folder/repository to `YOUR-USERNAME.github.io`.

## Preview on this computer

On Ubuntu or Debian, install the local preview requirements once:

```bash
sudo apt update
sudo apt install ruby-full ruby-dev build-essential zlib1g-dev
gem install bundler
```

Then open a terminal in this folder:

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000` in a browser. Press `Ctrl+C` in the terminal to stop the preview.

## Add a blog post

1. Duplicate the sample file in `_posts/`.
2. Name it `YYYY-MM-DD-short-title.md`.
3. Edit the title, description, date, and article text.
4. Preview it locally, then commit and push.

Jekyll automatically adds the newest posts to the homepage and Blog page.

## Add a research project

1. Duplicate a file in `_research/`.
2. Change its title, description, year, order, and page content.
3. Add a poster image to `assets/images/`.
4. To show a real video, add an MP4 to `assets/videos/` and put this in the project's front matter:

```yaml
video: /assets/videos/my-project.mp4
poster: /assets/images/my-project-poster.jpg
```

Keep videos short and compressed. Large files can make GitHub repositories and websites slow.

## Publish with GitHub Pages

### 1. Create the GitHub repository

1. Sign in to [GitHub](https://github.com/).
2. Select the **+** menu, then **New repository**.
3. Name it exactly `YOUR-USERNAME.github.io` (for example, `ravivarikuti.github.io`).
4. Set it to **Public**.
5. Do not add a README, `.gitignore`, or license because those files already exist here.
6. Select **Create repository**.

### 2. Connect and upload this local folder

Open a terminal in this website folder. Replace `YOUR-USERNAME` with your exact GitHub username:

```bash
git init
git add .
git commit -m "Create personal academic website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

GitHub may ask you to sign in. GitHub no longer accepts account passwords for Git operations over HTTPS; use the browser sign-in flow, GitHub CLI, or a personal access token.

### 3. Check GitHub Pages

For a correctly named public `username.github.io` repository, GitHub Pages normally publishes automatically. To confirm:

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch** if it is not already selected.
4. Choose the `main` branch and `/ (root)`, then select **Save**.
5. Wait a few minutes, then visit `https://YOUR-USERNAME.github.io`.

Each future update is simply:

```bash
git add .
git commit -m "Describe the website update"
git push
```

## Project structure

```text
.
├── _config.yml        Site settings
├── _data/             Navigation data
├── _includes/         Header and footer
├── _layouts/          Reusable page templates
├── _posts/            Blog posts
├── _research/         Research project pages
├── assets/            Styles, images, and videos
├── index.md            Homepage
├── research.md         Research archive
├── blog.md             Blog archive
└── about.md            Biography and contact page
```
