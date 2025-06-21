const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

let targetMinutes = params.minutes;
let targetSeconds = params.seconds;
const contrast = params.contrast;
const scale = params.scale;

const timeboxEl = document.getElementById("timer")
const minutesEl = document.getElementById("minutes");
const secondsTensEl = document.getElementById("seconds10s");
const secondsOnesEl = document.getElementById("seconds1s");

// document.body.style.color = !!contrast ? "white" : "black";

if(contrast == "imposter"){
    document.body.style.color = "#58bfbe";
    timeboxEl.style.background = "none";
}
else if(contrast){
    document.body.style.color = contrast;
}

if (!targetMinutes && !targetSeconds) {
  targetMinutes = 5
  targetSeconds = 0
}
else if (!targetSeconds) {
  targetSeconds = 0
}

if(scale) {
  timeboxEl.style.fontSize = (40*scale) + 'px'
  let elements = document.querySelectorAll('.timerValue');
  for(let el of elements){
    el.style.width = (28*scale) + 'px'
  }
  elements = document.querySelectorAll('.colon');
  for(let el of elements){
    el.style.width = (20*scale) + 'px'
    el.style.transform = 'translateY('+(-5*scale)+'px)'
  }
}

let now = new Date();
const target = new Date(now.getTime() + (targetMinutes*60000 + targetSeconds*1000));

let timeCounter = setInterval(() => {
  now = new Date();
  const diffTime = Math.abs(now - target); //milliseconds
  if(now > target) {
    clearInterval(timeCounter)
  }
  const diffMins = Math.floor(diffTime / 60000);
  const diffSecs = Math.floor(diffTime / 1000) - diffMins * 60;
  const diffSecsTens = Math.floor(diffSecs / 10);
  const diffSecsOnes = diffSecs - diffSecsTens*10;

  minutesEl.innerText = diffMins;
  secondsTensEl.innerText = diffSecsTens;
  secondsOnesEl.innerText = diffSecsOnes;
}, 100);
