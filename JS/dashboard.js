document.addEventListener("DOMContentLoaded", function () {

    // Dashboard Data
    fetch("http://localhost:8080/dashboard")
    .then(response => response.json())
    .then(data => {

        document.getElementById("totalStudents").innerText =
        data.totalStudents;

        document.getElementById("totalTeachers").innerText =
        data.totalTeachers;

        document.getElementById("totalAttendance").innerText =
        data.totalAttendance;

        document.getElementById("present").innerText =
        data.present;

        document.getElementById("absent").innerText =
        data.absent;

    })
    .catch(error => {

        console.log(error);

    });

    // Logout
    const logoutBtn =
    document.querySelector('a[href="../index.html"]');

    logoutBtn.addEventListener("click", function (e) {

        let confirmLogout =
        confirm("Are you sure you want to logout?");

        if (!confirmLogout) {

            e.preventDefault();

        }

        localStorage.removeItem("teacher");

    });

});

// --------------------------------------
// Start Attendance Session
// --------------------------------------

function startAttendance(){

    let subject =
    prompt("Enter Subject Name");

    if(subject == null || subject.trim() == ""){

        return;

    }

    fetch(
        "http://localhost:8080/attendance-session/start?subject="
        + encodeURIComponent(subject),
        {
            method:"POST"
        }
    )

    .then(response=>response.json())

    .then(data=>{

        alert("Attendance Session Started");

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to Start Attendance");

    });

}

// --------------------------------------
// Close Attendance Session
// --------------------------------------

function closeAttendance(){

    let confirmClose =
    confirm("Close Attendance Session?");

    if(!confirmClose){

        return;

    }

    fetch(
        "http://localhost:8080/attendance-session/close",
        {
            method:"POST"
        }
    )

    .then(response=>response.json())

    .then(data=>{

        alert("Attendance Session Closed");

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to Close Attendance");

    });

}
