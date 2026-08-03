// -------------------------------------
// Load Current Campus Location
// -------------------------------------

window.onload = function(){

    fetch("http://localhost:8080/campus-location")

    .then(response => response.json())

    .then(data => {

        if(data != null){

            document.getElementById("campusName").value =
            data.campusName;

            document.getElementById("latitude").value =
            data.latitude;

            document.getElementById("longitude").value =
            data.longitude;

            document.getElementById("allowedDistance").value =
            data.allowedDistance;

        }

    })

    .catch(error => {

        console.log(error);

        alert("Unable to load campus location.");

    });

};

// -------------------------------------
// Save Campus Location
// -------------------------------------

function saveCampusLocation(){

    let campusLocation = {

        campusName:
        document.getElementById("campusName").value,

        latitude:
        parseFloat(document.getElementById("latitude").value),

        longitude:
        parseFloat(document.getElementById("longitude").value),

        allowedDistance:
        parseFloat(document.getElementById("allowedDistance").value)

    };

    fetch("http://localhost:8080/campus-location",{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(campusLocation)

    })

    .then(response => response.json())

    .then(data => {

        alert("Campus Location Updated Successfully.");

    })

    .catch(error => {

        console.log(error);

        alert("Unable to update campus location.");

    });

}

// -------------------------------------
// Back
// -------------------------------------

function goBack(){

    window.location.href = "adminDashboard.html";

}
