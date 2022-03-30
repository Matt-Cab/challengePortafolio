// ---------- Variable definitions ----------
const contactForm = document.querySelector("#contact-form");
const sendBtn = contactForm.querySelector("#send-form-btn");

const expressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{3,50}$/, // Letras y espacios, con acentos inclusive.
    // source of email regexp: https://www.w3resource.com/javascript/form/email-validation.php#:~:text=To%20get%20a%20valid%20email,%5D%2B)*%24%2F.
    email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    subject: /^[a-zA-ZÀ-ÿ\s]{5,40}$/, // letters, numbers, hyphens and underscores
    message: /^[a-zA-ZÀ-ÿ0-9\s]{15,250}$/ // letters, numbers, hyphens and underscores
}

const fields = {
    name: false,
    email: false,
    subject: false,
    message: false
}

// ---------- Functions definitions ----------
const validateInputValue = input => {
    const inputId = input.id;
    const inputValue = input.value.trim();
    const isValid = expressions[inputId].test(inputValue);
    const parentNode = input.parentNode;
    
    fields[inputId] = isValid;
    if (isValid || inputValue === "") {
        parentNode.classList.remove("active-error");
    }
    else {
        parentNode.classList.add("active-error");
    }
}

const allDataIsValid = fields => {
    return Object.keys(fields).every(field => fields[field]);
}

// ---------- Events handlers ----------
contactForm.addEventListener("keyup", e => {
    const inputType = e.target.type;

    if (inputType === "text" || inputType === "email" || inputType === "textarea") {
        validateInputValue(e.target);
        if (allDataIsValid(fields)) {
            sendBtn.classList.remove("disabled");
        }
        else {
            sendBtn.classList.add("disabled");
        }
    }
})

sendBtn.addEventListener("click", e => {
    if (sendBtn.classList.contains("disabled")) {
        e.preventDefault();
    }
})
