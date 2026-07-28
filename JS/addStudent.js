document.getElementById("studentForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let name =
    document.getElementById("studentName").value.trim();

    let rollNo =
    document.getElementById("rollNo").value.trim();

    let course =
    document.getElementById("course").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value.trim();

    // Clear Errors

    document.getElementById("nameError").innerHTML="";
    document.getElementById("rollError").innerHTML="";
    document.getElementById("courseError").innerHTML="";
    document.getElementById("emailError").innerHTML="";
    document.getElementById("passwordError").innerHTML="";

    document.getElementById("studentName").classList.remove("input-error","input-success");
    document.getElementById("rollNo").classList.remove("input-error","input-success");
    document.getElementById("course").classList.remove("input-error","input-success");
    document.getElementById("email").classList.remove("input-error","input-success");
    document.getElementById("password").classList.remove("input-error","input-success");

    // Name Validation

    if(name==""){

        document.getElementById("nameError").innerHTML =
        "Student Name is required.";

        document.getElementById("studentName").classList.add("input-error");

        return;

    }

    let namePattern=/^[A-Za-z ]+$/;

    if(!namePattern.test(name)){

        document.getElementById("nameError").innerHTML =
        "Only alphabets are allowed.";

        document.getElementById("studentName").classList.add("input-error");

        return;

    }

    document.getElementById("studentName").classList.add("input-success");

    // Roll Number Validation

    if(rollNo==""){

        document.getElementById("rollError").innerHTML =
        "Roll Number is required.";

        document.getElementById("rollNo").classList.add("input-error");

        return;

    }

    let rollPattern=/^[A-Za-z0-9-]+$/;

    if(!rollPattern.test(rollNo)){

        document.getElementById("rollError").innerHTML =
        "Invalid Roll Number.";

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

    document.getElementById("course").classList.add("input-success");

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

    // Student Object

    let student={

        name:name,

        rollNo:rollNo,

        course:course,

        email:email,

        password:password

    };

    fetch("http://localhost:8080/students",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(student)

    })

    .then(response=>response.json())

    .then(data=>{

        alert("Student Added Successfully");

        document.getElementById("studentForm").reset();

        window.location.href="studentList.html";

    })

    .catch(error=>{

        console.log(error);

        alert("Error adding student");

    });

});

// Back Button

function goBack(){

    if(localStorage.getItem("admin")){

        window.location.href="adminDashboard.html";

    }

    else if(localStorage.getItem("teacher")){

        window.location.href="dashboard.html";

    }

    else{

        window.location.href="login.html";

    }

}
