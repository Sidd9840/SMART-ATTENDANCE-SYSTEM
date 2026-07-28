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

    // Clear Previous Errors

    document.getElementById("rollError").innerHTML="";
    document.getElementById("courseError").innerHTML="";

    document.getElementById("rollNo").classList.remove("input-error","input-success");
    document.getElementById("course").classList.remove("input-error","input-success");

    // Roll Number Validation

    if(rollNo==""){

        document.getElementById("rollError").innerHTML =
        "Roll Number is required.";

        document.getElementById("rollNo").classList.add("input-error");

        return;

    }

    if(rollNo.length < 3){

        document.getElementById("rollError").innerHTML =
        "Roll Number must be at least 3 characters.";

        document.getElementById("rollNo").classList.add("input-error");

        return;

    }

    let rollPattern = /^[A-Za-z0-9-]+$/;

    if(!rollPattern.test(rollNo)){

        document.getElementById("rollError").innerHTML =
        "Only letters, numbers and '-' are allowed.";

        document.getElementById("rollNo").classList.add("input-error");

        return;

    }

    document.getElementById("rollNo").classList.add("input-success");

    // Course Validation

    if(course==""){

        document.getElementById("courseError").innerHTML =
        "Course is required.";

        document.getElementById("course").classList.add("input-error");

        return;

    }

    if(course.length < 2){

        document.getElementById("courseError").innerHTML =
        "Enter a valid course name.";

        document.getElementById("course").classList.add("input-error");

        return;

    }

    let coursePattern = /^[A-Za-z0-9 -]+$/;

    if(!coursePattern.test(course)){

        document.getElementById("courseError").innerHTML =
        "Invalid Course Name.";

        document.getElementById("course").classList.add("input-error");

        return;

    }

    document.getElementById("course").classList.add("input-success");

    // Student Object

    let student = {

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

        if(message.toLowerCase().includes("success")){

            localStorage.removeItem("registerData");

            window.location.href="login.html";

        }

    })

    .catch(error=>{

        console.log(error);

        alert("Unable To Connect Server");

    });

}
