let currentStudent = null;

document.addEventListener("DOMContentLoaded", function () {

    // Check Student Login using Backend Session

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/auth/me",
        {
            method: "GET",
            credentials: "include"
        }
    )

    .then(response => {

        if (!response.ok) {
            throw new Error("Authentication check failed");
        }

        return response.json();

    })

    .then(data => {

        // Check whether student is logged in
        if (!data.loggedIn || data.role !== "Student") {

            window.location.href = "login.html";
            return;

        }

        // Store current student only in page memory
        currentStudent = data;

        loadStudentDetails();
        loadAttendance();

    })

    .catch(error => {

        console.error("Authentication error:", error);

        window.location.href = "login.html";

    });

});


// -----------------------------
// Student Details
// -----------------------------

function loadStudentDetails() {

    document.getElementById("studentName").innerText =
        currentStudent.username;

    /*
       If your /auth/me API later returns
       rollNo and course, we can display them
       directly from the backend.
    */

    if (currentStudent.rollNo) {

        document.getElementById("rollNo").innerText =
            currentStudent.rollNo;

    }

    if (currentStudent.course) {

        document.getElementById("course").innerText =
            currentStudent.course;

    }

}


// -----------------------------
// Attendance Summary
// -----------------------------

function loadAttendance() {

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/percentage/"
        + currentStudent.id,
        {
            method: "GET",
            credentials: "include"
        }
    )

    .then(response => response.json())

    .then(data => {

        document.getElementById("present").innerText =
            data.presentClasses;

        document.getElementById("total").innerText =
            data.totalClasses;

        document.getElementById("percentage").innerText =
            data.percentage + "%";

    })

    .catch(error => {

        console.log(error);

        document.getElementById("present").innerText = "0";

        document.getElementById("total").innerText = "0";

        document.getElementById("percentage").innerText = "0%";

    });

}


// -----------------------------
// Logout
// -----------------------------

function logout() {

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/auth/logout",
        {
            method: "POST",
            credentials: "include"
        }
    )

    .then(() => {

        window.location.href = "login.html";

    })

    .catch(error => {

        console.log(error);

        window.location.href = "login.html";

    });

}


// -----------------------------
// Home
// -----------------------------

function goHome() {

    window.location.href = "../index.html";

}
