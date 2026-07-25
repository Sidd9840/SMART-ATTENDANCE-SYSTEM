document.addEventListener("DOMContentLoaded", function(){

    fetch("http://localhost:8080/dashboard")

    .then(response=>response.json())

    .then(data=>{

        document.getElementById("totalStudents").innerHTML =
        data.totalStudents;

        document.getElementById("totalTeachers").innerHTML =
        data.totalTeachers;

        // Subject module baad me banega
        document.getElementById("totalSubjects").innerHTML =
        0;

    });

});
