const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

const targetDate = params.target;
const label = params.label;
const contrast = params.contrast;
const accent = params.accent;

const labelEl = document.getElementById("title");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

labelEl.innerText = label || "Please provide a label";

document.body.style.color = !!contrast ? "white" : "black";

if(contrast == "imposter"){
    document.body.style.color = "white";
    labelEl.style.color = "#58bfbe";
    secondsEl.style.color = "#58bfbe";
}
elif(accent){
    labelEl.style.color = accent;
    secondsEl.style.color = accent;
}

if (!targetDate) {
  labelEl.innerText = "Please provide a target date";
} else {
  const target = new Date(targetDate);

  setInterval(() => {
    let now = new Date();
    const diffTime = Math.abs(now - target); //milliseconds
    const diffDays = Math.floor(diffTime / 86400000);
    const diffHours = Math.floor(diffTime / 3600000) - diffDays * 24;
    const diffMins =
      Math.floor(diffTime / 60000) - diffDays * 1440 - diffHours * 60;
    const diffSecs =
      Math.floor(diffTime / 1000) -
      diffDays * 86400 -
      diffHours * 3600 -
      diffMins * 60;

    daysEl.innerText = diffDays;
    hoursEl.innerText = (''+diffHours).padStart(2, '0');
    minutesEl.innerText = (''+diffMins).padStart(2, '0');
    secondsEl.innerText = diffSecs;
  }, 100);
}
