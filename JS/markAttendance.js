// College Location (CDAC Noida)
const collegeLat = 28.6280;
const collegeLng = 77.3649;
const allowedDistance = 100;

// Save Attendance Button
let saveBtn = document.getElementById("saveBtn");
saveBtn.disabled = true;

// Geo Location Check
navigator.geolocation.getCurrentPosition(
    function (position) {

        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;

        let distance = getDistance(
            userLat,
            userLng,
            collegeLat,
            collegeLng
        );

        if (distance <= allowedDistance) {

            saveBtn.disabled = false;
            alert("Inside College Campus. Attendance Allowed.");

        } else {

            alert("Outside College Campus. Attendance Denied.");

        }

    },
    function () {

        alert("Location Permission Required");

    }
);

// Distance Formula
function getDistance(lat1, lon1, lat2, lon2) {

    let R = 6371000;

    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    let c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return R * c;

}

// Student Data (Demo)
const students = [

    {
        name: "Siddharth Singh Tomar",
        roll: "101"
    }

];

// Create Table
let table = document.getElementById("attendanceTable");

students.forEach(function(student){

    let row = table.insertRow();

    row.insertCell(0).innerHTML = student.name;
    row.insertCell(1).innerHTML = student.roll;

    let cell = row.insertCell(2);

    cell.innerHTML =
    `<input type="checkbox" checked id="${student.roll}">`;

});

// Save Attendance
function saveAttendance(){

    let attendance = [];

    students.forEach(function(student){

        let present =
        document.getElementById(student.roll).checked;

        attendance.push({

            name: student.name,
            roll: student.roll,
            status: present ? "Present" : "Absent"

        });

    });

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

    alert("Attendance Saved Successfully");

    window.location.href = "report.html";

}
