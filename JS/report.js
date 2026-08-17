// -------------------------------------
// Logged In Teacher
// -------------------------------------

let teacher = JSON.parse(localStorage.getItem("teacher"));

if (teacher == null) {

    alert("Please Login First");

    window.location.href = "login.html";

}


// -------------------------------------
// Page Load
// -------------------------------------

window.onload = function () {

    document.getElementById("reportBody").innerHTML =

        `<tr>

            <td colspan="9"
            style="text-align:center;
            padding:30px;
            font-size:18px;
            color:#666;">

            🔍 Please search to view attendance records.

            </td>

        </tr>`;


    // Auto Select Current Month & Year

    const today = new Date();

    document.getElementById("month").value =
        today.getMonth() + 1;

    document.getElementById("year").value =
        today.getFullYear();

};


// -------------------------------------
// Load Teacher Attendance
// -------------------------------------

function loadAttendance() {

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/teacher/"
        + teacher.id
    )

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load attendance");

        }

        return response.json();

    })

    .then(data => {

        showData(data);

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Load Attendance");

    });

}


// -------------------------------------
// Search Student
// -------------------------------------

function searchStudent() {

    let keyword =
        document.getElementById("searchText")
        .value
        .trim();

    let month =
        document.getElementById("month").value;

    let year =
        document.getElementById("year").value;


    if (keyword == "") {

        alert("Please Enter Student Name");

        return;

    }


    fetch(

        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/search"
        + "?teacherId=" + teacher.id
        + "&keyword=" + encodeURIComponent(keyword)
        + "&month=" + month
        + "&year=" + year

    )

    .then(response => {

        if (!response.ok) {

            throw new Error("Search Failed");

        }

        return response.json();

    })

    .then(data => {

        showData(data);

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Search Attendance");

    });

}


// -------------------------------------
// Search By Month & Year
// -------------------------------------

function searchAttendance() {

    let month =
        document.getElementById("month").value;

    let year =
        document.getElementById("year").value;


    if (month == "" || year == "") {

        alert("Please Select Month and Year");

        return;

    }


    fetch(

        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/teacher/month"
        + "?teacherId=" + teacher.id
        + "&month=" + month
        + "&year=" + year

    )

    .then(response => {

        if (!response.ok) {

            throw new Error("Unable to load report");

        }

        return response.json();

    })

    .then(data => {

        showData(data);

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Load Attendance");

    });

}


// -------------------------------------
// Show Data In Table
// -------------------------------------

function showData(attendanceList) {

    let body =
        document.getElementById("reportBody");

    body.innerHTML = "";


    let present = 0;

    let absent = 0;


    document.getElementById("totalRecords").innerHTML =
        attendanceList.length;


    if (attendanceList.length == 0) {

        body.innerHTML =

            `<tr>

                <td colspan="9"
                style="text-align:center;
                padding:25px;
                color:red;">

                No Attendance Found

                </td>

            </tr>`;


        document.getElementById("presentCount").innerHTML = 0;

        document.getElementById("absentCount").innerHTML = 0;

        return;

    }


    attendanceList.forEach(record => {


        // ---------------------------------
        // Count Present / Absent
        // ---------------------------------

        if (record.status == "Present") {

            present++;

        } else {

            absent++;

        }


        // ---------------------------------
        // Create Row
        // ---------------------------------

        let row = body.insertRow();


        // Student Name

        row.insertCell(0).innerHTML =
            record.studentName;


        // Subject

        row.insertCell(1).innerHTML =
            record.subject;


        // Lecture

        row.insertCell(2).innerHTML =
            record.lecture;


        // Class Type

        row.insertCell(3).innerHTML =
            record.classType;


        // Date

        row.insertCell(4).innerHTML =
            record.attendanceDate;


        // Time

        row.insertCell(5).innerHTML =
            record.attendanceTime;


        // ---------------------------------
        // Status
        // ---------------------------------

        let statusClass =
            record.status == "Present"
                ? "report-present"
                : "report-absent";


        row.insertCell(6).innerHTML =

            `<span class="${statusClass}">

                ${record.status}

            </span>`;


        // ---------------------------------
        // Distance
        // ---------------------------------

        let distanceText = "-";


        if (record.distance != null) {

            distanceText =
                Math.round(record.distance) + " Meter";

        }


        row.insertCell(7).innerHTML =
            distanceText;


        // ---------------------------------
        // Edit
        // ---------------------------------

        row.insertCell(8).innerHTML =

            `<button
                class="report-edit"
                onclick="editAttendance(
                    ${record.id},
                    '${record.status}'
                )">

                ✏ Edit

            </button>`;

    });


    // ---------------------------------
    // Update Counts
    // ---------------------------------

    document.getElementById("presentCount").innerHTML =
        present;


    document.getElementById("absentCount").innerHTML =
        absent;

}


// -------------------------------------
// Edit Attendance
// -------------------------------------

function editAttendance(id, currentStatus) {


    let newStatus = prompt(

        "Enter Status (Present / Absent)",

        currentStatus

    );


    if (newStatus == null) {

        return;

    }


    newStatus = newStatus.trim();


    if (
        newStatus != "Present" &&
        newStatus != "Absent"
    ) {

        alert("Enter Present or Absent");

        return;

    }


    fetch(

        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/"
        + id,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                status: newStatus

            })

        }

    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to update attendance"
            );

        }

        return response.json();

    })

    .then(data => {

        alert(
            "Attendance Updated Successfully"
        );


        // Refresh according to current search

        let keyword =
            document.getElementById("searchText")
            .value
            .trim();


        if (keyword != "") {

            searchStudent();

        } else {

            searchAttendance();

        }

    })

    .catch(error => {

        console.log(error);

        alert("Update Failed");

    });

}


// -------------------------------------
// Download Teacher PDF
// -------------------------------------

function downloadPdf() {


    if (teacher == null) {

        alert("Please Login First");

        return;

    }


    window.open(

        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance/report/pdf?teacherId="
        + teacher.id,

        "_blank"

    );

}
