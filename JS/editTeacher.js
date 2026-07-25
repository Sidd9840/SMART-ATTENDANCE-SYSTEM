const id = new URLSearchParams(window.location.search).get("id");

document.addEventListener("DOMContentLoaded", function () {

    loadTeacher();

});

function loadTeacher() {

    fetch("http://localhost:8080/teachers/" + id)

    .then(response => response.json())

    .then(teacher => {

        document.getElementById("name").value =
        teacher.name;

        document.getElementById("employeeId").value =
        teacher.employeeId;

        document.getElementById("email").value =
        teacher.email;

        document.getElementById("password").value =
        teacher.password;

        document.getElementById("phone").value =
        teacher.phone;

        document.getElementById("department").value =
        teacher.department;

        document.getElementById("subject").value =
        teacher.subject;

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Load Teacher");

    });

}

function updateTeacher() {

    let teacher = {

        name:
        document.getElementById("name").value.trim(),

        employeeId:
        document.getElementById("employeeId").value.trim(),

        email:
        document.getElementById("email").value.trim(),

        password:
        document.getElementById("password").value,

        phone:
        document.getElementById("phone").value.trim(),

        department:
        document.getElementById("department").value.trim(),

        subject:
        document.getElementById("subject").value.trim()

    };

    fetch("http://localhost:8080/teachers/" + id, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(teacher)

    })

    .then(response => response.json())

    .then(data => {

        alert("Teacher Updated Successfully");

        window.location.href =
        "teacherList.html";

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Update Teacher");

    });

}
