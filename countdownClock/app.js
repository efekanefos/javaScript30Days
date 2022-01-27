let countdown;
const timerDisplay = document.querySelector(".display__time-left");
//? Ekrandaki saat display elementi
const endTime = document.querySelector(".display__end-time");
//? Belirlediğimiz sürenin sonunda saatin kaç olduğunu gösteren element
const buttons = document.querySelectorAll("[data-time]");
//? Üst kısımdaki farklı zaman seçeneklerine sahip butonlar
//? hepsinde data-time attribute'u olduğu için bu şekilde hepsini seçebildik

function timer(seconds) {
  //! geriye doğru sayma işlemini gerçekleştiren fonksiyon
  clearInterval(countdown);
  //! farklı butonlara süre sıfırlanmadan bastığımızda önceki
  //! geriye sayımın sıfırlanmasını sağlar

  const now = Date.now();
  //! bulunduğumuz zamanın yıl,ay,gün ve saat şeklinde verilerini içeren bir obje döndürür
  const then = now + seconds * 1000;
  //! then değişkeni, eğer 20 dakika sonrası için bir geri sayım başlattıysak ve saat 15:30'sa bize 15:50 şeklinde dönen veridir.
  displayTimeLeft(seconds);

  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //! timestamp halinden 20 saniye gibi anlaşılır bir değere indirgediğimiz değişken
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    //! if statement geriye doğru sayımı başlattığımızda, sayımın sıfıra ulaştığı anda sayımı kesmesi için burada bulunuyor
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  //? girilen değerin dakika ve saniye karşılığı belirleniyor ve UI üzerinde görüntülenmesi sağlanıyor
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  document.title = display;
  //? sitenin tab kısmındaki yazıyı değiştirmemizi sağlıyor
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  //* timer(seconds) fonksiyonu içindeki then değişkeni sayesinde 20 dakika sonraki saatin verisini kullanarak UI üzerinde geriye sayım sonlandığında saatin kaç olacağını da UI üzerinde belirtmemizi bu fonksiyon sağlıyor
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  //! yukarıdaki butonların data-time attribute'ları içerisinde içerdikleri zaman değerlerini timer(seconds) fonksiyonu içerisine ekleyip fonksiyonu çalıştırıyoruz ve bu fonksiyonu da click event olarak ekliyoruz ki her butona basıldığında o butonun sahip olduğu zaman verisi kullanılarak geri sayım tekrar başlatılsın
  timer(seconds);
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //? input içerisine değer girip enter basmak sayfanın yenilenmesini sağlamasın
  const mins = document.querySelector("#minutes").value;
  //? form elementi içinde bulunan minutes id'li input elementinin value değerini mins değişkeni içerisine aldık
  timer(mins * 60);
  //? girdiğimiz dakika değerini 60 ile çarparak saniye halline getirip bu değeri timer fonksiyonu için argüman olarak kullanıp fonsksiyonu başlattık
  this.reset();
  //? this dediğimiz şey customForm yani form elementi olduğu için input içini temizlemek için form elementini reset() komutu ile resetlememiz yeterli oluyor
});
