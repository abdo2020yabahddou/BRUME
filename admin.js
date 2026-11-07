const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productPrice = document.getElementById("price");
const productImage = document.getElementById("image");
const productCategory = document.getElementById("category")
const promotion = document.getElementById("promotion");
const productDescription = document.getElementById("description")
const nextStepButton1 = document.getElementById("nextStepButton1");
const cancelButton = document.getElementById("cancelButton");
const stepThree = document.getElementById("stepThree")
const nextStepButton2 = document.getElementById("nextStepButton2")
const stepOne = document.getElementById("stepOne");
const stepTwo = document.getElementById("stepTwo");
const origin = document.getElementById("origin")
const intensity = document.getElementById("intensity")
const confirmButton = document.getElementById("confirmButton");
const promotionFields = document.getElementById("promotionFields");
const discount = document.getElementById("discount");
const promotionEndDate = document.getElementById("promotionEndDate");
const discountError = document.getElementById("discountError");
const promotionDateError = document.getElementById("promotionDateError");
const summaryDiscount = document.getElementById("summaryDiscount");
const summaryPromotionDate = document.getElementById("summaryPromotionDate");

//step one js
function validateName() {
    // if (productName.value.trim() === "" || !isNaN(productName.value)) {
    //     throw new Error("Veuillez entrer un nom valide.");
    // }
    const namePattern = /^[\p{L}\s]+$/u;
    if (!namePattern.test(productName.value.trim())) {
        throw new Error("Le nom doit contenir uniquement des lettres.");
    }
}

function validateImage() {
    try {
        const url = new URL(productImage.value);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("URL invalid");
        }
    } catch {
        throw new Error("Veuillez entrer une URL valide (http ou https).");
    }
}

function validatePrice() {
    const price = Number(productPrice.value);
    if (productPrice.value.trim() === "" || price <= 0) {
        throw new Error("Veuillez entrer un prix numérique supérieur à zéro.");
    }
}

promotion.addEventListener("change", () => {
    if (promotion.checked) {
        promotionFields.hidden = false;
    } else {
        promotionFields.hidden = true;
        discount.value = "";
        promotionEndDate.value = "";
        discountError.textContent = "";
        promotionDateError.textContent = "";
    }

});

function validatePromotion() {
    if (promotion.checked) {
        if (discount.value === "" || discount.value < 1 || discount.value > 100) {
            discountError.textContent = "Veuillez entrer un pourcentage entre 1 et 100.";
            return false;
        }
        discountError.textContent = "";
        if (promotionEndDate.value === "") {
            promotionDateError.textContent = "Veuillez choisir une date de fin.";
            return false;
        }
        if (promotionEndDate.value < new Date().toLocaleDateString("en-CA")) {
            promotionDateError.textContent = "La date de fin doit être aujourd'hui ou ultérieure.";
            return false;
        }
        promotionDateError.textContent = "";
    }
    return true;
}

nextStepButton1.addEventListener("click", function () {
    try {
        if (!validatePromotion()) {
            return;
        }
        validateName();
        validateImage();
        validatePrice();
        if (productCategory.value === "" || productDescription.value.trim() === "") {
            throw new Error("Veuillez remplir tous les champs obligatoires.");
        }
        stepTwo.checked = true;
    } catch (e) {
        alert(e.message);
    }
});
cancelButton.addEventListener("click", function () {
    productForm.reset();
    stepOne.checked = true;
});


//step two js
nextStepButton2.addEventListener("click", () => {
    try {
        const temperature = document.querySelector('input[name="temperature"]:checked');
        const size = document.querySelector('input[name="size"]:checked');
        const milkType = document.querySelector('input[name="milk"]:checked');
        if (origin.value === "") {
            throw new Error("Veuillez choisir l'origine du café.");
        }
        if (!temperature) {
            throw new Error("Veuillez choisir une température.");
        }
        if (!size) {
            throw new Error("Veuillez choisir une taille.");
        }
        if (!milkType) {
            throw new Error("Veuillez choisir un type de lait.");
        }
        updateSummary(temperature, size, milkType);
        stepThree.checked = true;
    } catch (e) {
        alert(e.message);
    }
});

// Step 3
function updateSummary(temperature, size, milkType) {
    document.getElementById("summaryName").textContent = productName.value;
    document.getElementById("summaryDescription").textContent = productDescription.value;
    document.getElementById("summaryPrice").textContent = productPrice.value;
    document.getElementById("summaryCategory").textContent = productCategory.value;
    document.getElementById("summaryImage").src = productImage.value;
    document.getElementById("summaryPromotion").textContent = promotion.checked ? "Oui" : "Non";
    summaryDiscount.textContent = promotion.checked ? discount.value + " %" : "Aucune";
    summaryPromotionDate.textContent = promotion.checked ? promotionEndDate.value : "Aucune";
    document.getElementById("summaryOrigin").textContent = origin.value;
    document.getElementById("summaryIntensity").textContent = intensity.value + " / 10";
    document.getElementById("summaryTemperature").textContent = temperature.value;
    document.getElementById("summarySize").textContent = size.value;
    document.getElementById("summaryMilk").textContent = milkType.value;
    const supplements = document.querySelectorAll('input[type="checkbox"]:checked');
    const selectedSupplements = [];
    supplements.forEach(function (supplement) {
        if (supplement.id !== "promotion") {
            selectedSupplements.push(supplement.value);
        }
    });
    document.getElementById("summarySupplements").textContent =
        selectedSupplements.length > 0 ? selectedSupplements.join(", ") : "Aucun";
}

confirmButton.addEventListener("click", () => {
    Swal.fire({
        title: "Produit créé !", text: "Votre boisson a été ajoutée avec succès.",
        icon: "success", confirmButtonText: "OK", confirmButtonColor: "#394b32"
    });
});