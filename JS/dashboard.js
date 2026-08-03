window.onload = function () {

    // Teacher Login Check
    let teacher = localStorage.getItem("teacher");

    if (teacher == null) {

        window.location.href = "login.html";
        return;

    }

    loadDashboard();

};

// ----------------------------
// Dashboard Data
// ----------------------------

function loadDashboard() {

    fetch("http://localhost:8080/dashboard")

    .then(response => response.json())

    .then(data => {

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

    .catch(error => {

        console.log(error);

    });

}

// ----------------------------
// Start Attendance
// ----------------------------

function startAttendance() {

    let subject = prompt("Enter Subject Name");

    if (subject == null || subject.trim() == "") {

        alert("Please Enter Subject");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position){

            let attendanceSession = {

                subject: subject,

                teacherLatitude: position.coords.latitude,

                teacherLongitude: position.coords.longitude,

                allowedDistance: 50

            };

            fetch("http://localhost:8080/attendance-session/start",{

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify(attendanceSession)

            })

            .then(response=>{

                if(!response.ok){

                    return response.text().then(msg=>{

                        throw new Error(msg);

                    });

                }

                return response.json();

            })

            .then(data=>{

                alert("Attendance Session Started Successfully");

            })

            .catch(error=>{

                console.log(error);

                alert(error.message);

            });

        },

        function(){

            alert("Please Allow Location Permission.");

        },

        {

            enableHighAccuracy:true,

            timeout:5000,

            maximumAge:0

        }

    );

}
// ----------------------------
// Close Attendance
// ----------------------------

function closeAttendance() {

    fetch(

        "http://localhost:8080/attendance-session/close",

        {

            method: "POST"

        }

    )

    .then(response => response.json())

    .then(data => {

        alert("Attendance Session Closed Successfully");

    })

    .catch(error => {

        console.log(error);

        alert("Unable to Close Attendance");

    });

}

// ----------------------------
// Logout
// ----------------------------

function logout() {

    localStorage.removeItem("teacher");

    window.location.href = "login.html";

}
function goHome(){

    window.location.href = "../index.html";

}
