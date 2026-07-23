document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let student = {

        email: document.getElementById("email").value,
        password: document.getElementById("password").value

    };

    fetch("http://localhost:8080/students/login",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(student)

    })

    .then(response => response.json())

    .then(data => {

        if(data && data.id){

            localStorage.setItem(
                "student",
                JSON.stringify(data)
            );

            alert("Login Successful");

            window.location.href =
            "studentDashboard.html";

        }
        else{

            alert("Invalid Email or Password");

        }

    })

    .catch(error =>{

        console.log(error);

        alert("Server Error");

    });

});
