const inputs = document.querySelectorAll(".controls input");

function handleChange(event) {
  const suffix = this.dataset.sizing || "";
  //*console.log(this.dataset);
  //* this.dataset bize inputlar içinde data-sizing adında bir attribute olmasından ötürü içinde sizing:"px" olan bir değere sahip DOMStringMap'ler dönüyor.

  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}

inputs.forEach((input) => {
  input.addEventListener("change", handleChange);
  input.addEventListener("mousemove", handleChange);
});
