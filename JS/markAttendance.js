function saveAttendance() {

    fetch("http://localhost:8080/attendance-session/current")

    .then(response => response.text())

    .then(data => {

        if (data === "No Attendance Session Started") {

            alert("Teacher has not started attendance.");

            return;

        }

        let session = JSON.parse(data);

        let attendance = {

            studentId: student.id,

            studentName: student.name,

            subject: session.subject,

            status: "Present",

            latitude: userLat,

            longitude: userLng,

            distance: distance

        };

        fetch("http://localhost:8080/attendance", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(attendance)

        })

        .then(response => response.text())

        .then(message => {

            if (message.includes("Attendance already marked")) {

                alert(message);

                return;

            }

            if (message.includes("Holiday")) {

                alert(message);

                return;

            }

            alert("Attendance Marked Successfully");

            window.location.href =
            "studentAttendance.html";

        });

    })

    .catch(error => {

        console.log(error);

        alert("Unable to connect server.");

    });

}
