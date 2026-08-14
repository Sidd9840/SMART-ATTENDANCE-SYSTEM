// -------------------------------------
// College Location
// -------------------------------------

let collegeLat = 0;
let collegeLng = 0;
let allowedDistance = 0;

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

saveBtn.disabled = false;

// -------------------------------------
// Geo Location
// -------------------------------------
function getUserLocation(){
navigator.geolocation.getCurrentPosition(

function(position){

    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    console.log("Latitude :", userLat);
    console.log("Longitude:", userLng);

    document.getElementById("locationStatus").innerHTML =
    "✅ Location Found";
},

function(){

    document.getElementById("locationStatus").innerHTML =
    "Permission Denied";

    alert("Please Allow Location Permission.");

},

{

    enableHighAccuracy:true,

    timeout:5000,

    maximumAge:0

}

);
}
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
    if(userLat == 0 || userLng == 0){

    alert("Location is not ready. Please wait a few seconds.");

    return;

}
  let teacherId = parseInt(document.getElementById("teacherId").value);

let subject = document.getElementById("subject").value;

let lecture = document.getElementById("lecture").value;

let classType = document.getElementById("classType").value;

if(teacherId==""){

    alert("Please Select Teacher");

    return;

}

if(subject==""){

    alert("Please Select Subject");

    return;

}

if(lecture==""){

    alert("Please Select Lecture");

    return;

}

if(classType==""){

    alert("Please Select Class Type");

    return;

}

   
fetch(
"https://smart-attendance-backend-production-8d08.up.railway.app/attendance-session/current?teacherId="

+ teacherId +

"&subject=" + encodeURIComponent(subject) +

"&lecture=" + encodeURIComponent(lecture) +

"&classType=" + encodeURIComponent(classType)

)

.then(async response => {

    if (!response.ok) {

        throw new Error("Teacher has not started attendance.");

    }

    const text = await response.text();

    if (text == "" || text == "null") {

        alert("Teacher has not started attendance.");

        return null;

    }

    return JSON.parse(text);

})

    .then(session=>{

        if(session==null){

            alert("Teacher has not started attendance.");

            return;

        }
console.log("Session =", session);

console.log("Student Latitude =", userLat);
console.log("Student Longitude =", userLng);

console.log("Teacher Latitude =", session.teacherLatitude);
console.log("Teacher Longitude =", session.teacherLongitude);

console.log("Allowed Distance =", session.allowedDistance);
        
// -------------------------------------
// Get Geo-Fence Settings
// -------------------------------------

collegeLat = Number(session.teacherLatitude);
collegeLng = Number(session.teacherLongitude);
allowedDistance = Number(session.allowedDistance);

// Validate geo-fence data
if (
    !Number.isFinite(collegeLat) ||
    !Number.isFinite(collegeLng) ||
    !Number.isFinite(allowedDistance) ||
    allowedDistance <= 0
) {
    alert("Invalid geo-fence settings.");
    return;
}

// Calculate distance
distance = getDistance(
    userLat,
    userLng,
    collegeLat,
    collegeLng
);

console.log("Student Latitude =", userLat);
console.log("Student Longitude =", userLng);
console.log("Center Latitude =", collegeLat);
console.log("Center Longitude =", collegeLng);
console.log("Distance =", distance);
console.log("Allowed Distance =", allowedDistance);

// Show distance
document.getElementById("distance").innerHTML =
    Math.round(distance) + " Meter";

// -------------------------------------
// Geo-Fence Validation
// -------------------------------------

if (distance > allowedDistance) {

    alert(
        "Attendance cannot be marked.\n" +
        "Allowed distance: " + allowedDistance + " meters\n" +
        "Your distance: " + Math.round(distance) + " meters"
    );

    return;
}

console.log("Inside geo-fence. Attendance allowed.");

       let attendance = {

    studentId: student.id,

    teacherId: session.teacherId,

    studentName: student.name,

    subject: session.subject,

    lecture: lecture,

    classType: classType,

    status: "Present",

    latitude: userLat,

    longitude: userLng,

    distance: distance

};
       return fetch("https://smart-attendance-backend-production-8d08.up.railway.app/attendance",{

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
function loadTeachers(){

   fetch("https://smart-attendance-backend-production-8d08.up.railway.app/teachers")

    .then(response => response.json())

    .then(data => {

        let teacher = document.getElementById("teacherId");

        teacher.innerHTML =
        "<option value=''>Select Teacher</option>";

        data.forEach(t => {

            teacher.innerHTML +=

"<option value='" + t.id +

"' data-subject='" + t.subject + "'>"

+ t.name +

"</option>";

        });

    })

    .catch(error => {

        console.log(error);

    });

}
function loadTeacherSubject() {

    let teacher = document.getElementById("teacherId");

    let subject = document.getElementById("subject");

    let selected = teacher.options[teacher.selectedIndex];

    let teacherSubject = selected.getAttribute("data-subject");

    subject.innerHTML = "<option value=''>Select Subject</option>";

    if (teacherSubject != null) {

        subject.innerHTML +=

        "<option value='" + teacherSubject + "'>" +

        teacherSubject +

        "</option>";

    }

}
window.onload = function(){

    getUserLocation();
    loadTeachers();

}
