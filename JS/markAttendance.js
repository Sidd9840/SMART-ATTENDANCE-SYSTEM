// -------------------------------------
// College Location (CDAC Noida)
// -------------------------------------

const collegeLat = 28.6280;
const collegeLng = 77.3649;
const allowedDistance = 30;

// User Location
let userLat = 0;
let userLng = 0;
let distance = 0;

// Save Button
const saveBtn = document.getElementById("saveBtn");
saveBtn.disabled = true;

// Logged In Student
const student = JSON.parse(localStorage.getItem("student"));

if (!student) {

    alert("Please Login First");

    window.location.href = "studentLogin.html";

}

// Show Student Details
document.getElementById("studentName").innerHTML = student.name;
document.getElementById("rollNo").innerHTML = student.rollNo;
document.getElementById("course").innerHTML = student.course;

// -------------------------------------
// Geo Location
// -------------------------------------

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

        document.getElementById("locationStatus").innerHTML =
        "✅ Inside Campus";

    }
    else{

        document.getElementById("locationStatus").innerHTML =
        "❌ Outside Campus";

        alert("You are outside the allowed campus area.");

    }

},

function(error){

    document.getElementById("locationStatus").innerHTML =
    "Location Permission Denied";

    alert("Please allow location permission.");

}

);

// -------------------------------------
// Distance Formula (Haversine)
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

    return R * c;

}

// -------------------------------------
// Save Attendance
// -------------------------------------

function saveAttendance(){

    const attendance = {

        studentId: student.id,

        studentName: student.name,

        subject: "Java",      // Change later if you add subject selection

        status: "Present",

        latitude: userLat,

        longitude: userLng,

        distance: distance

    };

    fetch("http://localhost:8080/attendance",{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(attendance)

    })

    .then(async response => {

        const data = await response.text();

        if(response.ok){

            if(data.includes("Attendance already marked")){

                alert(data);

            }
            else{

                alert("Attendance Marked Successfully");

                window.location.href = "studentAttendance.html";

            }

        }
        else{

            alert(data);

        }

    })

    .catch(error=>{

        console.error(error);

        alert("Unable to connect to server.");

    });

}
