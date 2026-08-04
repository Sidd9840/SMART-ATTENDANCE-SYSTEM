// ----------------------------
// Page Load
// ----------------------------

window.onload = function () {

    document.getElementById("reportBody").innerHTML =

    `<tr>

        <td colspan="6"
        style="text-align:center;
        padding:30px;
        font-size:18px;
        color:#666;">

        🔍 Please search to view attendance records.

        </td>

    </tr>`;

    // Auto Select Current Month & Year

    const today = new Date();

    document.getElementById("month").value = today.getMonth() + 1;

    document.getElementById("year").value = today.getFullYear();

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
// Search Student
// ----------------------------

function searchStudent() {

    let keyword = document.getElementById("searchText").value.trim();
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;

    if (keyword == "") {
        alert("Please Enter Student Name");
        return;
    }

    fetch(
        "http://localhost:8080/attendance/search?keyword="
        + encodeURIComponent(keyword)
        + "&month=" + month
        + "&year=" + year
    )

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

    let month =
    document.getElementById("month").value;

    let year =
    document.getElementById("year").value;

    if(month=="" || year==""){

        alert("Please Select Month and Year");

        return;

    }

    fetch(
        "http://localhost:8080/attendance/month?month="
        + month +
        "&year=" +
        year
    )

    .then(response=>response.json())

    .then(data=>{

        showData(data);

    })

    .catch(error=>{

        console.log(error);

    });

}

// ----------------------------
// Show Data In Table
// ----------------------------

function showData(attendanceList) {

    let body =
    document.getElementById("reportBody");

    body.innerHTML="";

    let present = 0;
let absent = 0;

document.getElementById("totalRecords").innerHTML =
attendanceList.length;
    if(attendanceList.length==0){

        body.innerHTML=

        `<tr>

            <td colspan="6"
            style="text-align:center;
            padding:25px;
            color:red;">

            No Attendance Found

            </td>

        </tr>`;

        return;

    }

    attendanceList.forEach(record=>{
    if(record.status=="Present"){

    present++;

}else{

    absent++;

}
        let row=body.insertRow();

        row.insertCell(0).innerHTML = record.studentName;

row.insertCell(1).innerHTML = record.subject;

row.insertCell(2).innerHTML = record.lecture;

row.insertCell(3).innerHTML = record.classType;

row.insertCell(4).innerHTML = record.attendanceDate;

row.insertCell(5).innerHTML = record.attendanceTime;

        let statusClass=
        record.status=="Present"
        ? "report-present"
        : "report-absent";

        row.insertCell(6).innerHTML=

        `<span class="${statusClass}">

        ${record.status}

        </span>`;

        row.insertCell(7).innerHTML=

        `<button class="report-edit"

        onclick="editAttendance(${record.id},

        '${record.status}')">

        ✏ Edit

        </button>`;

    });

document.getElementById("presentCount").innerHTML =
present;

document.getElementById("absentCount").innerHTML =
absent;
}

// ----------------------------
// Edit Attendance
// ----------------------------

function editAttendance(id,currentStatus){

    let newStatus=prompt(

        "Enter Status (Present / Absent)",

        currentStatus

    );

    if(newStatus==null){

        return;

    }

    newStatus=newStatus.trim();

    if(newStatus!="Present" &&
       newStatus!="Absent"){

        alert("Enter Present or Absent");

        return;

    }

    fetch(

        "http://localhost:8080/attendance/"+id,

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

        alert("Attendance Updated Successfully");

        loadAttendance();

    })

    .catch(error=>{

        console.log(error);

        alert("Update Failed");

    });

}
function downloadPdf(){

    let teacher = JSON.parse(localStorage.getItem("teacher"));

    window.open(
        "http://localhost:8080/attendance/report/pdf?teacherId="
        + teacher.id,
        "_blank"
    );

}
