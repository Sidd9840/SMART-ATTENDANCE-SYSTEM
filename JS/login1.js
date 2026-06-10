document.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    var username =
    document.getElementById("username").value;

    var password =
    document.getElementById("password").value;

    if(username === "teacher" &&
       password === "teacher@2026")
    {
        window.location.href = "dashboard.html";
    }
    else
    {
        alert("Invalid Username or Password");
    }

});
