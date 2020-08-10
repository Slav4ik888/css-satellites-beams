"use strict";

const mockMarkers = [

];

const GMAK = `AIzaSyDN2t-jztEv0j2u-Ep3Zw9B8y0hneXCl6s`;


const GOOGLE_MAP1 = `https://maps.googleapis.com/maps/api/js?key=${GMAK}&callback=initMap`;
const GOOGLE_MAP2 = `https://maps.googleapis.com/maps/api/js?key=${GMAK}`;

// Подключаемся к maps.googleapis.com
const init = () => {
  const script = document.createElement('script');
  script.src = GOOGLE_MAP1;
  document.getElementsByTagName('head')[0].appendChild(script);
}




function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 52.29778, lng: 104.29639 },
    // mapTypeId: 'terrain'
  });
  const geocoder = new google.maps.Geocoder();

  document.getElementById("submit").addEventListener("click", function() {
    geocodeAddress(geocoder, map);
  });
};


function geocodeAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      resultsMap.setCenter(results[0].geometry.location);
      const marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
};


init();


// SATBEAMS

const satUrl = `http://maps.satbeams.com/!ajax/displaymap?hsize=570&vsize=400&norad=27528&beam=3&lat=38&lng=0&marker_lat=38&marker_lng=0&zoom=2&minEIRP=42&levels=2&infowindow=1&direction=1&limits=1&marker=1&mapstyle=2&GMAK=${GMAK}>`

const getFromSatBeamsData = (url) => {
  return fetch(url)
    .then(response => {
      console.log('response: ', response);
      response.json()
      console.log('response.json(): ', response.json());
    })
    // .then(res => res.DATA777);
};

// getFromSatBeamsData();