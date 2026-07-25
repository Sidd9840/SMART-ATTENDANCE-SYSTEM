const studentId =
new URLSearchParams(window.location.search).get("id");

fetch("http://localhost:8080/students/" + studentId)

.then(response => response.json())

.then(student => {

    document.getElementById("studentName").value =
    student.name;

    document.getElementById("rollNo").value =
    student.rollNo;

    document.getElementById("course").value =
    student.course;

    document.getElementById("email").value =
    student.email;

    document.getElementById("password").value =
    student.password;

});

document.getElementById("editStudentForm")
.addEventListener("submit",function(e){

e.preventDefault();

let student={

    name:
    document.getElementById("studentName").value,

    rollNo:
    document.getElementById("rollNo").value,

    course:
    document.getElementById("course").value,

    email:
    document.getElementById("email").value,

    password:
    document.getElementById("password").value

};

fetch(

"http://localhost:8080/students/"+studentId,

{

method:"PUT",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify(student)

}

)

.then(response=>response.json())

.then(data=>{

alert("Student Updated Successfully");

window.location.href="studentList.html";

})

.catch(error=>{

console.log(error);

});

});

function goBack(){

    if(localStorage.getItem("admin")){

        window.location.href="adminDashboard.html";

    }

    else{

        window.location.href="dashboard.html";

    }

}
