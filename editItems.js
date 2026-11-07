const cartContainer = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal")

cartContainer.addEventListener("click", (event) => {
    const item = event.target.closest(".cart-item");
    if (!item) return;

    const quantityDisplayed = item.querySelector(".quantity");
    let quantity = Number(quantityDisplayed.textContent);
    if (event.target.classList.contains("increase")) {
        quantity++;
        quantityDisplayed.textContent = String(quantity);
        updateTotal()
    }

    if (event.target.classList.contains("decrease")) {
        if (quantity > 1) {
            quantity--;
            quantityDisplayed.textContent = String(quantity);
            updateTotal()
        }
    }

    if (event.target.classList.contains("remove-item")) {
        item.remove();
        checkEmptyCart();
        updateTotal()
        if (searchFunc.value) showList();
    }
});

function checkEmptyCart() {
    if (document.querySelectorAll(".cart-item").length === 0) {
        cartContainer.innerHTML = "<p class='empty-cart'>Votre panier est vide.</p>";
    }
}

function updateTotal() {
    const items = cartContainer.querySelectorAll(".cart-item");
    let total = 0;
    items.forEach(item => {
        const price = Number(item.dataset.price);
        console.log(item.dataset.price)
        const quantity = Number(item.querySelector(".quantity").textContent);
        total += price * quantity;
    });
    cartTotal.textContent = total.toFixed(2) + " DH";
}