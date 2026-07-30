window.onload = function () {

    let admin = JSON.parse(localStorage.getItem("admin"));
    let teacher = JSON.parse(localStorage.getItem("teacher"));
    let student = JSON.parse(localStorage.getItem("student"));

    let welcome = document.getElementById("welcomeUser");
    let login = document.getElementById("loginLink");
    let register = document.getElementById("registerLink");

    if (admin) {

        welcome.style.display = "block";
        welcome.innerHTML = "Welcome, " + admin.name + " 👋";

        login.style.display = "none";
        register.innerHTML = "Logout";
        register.href = "#";

        register.onclick = function () {

            localStorage.removeItem("admin");

            location.reload();

        };

    }

    else if (teacher) {

        welcome.style.display = "block";
        welcome.innerHTML = "Welcome, " + teacher.name + " 👋";

        login.style.display = "none";
        register.innerHTML = "Logout";
        register.href = "#";

        register.onclick = function () {

            localStorage.removeItem("teacher");

            location.reload();

        };

    }

    else if (student) {

        welcome.style.display = "block";
        welcome.innerHTML = "Welcome, " + student.name + " 👋";

        login.style.display = "none";
        register.innerHTML = "Logout";
        register.href = "#";

        register.onclick = function () {

            localStorage.removeItem("student");

            location.reload();

        };

    }

};
