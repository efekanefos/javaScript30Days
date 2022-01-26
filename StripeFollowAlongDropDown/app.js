const triggers = document.querySelectorAll(".cool > li");
//? Buradaki li elementleri navbardaki 3 farklı link - About Me - Courses - Other Links
const background = document.querySelector(".dropdownBackground");
//? Beyaz renkli arkaplan
const nav = document.querySelector(".top");

function handleEnter() {
  this.classList.add("trigger-enter");
  //* İçeriği görünür hale getiren class
  setTimeout(() => this.classList.contains("trigger-enter") && this.classList.add("trigger-enter-active"), 150);
  //* içeriğin 150ms sonrasında transition, opacity efekti ile yavaşça ortaya çıkmasını sağlayan class
  //* this kısmının doğru elementi temsil etmesi için burada arrow function kullanmak zorunda kaldık

  const dropdown = this.querySelector(".dropdown");
  //! Burada this ile seçim yapmamızın sebebi mouse hangi dropdown üzerine gelmişse dropdown değişkeninin o dropdown
  //! elementini seçmesini istediğimiz için
  const dropdownCoords = dropdown.getBoundingClientRect();
  //! üzerinde durulan dropdown elementinin width, height, top  ve left değerlerini içeren veriler
  const navCoords = nav.getBoundingClientRect();
  //! navbar elementinin width, height, top  ve left değerlerini içeren veriler

  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  //! navbar'ın koordinatlarındaki değerleri dropdown koordinatlarından çıkarmamızın sebebi getBoundingClientRect()
  //! fonksiyonunun bize verdiği değerlerin index.html kısmına ekleme yaptığımızda problem yaratması. navbar koordinatlarını
  //! çıkardığımız için artık eklemeler dropdown koordinatlarında bozulmaya sebep olmaz.

  background.classList.add("open");
  //* beyaz renkli background yapısını görünür hale getiren class
  background.style.width = `${coords.width}px`;
  background.style.height = `${coords.height}px`;
  background.style.top = `${coords.top}px`;
  background.style.left = `${coords.left}px`;
}

function handleLeave() {
  this.classList.remove("trigger-enter");
  setTimeout(() => this.classList.remove("trigger-enter-active"), 150);
  background.classList.remove("open");
}

triggers.forEach((trigger) => trigger.addEventListener("mouseenter", handleEnter));
triggers.forEach((trigger) => trigger.addEventListener("mouseleave", handleLeave));
