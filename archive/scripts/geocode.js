
export function geocodeAddress(geocoder, resultsMap) {
  let marker;
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
      marker.addListener('click', () => marker.setMap(null)); 
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
};