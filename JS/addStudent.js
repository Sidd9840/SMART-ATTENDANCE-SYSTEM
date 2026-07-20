document.getElementById("studentForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let student = {
        name: document.getElementById("studentName").value,
        roll: document.getElementById("roll").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value
    };

  fetch("http://localhost:8080/students", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(student)
})
.then(response => response.json())
.then(data => {
    alert("Student Added Successfully");

    document.getElementById("studentForm").reset();

    window.location.href = "studentList.html";
})
.catch(error => {
    console.error(error);
    alert("Error adding student");
});
