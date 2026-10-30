const coffeeProducts = [
    {id: "c1", name: "Espresso Intense", category: "Base", price: 2.50, image: "espresso.jpg"},
    {id: "c2", name: "Cappuccino Mousseux", category: "Classique", price: 4.00, image: "cappuccino.jpg"},
    {id: "c3", name: "Latte Caramel", category: "Gourmand", price: 4.50, image: "latte.jpg"},
    {id: "c4", name: "Flat White", category: "Classique", price: 3.80, image: "flatwhite.jpg"},
    {id: "c5", name: "Iced Matcha Latte", category: "Froid", price: 5.00, image: "matcha.jpg"},
    {id: "c6", name: "Cold Brew", category: "Froid", price: 4.20, image: "coldbrew.jpg"},
    {id: "c7", name: "Cookie Pépites", category: "Snack", price: 2.00, image: "cookie.jpg"},
    {id: "c8", name: "Mug Isotherme Noir", category: "Accessoire", price: 15.00, image: "mug.jpg"},
    {id: "c9", name: "Filtres Papier V60 (x100)", category: "Accessoire", price: 6.50, image: "filters.jpg"},
    {id: "c10", name: "Tote Bag 'Coffee Lover'", category: "Accessoire", price: 12.00, image: "totebag.jpg"}
];

const quickAddPanel = document.getElementById("quickAddPanel")
const modal = document.getElementById("myModal")
const closeAct = document.querySelector(".close")
const searchFunc = document.querySelector(".search-func")
const searchResults = document.getElementById("searchResults")
const cartItems = document.getElementById("cartItems")
let search_input = ""

quickAddPanel.addEventListener("click", () => {
    modal.style.display = "block";
})

closeAct.addEventListener("click", () => {
    modal.style.display = "none";
    searchResults.innerHTML = ""
})

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
    searchResults.innerHTML = ""
}

searchFunc.addEventListener("input", (event) => {
    search_input = event.target.value.toLowerCase();
    showList();
})

const showList = () => {
    searchResults.innerHTML = ""
    coffeeProducts
        .filter((item) => {
            return (
                item.name.toLowerCase().includes(search_input)
            )
        })
        .forEach((e) => {
            const div = document.createElement("div")
            div.className = "search-result";

            const name = document.createElement("span")
            name.textContent = `name:  ${e.name}`

            const category = document.createElement("span")
            category.textContent = `category :${e.category}`

            const price = document.createElement("span")
            price.textContent = `price : ${e.price}`

            div.style.alignItems = `space-around`

            div.append(name, category, price)
            searchResults.appendChild(div);
            div.addEventListener("click", () => {
                addCart(e)
            })
        });
}

function addCart(product) {
    const existingItem = cartItems.querySelector(`[data-id = "${product.id}"]`)
    if (existingItem) {
        const quantityElement = existingItem.querySelector(".quantity");
        if (quantityElement) {
            quantityElement.textContent = String(Number(quantityElement.textContent) + 1);
        }
        return;
    }

    const newItem = document.createElement("div");
    newItem.className = "cart-item";
    newItem.dataset.id = product.id;

    newItem.innerHTML = `
        <div class="product-image" aria-hidden="true">
            <span>☕</span>
        </div>

        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category}</p>
        </div>

        <div class="quantity-control"
             aria-label="Quantité de ${product.name}">
            <button type="button" class="decrease"
                    aria-label="Diminuer la quantité">−</button>
            <span class="quantity">1</span>
            <button type="button" class="increase"
                    aria-label="Augmenter la quantité">+</button>
        </div>

        <div class="product-subtotal">
            <strong>${product.price.toFixed(2)} DH</strong>
        </div>

        <button class="remove-item" type="button"
                aria-label="Supprimer ${product.name}">×</button>
    `;

    cartItems.appendChild(newItem);
}