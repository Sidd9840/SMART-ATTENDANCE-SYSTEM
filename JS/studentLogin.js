// Demo Students (Only First Time)

let students = JSON.parse(localStorage.getItem("students"));

if (!students) {

    students = [

        {
            name: "Siddharth Singh Tomar",
            username: "101",
            password: "123456"
        },

        {
            name: "Barnali",
            username: "102",
            password: "123456"
        },

        {
            name: "Aakriti",
            username: "103",
            password: "123456"
        },

        {
            name: "Sonali",
            username: "104",
            password: "123456"
        },

        {
            name: "Nikhil",
            username: "105",
            password: "123456"
        }

    ];

    localStorage.setItem("students", JSON.stringify(students));
}

// Login Form

document.getElementById("loginForm").addEventListener("submit", function(e){

    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let validUser = students.find(function(student){

        return student.username === username &&
               student.password === password;

    });

    if(validUser){

        localStorage.setItem("loggedInStudent", JSON.stringify(validUser));

        alert("Login Successful");

        window.location.href = "markAttendance.html";

    }
    else{

        alert("Invalid Username or Password");

    }

});
