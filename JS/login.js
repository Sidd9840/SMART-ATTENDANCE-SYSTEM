function login(){

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value;

    let role =
    document.getElementById("role").value;

    if(email=="" || password=="" || role==""){

        alert("Please Fill All Fields");

        return;

    }

    let url="";

    if(role=="Admin"){

        url="http://localhost:8080/admin/login";

    }
    else if(role=="Teacher"){

        url="http://localhost:8080/teachers/login";

    }
    else{

        url="http://localhost:8080/students/login";

    }

    fetch(url,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            email:email,
            password:password

        })

    })

    .then(response=>response.json())

    .then(data=>{

        if(data==null || data.id==null){

            alert("Invalid Email or Password");

            return;

        }

        if(role=="Admin"){

            localStorage.setItem(
                "admin",
                JSON.stringify(data)
            );

            window.location.href=
            "adminDashboard.html";

        }

        else if(role=="Teacher"){

            localStorage.setItem(
                "teacher",
                JSON.stringify(data)
            );

            window.location.href=
            "dashboard.html";

        }

        else{

            localStorage.setItem(
                "student",
                JSON.stringify(data)
            );

            window.location.href=
            "studentDashboard.html";

        }

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to connect to server.");

    });

}
