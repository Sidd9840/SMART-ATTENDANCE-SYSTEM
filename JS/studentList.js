fetch(
    "https://smart-attendance-backend-production-8d08.up.railway.app/students",
    {
        method: "GET",
        credentials: "include"
    }
)
.then(response => response.json())
.then(students => {

    let table = document.getElementById("studentTable");

    students.forEach(function(student){

        let row = table.insertRow();

        row.insertCell(0).innerHTML = student.name;
        row.insertCell(1).innerHTML = student.rollNo;
        row.insertCell(2).innerHTML = student.course;
        row.insertCell(3).innerHTML = student.email;

       row.insertCell(4).innerHTML = `
<button onclick="editStudent(${student.id})">
Edit
</button>

<button onclick="deleteStudent(${student.id})">
Delete
</button>
`;
    });

})
.catch(error => {
    console.error(error);
});

function deleteStudent(id){

    if(confirm("Are you sure you want to delete this student?")){

     fetch(
    "https://smart-attendance-backend-production-8d08.up.railway.app/students/" + id,
    {
        method: "DELETE",
        credentials: "include"
    }
)

        .then(response => response.text())

        .then(message=>{

            alert(message);

            location.reload();

        })

        .catch(error=>{

            console.error(error);

        });

    }

}
document.getElementById("backBtn").addEventListener("click", function () {

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/auth/me",
        {
            method: "GET",
            credentials: "include"
        }
    )

    .then(response => response.json())

    .then(data => {

        if (!data.loggedIn) {

            window.location.href = "login.html";
            return;

        }

        if (data.role === "Admin") {

            window.location.href = "adminDashboard.html";

        }

        else if (data.role === "Teacher") {

            window.location.href = "dashboard.html";

        }

        else {

            window.location.href = "login.html";

        }

    })

    .catch(error => {

        console.log(error);

        window.location.href = "login.html";

    });

});
function editStudent(id){

    window.location.href =
    "editStudent.html?id=" + id;

}
