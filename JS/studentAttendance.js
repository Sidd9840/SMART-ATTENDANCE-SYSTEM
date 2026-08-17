// -------------------------------------
// Logged In Student
// -------------------------------------

let student = JSON.parse(localStorage.getItem("student"));

if (student == null) {

    alert("Please Login First");

    window.location.href = "studentLogin.html";

    return;

}

// -------------------------------------
// Load Student Attendance
// -------------------------------------

fetch(
    "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/student/"
    + student.id
)

.then(response => {

    if (!response.ok) {

        throw new Error("Unable to load attendance.");

    }

    return response.json();

})

.then(data => {

    let table =
        document.getElementById("attendanceTable");

    // Clear existing rows except header

    table.innerHTML = "";

    data.forEach(function(record) {

        let row = table.insertRow();

        // Date
        row.insertCell(0).innerHTML =
            record.attendanceDate || "-";

        // Time
        row.insertCell(1).innerHTML =
            record.attendanceTime || "-";

        // Subject
        row.insertCell(2).innerHTML =
            record.subject || "-";

        // Lecture
        row.insertCell(3).innerHTML =
            record.lecture || "-";

        // Class Type
        row.insertCell(4).innerHTML =
            record.classType || "-";

        // Status
        let statusCell =
            row.insertCell(5);

        statusCell.innerHTML =
            record.status || "-";

        // Distance
        row.insertCell(6).innerHTML =
            record.distance != null
                ? Math.round(record.distance) + " m"
                : "-";

    });

})

.catch(error => {

    console.log(error);

    alert("Unable to Load Attendance");

});


// -------------------------------------
// Back Button
// -------------------------------------

function goBack() {

    window.location.href =
        "studentDashboard.html";

}


// -------------------------------------
// Logout
// -------------------------------------

function logout() {

    localStorage.removeItem("student");

    window.location.href =
        "login.html";

}
