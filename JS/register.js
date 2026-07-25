function continueRegister(){

    let name =
    document.getElementById("name").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value;

    let confirmPassword =
    document.getElementById("confirmPassword").value;

    let role =
    document.getElementById("role").value;

    if(name=="" ||
       email=="" ||
       password=="" ||
       confirmPassword=="" ||
       role==""){

        alert("Please Fill All Fields");

        return;

    }

    if(password!=confirmPassword){

        alert("Passwords Do Not Match");

        return;

    }

    localStorage.setItem(

        "registerData",

        JSON.stringify({

            name:name,

            email:email,

            password:password

        })

    );

    if(role=="Student"){

        window.location.href =
        "studentRegister.html";

    }

    else{

        window.location.href =
        "teacherRegister.html";

    }

}
