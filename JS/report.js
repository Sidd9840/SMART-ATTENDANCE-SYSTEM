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

    });

})

.catch(error => {

    console.error(error);

});
