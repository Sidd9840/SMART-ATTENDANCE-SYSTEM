window.onload = function () {

    loadCampus();

};

// -----------------------------
// Load Campus
// -----------------------------
function loadCampus() {

    fetch("http://localhost:8080/campus")

    .then(response => response.json())

    .then(data => {

        if(data == null){

            return;

        }

        document.getElementById("campusName").value =
        "CDAC Noida";

        document.getElementById("latitude").value =
        "28.6289";

        document.getElementById("longitude").value =
        "77.3648";

        document.getElementById("allowedDistance").value =
        "300";

    })

    .catch(error => {

        console.log(error);

    });

}

// -----------------------------
// Save Campus
// -----------------------------
function saveCampus() {

    let campus = {

        campusName:
        document.getElementById("campusName").value,

        latitude:
        document.getElementById("latitude").value,

        longitude:
        document.getElementById("longitude").value,

        allowedDistance:
        document.getElementById("allowedDistance").value

    };

    fetch("http://localhost:8080/campus", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(campus)

    })

    .then(response => response.json())

    .then(data => {

        alert("Campus Saved Successfully");

    })

    .catch(error => {

        console.log(error);

    });

}

// -----------------------------
// Update Campus
// -----------------------------
function updateCampus() {

    let campus = {

        id:1,

        campusName:
        document.getElementById("campusName").value,

        latitude:
        document.getElementById("latitude").value,

        longitude:
        document.getElementById("longitude").value,

        allowedDistance:
        document.getElementById("allowedDistance").value

    };

    fetch("http://localhost:8080/campus", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(campus)

    })

    .then(response => response.json())

    .then(data => {

        alert("Campus Updated Successfully");

    })

    .catch(error => {

        console.log(error);

    });

}
