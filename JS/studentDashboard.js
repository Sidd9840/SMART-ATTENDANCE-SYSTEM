document.addEventListener("DOMContentLoaded", function () {

    // Logged In Student
    let student = JSON.parse(localStorage.getItem("student"));

    if (student == null) {

        window.location.href = "studentLogin.html";
        return;

    }

    // Student Details
    document.getElementById("studentName").innerText =
        student.name;

    document.getElementById("rollNo").innerText =
        student.rollNo;

    document.getElementById("course").innerText =
        student.course;

    // Attendance Summary
    fetch("http://localhost:8080/attendance/percentage/" + student.id)

        .then(response => response.json())

        .then(data => {

            document.getElementById("present").innerText =
                data.present;

            document.getElementById("total").innerText =
                data.total;

            document.getElementById("
