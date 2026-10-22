var slide_menu = document.querySelector(".slide_menu")
var side_menu = document.getElementById("side_menu")
var close_menu = document.getElementById("close_menu")

side_menu.addEventListener("click", function(){
    slide_menu.style.top = "0%"
})

close_menu.addEventListener("click", function(){
    slide_menu.style.top = "-50%"
})

var form = document.getElementById("form")

var firstName = document.getElementById("firstName")
var lastName = document.getElementById("lastName")
var email = document.getElementById("email")
var message = document.getElementById("txt")

var sendBtn = document.getElementById("sendBtn")

var firstNameError = document.getElementById("firstNameError")
var lastNameError = document.getElementById("lastNameError")
var emailError = document.getElementById("emailError")
var warning = document.getElementById("warning")

var counter = document.getElementById("counter")
var successPopup = document.getElementById("successPopup")
var closePopup = document.getElementById("closePopup")

var maxCharacters = 200

function validateForm() {

    if (firstName.value.trim() !== "") {
        firstNameError.textContent = ""
    } else {
        firstNameError.textContent = "First name is required"
    }

    if (lastName.value.trim() !== "") {
        lastNameError.textContent = ""
    } else {
        lastNameError.textContent = "Last name is required"
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    var validEmail = emailPattern.test(email.value.trim())

    if (validEmail) {
        emailError.textContent = ""
    } else {
        emailError.textContent = "Please enter a valid email address"
    }

    var typedCharacters = message.value.length

    counter.textContent = typedCharacters + "/200 characters"

    if (typedCharacters === 0 || message.value.trim() === "") {
        warning.textContent = "Please enter your message"
    } else if (typedCharacters > maxCharacters) {
        warning.textContent = "You can write only 200 characters"
    } else {
        warning.textContent = ""
    }

    sendBtn.disabled = !(
        firstName.value.trim() !== "" &&
        lastName.value.trim() !== "" &&
        validEmail &&
        message.value.trim() !== "" &&
        typedCharacters <= maxCharacters
    )
}

firstName.addEventListener("input", validateForm)
lastName.addEventListener("input", validateForm)
email.addEventListener("input", validateForm)
message.addEventListener("input", validateForm)

form.addEventListener("submit", function(event) {
    event.preventDefault()
})

sendBtn.addEventListener("click", function() {

    validateForm()

    if (sendBtn.disabled) {
        return
    }

    successPopup.style.display = "flex"

    form.reset()

    firstNameError.textContent = ""
    lastNameError.textContent = ""
    emailError.textContent = ""
    warning.textContent = ""

    counter.textContent = "0/200 characters"

    sendBtn.disabled = true
})

closePopup.addEventListener("click", function() {
    successPopup.style.display = "none"
})
