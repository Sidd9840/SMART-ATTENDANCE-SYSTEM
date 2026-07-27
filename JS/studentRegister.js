let data = JSON.parse(localStorage.getItem("registerData"));

if(data == null){

    alert("Please Register First");

    window.location.href = "register.html";

}

document.getElementById("name").value = data.name;

document.getElementById("email").value = data.email;

function registerStudent(){

    let rollNo =
    document.getElementById("rollNo").value.trim();

    let course =
    document.getElementById("course").value.trim();

    if(rollNo=="" || course==""){

        alert("Please Fill All Fields");

        return;

    }

    let student={

        name:data.name,

        rollNo:rollNo,

        course:course,

        email:data.email,

        password:data.password

    };

    fetch("http://localhost:8080/students/register",{

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

        alert("Unable To Connect Server");

    });

}
