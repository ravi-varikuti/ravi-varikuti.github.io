(() => {
  const videos = [...document.querySelectorAll('video[autoplay]')];
  if (!videos.length) return;

  const play = (video) => {
    if (document.hidden || !video.paused) return;
    video.defaultMuted = true;
    video.muted = true;
    const playback = video.play();
    // Some browsers require a gesture; retry on the next interaction below.
    if (playback) playback.catch(() => {});
  };
  const resume = () => videos.forEach(play);

  videos.forEach((video) => {
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.addEventListener('loadeddata', () => play(video));
    video.addEventListener('canplay', () => play(video));
    play(video);
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) resume();
  });
  window.addEventListener('pageshow', resume);
  document.addEventListener('pointerdown', resume, { passive: true });
  document.addEventListener('keydown', resume);
})();
