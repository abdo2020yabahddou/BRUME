const form = document.getElementById("coffeeForm")
const totalPrice = document.getElementById("totalPrice");

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

updateCoffee();
