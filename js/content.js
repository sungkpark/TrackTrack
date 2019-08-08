// var bgpage = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("startbutton").addEventListener("click", startTimer);
  document.getElementById("resetbutton").addEventListener("click", resetTimer);
})

// function refreshTime() {
//   document.getElementById("hour").innerHTML = bgpage.getHour();
//   document.getElementById("minute").innerHTML = bgpage.getMinute();
//   document.getElementById("second").innerHTML = bgpage.getSecond();
// }
