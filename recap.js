const savedCoffee = localStorage.getItem("brumeCoffee");
const priceLines = document.getElementById("priceLines");
const recapTotal = document.getElementById("recapTotal");
const coffeeSummary = document.getElementById("coffeeSummary");
const signatureSummary = document.getElementById("signatureSummary");

if (savedCoffee && priceLines && recapTotal) {
    const coffee = JSON.parse(savedCoffee);

    function formatPrice(price) {
        return price.toFixed(2).replace(".", ",") + " DH";
    }

    function addLine(label, item) {
        const row = document.createElement("div");
        row.className = "price-line";

        const name = document.createElement("span");
        name.textContent = `${label} · ${item.name}`;

        const price = document.createElement("strong");
        price.textContent = formatPrice(item.price);

        row.append(name, price);
        priceLines.appendChild(row);
    }

    addLine("Base", coffee.base);
    addLine("Taille", coffee.size);
    addLine("Lait", coffee.milk);

    coffee.extras.forEach(extra => {
        addLine("Supplément", extra);
    });

    recapTotal.textContent = formatPrice(coffee.total);

    const summary = [
        coffee.base.name,
        coffee.size.name,
        coffee.milk.name,
        ...coffee.extras.map(extra => extra.name)
    ].join(" · ");

    if (coffeeSummary) {
        coffeeSummary.textContent = summary.toUpperCase();
    }

    if (signatureSummary) {
        signatureSummary.textContent = summary;
    }
}