const form = document.getElementById("coffeeForm")
const totalPrice = document.getElementById("totalPrice")
const addToCart = document.getElementById("addToCart")

function updateCoffee() {
    let total = 0;
    document.querySelectorAll(".option").forEach(option => {
        const input = option.querySelector("input");
        option.classList.toggle("selected", input.checked);
        if (input.checked) {
            total = total + Number(input.dataset.price || 0)
        }
    });
    totalPrice.textContent = total.toFixed(2) + " DH";
}

form.addEventListener("change", updateCoffee);

addToCart.addEventListener("click", () => {
    const selected = input => ({name: input.value, price: Number(input.dataset.price)});

    const coffee = {
        base: selected(form.querySelector('[name="base"]:checked')),
        size: selected(form.querySelector('[name="size"]:checked')),
        milk: selected(form.querySelector('[name="milk"]:checked')),
        extras: [...form.querySelectorAll('[name="extra"]:checked')].map(selected)
    };

    coffee.total = coffee.base.price + coffee.size.price + coffee.milk.price
        + coffee.extras.reduce((sum, e) => sum + e.price, 0);

    localStorage.setItem("brumeCoffee", JSON.stringify(coffee));
    window.location.href = "brumeSummary.html";
});