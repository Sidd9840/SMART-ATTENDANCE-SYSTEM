function login(){

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value.trim();

    let role =
    document.getElementById("role").value;

    // Clear Previous Errors

    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("roleError").innerHTML = "";

    document.getElementById("email").classList.remove("input-error","input-success");
    document.getElementById("password").classList.remove("input-error","input-success");
    document.getElementById("role").classList.remove("input-error","input-success");

    // Email Validation

    if(email==""){

        document.getElementById("emailError").innerHTML =
        "Email is required.";

        document.getElementById("email").classList.add("input-error");

        return;

    }

    let pattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!pattern.test(email)){

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

    if(password.length<6){

        document.getElementById("passwordError").innerHTML =
        "Password must be at least 6 characters.";

        document.getElementById("password").classList.add("input-error");

        return;

    }

    document.getElementById("password").classList.add("input-success");

    // Role Validation

    if(role==""){

        document.getElementById("roleError").innerHTML =
        "Please select your role.";

        document.getElementById("role").classList.add("input-error");

        return;

    }

    document.getElementById("role").classList.add("input-success");

    // API URL

    let url="";

    if(role=="Admin"){

        url="http://localhost:8080/admin/login";

    }
    else if(role=="Teacher"){

        url="http://localhost:8080/teachers/login";

    }
    else{

        url="http://localhost:8080/students/login";

    }

    // Login API

    fetch(url,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            email:email,
            password:password

        })

    })

    .then(response=>response.json())

    .then(data=>{

        if(data==null || data.id==null){

            alert("Invalid Email or Password.");

            return;

        }

        alert("Login Successful");

        if(role=="Admin"){

            localStorage.setItem(
                "admin",
                JSON.stringify(data)
            );

            window.location.href =
            "adminDashboard.html";

        }

        else if(role=="Teacher"){

            localStorage.setItem(
                "teacher",
                JSON.stringify(data)
            );

            window.location.href =
            "dashboard.html";

        }

        else{

            localStorage.setItem(
                "student",
                JSON.stringify(data)
            );

            window.location.href =
            "studentDashboard.html";

        }

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to connect to server.");

    });

}

// Home Button

function goHome(){

    window.location.href="../index.html";

}
