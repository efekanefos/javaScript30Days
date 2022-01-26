const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheck);
});

let lastCheck;

function handleCheck(event) {
  let inBetween = false;

  if (event.shiftKey && this.checked) {
    //? event.shiftKey ile shift tuşuna basılı olup olmadığını VE seçimi ortadan kaldırma olaylarının da fonksiyonu tetiklememsi için this.checked 'i kullandık

    checkboxes.forEach((checkbox) => {
      //! yukarıdaki iki şartın da karşılanması sonrasında bütün checkbox'larımızı seçip 2 check arasındaki checksiz alanı tespit etmek için bütün checkbox'lar üzerinde tekrar forEach ile dönüyoruz
      console.log(checkbox);

      if (checkbox === this || checkbox === lastCheck) {
        //! ilk checkbox seçimimizi zaten yukarıdaki addEventListener ile yapmıştık ikinci checkbox işaretlemesinin gelip gelmediğini de üstünden geçtiğimiz checkbox'lardan biri seçildi mi VEYA checkbox'larımızdan biri son seçimimiz oldu mu şeklinde kontrol ediyoruz

        inBetween = !inBetween;
        //* false olan ifadeyi true'ya sonra ise tekrar false'a çevirirken
        //* arada kalan kısmı tespit etmek için bu değişkeni kullandık
        console.log("First and last checked boxes");
      }

      if (inBetween) {
        checkbox.checked = true;
        //* Aradaki kısımda kalan checkbox'lar tiklenmiş hale gelsin
      }
    });
  }

  lastCheck = this;
  //* lastCheck değişkenine son tıkladığımız elementi yani son tıklanan checkbox inputunu atıyoruz
}
