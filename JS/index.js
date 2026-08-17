window.onload = function () {

    const welcome = document.getElementById("welcomeUser");
    const login = document.getElementById("loginLink");
    const register = document.getElementById("registerLink");

    // ---------------------------------
    // Check Logged In Student
    // ---------------------------------

    const student =
        JSON.parse(localStorage.getItem("student"));

    // ---------------------------------
    // Check Logged In Teacher
    // ---------------------------------

    const teacher =
        JSON.parse(localStorage.getItem("teacher"));


    // ---------------------------------
    // No User Logged In
    // ---------------------------------

    if (student == null && teacher == null) {

        return;
    }


    // ---------------------------------
    // Logged In User
    // ---------------------------------

    welcome.style.display = "block";


    let name = "";

    if (student != null) {

        name = student.name;

    }
    else if (teacher != null) {

        name = teacher.name;

    }


    welcome.innerHTML =
        "Welcome, " + name + " 👋";


    // Hide Login

    login.style.display = "none";


    // Logout

    register.innerHTML = "Logout";

    register.href = "#";


    register.onclick = function () {

        localStorage.removeItem("student");

        localStorage.removeItem("teacher");

        window.location.href = "index.html";

    };

};
