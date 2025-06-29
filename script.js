const Array = [
  {
    id: 1,
    image: "https://i.pinimg.com/736x/f5/f5/5a/f5f55aa7308d35ff3c3d6c1aabcff464.jpg",
    categories: "Jecket",
    price: "$55",
    name: "Black Denim Jacket Outfit"
  },
  {
    id: 2,
    image: "https://i.pinimg.com/736x/72/84/eb/7284eb2d9d607afa6823568b217d9ed9.jpg",
    categories: "Suit",
    price: "$50",
    name: "White Shirt & Shades Style"
  },
  {
    id: 3,
    image: "https://i.pinimg.com/736x/bf/aa/cb/bfaacb973017d7f08efcd5e908bc24c8.jpg",
    categories: "Jecket",
    price: "$120",
    name: "Classic Blue Jacket"
  },
  {
    id: 4,
    image: "https://i.pinimg.com/736x/b3/cf/5a/b3cf5ab8c841ff5d01c6423239079845.jpg",
    categories: "Autumn",
    price: "$65",
    name: "Fall Outfit in Earth Tones"
  },
  {
    id: 5,
    image: "https://i.pinimg.com/736x/4c/6e/a8/4c6ea85bec9a25c43b159af08d4361cb.jpg",
    categories: "Shirt",
    price: "$70",
    name: "Urban Vest & Shirt Combo"
  },
  {
    id: 6,
    image: "https://i.pinimg.com/736x/a5/79/06/a57906e26a0f0246a5a522b5be4d88f4.jpg",
    categories: "Shirt",
    price: "$45",
    name: "Gray Tracksuit Look"
  },
  {
    id: 7,
    image: "https://i.pinimg.com/736x/c5/3d/69/c53d695eaa063c6fd8a697bff1d1e8a4.jpg",
    categories: "Smart",
    price: "$60",
    name: "All-Black Minimal Style"
  },
  {
    id: 8,
    image: "https://i.pinimg.com/736x/64/a8/a1/64a8a19e6a6c36fe98ef9642d14e1491.jpg",
    categories: "Smart",
    price: "$58",
    name: "50 Trendy Fall Outfit Ideas"
  },
  {
    id: 9,
    image: "https://i.pinimg.com/736x/b7/d2/fa/b7d2faa7db8b2d0fed994d41b03a6c37.jpg",
    categories: "Shoes",
    price: "$95",
    name: "Turtleneck & Overcoat Fit"
  },
  {
    id: 10,
    image: "https://i.pinimg.com/736x/43/4b/e5/434be5531c0ee032c31e54c357fea64f.jpg",
    categories: "Shoes",
    price: "$85",
    name: "Vintage Layered Outfit"
  },
  {
    id: 11,
    image: "https://i.pinimg.com/736x/42/02/b2/4202b2281ebbcb0d2039711fc961dc5b.jpg",
    categories: "Shoes",
    price: "$35",
    name: "Beach Style Linen Shirt"
  },
  {
    id: 12,
    image: "https://i.pinimg.com/736x/70/e6/99/70e6991235470d5085dc301c5e414bd1.jpg",
    categories: "Shoes",
    price: "$52",
    name: "Gray Hoodie with Black Pants"
  }
]

let filterArray = Array
let countArray = []

// HTML elementlarni olish
let input = document.querySelector("#input") // qidiruv inputi
let button = document.querySelector("#button") // qidiruv buttoni
let categories = document.querySelector(".categories") // katigoriyalarni ekranga chiqarish uchun
let appendCards = document.querySelector(".cards") // cardlarni ekranga chiqarish uchun
let count = document.querySelector(".count")

// card larni ekranga chiqarish
function renderCards(arr) {
  appendCards.innerHTML = ""; // ekranni tozalash

  arr.forEach(item => {
    let card = document.createElement("div");
    card.classList.add("card"); // style uchun class qoshish
    card.innerHTML = `
      <div class="images">
        <img src="${item.image}" alt="">
        <input class="radio" type="checkbox" ${countArray.some(x => x.id == item.id) ? "checked" : ""}>
      </div>
      <div class="title">
        <h4>${item.name}</h4>
        <span>${item.price} $</span>
      </div>
    `;

    // Card bosilganda tanlash yoki olib tashlash
    card.addEventListener("click", () => {
      let idx = countArray.findIndex(x => x.id == item.id);
      if (idx === -1) {
        countArray.push(item);           // Qo‘shish
        card.classList.add("activeCard") // Aktiv klass
      } else {
        countArray.splice(idx, 1);       // Olibtashlash
        card.classList.remove("activeCard")
      }
      count.innerHTML = countArray.length; // Tanlanganlar sonini chiqarish
      card.querySelector(".radio").checked = idx === -1; // Checkbox holatini yangilash
    });

    appendCards.appendChild(card); // Cardni sahifaga qo‘shish
  });
}

// Barcha cardlarni boshlang‘ich holatda chiqarish
renderCards(Array)

// Qidirish tugmasi bosilganda filter qilish
button.addEventListener("click", () => {
  let filter = filterArray.filter(item => item.name.toLowerCase().includes(input.value.toLowerCase()))

  filterArray = input.value != "" ? filter : Array

  // filterlangan natijani ekranga chiqarish
  renderCards(filterArray)
})

// Kategoriya tugmalarini chiqarish (Barchasi tugmasi bilan)
categories.innerHTML = `<button class="cat-btn active" data-category="all">Barchasi</button>` +
  [...new Set(Array.map(x => x.categories))]
    .map(cat => `<button class="cat-btn" data-category="${cat}">${cat}</button>`)
    .join('');

// Kategoriya tugmasi bosilganda filter qilish
categories.addEventListener('click', function (e) {
  if (e.target.classList.contains('cat-btn')) {

    // active n qoshmasidan oldin hammasidan olib tashlash 
    document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"))

    // avtive class ni qoshish (bosilganiga)
    e.target.classList.add('active');

    let cat = e.target.getAttribute('data-category');

    let filter = cat === "all" ? Array : Array.filter(item => item.categories === cat);
    renderCards(filter)
  }
});