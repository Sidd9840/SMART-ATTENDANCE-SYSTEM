document.addEventListener("DOMContentLoaded", function () {

    // Dashboard Data
    fetch("http://localhost:8080/dashboard")
    .then(response => response.json())
    .then(data => {

        document.getElementById("totalStudents").innerText =
        data.totalStudents;

        document.getElementById("totalTeachers").innerText =
        data.totalTeachers;

        document.getElementById("totalAttendance").innerText =
        data.totalAttendance;

        document.getElementById("present").innerText =
        data.present;

        document.getElementById("absent").innerText =
        data.absent;

    })
    .catch(error => {
        console.log(error);
    });

    // Logout
    const logoutBtn = document.querySelector('a[href="../index.html"]');

    logoutBtn.addEventListener("click", function (e) {

        let confirmLogout = confirm("Are you sure you want to logout?");

        if (!confirmLogout) {
            e.preventDefault();
        }

        localStorage.removeItem("teacher");

    });

});
