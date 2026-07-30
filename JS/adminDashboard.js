window.onload = function(){

    // Check Admin Login

    let admin = localStorage.getItem("admin");

    if(admin == null){

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

    });

}

// ----------------------------
// Logout
// ----------------------------

function logout(){

    localStorage.removeItem("admin");

    window.location.href = "login.html";

}
function goHome(){

    window.location.href="../index.html";

}
