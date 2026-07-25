let data =
JSON.parse(localStorage.getItem("registerData"));

document.getElementById("name").value =
data.name;

document.getElementById("email").value =
data.email;

function registerStudent(){

    let student={

        name:data.name,

        rollNo:document.getElementById("rollNo").value,

        course:document.getElementById("course").value,

        email:data.email,

        password:data.password

    };

    fetch("http://localhost:8080/student/register",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(student)

    })

    .then(response=>response.text())

    .then(message=>{

        alert(message);

        localStorage.removeItem("registerData");

        window.location.href="login.html";

    })

    .catch(error=>{

        console.log(error);

    });

}
