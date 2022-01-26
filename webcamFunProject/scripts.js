const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      //* video.src = window.URL.createObjectURL(localMediaStream);
      //* Eski yol bu olsa da yeni yöntem alt satırda
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.log(`OH NOO`, err);
    });
}

function paintToCanvas() {
  //! canlı video yapısını canvas boyutu ve pozisyonuna getirmek
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    //! video ,top pozisyonu, left pozisyonu, genişliği, yüksekliği
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
  //* fotoğraf çekme sesini ekledik

  const data = canvas.toDataURL("image/jpeg");
  //* resmi temsil eden string dizisini data içerisine aldık
  const link = document.createElement("a");
  //* bir link elementi oluşturduk
  link.href = data;
  //* bu elementin href adresine resmin string dizisini yerleştirdik
  link.setAttribute("download", "handsome");
  //* linke tıkladığımızda indirme işlemi gerçekleşmesi ve
  //* dosyanın ismi handsome olsun diye yukarıdaki 2 attribute'u verdik
  link.innerHTML = `<img src="${data}" alt="Nice Picture"/>`;
  //* link şeklinde gözükmesi yerine çekilen resmin kendisini gösterdik
  strip.insertBefore(link, strip.firstChild);
  //* strip div'i içerisine çekilen yeni resmin eklenmesini
  //* sağlayan satır
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
//? getVideo içerisindeki video.play() olayının tetiklenmesi ile
//? paintToCanvas fonksiyonunu çalıştırıyoruz
