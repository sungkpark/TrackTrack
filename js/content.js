var bgpage = chrome.extension.getBackgroundPage();
var interval;
var timeLeft = 0;
var timeSet;
var reset = false;
var refreshDisplayTimeout;
var ticking = false;

document.addEventListener('DOMContentLoaded', function() {
  refreshDisplay();
  document.getElementById("startbutton").addEventListener("click", function() {
    if(!ticking) {
      ticking = true;
      reset = false;
      setTime();
      bgpage.startTimer();
    }
  });
  document.getElementById("resetbutton").addEventListener("click", function() {
    resetPage();
  });
})

function refreshDisplay() {
  if (ticking) {
    timeLeft = bgpage.timeLeft;
    document.getElementById("timer").innerHTML = "TIME IS TICKING";
    document.getElementById("hour").innerHTML = bgpage.getHour();
    document.getElementById("minute").innerHTML = bgpage.getMinute();
    document.getElementById("second").innerHTML = bgpage.getSecond();

    if (timeLeft<=1000) {
      document.getElementById("second").innerHTML = "0";
      document.getElementById("timer").innerHTML = "TIME UP";
      ticking = false;
    }
  }
  refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);
}

function setTime() {
  timeSet = document.getElementById("timeSet").value;
  chrome.runtime.sendMessage({
    timeSet: document.getElementById("timeSet").value
  })
}

function resetPage() {
  ticking = false;
  reset = true;
  bgpage.resetTimer()
  document.getElementById("hour").innerHTML = 0;
  document.getElementById("minute").innerHTML = 0;
  document.getElementById("second").innerHTML = 0;
  document.getElementById("timeSet").innerHTML = "00:00";
  document.getElementById("timer").innerHTML = "RESET TIME";
}
