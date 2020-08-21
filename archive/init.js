/* eslint-disable no-undef */
// import {geocodeAddress} from './scripts/geocode.js';

const GMAK = `AIzaSyDN2t-jztEv0j2u-Ep3Zw9B8y0hneXCl6s`;

const GOOGLE_MAP1 = `https://maps.googleapis.com/maps/api/js?key=${GMAK}&callback=initMap&libraries=&v=weekly`;
// const GOOGLE_MAP2 = `https://maps.googleapis.com/maps/api/js?key=${GMAK}`;

const Beam1 = [{lat: 35.731, lng: 32.15}, {lat: 36.112, lng: 31.415}, {lat: 35.869, lng: 30.717}, {lat: 35.736, lng: 30.497}, {lat: 35.345, lng: 30.038}, {lat: 35.208, lng: 29.792}, {lat: 34.904, lng: 29.362}, {lat: 34.89, lng: 28.675}, {lat: 34.975, lng: 28.143}, {lat: 34.997, lng: 27.989}, {lat: 35.089, lng: 27.31}, {lat: 35.12, lng: 26.639}, {lat: 35.026, lng: 25.98}, {lat: 34.931, lng: 25.766}, {lat: 34.62, lng: 25.338}, {lat: 34.372, lng: 25.153}, {lat: 33.721, lng: 24.865}, {lat: 33.232, lng: 24.739}, {lat: 33.03, lng: 24.706}, {lat: 32.308, lng: 24.636}, {lat: 31.569, lng: 24.60000000000001}, {lat: 30.813, lng: 24.593}, {lat: 30.037, lng: 24.62}, {lat: 29.237, lng: 24.69000000000001}, {lat: 28.405, lng: 24.818}, {lat: 27.68700000000001, lng: 24.979}, {lat: 27.517, lng: 25.058}, {lat: 26.639, lng: 25.69}, {lat: 26.666, lng: 26.355}, {lat: 26.897, lng: 26.66}, {lat: 27.113, lng: 27.004}, {lat: 27.471, lng: 27.28}, {lat: 27.959, lng: 27.638}, {lat: 28.117, lng: 27.715}, {lat: 28.819, lng: 28}, {lat: 29.488, lng: 28.243}, {lat: 29.527, lng: 28.254}, {lat: 30.258, lng: 28.438}, {lat: 30.978, lng: 28.634}, {lat: 31.581, lng: 28.826}, {lat: 31.682, lng: 28.861}, {lat: 32.372, lng: 29.115}, {lat: 32.993, lng: 29.45}, {lat: 33.02, lng: 29.476}, {lat: 33.537, lng: 30.121}, {lat: 33.547, lng: 30.179}, {lat: 33.68, lng: 30.818}, {lat: 33.702, lng: 31.528}, {lat: 33.76, lng: 31.749}, {lat: 34.076, lng: 32.23}, {lat: 34.31, lng: 32.391}, {lat: 35.078, lng: 32.433}, {lat: 35.731, lng: 32.15}];

// ****************************************************************

let map; let poly; let marker; let marker1; let marker2; let infoWindow;

// const image = `https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png`;

const mockMarkers = [
  {coords: {lat: 53.59778, lng: 103.29639}}, // Иркутск
  {coords: {lat: 45.057262325083286, lng: 42.119089426091804}}, // Надежда
  {coords: {lat: 25.774, lng: -80.190}},
];

// Define the LatLng coordinates for the polygon's path.
// const triangleCoords = [
//   {lat: 25.774, lng: -80.190},
//   {lat: 18.466, lng: -66.118},
//   {lat: 32.321, lng: -64.757},
//   {lat: 25.774, lng: -80.190},
// ];

const outerCoords = [
  {lat: 25.774, lng: -80.190},
  {lat: 18.466, lng: -66.118},
  {lat: 32.321, lng: -64.757},
];

// Define the LatLng coordinates for the polygon's inner path.
// Note that the points forming the inner path are wound in the
// opposite direction to those in the outer path, to form the hole.
const innerCoords = [
  {lat: 28.745, lng: -70.579},
  {lat: 29.570, lng: -67.514},
  {lat: 27.339, lng: -66.668}
];

const beaches = [
  [`Bondi Beach`, -33.890542, 151.274856, 4],
  [`Coogee Beach`, -33.923036, 151.259052, 5],
  [`Cronulla Beach`, -34.028249, 151.157507, 3],
  [`Manly Beach`, -33.80010128657071, 151.28747820854187, 2],
  [`Maroubra Beach`, -33.950198, 151.259302, 1]
];

// ****************************************************************
// ****************************************************************
// ****************************************************************


// Подключаемся к maps.googleapis.com
const init = () => {
  const script = document.createElement(`script`);
  script.src = GOOGLE_MAP1;
  script.defer = true;
  document.getElementsByTagName(`head`)[0].appendChild(script);
};


function initMap() {
  map = new google.maps.Map(document.getElementById(`map`), {
    zoom: 5,
    // center: { lat: 52.29778, lng: 104.29639 },
    center: {lat: 35.731, lng: 32.15},
    // center: {lat: -33.890542, lng: 151.274856},
    mapTypeId: `terrain`,
  });


  map.addListener(`click`, showCoord);


  // Инициализируем Геокодер
  // const geocoder = new google.maps.Geocoder();
  // document.getElementById("submit").addEventListener("click", function() {
  //   geocodeAddress(geocoder, map);
  // });

  // Выводим тестовый маркер
  const latLng = new google.maps.LatLng(mockMarkers[0].coords.lat, mockMarkers[0].coords.lng);
  marker1 = new google.maps.Marker({
    map,
    position: latLng,
    draggable: true,
    animation: google.maps.Animation.DROP,
    // icon: image,
    title: `Hello World!`,
  });
  marker1.setMap(map);

  marker1.addListener(`click`, showCoord);

  marker2 = new google.maps.Marker({
    map,
    position: {lat: 35.731, lng: 32.15},
    draggable: true,
    animation: google.maps.Animation.DROP,
    // icon: image,
    title: `Hello World!`,
  });
  marker2.setMap(map);

  marker2.addListener(`dragend`, showCoordConsole);

  // function(e) {
  //   console.log(e.latLng);  // Координаты маркера
  // });
  // , () => {
  //   marker.setMap(null);
  // });


  // Добавляем кучку маркеров
  setMarkers(map);


  // Рисуем линию нажатием на карту
  poly = new google.maps.Polyline({
    strokeColor: `#FF0000`,
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  poly.setMap(map);

  // Add a listener for the click event
  // map.addListener('click', addLatLng);


  const SatBeam1 = new google.maps.Polygon({
    paths: Beam1,
    strokeColor: `#01a01b`,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: `#01a01b`,
    fillOpacity: 0.35
  });
  SatBeam1.setMap(map);

  // Construct the polygon, including both paths.
  const bermudaTriangle = new google.maps.Polygon({
    paths: [outerCoords, innerCoords],
    strokeColor: `#FFC107`,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: `#FFC107`,
    fillOpacity: 0.35
  });
  bermudaTriangle.setMap(map);

  // Construct the polygon.
  // const bermudaTriangle = new google.maps.Polygon({
  //   paths: triangleCoords,
  //   strokeColor: '#FF0000', // Граница
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35
  // });
  // bermudaTriangle.setMap(map);
  // bermudaTriangle.addListener('click', showArrays);
  // bermudaTriangle.setMap(null);

  infoWindow = new google.maps.InfoWindow();
}


// ****************************************************************
// ****************************************************************
// ****************************************************************


// Показывает координаты нажатой точки
const showCoord = (event) => {
  console.log(`event: `, event.latLng);

  let contentString = `<b>Координаты точки</b><br>` +
      event.latLng.lat() + `,` + event.latLng.lng() + `<br>`;

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
};

// Показывает координаты нажатой точки
const showCoordConsole = (event) => {
  console.log(`Координаты точки: `, event.latLng.lat() + `:` + event.latLng.lng());
};


// Добавляет маркер на карту
const addLatLng = (event) => {
  const path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  path.push(event.latLng);
  console.log(`event.latLng: `, event.latLng);

  // Add a new marker at the new plotted point on the polyline.
  const marker = new google.maps.Marker({
    position: event.latLng,
    title: `#` + path.getLength(),
    map
  });
};

/** @this {google.maps.Polygon} */
function showArrays(event) {
  console.log(`event: `, event);
  // Since this polygon has only one path, we can call getPath() to return the
  // MVCArray of LatLngs.
  let vertices = this.getPath();

  let contentString = `<b>Bermuda Triangle polygon</b><br>` +
      `Clicked location: <br>` + event.latLng.lat() + `,` + event.latLng.lng() +
      `<br>`;

  // Iterate over the vertices.
  for (let i = 0; i < vertices.getLength(); i++) {
    let xy = vertices.getAt(i);
    contentString += `<br>` + `Coordinate ` + i + `:<br>` + xy.lat() + `,` +
        xy.lng();
  }

  // Replace the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(event.latLng);

  infoWindow.open(map);
}


// Прыгающий маркер
const toggleBounce = () => {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
};


function setMarkers(map) {
  // Adds markers to the map.

  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.

  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  let image = {
    url: `https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png`,
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  let shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: `poly`
  };
  for (let i = 0; i < beaches.length; i++) {
    let beach = beaches[i];
    marker = new google.maps.Marker({
      position: {lat: beach[1], lng: beach[2]},
      map,
      icon: image,
      shape,
      title: beach[0],
      zIndex: beach[3]
    });
  }
}


init();
