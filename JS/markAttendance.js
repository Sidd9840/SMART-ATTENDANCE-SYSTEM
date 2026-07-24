// -------------------------------
// College Location (CDAC Noida)
// -------------------------------

const collegeLat = 28.6280;
const collegeLng = 77.3649;
const allowedDistance = 30;   // Better for classroom demo

let userLat = 0;
let userLng = 0;
let distance = 0;

let saveBtn = document.getElementById("saveBtn");
saveBtn.disabled = true;

// Logged In Student
let student =
JSON.parse(localStorage.getItem("student"));

if(student == null){

    alert("Please Login First");

    window.location.href="studentLogin.html";

}

// Show Student Details
document.getElementById("studentName").innerHTML =
student.name;

document.getElementById("rollNo").innerHTML =
student.rollNo;

document.getElementById("course").innerHTML =
student.course;

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

        document.getElementById("locationStatus")
        .innerHTML =
        "Inside Campus";

    }
    else{

        document.getElementById("locationStatus")
        .innerHTML =
        "Outside Campus";

        alert("Outside College Campus");

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

    let dLat =
    (lat2-lat1)*Math.PI/180;

    let dLon =
    (lon2-lon1)*Math.PI/180;

    let a =

    Math.sin(dLat/2)*
    Math.sin(dLat/2)

    +

    Math.cos(lat1*Math.PI/180)

    *

    Math.cos(lat2*Math.PI/180)

    *

    Math.sin(dLon/2)

    *

    Math.sin(dLon/2);

    let c=

    2*

    Math.atan2(

        Math.sqrt(a),

        Math.sqrt(1-a)

    );

    return R*c;

}

// -------------------------------
// Save Attendance
// -------------------------------

function saveAttendance(){

    let attendance={

        studentId:
        student.id,

        studentName:
        student.name,

        subject:
        student.course,

        status:
        "Present",

        latitude:
        userLat,

        longitude:
        userLng,

        distance:
        distance

    };

    fetch(

        "http://localhost:8080/attendance",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(attendance)

        }

    )

    .then(response=>response.json())

    .then(data=>{

        alert("Attendance Marked Successfully");

        window.location.href=
        "studentAttendance.html";

    })

    .catch(error=>{

        console.log(error);

        alert("Error");

    });

}
