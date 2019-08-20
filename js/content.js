var bgpage = chrome.extension.getBackgroundPage();
// var state = "idle";
var interval;
var timeLeft = 0;
var timeSet;
var reset = false;
var refreshDisplayTimeout;
var ticking = false;

// var hour;
// var minute;
// var second;
// var timeTo;
// var bgpage;

document.addEventListener('DOMContentLoaded', function() {
  // chrome.runtime.sendMessage({
  //   if (state == "idle") {
  //
  //   }
  // })
  refreshDisplay();
  document.getElementById("startbutton").addEventListener("click", function() {
    if(!ticking) {
      ticking = true;
      reset = false;
      sendTimeSet();
      timeSet = document.getElementById("timeSet").value;
      bgpage.startTimer();
    }
    //
    // document.getElementById("timer").innerHTML = "TIME IS TICKING";
    //
    // // setTimeout(function() {
    // //
    // // })
    //
    // interval = setInterval(function() {
    //   console.log("background is running.");
    //   document.getElementById("hour").innerHTML = bgpage.getHour();
    //   document.getElementById("minute").innerHTML = bgpage.getMinute();
    //   document.getElementById("second").innerHTML = bgpage.getSecond();
    //   console.log(bgpage.timeUp);
    //   if(bgpage.timeUp) {
    //     document.getElementById("timer").innerHTML = "TIME UP";
    //     clearInterval(interval);
    //   }
    // }, 1000)
  });
  document.getElementById("resetbutton").addEventListener("click", function() {
    // clearInterval(interval);
    ticking = false;
    reset = true;
    bgpage.resetTimer()
    document.getElementById("hour").innerHTML = 0;
    document.getElementById("minute").innerHTML = 0;
    document.getElementById("second").innerHTML = 0;
    document.getElementById("timeSet").innerHTML = "00:00";
    document.getElementById("timer").innerHTML = "RESET TIME";
  });
})

// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById("startbutton").addEventListener("click", chrome.runtime.sendMessage({
//     cmd: "startTimer",
//     timeSet: document.getElementById("timeSet").value
//   }));
//   document.getElementById("resetbutton").addEventListener("click", chrome.runtime.sendMessage({
//     cmd: "resetTimer"
//   }));
// })

function refreshDisplay() {
  if (reset) {
    refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);
    return;
  }
  else if (!ticking) {
    refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);
    return;
  }
  else if(timeLeft<=1000) {
    document.getElementById("second").innerHTML = "0";
    document.getElementById("timer").innerHTML = "TIME UP";
    return;
  }
  else {
    document.getElementById("timeSet").innerHTML = timeSet;
  }
  timeLeft = bgpage.timeLeft;
  document.getElementById("timer").innerHTML = "TIME IS TICKING";
  document.getElementById("hour").innerHTML = bgpage.getHour();
  document.getElementById("minute").innerHTML = bgpage.getMinute();
  document.getElementById("second").innerHTML = bgpage.getSecond();

  refreshDisplayTimeout = setTimeout(refreshDisplay, 1000);
}

function sendTimeSet() {
  // chrome.runtime.sendMessage('1'.concat(document.getElementById("timeSet").value));
  chrome.runtime.sendMessage({
    // cmd: "startTimer",
    timeSet: document.getElementById("timeSet").value
  })
}
// //
// function reset() {
//   chrome.runtime.sendMessage({
//     cmd: "resetTimer"
//   });
// }
// function refreshTime() {
  // timeTo = document.getElementById("timeSet").value;
  // setInterval(function() {
    // document.getElementById("hour").innerHTML = bgpage.getHour();
    // document.getElementById("minute").innerHTML = bgpage.getMinute();
    // document.getElementById("second").innerHTML = bgpage.getSecond();
  // }, 1000);
// }
