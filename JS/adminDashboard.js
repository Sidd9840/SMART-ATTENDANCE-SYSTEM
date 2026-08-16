window.onload = function () {

    // Check Admin Login using Backend Session

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/auth/me", {
        method: "GET",
        credentials: "include"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Authentication check failed");
        }

        return response.json();

    })

    .then(data => {

        if (!data.loggedIn || data.role !== "Admin") {

            window.location.href = "login.html";

            return;

        }

        loadDashboard();

    })

    .catch(error => {

        console.error("Authentication error:", error);

        window.location.href = "login.html";

    });

};


// ----------------------------
// Dashboard Data
// ----------------------------

function loadDashboard() {

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/admin/dashboard", {
        method: "GET",
        credentials: "include"
    })

    .then(response => response.json())

    .then(data => {

        document.getElementById("totalStudents").innerHTML =
            data.totalStudents;

        document.getElementById("totalTeachers").innerHTML =
            data.totalTeachers;

    })

    .catch(error => {

        console.error("Dashboard error:", error);

    });

}


// ----------------------------
// Logout
// ----------------------------

function logout() {

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/auth/logout", {

        method: "POST",
        credentials: "include"

    })

    .then(() => {

        window.location.href = "login.html";

    })

    .catch(error => {

        console.error("Logout error:", error);

        window.location.href = "login.html";

    });

}


// ----------------------------
// Home
// ----------------------------

function goHome() {

    window.location.href = "../index.html";

}
