let data =
JSON.parse(localStorage.getItem("registerData"));

document.getElementById("name").value =
data.name;

document.getElementById("email").value =
data.email;

function registerTeacher(){

    let teacher={

        employeeId:
        document.getElementById("employeeId").value,

        name:data.name,

        email:data.email,

        password:data.password,

        subject:
        document.getElementById("subject").value,

        department:
        document.getElementById("department").value,

        phone:
        document.getElementById("phone").value

    };

    fetch("http://localhost:8080/teachers/register",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(teacher)

    })

    .then(response=>response.text())

    .then(message=>{

        alert(message);

        localStorage.removeItem("registerData");

        window.location.href="login.html";

    })

    .catch(error=>{

        console.log(error);

        alert("Registration Failed");

    });

}
