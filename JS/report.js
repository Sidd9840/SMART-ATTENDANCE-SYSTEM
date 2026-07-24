// ----------------------------
// Load All Attendance
// ----------------------------

window.onload = function () {

    loadAttendance();

};

// ----------------------------
// Show All Attendance
// ----------------------------

function loadAttendance() {

    fetch("http://localhost:8080/attendance")

    .then(response => response.json())

    .then(data => {

        showData(data);

    })

    .catch(error => {

        console.log(error);

    });

}

// ----------------------------
// Search By Month & Year
// ----------------------------

function searchAttendance() {

    let month = document.getElementById("month").value;

    let year = document.getElementById("year").value;

    if (month == "" || year == "") {

        alert("Please Select Month and Year");

        return;

    }

    fetch("http://localhost:8080/attendance/month?month=" + month + "&year=" + year)

    .then(response => response.json())

    .then(data => {

        showData(data);

    })

    .catch(error => {

        console.log(error);

    });

}

// ----------------------------
// Show Data In Table
// ----------------------------

function showData(attendanceList) {

    let body = document.getElementById("reportBody");

    body.innerHTML = "";

    attendanceList.forEach(record => {

        let row = body.insertRow();

        row.insertCell(0).innerHTML =
        record.studentName;

        row.insertCell(1).innerHTML =
        record.subject;

        row.insertCell(2).innerHTML =
        record.attendanceDate;

        row.insertCell(3).innerHTML =
        record.attendanceTime;

        let statusClass =
        record.status == "Present"
        ? "report-present"
        : "report-absent";

        row.insertCell(4).innerHTML =
        `<span class="${statusClass}">
            ${record.status}
        </span>`;

        row.insertCell(5).innerHTML =
        `<button class="report-edit"
        onclick="editAttendance(${record.id},
        '${record.status}')">
        ✏ Edit
        </button>`;

    });

}

// ----------------------------
// Edit Attendance
// ----------------------------

function editAttendance(id,currentStatus){

    let newStatus = prompt(

        "Enter Status (Present / Absent)",

        currentStatus

    );

    if(newStatus == null){

        return;

    }

    newStatus = newStatus.trim();

    if(newStatus != "Present" &&
       newStatus != "Absent"){

        alert("Enter Present or Absent");

        return;

    }

    fetch(

        "http://localhost:8080/attendance/" + id,

        {

            method:"PUT",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                status:newStatus

            })

        }

    )

    .then(response=>response.json())

    .then(data=>{

        alert("Attendance Updated");

        loadAttendance();

    })

    .catch(error=>{

        console.log(error);

    });

}
