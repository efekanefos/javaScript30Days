const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");
const input = document.querySelector("input[name='item']");
const inputBtn = document.querySelector("[type = submit]");
const platesList = document.querySelector(".plates");
const items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
  e.preventDefault();
  let itemObj = {
    name: input.value,
    done: false,
  };
  items.push(itemObj);
  localStorage.setItem("items", JSON.stringify(items));
  this.reset();
  addToList();
}

function addToList() {
  platesList.innerHTML = items
    .map((item, i) => {
      return `
    <li>
      <input data-index=${i} id=item${i} type="checkbox" ${item.done ? "checked" : null} />
      <label for=item${i} >${item.name}</label>
    </li>
    `;
    })
    .join("");
}

function toggleDone(e) {
  if (!e.target.matches("input")) return; // skip this unless it's an input
  const el = e.target;
  const index = el.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem("items", JSON.stringify(items));
  addToList();
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);

addToList();
