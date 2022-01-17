function playSound(event) {
  const selectedAudio = document.querySelector(
    `audio[data-key='${event.keyCode}']`
  );

  //? klavyeden basılan tuşu event ile yakalayıp keycode'unu data-key attribute'u
  //? içerisine ekleyerek selectedAudio DOM elementi ile basılan tuşun audio elementine ulaşıyoruz.

  const key = document.querySelector(`.key[data-key='${event.keyCode}']`);
  //* Klavyede üzerine basılan tuşun ekranda görünen kutucuğuna denk gelen element

  if (!selectedAudio) return;

  key.classList.add("playing");

  selectedAudio.currentTime = 0;

  //! ses dosyalarının 2s gibi bir süreleri olduğu için currentTime'larını her fonksiyon ateşlendiğinde
  //! sıfırlıyoruz ki ses dosyası tekrardan çalsın. Diğer türlü o 2s içinde tuşa bassak da ses
  //! çıkmaz çünkü zaten hala çalıyor olur.

  selectedAudio.play();

  //* seçilen audio elementinin src kısmında taşıdığı ses dosyasının çalmasını sağlayan komut satırı.
}

function resetTransitionEffect(event) {
  if (event.propertyName !== "transform") {
    return; //* transition'ı tamamlanan tuşun elementinin css propertylerinden sadece transform olan kalsın
  }
  this.classList.remove("playing");
}
const allKeys = document.querySelectorAll(".key");

window.addEventListener("keydown", playSound);
//!allKeys.addEventListener("transitionend", resetTransitionEffect);
//? allKeys bir NodeList olduğu için allKeys'e direkt olarak eventListener eklenmez forEach ile içindeki elementlere eklenir.

allKeys.forEach((key) =>
  key.addEventListener("transitionend", resetTransitionEffect)
);
