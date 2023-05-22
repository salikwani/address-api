var lat;
var long;

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}
  
function getPosition(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat,long);
}

function timeZone() {
    var requestOptions = {
        method: 'GET',
      };
      
      fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=a9212495cb8b43b6ab6eb2d331dd1a11`, requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result.features[0].properties);
            document.getElementById("tz-details").innerHTML = `<p>Name of Time Zone: ${result.features[0].properties.timezone.name}</p>
                                                                <p>Lat: ${result.features[0].properties.lat}</p>
                                                                <p>Long: ${result.features[0].properties.lon}</p>
                                                                <p>Offset STD: ${result.features[0].properties.timezone.offset_STD}</p>
                                                                <p>Offset STD Seconds: ${result.features[0].properties.timezone.offset_STD_seconds}</p>
                                                                <p>Offset DST: ${result.features[0].properties.timezone.offset_DST}</p>
                                                                <p>Offset DST Seconds: ${result.features[0].properties.timezone.offset_DST_seconds}</p>
                                                                <p>Country: ${result.features[0].properties.country}</p>
                                                                <p>Postcode: ${result.features[0].properties.postcode}</p>
                                                                <p>City: ${result.features[0].properties.city}</p> `;
        })
        .catch(error => console.log('error', error));
}

getLocation();

setTimeout(() => {
    timeZone();
},3000);

function getDetails(e) {
    var str = document.querySelector("input").value.trim();
    var arr = str.split(" ");
    str = arr.join("%20");
    arr = str.split(",");
    str = arr.join("%2C");
    document.getElementById("add").style.display = "flex";
    if(str.length == 0) {
        document.getElementById("add").innerHTML = "Please enter a valid address";
    } else {
        fetch(`https://api.geoapify.com/v1/geocode/search?text=${str}&apiKey=a9212495cb8b43b6ab6eb2d331dd1a11`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            document.getElementById("add").innerHTML = `<h1>Your Result</h1>
                                                        <p>Name of Time Zone: ${result.features[0].properties.timezone.name}</p>
                                                        <p>Lat: ${result.features[0].properties.lat}</p>
                                                        <p>Long: ${result.features[0].properties.lon}</p>
                                                        <p>Offset STD: ${result.features[0].properties.timezone.offset_STD}</p>
                                                        <p>Offset STD Seconds: ${result.features[0].properties.timezone.offset_STD_seconds}</p>
                                                        <p>Offset DST: ${result.features[0].properties.timezone.offset_DST}</p>
                                                        <p>Offset DST Seconds: ${result.features[0].properties.timezone.offset_DST_seconds}</p>
                                                        <p>Country: ${result.features[0].properties.country}</p>
                                                        <p>Postcode: ${result.features[0].properties.postcode}</p>
                                                        <p>City: ${result.features[0].properties.city}</p>`;
        })
        .catch(error => console.log('error', error));
    }
}
