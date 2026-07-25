document.addEventListener("DOMContentLoaded", loadTeachers);

function loadTeachers(){

    fetch("http://localhost:8080/teachers")

    .then(response => response.json())

    .then(data => {

        let table = document.getElementById("teacherTable");

        table.innerHTML = "";

        data.forEach(function(teacher){

            table.innerHTML += `

            <tr>

                <td>${teacher.id}</td>

                <td>${teacher.name}</td>

                <td>${teacher.employeeId}</td>

                <td>${teacher.email}</td>

                <td>${teacher.phone}</td>

                <td>${teacher.department}</td>

                <td>${teacher.subject}</td>

                <td>

                    <button onclick="editTeacher(${teacher.id})">

                        Edit

                    </button>

                    <button onclick="deleteTeacher(${teacher.id})">

                        Delete

                    </button>

                </td>

            </tr>

            `;

        });

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Load Teachers");

    });

}

function deleteTeacher(id){

    if(confirm("Are you sure you want to delete this teacher?")){

        fetch("http://localhost:8080/teachers/" + id,{

            method:"DELETE"

        })

        .then(response => response.text())

        .then(data => {

            alert(data);

            loadTeachers();

        })

        .catch(error => {

            console.log(error);

            alert("Unable to Delete Teacher");

        });

    }

}

function editTeacher(id){

    window.location.href =
    "editTeacher.html?id=" + id;

}
