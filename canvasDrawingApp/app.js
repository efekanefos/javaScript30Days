const canvas = document.getElementById("draw");
const context = canvas.getContext("2d");
//* 2 boyutlu çizimin DOM elementi

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//* canvas'ın genişlik ve yüksekliğini ekranın 100%'ü haline getirdik.

context.strokeStyle = "blue";
context.lineJoin = "round";
context.lineCap = "round";
context.lineWidth = 100;
//* çizimin rengi, kalınlığı ve noktalarını birleştirme şekli gibi
//* özellikleri

let isDrawing = false;
//* sadece belli koşullar altında çizimin yapılması için oluşturulan boolean değişken
let lastX = 0;
let lastY = 0;
//* çizimin ilk noktasının başlangıç koordinatları
let hue = 0;
//* hsl kısmındaki değerin değişimi ile renk değişiminin sağlanması için değişken
let direction = true;
//* lineWidth değerinin belli koşullarda artıp azalması konusundaki yönünü
//* belirtecek olan değişken
//context.globalCompositeOperation = "multiply";

function draw(event) {
  if (!isDrawing) {
    return;
    //? isDrawing değişkeni false ise fonksiyon hiçbir şey dönmesin
  }

  context.beginPath();
  context.moveTo(lastX, lastY);
  //? çizimin başlangıç noktası

  context.lineTo(event.offsetX, event.offsetY);
  //? çizimin ilerleyeceği noktalar

  context.stroke();
  //? çizimi başlat

  context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue++;
  //? çizimin renk değişimini sağlayan kısım

  if (hue >= 360) {
    hue = 0;
  } else {
    hue++;
  }
  //? hue değeri 360 derecede
  if (context.lineWidth >= 150 || context.lineWidth <= 1) {
    direction = !direction;
  }
  direction ? context.lineWidth++ : context.lineWidth--;
}

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (event) => {
  isDrawing = true;
  [lastX, lastY] = [event.lastX, event.lastY];
});
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});
