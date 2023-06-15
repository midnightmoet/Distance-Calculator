function degree2Radius(degree) {
    return degree * (Math.PI / 180);
  }
  
  function getDistanceFromLatLonInKm() {
    let latitude1, longitude1, latitude2, longitude2;
  
    const getValues = () => {
      let aCoordinates = document.getElementById("a").value;
      let bCoordinates = document.getElementById("b").value;
  
      let aCoordArray = aCoordinates.replace(/\s/g, "").split(",");
      let bCoordArray = bCoordinates.replace(/\s/g, "").split(",");
  
      latitude1 = aCoordArray[0];
      longitude1 = aCoordArray[1];
      latitude2 = bCoordArray[0];
      longitude2 = bCoordArray[1];
    };
  
    getValues();
  
    console.log(latitude1, longitude1, latitude2, longitude2);
  
    let R = 6371; // Earth's radius in km
    let dLat = degree2Radius(latitude2 - latitude1); // deg2rad below
    let dLon = degree2Radius(longitude2 - longitude1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degree2Radius(latitude1)) *
        Math.cos(degree2Radius(latitude2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = (R * c).toFixed(2); // Distance in km
  
    if (d === "NaN"){
      alert('Coordinates are not valid. Please try again.')
      document.getElementById("result").innerHTML = '';
      return;
    }
  
    document.getElementById("result").innerHTML = `Distance: ${d}km`;
  }
  
  
  
  document.addEventListener("DOMContentLoaded", (e) => {
    document.getElementById("fTwo").addEventListener("submit",  (e) => {
      e.preventDefault(); 
      getDistanceFromLatLonInKm();
    });
  });
  
  document.addEventListener("DOMContentLoaded",( e )=> {
    document.getElementById("fOne").addEventListener("submit", function (e) {
      e.preventDefault(); 
      let address = document.getElementById("address").value;
      console.log(address);
      getAddress(address);
    });
  });
  
  
  
  const getAddress = async (address) => {
  
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == 'OK') {
        let latitude = results[0].geometry.location.lat();
        let longitude = results[0].geometry.location.lng();
        console.log(latitude, longitude)
        document.getElementById("latlon").innerHTML=`(latitude, longitude) = (${latitude}, ${longitude})`;
  
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        document.getElementById("latlon").innerHTML='';
      }
    })};
    
  function initMap() {};