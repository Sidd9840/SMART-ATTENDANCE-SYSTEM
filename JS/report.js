fetch("http://localhost:8080/attendance")

.then(response => response.json())

.then(attendanceList => {

    let table =
    document.getElementById("reportTable");

    attendanceList.forEach(function(record){

        let row = table.insertRow();

        row.insertCell(0).innerHTML =
        record.studentName;

        row.insertCell(1).innerHTML =
        record.subject;

        row.insertCell(2).innerHTML =
        record.attendanceDate;

        row.insertCell(3).innerHTML =
        record.attendanceTime;

        row.insertCell(4).innerHTML =
        record.status;

        // Action Column
        let actionCell = row.insertCell(5);

        actionCell.innerHTML =
        `<button onclick="editAttendance(${record.id},
        '${record.status}')">
        ✏ Edit
        </button>`;

    });

})

.catch(error => {

    console.error(error);

});

// ---------------------------
// Edit Attendance
// ---------------------------

function editAttendance(id, currentStatus){

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

        alert("Please enter Present or Absent");

        return;

    }

    fetch("http://localhost:8080/attendance/" + id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            status:newStatus

        })

    })

    .then(response=>response.json())

    .then(data=>{

        alert("Attendance Updated Successfully");

        location.reload();

    })

    .catch(error=>{

        console.log(error);

        alert("Update Failed");

    });

}
