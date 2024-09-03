// script.js

let milliseconds = 0,
    seconds = 0,
    minutes = 0;
let interval;
let isRunning = false;

const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        startPauseBtn.textContent = 'Pause';
        startStopwatch();
    } else {
        startPauseBtn.textContent = 'Start';
        pauseStopwatch();
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    resetStopwatch();
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        addLap();
    }
});

function startStopwatch() {
    interval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        updateDisplay();
    }, 10);
}

function pauseStopwatch() {
    clearInterval(interval);
}

function resetStopwatch() {
    clearInterval(interval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    updateDisplay();
    lapsContainer.innerHTML = '';
}

function updateDisplay() {
    millisecondsDisplay.textContent = milliseconds < 100 ? `0${milliseconds / 10}`.slice(0, 2) : milliseconds;
    secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;
    minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
}

function addLap() {
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${minutesDisplay.textContent}:${secondsDisplay.textContent}:${millisecondsDisplay.textContent}`;
    lapsContainer.appendChild(lapItem);
}
