const holes = document.querySelectorAll(".hole");
//? deliklerin her birini içeren tek DOM elementi
const scoreBoard = document.querySelector(".score");
//? köstebekleri toprağa gödükçe kazandığımız skorları görüntüleyen element
const moles = document.querySelectorAll(".mole");
//? köstebeklerin her birini içeren tek DOM elementi
let lastHole;
//? aynı köstebek tekrar denk gelmesin diye son denk geleni kaydettiğimiz değişken
let timeUp = false;
//? yarışmacının süresinin dolduğunu belirten ve oyunu o anda sonlandırmamızı sağlayan değişken
let score = 0;

function randomTime(min, max) {
  //! köstebeklerin topraktan çıkmasının gerçekleşme süresini, belirli min va max zaman değerleri içinde elde ettiğimiz rastgele süreleri kullanarak belirliyoruz
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  //* hangi delikten köstebeğin çıkacağının yine rastgele belirlendiği kısım burası
  const idx = Math.floor(Math.random() * holes.length);
  //* köstebeğin ortaya çıkacağı deliğin hangi delik olacağını belirtecek index bilgisi rastgele üretiliyor
  const hole = holes[idx];
  //* o rastgele seçilen delik hole adlı değişkene atanıyor
  if (hole === lastHole) {
    console.log("Ah nah thats the same one bud");
    return randomHole(holes);
  }
  //* eğer hole değişkenine atanan değer lastHole a atanan değerle aynıysa rastgele başka bir delikteki köstebeğin çıkması sağlanıyor. önceki delikten farklı bir delik seçilene kadar tekrar tekrar rastgele delik ataması yapılıyor
  lastHole = hole;
  return hole;
}

function peep() {
  //? köstebeklerin ortaya çıkmasını sağlayan class eklemesinin yapıldığı fonksiyon bu
  const time = randomTime(200, 1000);
  //? randomTime fonksiyonundan aldığımız rastgele süre değerini time değişkenine attık
  const hole = randomHole(holes);
  //? randomHole fonksiyonundan aldığımız rastgele delik bilgisini de hole değişkenine attık
  hole.classList.add("up");
  //? örneğin elimizde 3. delik verisi var bu deliğe up class'ı ekliyoruz ki köstebek ortaya çıksın
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep();
  }, time);
  //? sonra da köstebeğin time içindeki rastgele sürenin sonunda geri toprağa girmesini sağlıyoruz. Eğer timeUp değişkeni hala false değerine sahipse true olana kadar peep() fonskyinunu tekrar tekrar çalıştır demiş oluyoruz.
}

function startGame() {
  //! start tuşuna basıldığı anda değerleri başlangıç değerine resetlediğimiz fonksiyon
  scoreBoard.textContent = 0;
  //! skor UI'da resetlendi
  timeUp = false;
  score = 0;
  //! skor arkada resetlendi
  peep();
  //! köstebeklerin 10 saniyelik inip çıkma olayı başlatıldı
  setTimeout(() => (timeUp = true), 10000);
  //! 10 saniye sonunda timeUp değişkeni true yapıldı ve böylelikle peep() fonksiyonu içindeki if statement içinde else kısmına düşen bir durumla karşılaşıp kendini tekrarlamaz hale geldi
}

function bonk(e) {
  //! köstebeklerden her birine tıklandığında alttaki olayları gerçekleştiren fonksiyon
  if (!e.isTrusted) return;
  //! js kısmında tıklama olayı kandırılarak oyunda hileye başvurulamaması için bu satırı ekledik
  score++;
  //! skor köstebeklere basıldıkça 1'er 1'er artsın
  this.parentNode.classList.remove("up");
  //! üzerine tıklanmış olan köstebek geri alt kısma insin
  scoreBoard.textContent = score;
  //! UI kısmındaki skoru görüntüleyen element yeni skor bilgisiyle güncellensin
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
