const collegeLat = 28.6280;
const collegeLng = 77.3649;
const allowedDistance = 100;

let saveBtn = document.getElementById("saveBtn");
saveBtn.disabled = true;

navigator.geolocation.getCurrentPosition(
    function (position) {

        let userLat = position.coords.latitude;
        let userLng = position.coords.longitude;

        let distance = getDistance(
            userLat,
            userLng,
            collegeLat,
            collegeLng
        );

        if (distance <= allowedDistance) {
            saveBtn.disabled = false;
            alert("Inside College Campus");
        } else {
            alert("Outside College Campus");
        }
    },
    function () {
        alert("Location Permission Required");
    }
);

function getDistance(lat1, lon1, lat2, lon2) {

    let R = 6371000;

    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    let c = 2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
    );

    return R * c;
}
