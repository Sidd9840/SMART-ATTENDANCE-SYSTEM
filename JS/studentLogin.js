// Demo Students (Only First Time)

let students = JSON.parse(localStorage.getItem("students"));

if (!students) {

    students = [

        {
            name: "Siddharth Singh Tomar",
            roll: "101",
            password: "123456"
        },

        {
            name: "Barnali",
            roll: "102",
            password: "123456"
        },

        {
            name: "Aakriti",
            roll: "103",
            password: "123456"
        },

        {
            name: "Sonali",
            roll: "104",
            password: "123456"
        },

        {
            name: "Nikhil",
            roll: "105",
            password: "123456"
        }

    ];

    localStorage.setItem("students", JSON.stringify(students));

}

// Student Login

function studentLogin() {

    let roll = document.getElementById("studentRoll").value.trim();

    let password = document.getElementById("studentPassword").value.trim();

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let validUser = students.find(function(student) {

        return student.roll === roll &&
               student.password === password;

    });

    if (validUser) {

        // Logged-in Student Save
        localStorage.setItem("loggedInStudent", JSON.stringify(validUser));

        alert("Login Successful");

        window.location.href = "markAttendance.html";

    } else {

        alert("Invalid Roll Number or Password");

    }

    return false;

}
