// Logged In Student
let student = JSON.parse(localStorage.getItem("student"));

if(student == null){

    alert("Please Login First");

    window.location.href="studentLogin.html";

}

// Load Student Attendance

fetch("http://localhost:8080/attendance/student/" + student.id)

.then(response => response.json())

.then(data=>{

    let table =
    document.getElementById("attendanceTable");

    data.forEach(function(record){

        let row =
        table.insertRow();

        row.insertCell(0).innerHTML =
        record.attendanceDate;

        row.insertCell(1).innerHTML =
        record.subject;

        row.insertCell(2).innerHTML =
        record.status;

    });

})

.catch(error=>{

    console.log(error);

    alert("Unable to Load Attendance");

});
