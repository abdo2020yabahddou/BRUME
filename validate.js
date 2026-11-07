const form1 = document.getElementById("checkoutForm");
const checkoutMessage = document.getElementById("checkoutMessage");
const submitButton = form1.querySelector(".checkout-button");
const acceptTerms = document.getElementById("acceptTerms");
const termsError = document.getElementById("termsError");
submitButton.disabled = true;

const fields = {
    email: {
        el: document.getElementById("email"),
        error: document.getElementById("emailError"),
        validate: (val) => {
            if (!val.trim()) return "Ce champ est requis.";
            if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(val.trim())) return "Adresse @gmail.com uniquement.";
            return "";
        }
    },
    cardNumber: {
        el: document.getElementById("cardNumber"),
        error: document.getElementById("cardNumberError"),
        validate: (val) => {
            const digits = val.replace(/\s/g, "");
            if (!digits) return "Ce champ est requis.";
            if (!/^\d+$/.test(digits)) return "Numéros uniquement.";
            if (digits.length !== 16) return "16 chiffres requis.";
            return "";
        }
    },
    expiryDate: {
        el: document.getElementById("expiryDate"),
        error: document.getElementById("expiryDateError"),
        validate: (val) => {
            if (!val.trim()) return "Ce champ est requis.";
            if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(val.trim())) return "Format MM/AA requis.";
            return "";
        }
    },
};