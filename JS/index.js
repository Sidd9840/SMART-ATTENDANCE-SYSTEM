window.onload = function () {

    const admin = localStorage.getItem("admin");
    const teacher = localStorage.getItem("teacher");
    const student = localStorage.getItem("student");

    // Navbar Login
    const navLogin = document.querySelector('nav a[href="HTML/login.html"]');

    // Hero Login
    const heroLogin = document.querySelector('.hero-buttons a[href="HTML/login.html"]');

    let dashboard = null;

    if (admin) {
        dashboard = "HTML/adminDashboard.html";
    } else if (teacher) {
        dashboard = "HTML/dashboard.html";
    } else if (student) {
        dashboard = "HTML/studentDashboard.html";
    }

    if (dashboard) {

        navLogin.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = dashboard;
        });

        heroLogin.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = dashboard;
        });

    }

};
