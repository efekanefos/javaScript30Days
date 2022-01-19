const panels = document.querySelectorAll(".panel");

function GrowPanelWidth() {
  this.classList.toggle("open");
}
function getBackTexts(event) {
  //console.log(event.target);
  //this.classList.toggle("active");
  if (event.propertyName.includes("flex")) {
    event.target.classList.toggle("active");
  }
}

panels.forEach((panel) => panel.addEventListener("click", GrowPanelWidth));
panels.forEach((panel) => panel.addEventListener("transitionend", getBackTexts));
