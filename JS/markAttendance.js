// -------------------------------
// College Location (CDAC Noida)
// -------------------------------

const collegeLat = 28.6280;
const collegeLng = 77.3649;
const allowedDistance = 100;

// User Location
let userLat = 0;
let userLng = 0;
let distance = 0;

// Save Attendance Button
let saveBtn = document.getElementById("saveBtn");
saveBtn.disabled = true;

// -------------------------------
// Geo Location
// -------------------------------

navigator.geolocation.getCurrentPosition(

    function(position){

        userLat = position.coords.latitude;
        userLng = position.coords.longitude;

        distance = getDistance(
            userLat,
            userLng,
            collegeLat,
            collegeLng
        );

        if(distance <= allowedDistance){

            saveBtn.disabled = false;

            alert("Inside College Campus. Attendance Allowed.");

        }
        else{

            alert("Outside College Campus. Attendance Denied.");

        }

    },

    function(){

        alert("Location Permission Required");

    }

);

// -------------------------------
// Distance Formula
// -------------------------------

function getDistance(lat1, lon1, lat2, lon2){

    let R = 6371000;

    let dLat = (lat2-lat1) * Math.PI/180;
    let dLon = (lon2-lon1) * Math.PI/180;

    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2)
        +
        Math.cos(lat1*Math.PI/180)
        *
        Math.cos(lat2*Math.PI/180)
        *
        Math.sin(dLon/2)
        *
        Math.sin(dLon/2);

    let c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1-a)
        );

    return R*c;

}

// -------------------------------
// Student List
// -------------------------------

let students = [];

fetch("http://localhost:8080/students")

.then(response => response.json())

.then(data=>{

    students = data;

    let table =
    document.getElementById("attendanceTable");

    data.forEach(function(student){

        let row =
        table.insertRow();

        row.insertCell(0).innerHTML =
        student.name;

        row.insertCell(1).innerHTML =
        student.rollNo;

        let cell =
        row.insertCell(2);

        cell.innerHTML =
        `<input
            type="checkbox"
            checked
            id="${student.id}">
        `;

    });

});

// -------------------------------
// Save Attendance
// -------------------------------

function saveAttendance(){

    let teacher =
    JSON.parse(localStorage.getItem("teacher"));

    Promise.all(

        students.map(student=>{

            let present =
            document.getElementById(student.id).checked;

            let attendance={

                studentId:student.id,

                teacherId:teacher.id,

                studentName:student.name,

                subject:teacher.subject,

                status:
                present ? "Present":"Absent",

                latitude:userLat,

                longitude:userLng,

                distance:distance

            };

            return fetch(

                "http://localhost:8080/attendance",

                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json"

                    },

                    body:JSON.stringify(attendance)

                }

            );

        })

    )

    .then(()=>{

        alert("Attendance Saved Successfully");

        window.location.href="report.html";

    })

    .catch(error=>{

        console.log(error);

        alert("Error Saving Attendance");

    });

}
