const searchInput = document.querySelector(".search");
const suggestionList = document.querySelector(".suggestions");
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
let cities = [];
fetch(endpoint)
  .then((info) => info.json())
  .then((data) => {
    cities.push(...data);
  });

function matchCities(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    //? gi'deki g global özelliğini, i de büyük küçük harf hassaslığı olmayışını simgeliyor.
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const matchArray = matchCities(this.value, cities);
  //! bu fonksiyonu kullanırken argüman olarak this.value dedğimizde input içerisine girilen value değerini alabiliyor olmasının sebebi bu fonksiyonun EventListener yardımıyla arama inputu ile tetikleniyor olması

  const newListElement = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      //! girilen kelimeyi regex değişkeni içinde tutuyoruz ki gelen arama sonuçlarında girdiğimiz kelimenin background değeri değişsin
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      return `
        <li>
            <span class="name">${cityName} ${stateName}</span>
            <span class="population">${formatPopulationNumber(place.population)}</span>
        </li>
        `;
    })
    .join("");
  suggestionList.innerHTML = newListElement;
}

function formatPopulationNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

searchInput.addEventListener("change", displayMatches);
//? change input içine yazdıktan sonra dışarıya tıklamak zorunda bırakıyor.
searchInput.addEventListener("keyup", displayMatches);
//! keyup ise input içerisine her bir harf girişimizde fonksiyonu tetikliyor.
