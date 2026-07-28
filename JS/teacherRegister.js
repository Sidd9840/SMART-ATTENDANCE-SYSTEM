let data =
JSON.parse(localStorage.getItem("registerData"));

if(data == null){

    alert("Please Register First");

    window.location.href = "register.html";

}

document.getElementById("name").value =
data.name;

document.getElementById("email").value =
data.email;

function registerTeacher(){

    let employeeId =
    document.getElementById("employeeId").value.trim();

    let subject =
    document.getElementById("subject").value.trim();

    let department =
    document.getElementById("department").value.trim();

    let phone =
    document.getElementById("phone").value.trim();

    // Clear Previous Errors

    document.getElementById("employeeIdError").innerHTML="";
    document.getElementById("subjectError").innerHTML="";
    document.getElementById("departmentError").innerHTML="";
    document.getElementById("phoneError").innerHTML="";

    document.getElementById("employeeId").classList.remove("input-error","input-success");
    document.getElementById("subject").classList.remove("input-error","input-success");
    document.getElementById("department").classList.remove("input-error","input-success");
    document.getElementById("phone").classList.remove("input-error","input-success");

    // Employee ID Validation

    if(employeeId==""){

        document.getElementById("employeeIdError").innerHTML =
        "Employee ID is required.";

        document.getElementById("employeeId").classList.add("input-error");

        return;

    }

    if(employeeId.length < 3){

        document.getElementById("employeeIdError").innerHTML =
        "Employee ID must be at least 3 characters.";

        document.getElementById("employeeId").classList.add("input-error");

        return;

    }

    let employeePattern = /^[A-Za-z0-9-]+$/;

    if(!employeePattern.test(employeeId)){

        document.getElementById("employeeIdError").innerHTML =
        "Only letters, numbers and '-' are allowed.";

        document.getElementById("employeeId").classList.add("input-error");

        return;

    }

    document.getElementById("employeeId").classList.add("input-success");

    // Subject Validation

    if(subject==""){

        document.getElementById("subjectError").innerHTML =
        "Subject is required.";

        document.getElementById("subject").classList.add("input-error");

        return;

    }

    document.getElementById("subject").classList.add("input-success");

    // Department Validation

    if(department==""){

        document.getElementById("departmentError").innerHTML =
        "Department is required.";

        document.getElementById("department").classList.add("input-error");

        return;

    }

    document.getElementById("department").classList.add("input-success");

    // Phone Validation

    if(phone==""){

        document.getElementById("phoneError").innerHTML =
        "Phone Number is required.";

        document.getElementById("phone").classList.add("input-error");

        return;

    }

    let phonePattern = /^[0-9]{10}$/;

    if(!phonePattern.test(phone)){

        document.getElementById("phoneError").innerHTML =
        "Enter a valid 10-digit Phone Number.";

        document.getElementById("phone").classList.add("input-error");

        return;

    }

    document.getElementById("phone").classList.add("input-success");

    // Teacher Object

    let teacher={

        employeeId:employeeId,

        name:data.name,

        email:data.email,

        password:data.password,

        subject:subject,

        department:department,

        phone:phone

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

        if(message.toLowerCase().includes("success")){

            localStorage.removeItem("registerData");

            window.location.href="login.html";

        }

    })

    .catch(error=>{

        console.log(error);

        alert("Registration Failed");

    });

}
