const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
//? Functions

function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method]();
}

function updatePlayIcon() {
  const icon = this.paused ? "►" : "||";
  toggle.textContent = icon;
}

function skip() {
  let currentSkipValue = parseFloat(this.dataset.skip);
  video.currentTime += currentSkipValue;
}

function handleRange() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

//! EventListeners

video.addEventListener("click", togglePlay);

video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);

skipButtons.forEach((skipBtn) => {
  skipBtn.addEventListener("click", skip);
});

ranges.forEach((rangeBtn) => {
  rangeBtn.addEventListener("change", handleRange);
  rangeBtn.addEventListener("mousemove", handleRange);
});

let mouseDown = false;
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
