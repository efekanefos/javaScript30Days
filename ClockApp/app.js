function startClock() {
  let now = new Date();
  let secondsDegree = (now.getSeconds() / 60) * 360 + 90;
  let minutesDegree = (now.getMinutes() / 60) * 360 + 90;
  let hoursDegree = (now.getHours() / 12) * 360 + 90;
  document.getElementById("secondHand").style.transform = `rotate(${secondsDegree}deg)`;
  document.getElementById("minHand").style.transform = `rotate(${minutesDegree}deg)`;
  document.getElementById("hourHand").style.transform = `rotate(${hoursDegree}deg)`;
}

setInterval(startClock, 1000);
