let timerInterval;
let startTime;
let pausedTime = 0;
let laps = [];

function startStop() {
  const button = document.querySelector("button:nth-child(1)");
  if (!timerInterval) {
    startTime = Date.now() - pausedTime;
    timerInterval = setInterval(updateTimer, 10);
    button.innerHTML =
      '<img src="./assets/stop-button.png" width="30px" alt="" /> Stop';
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    button.innerHTML =
      '<img src="./assets/play.png" width="30px" alt="" /> Start';
    button.removeAttribute("disabled");
  }
}

function updateTimer() {
  const elapsedTime = Date.now() - startTime;
  displayTime(elapsedTime);
}

function displayTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsRemainder = milliseconds % 1000;
  document.getElementById("timer").innerText = `${formatTime(
    hours
  )}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(
    millisecondsRemainder,
    true
  )}`;
}

function formatTime(time, isMilliseconds = false) {
  if (isMilliseconds) {
    return time < 10 ? `00${time}` : time < 100 ? `0${time}` : time;
  }
  return time < 10 ? `0${time}` : time;
}
function pause() {
  const button = document.querySelector("button:nth-child(2)");
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    pausedTime = Date.now() - startTime;
    button.innerHTML =
      '<img src="./assets/play.png" width="30px" alt="" /> Resume';
  } else {
    startTime = Date.now() - pausedTime;
    timerInterval = setInterval(updateTimer, 10);
    button.innerHTML =
      '<img src="./assets/pause.png" width="30px" alt="" /> Pause';
  }
}

function reset() {
  const startButton = document.querySelector("button:nth-child(1)");
  const timerDisplay = document.getElementById("timer");
  const lapTimes = document.getElementById("lap-times");

  clearInterval(timerInterval);
  timerInterval = null;
  pausedTime = 0;
  startTime = 0;
  startButton.innerHTML =
    '<img src="./assets/play.png" width="30px" alt="" /> Start';
  timerDisplay.innerText = "00:00:00:000";
  lapTimes.innerText = "";
  laps = [];
}

function lap() {
  const elapsedTime = Date.now() - startTime;
  laps.push(elapsedTime);
  const lapTime =
    laps.length === 1 ? elapsedTime : elapsedTime - laps[laps.length - 2];
  const lapTimeString = `${formatTime(
    Math.floor(lapTime / 3600000)
  )}:${formatTime(Math.floor((lapTime % 3600000) / 60000))}:${formatTime(
    Math.floor((lapTime % 60000) / 1000)
  )}:${formatTime(lapTime % 1000, true)}`;
  const lapElem = document.createElement("div");
  lapElem.innerText = `Lap ${laps.length}: ${lapTimeString}`;
  document.getElementById("lap-times").appendChild(lapElem);
}
