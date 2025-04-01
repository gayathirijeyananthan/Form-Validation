document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registrationForm");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const strengthBar = document.querySelector(".strength-bar");
    const strengthText = document.getElementById("strength-text");
    const successMessage = document.getElementById("successMessage");
    
    // Regex patterns
    const usernamePattern = /^[a-zA-Z0-9]{3,15}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    
    function validateInput(input, pattern, errorMsg) {
        const errorElement = input.nextElementSibling;
        if (!pattern.test(input.value)) {
            errorElement.textContent = errorMsg;
            return false;
        }
        errorElement.textContent = "";
        return true;
    }
    
    function checkPasswordStrength() {
        const value = password.value;
        if (value.length < 8) {
            strengthBar.className = "strength-bar weak";
            strengthText.textContent = "Weak";
        } else if (/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)) {
            strengthBar.className = "strength-bar medium";
            strengthText.textContent = "Medium";
        } else if (passwordPattern.test(value)) {
            strengthBar.className = "strength-bar strong";
            strengthText.textContent = "Strong";
        } else {
            strengthBar.className = "strength-bar";
            strengthText.textContent = "";
        }
    }
    
    password.addEventListener("input", checkPasswordStrength);
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const isUsernameValid = validateInput(username, usernamePattern, "Username must be 3-15 characters, letters and numbers only.");
        const isEmailValid = validateInput(email, emailPattern, "Invalid email format.");
        const isPasswordValid = validateInput(password, passwordPattern, "Password must be at least 8 characters, contain 1 uppercase letter, 1 number, and 1 special character.");
        const isConfirmPasswordValid = password.value === confirmPassword.value;
        
        if (!isConfirmPasswordValid) {
            confirmPassword.nextElementSibling.textContent = "Passwords do not match.";
        } else {
            confirmPassword.nextElementSibling.textContent = "";
        }
        
        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            localStorage.setItem("username", username.value);
            localStorage.setItem("email", email.value);
            successMessage.style.display = "block";
            form.reset();
            strengthBar.className = "strength-bar";
            strengthText.textContent = "";
        }
    });
});