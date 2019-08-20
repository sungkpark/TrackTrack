var timeTo = "";
var countdown;
var reset = false;
var timeSet;
var timeLeft;
var timeout;
var timeUp = false;
var interval;
var hours = 0;
var minutes = 0;
var seconds = 0;
//
// chrome.runtime.onInstalled.addListener(function() {
//    chrome.contextMenus.create({
//      "id": "sampleContextMenu",
//      "title": "Sample Context Menu",
//      "contexts": ["selection"]
//    });
//  });

// chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
//   if(response.cmd=="startTimer") {
//     timeSet = response.timeSet;
//     startTimer();
//     sendResponse({
//
//     })
//   } else if(response.cmd=="resetTimer") {
//     resetTimer();
//   }
// });

function startTimer() {
  chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    timeSet = "";
    timeSet = response.timeSet;
  });

  if(timeSet=="") {
    alert("Enter a valid time");
    return;
  }

  // alert("Time set to: " + document.getElementById("timeSet").value);
  // timeSet = document.getElementById("timeSet").value
  var date = timeTo.concat(new Date().getMonth()+1, " ", new Date().getDate(), ", ", new Date().getFullYear(), " ", timeSet, ":00");
  countdown = new Date(date).getTime();

  var now = new Date().getTime();
  timeLeft = countdown - now;
  timeout = setTimeout(ring, timeLeft);
  // document.getElementById("timer").innerHTML = "TIME IS TICKING";

  updateTime();
  // interval = setInterval(updateTime, 1000);
}

function updateTimeLeft() {
  // var x = setInterval(function() {
  var now = new Date().getTime();
  timeLeft = countdown - now;
}

function updateTime() {
  updateTimeLeft();

  // Time calculations for days, hours, minutes and seconds
  // var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  interval = setTimeout(updateTime, 1000);
  // interval = setInterval(function() {
  //   getTimeLeft();
  //
  //   // Time calculations for days, hours, minutes and seconds
  //   // var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  //   hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  //   minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  //   seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
  //
  //   // Output the result in an element with id="demo"
  //   // document.getElementById("hour").innerHTML = hours;
  //   // document.getElementById("minute").innerHTML = minutes;
  //   // document.getElementById("second").innerHTML = seconds;
  // }, 1000)
  //
  // // }, 1000)
}

function getHour() {
  return hours;
}

function getMinute() {
  return minutes;
}

function getSecond() {
  return seconds;
}

function resetTimer() {
  timeUp = false;
  reset = true;
  clearTimeout(interval);
  clearTimeout(timeout);
  reset = false;
}

// function notify() {
//   var notif = new Notification("TrackTrack Timer", {
//     type: "basic",
//     icon: "/img/icon128.png",
//     body: "Time's Up!"
//   });
//   chrome.notifications.create("timeNotif", notif);
//   // notification.close.bind(notification);
//
//   timeUp = false;
// }

function getTimeUp() {
  return timeUp;
}

function ring() {
  // if(reset) {
  //   // document.getElementById("hour").innerHTML = 0;
  //   // document.getElementById("minute").innerHTML = 0;
  //   // document.getElementById("second").innerHTML = 0;
  //   // document.getElementById("timeSet").innerHTML.value = "00:00";
  //   // document.getElementById("timer").innerHTML = "RESET TIME";
  //   reset = false;
  // }
  // else {
  timeUp = true;
  clearTimeout(interval);

  var notif = new Notification("TrackTrack Timer", {
    type: "basic",
    icon: "/img/icon128.png",
    body: "Time's Up!"
  });
  chrome.notifications.create("timeNotif", notif);
  // notification.close.bind(notification);

  timeUp = false;
  // notify();
    // chrome.notifications.create("timeOut", options, didCreateNotification);
  // }
}
