window.onload = function () {

    let admin = localStorage.getItem("admin");
    let teacher = localStorage.getItem("teacher");
    let student = localStorage.getItem("student");

    // Navbar Login Link
    let navLogin = document.querySelector('nav a[href="HTML/login.html"]');

    // Navbar Register Link
    let navRegister = document.querySelector('nav a[href="HTML/register.html"]');

    // Hero Login Link
    let heroLogin = document.querySelector('.hero-buttons a[href="HTML/login.html"]');

    // Hero Register Link
    let heroRegister = document.querySelector('.hero-buttons a[href="HTML/register.html"]');

    if (admin != null) {

        navLogin.href = "HTML/adminDashboard.html";
        heroLogin.href = "HTML/adminDashboard.html";

    }

    else if (teacher != null) {

        navLogin.href = "HTML/dashboard.html";
        heroLogin.href = "HTML/dashboard.html";

    }

    else if (student != null) {

        navLogin.href = "HTML/studentDashboard.html";
        heroLogin.href = "HTML/studentDashboard.html";

    }

}
