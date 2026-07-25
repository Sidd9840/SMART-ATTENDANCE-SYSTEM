function saveTeacher() {

    let name =
    document.getElementById("name").value.trim();

    let employeeId =
    document.getElementById("employeeId").value.trim();

    let email =
    document.getElementById("email").value.trim();

    let password =
    document.getElementById("password").value;

    let phone =
    document.getElementById("phone").value.trim();

    let department =
    document.getElementById("department").value.trim();

    let subject =
    document.getElementById("subject").value.trim();

    if(name=="" ||
       employeeId=="" ||
       email=="" ||
       password=="" ||
       phone=="" ||
       department=="" ||
       subject==""){

        alert("Please Fill All Fields");

        return;

    }

    fetch("http://localhost:8080/teachers",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            name:name,
            employeeId:employeeId,
            email:email,
            password:password,
            phone:phone,
            department:department,
            subject:subject

        })

    })

    .then(response=>response.json())

    .then(data=>{

        alert("Teacher Added Successfully");

        document.getElementById("name").value="";
        document.getElementById("employeeId").value="";
        document.getElementById("email").value="";
        document.getElementById("password").value="";
        document.getElementById("phone").value="";
        document.getElementById("department").value="";
        document.getElementById("subject").value="";

    })

    .catch(error=>{

        console.log(error);

        alert("Unable to Connect Server");

    });

}
