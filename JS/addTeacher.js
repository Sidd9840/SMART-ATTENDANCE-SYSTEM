function saveTeacher() {

    let name =
    document.getElementById("name").value.trim();

    let employeeId =
    document.getElementById("employeeId").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value.trim();

    let phone =
    document.getElementById("phone").value.trim();

    let department =
    document.getElementById("department").value.trim();

    let subject =
    document.getElementById("subject").value.trim();

    // Clear Previous Errors

    document.getElementById("nameError").innerHTML="";
    document.getElementById("employeeIdError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("passwordError").innerHTML="";
    document.getElementById("phoneError").innerHTML="";
    document.getElementById("departmentError").innerHTML="";
    document.getElementById("subjectError").innerHTML="";

    document.getElementById("name").classList.remove("input-error","input-success");
    document.getElementById("employeeId").classList.remove("input-error","input-success");
    document.getElementById("email").classList.remove("input-error","input-success");
    document.getElementById("password").classList.remove("input-error","input-success");
    document.getElementById("phone").classList.remove("input-error","input-success");
    document.getElementById("department").classList.remove("input-error","input-success");
    document.getElementById("subject").classList.remove("input-error","input-success");

    // Name Validation

    if(name==""){

        document.getElementById("nameError").innerHTML =
        "Teacher Name is required.";

        document.getElementById("name").classList.add("input-error");

        return;

    }

    let namePattern=/^[A-Za-z ]+$/;

    if(!namePattern.test(name)){

        document.getElementById("nameError").innerHTML =
        "Only alphabets are allowed.";

        document.getElementById("name").classList.add("input-error");

        return;

    }

    document.getElementById("name").classList.add("input-success");

    // Employee ID Validation

    if(employeeId==""){

        document.getElementById("employeeIdError").innerHTML =
        "Employee ID is required.";

        document.getElementById("employeeId").classList.add("input-error");

        return;

    }

    let empPattern=/^[A-Za-z0-9-]+$/;

    if(!empPattern.test(employeeId)){

        document.getElementById("employeeIdError").innerHTML =
        "Invalid Employee ID.";

        document.getElementById("employeeId").classList.add("input-error");

        return;

    }

    document.getElementById("employeeId").classList.add("input-success");

    // Email Validation

    if(email==""){

        document.getElementById("emailError").innerHTML =
        "Email is required.";

        document.getElementById("email").classList.add("input-error");

        return;

    }

    let emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    if(password.length<6){

        document.getElementById("passwordError").innerHTML =
        "Password must be at least 6 characters.";

        document.getElementById("password").classList.add("input-error");

        return;

    }

    document.getElementById("password").classList.add("input-success");

    // Phone Validation

    if(phone==""){

        document.getElementById("phoneError").innerHTML =
        "Phone Number is required.";

        document.getElementById("phone").classList.add("input-error");

        return;

    }

    let phonePattern=/^[0-9]{10}$/;

    if(!phonePattern.test(phone)){

        document.getElementById("phoneError").innerHTML =
        "Enter a valid 10-digit Phone Number.";

        document.getElementById("phone").classList.add("input-error");

        return;

    }

    document.getElementById("phone").classList.add("input-success");

    // Department Validation

    if(department==""){

        document.getElementById("departmentError").innerHTML =
        "Department is required.";

        document.getElementById("department").classList.add("input-error");

        return;

    }

    document.getElementById("department").classList.add("input-success");

    // Subject Validation

    if(subject==""){

        document.getElementById("subjectError").innerHTML =
        "Subject is required.";

        document.getElementById("subject").classList.add("input-error");

        return;

    }

    document.getElementById("subject").classList.add("input-success");

    // Save Teacher

    fetch("http://localhost:8080/teachers",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:name,
            employeeId:employeeId,
            email:email,
            password:password,
            phone:phone,
            department:department,
            subject:subject

        })

    })

    .then(response=>response.json())

    .then(data=>{

        alert("Teacher Added Successfully");

        document.getElementById("name").value="";
        document.getElementById("employeeId").value="";
        document.getElementById("email").value="";
        document.getElementById("password").value="";
        document.getElementById("phone").value="";
        document.getElementById("department").value="";
        document.getElementById("subject").value="";

        document.querySelectorAll(".input-success").forEach(function(input){
            input.classList.remove("input-success");
        });

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to Connect Server");

    });

}
