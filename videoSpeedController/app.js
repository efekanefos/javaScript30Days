const speed = document.querySelector(".speed");
const bar = speed.querySelector(".speed-bar");
const video = document.querySelector(".flex");

function handleMove(e) {
  const y = e.pageY - this.offsetTop;
  //* sayfanın üst kısmı ile speed barın üst kısmı arasında kalan mesafeyi hesapladık
  const percent = y / this.offsetHeight;
  //* bu mesafeyi speed bar'ın yüksekliğine böldük
  const min = 0.5;
  const max = 5;
  //* min ve max değerlerimiz 0 veya 1 değil 0.5 ile 5 arasında değişecek
  const height = Math.round(percent * 100) + "%";
  //* speed bar içerisindeki miktarın bar'ın yüzde kaçına denk geldiği bilgisi
  const playbackRate = percent * (max - min) + min;
  //* speed bar içerisindeki 3.5x tarzındaki değerin 0.5 ile 5 arasında bulunmasını sağlıyoruz
  bar.style.height = height;
  bar.textContent = playbackRate.toFixed(2) + "x";
  video.playbackRate = playbackRate;
  //* video elementinin playbackRate değeri onun oynatma hızıdır biz de bu değeri playbackRate değişkenimize ekliyoruz
}

speed.addEventListener("mousemove", handleMove);
