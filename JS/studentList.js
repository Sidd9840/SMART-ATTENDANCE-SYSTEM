fetch("http://localhost:8080/students")
.then(response => response.json())
.then(students => {

    let table = document.getElementById("studentTable");

    students.forEach(function(student){

        let row = table.insertRow();

        row.insertCell(0).innerHTML = student.name;
        row.insertCell(1).innerHTML = student.rollNo;
        row.insertCell(2).innerHTML = student.course;
        row.insertCell(3).innerHTML = student.email;

        row.insertCell(4).innerHTML =
        `<button onclick="deleteStudent(${student.id})">
            Delete
        </button>`;

    });

})
.catch(error => {
    console.error(error);
});

function deleteStudent(id){

    if(confirm("Are you sure you want to delete this student?")){

        fetch("http://localhost:8080/students/" + id,{

            method:"DELETE"

        })

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
