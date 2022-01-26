window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//! hem firefox gibi hem de chrome gibi tarayıcılarda çalışması için

const recognition = new SpeechRecognition();
recognition.interimResults = true;
//! true hale getirdiğimiz kısmın yokluğunda her bir kelimenin kaydedilmesi işlemi
//! tamamlanmalı ki sonraki kelime işlenmeye başlanabilsin bu problemi ortadan kaldıran
//! satır: recognition.interimResults = true; satırı

let p = document.createElement("p");
const words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
  //* result eventListener'ı sayfa açıldığında konuşmaya başladığımız anda tetiklenen
  //* fakat susup tekrar konuştuğumuzda tetiklenmeyen bir eventListener'dır.

  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");
  //* bize dönen event içerisinde results kısmı içinde istediğimiz değerlere
  //* ulaşabilmemiz için onları array haline getiriyoruz

  p.textContent = transcript;
  //* oluşturduğumuz p elementinin içeriğini sözlerimizin son hali
  //* ile güncelliyoruz

  if (e.results[0].isFinal) {
    //* söylediğimiz cümlenin tamamlandığını onayladıktan sonra sonraki konuşmamızın
    //* içeriği için yeni bir paragraf elementi oluşturuyoruz
    p = document.createElement("p");
    words.appendChild(p);
  }
  //console.log(transcript);
});

recognition.addEventListener("end", recognition.start);
//? result eventListener'ının tekrar tetiklenememe problemini çözmek için trigger'lar arasına
//? end trigger'ını ekliyoruz ki susup tekrar konuştuğumuzda tetiklemelerin devamı gelsin

recognition.start();
