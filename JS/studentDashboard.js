document.addEventListener("DOMContentLoaded", function(){

    let student =
    JSON.parse(localStorage.getItem("student"));

    if(student == null){

        window.location.href =
        "studentLogin.html";

        return;

    }

    document.getElementById("studentName").innerText =
    student.name;

    document.getElementById("rollNo").innerText =
    student.rollNo;

    document.getElementById("course").innerText =
    student.course;

});
