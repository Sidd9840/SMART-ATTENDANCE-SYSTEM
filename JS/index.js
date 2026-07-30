<script>

window.onload = function () {

    let admin = localStorage.getItem("admin");
    let teacher = localStorage.getItem("teacher");
    let student = localStorage.getItem("student");

    let dashboardPage = "";

    if (admin) {

        dashboardPage = "HTML/adminDashboard.html";

    } else if (teacher) {

        dashboardPage = "HTML/dashboard.html";

    } else if (student) {

        dashboardPage = "HTML/studentDashboard.html";

    }

    // Agar koi login hai
    if (dashboardPage !== "") {

        // Navbar
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("registerLink").style.display = "none";

        document.getElementById("dashboardLink").style.display = "inline";
        document.getElementById("logoutLink").style.display = "inline";

        document.getElementById("dashboardLink").href = dashboardPage;

        // Hero Section
        document.getElementById("heroLogin").style.display = "none";
        document.getElementById("heroRegister").style.display = "none";

        document.getElementById("heroDashboard").style.display = "inline";
        document.getElementById("heroDashboard").href = dashboardPage;

    }

}

function logout() {

    localStorage.removeItem("admin");
    localStorage.removeItem("teacher");
    localStorage.removeItem("student");

    window.location.href = "HTML/login.html";

}

</script>
