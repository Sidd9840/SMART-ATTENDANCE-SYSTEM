function continueRegister(){

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    let role =
    document.getElementById("role").value;

    // Clear Previous Errors

    document.getElementById("nameError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("passwordError").innerHTML="";
    document.getElementById("confirmPasswordError").innerHTML="";
    document.getElementById("roleError").innerHTML="";

    document.getElementById("name").classList.remove("input-error","input-success");
    document.getElementById("email").classList.remove("input-error","input-success");
    document.getElementById("password").classList.remove("input-error","input-success");
    document.getElementById("confirmPassword").classList.remove("input-error","input-success");
    document.getElementById("role").classList.remove("input-error","input-success");

    // Name Validation

    if(name==""){

        document.getElementById("nameError").innerHTML =
        "Full Name is required.";

        document.getElementById("name").classList.add("input-error");

        return;

    }

    let namePattern = /^[A-Za-z ]+$/;

    if(!namePattern.test(name)){

        document.getElementById("nameError").innerHTML =
        "Name should contain only alphabets.";

        document.getElementById("name").classList.add("input-error");

        return;

    }

    if(name.length < 3){

        document.getElementById("nameError").innerHTML =
        "Name must be at least 3 characters.";

        document.getElementById("name").classList.add("input-error");

        return;

    }

    document.getElementById("name").classList.add("input-success");

    // Email Validation

    if(email==""){

        document.getElementById("emailError").innerHTML =
        "Email is required.";

        document.getElementById("email").classList.add("input-error");

        return;

    }

    let emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailPattern.test(email)){

        document.getElementById("emailError").innerHTML =
        "Please enter a valid Email.";

        document.getElementById("email").classList.add("input-error");

        return;

    }

    document.getElementById("email").classList.add("input-success");

    // Password Validation

    if(password==""){

        document.getElementById("passwordError").innerHTML =
        "Password is required.";

        document.getElementById("password").classList.add("input-error");

        return;

    }

    if(password.length < 6){

        document.getElementById("passwordError").innerHTML =
        "Password must be at least 6 characters.";

        document.getElementById("password").classList.add("input-error");

        return;

    }

    document.getElementById("password").classList.add("input-success");

    // Confirm Password Validation

    if(confirmPassword==""){

        document.getElementById("confirmPasswordError").innerHTML =
        "Confirm Password is required.";

        document.getElementById("confirmPassword").classList.add("input-error");

        return;

    }

    if(password!=confirmPassword){

        document.getElementById("confirmPasswordError").innerHTML =
        "Passwords do not match.";

        document.getElementById("confirmPassword").classList.add("input-error");

        return;

    }

    document.getElementById("confirmPassword").classList.add("input-success");

    // Role Validation

    if(role==""){

        document.getElementById("roleError").innerHTML =
        "Please select your role.";

        document.getElementById("role").classList.add("input-error");

        return;

    }

    document.getElementById("role").classList.add("input-success");

    // Save Data

    localStorage.setItem(

        "registerData",

        JSON.stringify({

            name:name,

            email:email,

            password:password

        })

    );

    // Redirect

    if(role=="Student"){

        window.location.href =
        "studentRegister.html";

    }
    else{

        window.location.href =
        "teacherRegister.html";

    }

}
