function login(){

    let role =
    document.getElementById("role").value;

    if(role==""){

        alert("Please Select Role");

        return;

    }

    if(role=="Student"){

        window.location.href =
        "studentLogin.html";

    }

    else{

        window.location.href =
        "teacherLogin.html";

    }

}
