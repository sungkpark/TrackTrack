var timeTo = "";
var countdown;
var reset = false;
var timeSet = "";
var timeLeft;
var timeout;
var timeUp = false;
var interval;
var hours = 0;
var minutes = 0;
var seconds = 0;

function startTimer() {
  chrome.runtime.onMessage.addListener(function(response, sender, sendResponse){
    timeSet = response.timeSet;
  });

  if(timeSet=="") {
    alert("Enter a valid time");
    return;
  }

  var date = timeTo.concat(new Date().getMonth()+1, " ", new Date().getDate(), ", ", new Date().getFullYear(), " ", timeSet, ":00");
  countdown = new Date(date).getTime();

  var now = new Date().getTime();
  timeLeft = countdown - now;
  timeout = setTimeout(ring, timeLeft);

  updateTime();
}

function updateTimeLeft() {
  var now = new Date().getTime();
  timeLeft = countdown - now;
}

function updateTime() {
  updateTimeLeft();

  hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
  minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  interval = setTimeout(updateTime, 1000);
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

function getTimeUp() {
  return timeUp;
}

function ring() {
  timeUp = true;
  clearTimeout(interval);

  var notif = new Notification("TrackTrack Timer", {
    type: "basic",
    icon: "/img/icon128.png",
    body: "Time's Up!"
  });
  chrome.notifications.create("timeNotif", notif);

  timeUp = false;
}
