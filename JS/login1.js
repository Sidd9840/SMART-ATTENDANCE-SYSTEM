document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value

    };

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/teachers/login", {

        method: "POST",

        headers: {

            "Content-Type":"application/json"

        },

        body: JSON.stringify(loginData)

    })

    .then(response => response.json())

    .then(data => {

        if(data && data.id){

            alert("Login Successful");

            localStorage.setItem("teacher",
            JSON.stringify(data));

            window.location.href="dashboard.html";

        }

        else{

            alert("Invalid Email or Password");

        }

    })

    .catch(error=>{

        console.error(error);

        alert("Server Error");

    });

});
