let students =
JSON.parse(localStorage.getItem("students")) || [];

let table =
document.getElementById("studentTable");

students.forEach(function(student){

    let row = table.insertRow();

    row.insertCell(0).innerHTML = student.name;
    row.insertCell(1).innerHTML = student.roll;
    row.insertCell(2).innerHTML = student.course;
    row.insertCell(3).innerHTML = student.email;

});
