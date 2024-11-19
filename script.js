const lastSeenTime = document.querySelectorAll(".timeSeen");

lastSeenTime.forEach((timeSeen) => {
  let randomChoice = Math.random();
  let lastTimeSeen;
  if (randomChoice < 0.5) {
    lastTimeSeen = Math.floor(Math.random() * 61);
    timeSeen.innerText = lastTimeSeen + " minuti";
  } else {
    lastTimeSeen = Math.floor(Math.random() * 13);
    timeSeen.innerText = lastTimeSeen + " ore";
  }
});
