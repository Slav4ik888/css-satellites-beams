import React from 'react';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';

import {MAP_CENTER, MAP_TYPE_ID, MAP_MARKER_MAIN_POSITION} from '../../utils/const';


class GoogleMapEditBeam extends React.Component {
  constructor(props) {
    super(props);
    this.addLatLng = this.addLatLng.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);

    this._map = null;
    this._poly = null;
    this._poligon = [];

    this.state = {
      mapIsReady: false,
    };
  }

  componentDidMount() {
    const script = document.createElement(`script`);
    const GMAK = `AIzaSyDN2t-jztEv0j2u-Ep3Zw9B8y0hneXCl6s`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAK}`;
    script.async = true;
    script.defer = true;
    script.addEventListener(`load`, () => {
      this.setState({mapIsReady: true});
    });

    document.getElementsByTagName(`head`)[0].appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      if (!this._map) { // Первичная прорисовка
        // Display the map
        this._map = new window.google.maps.Map(document.getElementById(`map`), {
          center: {lat: 53.546, lng: 56.286},
          zoom: 6,
          mapTypeId: MAP_TYPE_ID,
        });

        // Рисуем линию нажатием на карту
        this._poly = new window.google.maps.Polyline({
          strokeColor: `#FF0000`,
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        this._poly.setMap(this._map);

        // Add a listener for the click event
        // this._map.addListener(`click`, this.addLatLng);

        document.addEventListener(`keydown`, this.handleKeyPressed);
        // Выводим маркер
        this._markerMain = new window.google.maps.Marker({
          map: this._map,
          position: {lat: 53.546, lng: 56.286},
          draggable: true,
          animation: window.google.maps.Animation.DROP,
          // icon: image,
        });
        this._markerMain.setMap(this._map);
        this._markerMain.addListener(`dragend`, this.addLatLng);

        // const img = document.createElement(`img`);
        // img.src = `/img/img_map.png`;
        // img.style.position = `absolute`;
        // img.style.opacity = 0.4;
        // img.style.width = `520px`;
        // img.style.top = `100px`;
        // document.getElementById(`map`).insertAdjacentElement(`beforeend`, img);

      } else { // Все последующие update
        // Удаляем старый луч и рисуем новый
        this.removeMarkerMain();
        this.setMarkerMain();
      }
    }
  }


  // Добавляет линию на карту
  addLatLng(event) {
    const path = this._poly.getPath();
    path.push(event.latLng);
    // console.log('path: ', path);
    this._poligon.push({
      lat: +event.latLng.lat().toFixed(3),
      lng: +event.latLng.lng().toFixed(3)
    });
    // eslint-disable-next-line no-console
    console.log(event.latLng.lat().toFixed(3) + `:` + event.latLng.lng().toFixed(3));
  }

  // Обработка нажатий клавиш
  handleKeyPressed(e) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 27:
        // Убираем последнюю введённую координату
        const path = this._poly.getPath();
        path.pop();
        this._poligon.pop();
        break;

      case 13:
        this.props.callback(this._poligon);
        break;
      default: return null;
    }
    return null;
  }

  // Передаёт координаты выбранной точки в редюсер
  setPointerCoordToReducer(event) {
    // eslint-disable-next-line no-console
    console.log(`Координаты точки: `, event.latLng.lat() + `:` + event.latLng.lng());
    // this.props.setActivePointerCoords({lat: event.latLng.lat(), lng: event.latLng.lng()});
  }


  setMarkerMain() {
    this._markerMain = new window.google.maps.Marker({
      map: this._map,
      position: this.props.activePointerCoords,
      draggable: true,
      // animation: window.google.maps.Animation.DROP,
      // icon: image,
    });
    this._markerMain.setMap(this._map);
    this._markerMain.addListener(`dragend`, this.setPointerCoordToReducer);
  }

  removeMarkerMain() {
    this._markerMain.setMap(null);
    this._markerMain = null;
    // this._markerMain.removeListener(`dragend`, this.setPointerCoordToReducer);
  }


  render() {

    return (
      <div id="map" style={{width: `960px`, height: 700 + `px`}}/>
    );
  }
}

GoogleMapEditBeam.propTypes = {
  callback: pt.func.isRequired,
};


export default GoogleMapEditBeam;
