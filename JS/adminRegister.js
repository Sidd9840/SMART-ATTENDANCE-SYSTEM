function registerAdmin() {

    let username =
        document.getElementById("username").value.trim();

    let email =
        document.getElementById("email").value.trim();

    let password =
        document.getElementById("password").value;

    let confirmPassword =
        document.getElementById("confirmPassword").value;


    // Clear Previous Errors

    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmPasswordError").innerHTML = "";


    // Username Validation

    if (username == "") {

        document.getElementById("usernameError").innerHTML =
            "Username is required.";

        return;
    }

    if (username.length < 3) {

        document.getElementById("usernameError").innerHTML =
            "Username must be at least 3 characters.";

        return;
    }


    // Email Validation

    if (email == "") {

        document.getElementById("emailError").innerHTML =
            "Email is required.";

        return;
    }

    let emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        document.getElementById("emailError").innerHTML =
            "Please enter a valid Email.";

        return;
    }


    // Password Validation

    if (password == "") {

        document.getElementById("passwordError").innerHTML =
            "Password is required.";

        return;
    }

    let passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {

        document.getElementById("passwordError").innerHTML =
            "Password must contain 8 characters, uppercase, lowercase, number and special character.";

        return;
    }


    // Confirm Password

    if (confirmPassword == "") {

        document.getElementById("confirmPasswordError").innerHTML =
            "Confirm Password is required.";

        return;
    }

    if (password != confirmPassword) {

        document.getElementById("confirmPasswordError").innerHTML =
            "Passwords do not match.";

        return;
    }


    // Admin Object

    let admin = {

        username: username,
        email: email,
        password: password

    };


    // Send Data to Backend

    fetch("http://localhost:8080/admin/register", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(admin)

    })

    .then(response => {

        if (!response.ok) {

            return response.text().then(message => {

                throw new Error(message);

            });

        }

        return response.text();

    })

    .then(message => {

        alert(message);

        if (message.toLowerCase().includes("success")) {

            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";

            window.location.href = "login.html";

        }

    })

    .catch(error => {

        console.log(error);

        alert(error.message || "Unable to Register Admin.");

    });

}


// ----------------------------
// Home
// ----------------------------

function goHome() {

    window.location.href = "../index.html";

}
