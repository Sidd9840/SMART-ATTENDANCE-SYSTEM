// -----------------------------
// Demo Students (First Time Only)
// -----------------------------

let students = JSON.parse(localStorage.getItem("students"));

if (students === null) {
    students = [
        { name: "Siddharth Singh Tomar", roll: "101", course: "Java", email: "siddu17022002@gmail.com", username: "101", password: "123456" },
        { name: "Barnali", roll: "102", course: "CDAC", email: "barnali@gmail.com", username: "102", password: "123456" },
        { name: "Aakriti Singh", roll: "103", course: "AI", email: "aakritisingh@gmail.com", username: "103", password: "123456" },
        { name: "Sonali Singh Tomar", roll: "104", course: "C++", email: "sonali123@gmail.com", username: "104", password: "123456" },
        { name: "Nikhil Pundir", roll: "105", course: "C++", email: "nikhil1452@gmail.com", username: "105", password: "123456" }
    ];
    localStorage.setItem("students", JSON.stringify(students));
}

// -----------------------------
// Student Login
// -----------------------------

document.getElementById("loginForm").addEventListener("submit", function(e){
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let students = JSON.parse(localStorage.getItem("students"));

    let validUser = students.find(function(student){
        return student.username === username && student.password === password;
    });

    if(validUser){
        localStorage.setItem("loggedInStudent", JSON.stringify(validUser));
        alert("Login Successful");

        // FIX: Ensure the path is correct relative to the current file
        // If studentLogin.html and markAttendance.html are in the SAME folder:
        window.location.href = "markAttendance.html"; 
        
        // If it still doesn't work, verify the file name exactly (e.g., is it MarkAttendance.html?)
    }
    else{
        alert("Invalid Username or Password");
    }
});
