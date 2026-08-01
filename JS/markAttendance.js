// -------------------------------------
// College Location
// -------------------------------------

const collegeLat = 29.01188879453576;
const collegeLng = 77.68035790226565;
const allowedDistance = 25;

// -------------------------------------
// Logged In Student
// -------------------------------------

const student = JSON.parse(localStorage.getItem("student"));

if(student == null){

    alert("Please Login First");

    window.location.href = "studentLogin.html";

}

// -------------------------------------
// Show Student Details
// -------------------------------------

document.getElementById("studentName").innerHTML = student.name;
document.getElementById("rollNo").innerHTML = student.rollNo;
document.getElementById("course").innerHTML = student.course;

// -------------------------------------
// User Location
// -------------------------------------

let userLat = 0;
let userLng = 0;
let distance = 0;

const saveBtn = document.getElementById("saveBtn");

saveBtn.disabled = true;

// -------------------------------------
// Geo Location
// -------------------------------------

navigator.geolocation.getCurrentPosition(

function(position){

    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    console.log("Latitude :", userLat);
    console.log("Longitude:", userLng);
    distance = getDistance(

        userLat,
        userLng,
        collegeLat,
        collegeLng

    );

    document.getElementById("distance").innerHTML =
    Math.round(distance) + " Meter";

    if(distance <= allowedDistance){

        document.getElementById("locationStatus").innerHTML =
        "✅ Inside Campus";

        saveBtn.disabled = false;

    }
    else{

        document.getElementById("locationStatus").innerHTML =
        "❌ Outside Campus";

        alert("You are outside campus.");

    }

},

function(){

    document.getElementById("locationStatus").innerHTML =
    "Permission Denied";

    alert("Please Allow Location Permission.");

},

{

    enableHighAccuracy:false,

    timeout:5000,

    maximumAge:60000

}

);

// -------------------------------------
// Distance Formula
// -------------------------------------

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

        2 *

        Math.atan2(

            Math.sqrt(a),

            Math.sqrt(1-a)

        );

    return R*c;

}

// -------------------------------------
// Save Attendance
// -------------------------------------

function saveAttendance(){

    fetch("http://localhost:8080/attendance-session/current")

    .then(response=>{

        if(!response.ok){

            throw new Error("Teacher has not started attendance.");

        }

        return response.json();

    })

    .then(session=>{

        if(session==null){

            alert("Teacher has not started attendance.");

            return;

        }

        let attendance={

            studentId:student.id,

            studentName:student.name,

            subject:session.subject,

            status:"Present",

            latitude:userLat,

            longitude:userLng,

            distance:distance

        };

        return fetch("http://localhost:8080/attendance",{

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify(attendance)

        });

    })

   .then(response=>{

    if(!response) return;

    return response.text();

})

.then(message=>{

    if(!message) return;

    // Holiday
    if(message.includes("Holiday")){

        alert(message);
        return;

    }

    // Attendance Time Closed
    if(message.includes("first 15 minutes")){

        alert(message);
        return;

    }

    // Already Marked
    if(message.includes("already marked")){

        alert(message);
        return;

    }

    // Success
    alert("Attendance Marked Successfully");

    window.location.href="studentAttendance.html";

})

    .catch(error=>{

        console.log(error);

        alert(error.message);

    });

}

// -------------------------------------
// Back
// -------------------------------------

function goBack(){

    window.location.href="studentDashboard.html";

}
