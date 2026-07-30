<script>

window.onload=function(){

    let admin=localStorage.getItem("admin");
    let teacher=localStorage.getItem("teacher");
    let student=localStorage.getItem("student");

    if(admin){

        document.getElementById("loginLink").style.display="none";
        document.getElementById("registerLink").style.display="none";

        document.getElementById("heroLogin").style.display="none";
        document.getElementById("heroRegister").style.display="none";

        document.getElementById("dashboardLink").style.display="inline";
        document.getElementById("logoutLink").style.display="inline";

        document.getElementById("dashboardLink").href="HTML/adminDashboard.html";
        document.getElementById("heroDashboard").style.display="inline";
        document.getElementById("heroDashboard").href="HTML/adminDashboard.html";

    }

    else if(teacher){

        document.getElementById("loginLink").style.display="none";
        document.getElementById("registerLink").style.display="none";

        document.getElementById("heroLogin").style.display="none";
        document.getElementById("heroRegister").style.display="none";

        document.getElementById("dashboardLink").style.display="inline";
        document.getElementById("logoutLink").style.display="inline";

        document.getElementById("dashboardLink").href="HTML/dashboard.html";
        document.getElementById("heroDashboard").style.display="inline";
        document.getElementById("heroDashboard").href="HTML/dashboard.html";

    }

    else if(student){

        document.getElementById("loginLink").style.display="none";
        document.getElementById("registerLink").style.display="none";

        document.getElementById("heroLogin").style.display="none";
        document.getElementById("heroRegister").style.display="none";

        document.getElementById("dashboardLink").style.display="inline";
        document.getElementById("logoutLink").style.display="inline";

        document.getElementById("dashboardLink").href="HTML/studentDashboard.html";
        document.getElementById("heroDashboard").style.display="inline";
        document.getElementById("heroDashboard").href="HTML/studentDashboard.html";

    }

}

function logout(){

    localStorage.removeItem("admin");
    localStorage.removeItem("teacher");
    localStorage.removeItem("student");

    window.location.reload();

}

</script>
