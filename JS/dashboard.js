window.onload = function(){

    // Teacher Login Check

    let teacher = localStorage.getItem("teacher");

    if(teacher == null){

        window.location.href = "login.html";

        return;

    }

    loadDashboard();

};

// ----------------------------
// Dashboard Data
// ----------------------------

function loadDashboard(){

    fetch("http://localhost:8080/dashboard")

    .then(response=>response.json())

    .then(data=>{

        document.getElementById("totalStudents").innerHTML =
        data.totalStudents;

        document.getElementById("totalTeachers").innerHTML =
        data.totalTeachers;

        document.getElementById("totalAttendance").innerHTML =
        data.totalAttendance;

        document.getElementById("present").innerHTML =
        data.present;

        document.getElementById("absent").innerHTML =
        data.absent;

    })

    .catch(error=>{

        console.log(error);

    });

}

// ----------------------------
// Start Attendance
// ----------------------------

function startAttendance(){

    window.location.href =
    "markAttendance.html";

}

// ----------------------------
// Close Attendance
// ----------------------------

function closeAttendance(){

    alert("Attendance Session Closed");

}

// ----------------------------
// Logout
// ----------------------------

function logout(){

    localStorage.removeItem("teacher");

    window.location.href =
    "login.html";

}
