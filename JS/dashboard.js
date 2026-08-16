let currentTeacher = null;

window.onload = function () {

    // Teacher Login Check using Backend Session

    fetch("https://smart-attendance-backend-production-8d08.up.railway.app/auth/me", {
        method: "GET",
        credentials: "include"
    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Authentication check failed");
        }

        return response.json();

    })

    .then(data => {

        if (!data.loggedIn || data.role !== "Teacher") {

            window.location.href = "login.html";
            return;

        }

        // Store only current user information in memory
        currentTeacher = data;

        loadDashboard();

    })

    .catch(error => {

        console.error("Authentication error:", error);

        window.location.href = "login.html";

    });

};


// ----------------------------
// Dashboard Data
// ----------------------------

function loadDashboard() {

    if (!currentTeacher) {
        return;
    }

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/dashboard?teacherId="
        + currentTeacher.id,
        {
            method: "GET",
            credentials: "include"
        }
    )

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

    if (!currentTeacher) {
        alert("Teacher session not found.");
        return;
    }

    let subject = prompt(
        "Enter Subject Name (Example: Java, C++, DBMS)"
    );

    if (subject == null || subject.trim() == "") {

        alert("Please Enter Subject");
        return;

    }

    let lecture = prompt(
        "Enter Lecture (Lecture 1 / Lecture 2 / Lecture 3 / Lecture 4)"
    );

    if (lecture == null || lecture.trim() == "") {

        alert("Please Enter Lecture");
        return;

    }

    let classType = prompt(
        "Enter Class Type (Theory / Lab)"
    );

    if (classType == null || classType.trim() == "") {

        alert("Please Enter Class Type");
        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            let attendanceSession = {

                teacherId: currentTeacher.id,

                subject: subject,

                lecture: lecture,

                classType: classType,

                teacherLatitude: position.coords.latitude,

                teacherLongitude: position.coords.longitude,

                allowedDistance: 50

            };

            fetch(
                "https://smart-attendance-backend-production-8d08.up.railway.app/attendance-session/start",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    credentials: "include",

                    body: JSON.stringify(attendanceSession)

                }
            )

            .then(response => {

                if (!response.ok) {

                    return response.text().then(msg => {
                        throw new Error(msg);
                    });

                }

                return response.json();

            })

            .then(data => {

                alert(
                    "Attendance Session Started Successfully"
                );

            })

            .catch(error => {

                console.log(error);

                alert(error.message);

            });

        },

        function() {

            alert("Please Allow Location Permission.");

        },

        {

            enableHighAccuracy: true,

            timeout: 5000,

            maximumAge: 0

        }

    );

}


// ----------------------------
// Close Attendance
// ----------------------------

function closeAttendance() {

    if (!currentTeacher) {
        alert("Teacher session not found.");
        return;
    }

    let subject = prompt("Enter Subject Name");

    if (subject == null || subject.trim() == "") {

        alert("Please Enter Subject");
        return;

    }

    let lecture = prompt(
        "Enter Lecture (Lecture 1 / Lecture 2 / Lecture 3 / Lecture 4)"
    );

    if (lecture == null || lecture.trim() == "") {

        alert("Please Enter Lecture");
        return;

    }

    let classType = prompt(
        "Enter Class Type (Theory / Lab)"
    );

    if (classType == null || classType.trim() == "") {

        alert("Please Enter Class Type");
        return;

    }

    let request = {

        teacherId: currentTeacher.id,

        subject: subject,

        lecture: lecture,

        classType: classType

    };

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/attendance-session/close",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            credentials: "include",

            body: JSON.stringify(request)

        }
    )

    .then(response => {

        if (!response.ok) {

            return response.text().then(msg => {
                throw new Error(msg);
            });

        }

        return response.json();

    })

    .then(data => {

        alert(
            "Attendance Session Closed Successfully"
        );

        loadDashboard();

    })

    .catch(error => {

        console.log(error);

        alert(error.message);

    });

}


// ----------------------------
// Logout
// ----------------------------

function logout() {

    fetch(
        "https://smart-attendance-backend-production-8d08.up.railway.app/auth/logout",
        {

            method: "POST",

            credentials: "include"

        }
    )

    .then(() => {

        window.location.href = "login.html";

    })

    .catch(error => {

        console.log(error);

        window.location.href = "login.html";

    });

}


// ----------------------------
// Home
// ----------------------------

function goHome() {

    window.location.href = "../index.html";

}
