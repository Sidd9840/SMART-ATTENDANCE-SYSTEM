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

    let teacher = JSON.parse(localStorage.getItem("teacher"));

    fetch("http://localhost:8080/dashboard?teacherId=" + teacher.id)

    .then(response => response.json())

    .then(data => {

        document.getElementById("totalStudents").innerHTML =
        data.totalStudents;

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

  let subject = prompt("Enter Subject Name (Example: Java, C++, DBMS)");

if (subject == null || subject.trim() == "") {

    alert("Please Enter Subject");

    return;

}

let lecture = prompt("Enter Lecture (Lecture 1 / Lecture 2 / Lecture 3 / Lecture 4)");

if (lecture == null || lecture.trim() == "") {

    alert("Please Enter Lecture");

    return;

}

let classType = prompt("Enter Class Type (Theory / Lab)");

if (classType == null || classType.trim() == "") {

    alert("Please Enter Class Type");

    return;

}
    let teacher = JSON.parse(localStorage.getItem("teacher"));
    navigator.geolocation.getCurrentPosition(

        function(position){

           let attendanceSession = {

    teacherId: teacher.id,

    subject: subject,

    lecture: lecture,

    classType: classType,

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
