document.getElementById("studentForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    let student = {
        name: document.getElementById("studentName").value,
        roll: document.getElementById("roll").value,
        course: document.getElementById("course").value,
        email: document.getElementById("email").value
    };

    let students =
    JSON.parse(localStorage.getItem("students")) || [];

    students.push(student);

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added Successfully");

    document.getElementById("studentForm").reset();

});
