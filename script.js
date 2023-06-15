function calculateDistance(e) {
    e.preventDefault();

    let location1Input = document.getElementById('location1').value;
    let location2Input = document.getElementById('location2').value;

    // Call an API or use a library to convert the location inputs into latitude and longitude coordinates.
    // For example, you can use the Google Geocoding API or a geocoding library like OpenCageData or Nominatim.
    // Refer to the documentation of your chosen provider for instructions on how to do this.

    let encodedAddress1 = encodeURIComponent(location1Input);
    let encodedAddress2 = encodeURIComponent(location2Input);

    let apiKey = "AIzaSyAED2cZlyb4qUJRzLW7Du7OG71uQsCTlB0"; //GOOGLE MAPS API; created my own and need to modify so it will work????

// API URL
    let apiUrl1 = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddress1 + "&key=" + apiKey;
    let apiUrl2 = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodedAddress2 + "&key=" + apiKey;

    let latitude1;
    let longitude1;
    let latitude2;
    let longitude2;

// FETCH API
    let promise1 = fetch(apiUrl1)
        .then(function(response){
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(data){
            if (data.status === "OK" && data.results.length > 0) {
                let location1 = data.results[0].geometry.location;
                latitude1 = location1.lat;
                longitude1 = location1.lng;

                console.log("Latitude1:", latitude1);
                console.log("Longitude1:", longitude1);
            } else {
                console.log("No results found.");
            }
        })
        .catch(function(error){
            console.log("Error:", error.message);
        });

    let promise2 = fetch(apiUrl2)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Network response was not ok.");
        })
        .then(function(data) {
            if (data.status === "OK" && data.results.length > 0) {
                let location2 = data.results[0].geometry.location;
                latitude2 = location2.lat;
                longitude2 = location2.lng;

                console.log("Latitude2:", latitude2);
                console.log("Longitude2:", longitude2);
            } else {
                console.log("No results found.");
            }
        })
        .catch(function(error){
            console.log("Error:", error.message);
        });

    Promise.all([promise1, promise2])
        .then(function(){
            let distance = calculateDistance(latitude1, longitude1, latitude2, longitude2);
            displayResult(distance);
        });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Use the Haversine formula to calculate the distance between two points.

    let R = 3958; // Radius of the Earth in miles
    let dLat = degToRad(lat2 - lat1);
    let dLon = degToRad(lon2 - lon1);

    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    let distance = R * c; // Distance in miles
    return distance;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function displayResult(distance) {
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = 'Distance: ' + distance.toFixed(2) + ' miles';
}

let distanceForm = document.getElementById('distanceForm');
distanceForm.addEventListener('submit', calculateDistance);