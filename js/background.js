var timeTo = "";
var countdown;
var reset = false;
var x;
// var hours;
// var minutes;
var seconds;

function startTimer() {
  if(document.getElementById("timeSet").value == "") {
    alert("Enter a time");
  }
  // alert("Time set to: " + document.getElementById("timeSet").value);
  var date = timeTo.concat(new Date().getMonth()+1, " ", new Date().getDate(), ", ", new Date().getFullYear(), " ", document.getElementById("timeSet").value, ":00");
  countdown = new Date(date).getTime();

  document.getElementById("timer").innerHTML = "TIME IS TICKING";

  updateTime();
}

function updateTime() {
  var x = setInterval(function() {
    var now = new Date().getTime();
    var timeLeft = countdown - now;

    // If the count down is over, write some text
    if (timeLeft <= 0 || reset == true) {
      clearInterval(x);
      ring();
    }

    // Time calculations for days, hours, minutes and seconds
    // var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = minutes;
    document.getElementById("second").innerHTML = seconds;
  }, 1000)
}

// function getHour() {
//   console.log(hours);
//   return hours;
// }
//
// function getMinute() {
//   console.log(minutes);
//   return minutes;
// }
//
// function getSecond() {
//   console.log(seconds);
//   return seconds;
// }

function resetTimer() {
  reset = true;
}

function notify() {
  var notif = new Notification("TrackTrack Timer", {
    type: "basic",
    icon: "/img/icon128.png",
    body: "Time's Up!"
  });
  // chrome.notifications.create("timeNotif", notif);
  notification.close.bind(notification);
}

function ring() {
  if(reset) {
    document.getElementById("hour").innerHTML = 0;
    document.getElementById("minute").innerHTML = 0;
    document.getElementById("second").innerHTML = 0;
    document.getElementById("timeSet").innerHTML.value = "00:00";
    document.getElementById("timer").innerHTML = "RESET TIME";
    reset = false;
  }
  else {
    document.getElementById("timer").innerHTML = "TIME UP";
    notify();
    // chrome.notifications.create("timeOut", options, didCreateNotification);
  }
}
