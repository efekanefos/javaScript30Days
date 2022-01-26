function debounce(func, wait = 20, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
//! debounce fonksiyonu argüman olarak içerisine aldığı fonksiyonu 20 milisaniyede bir çalıştırarak
//! scroll event'ı ile o fonksiyonu 100 kere çalıştırmamıza engel oluyor. Bu sayede site içerisinde
//! performans kaybını minimal hale getirmiş oluyoruz.

const sliderImages = document.querySelectorAll(".slide-in");
//? scroll efekti ekleyeceğimiz bütün resimleri seçtik

function checkSlide() {
  sliderImages.forEach((sliderImage) => {
    //* forEach ile her bir resime alttaki işlemleri aktarıyoruz

    const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
    //* scroll efektinin resmin yarısı görünür hale geldiğinde ortaya çıkmasını ve tamamı görünmez hale geldiğinde
    //* ortadan kaybolmasını istedğimiz için slideInAt değişkeninde resmin yarısının scroll değerini tutuyoruz.

    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    //* imageBottom değişkeninde ise resimlerin en alt scroll değerini tutuyoruz ki bu kısma kadar sayfa scroll edilmişse
    //* resmin ekranda artık görülmediğini anlamış oluyor ve resmin efekt ile ortadan kaldırılmasını sağlıyoruz.

    const isHalfShown = slideInAt > sliderImage.offsetTop;
    //* isHalfShown değişkeni bize resmin yarısı görünmüş olacak kadar sayfanın aşağı veya yukarı scroll edilip
    //* edilmediği bilgisini veriyor.

    const isNotScrolledPast = window.scrollY < imageBottom;
    //* isNotScrolledPast değişkeni de bize resmin tamamı görünmez hale gelecek kadar sayfanın scroll edilip
    //* edilmediği bilgisini sağlıyor.

    if (isHalfShown && isNotScrolledPast) {
      //! resmin yarısı görünüyor ve tamamı scroll edilmemişse active class'ı eklenerek efekt gerçekleştirilsin
      sliderImage.classList.add("active");
    } else {
      //! yoksa active class'ı silinsin ve resimler ekranın dışında kalan eski yerlerine dönsün
      sliderImage.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(checkSlide));
