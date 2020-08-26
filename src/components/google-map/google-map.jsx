import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';

import {MAP_CENTER, MAP_ZOOM_START, MAP_TYPE_ID, MAP_MARKER_MAIN_POSITION} from '../../utils/const';
import {getActivePointerCoords, getActiveSatId, getCheckedSats} from '../../reducers/search/selectors';
import {ActionCreator} from '../../reducers/search/search';

import {SATELLITES} from '../../utils/const';


class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.setPointerCoordToReducer = this.setPointerCoordToReducer.bind(this);
    this.setMarkerMain = this.setMarkerMain.bind(this);
    this.removeMarkerMain = this.removeMarkerMain.bind(this);
    this.setActiveBeam = this.setActiveBeam.bind(this);
    this.removeActiveBeam = this.removeActiveBeam.bind(this);
    this.setActiveSat = this.setActiveSat.bind(this);
    this.removeActiveSat = this.removeActiveSat.bind(this);
    this.setAllPoligons = this.setAllPoligons.bind(this);
    this.removeAllPoligons = this.removeAllPoligons.bind(this);
    this.setPoligon = this.setPoligon.bind(this);
    this.removePoligon = this.removePoligon.bind(this);

    this._map = null;
    this._activeMarker = null; // Активный маркер на карте
    this._activeBeam = null; // Луч выведенный на карту
    this._markerSat = null; // Иконка активного спутника на карте
    this._poligonsSats = []; // Выведенные полигоны на карту
    this._prevActiveSatId = null; // Id последнего активного спутника
    // this._SatBeam1 = null;

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

  componentDidUpdate(prevProps) {
    if (this.state.mapIsReady) {
      if (!this._map) { // Первичная прорисовка
        // Display the map
        this._map = new window.google.maps.Map(document.getElementById(`map`), {
          center: MAP_CENTER,
          zoom: MAP_ZOOM_START,
          mapTypeId: MAP_TYPE_ID,
        });
        // Выводим маркер
        this._activeMarker = new window.google.maps.Marker({
          map: this._map,
          position: MAP_MARKER_MAIN_POSITION,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
          // icon: image,
        });
        this._activeMarker.setMap(this._map);
        this._activeMarker.addListener(`dragend`, this.setPointerCoordToReducer);
        // Выводим луч и спутник и все лучи этого спутника
        this.setActiveBeam();
        this.setActiveSat();
        this.setAllPoligons(this.props.activeSatId);
        this._prevActiveSatId = this.props.activeSatId;

      } else { // Все последующие update
        // Удаляем старый луч и рисуем новый
        this.removeMarkerMain();
        this.setMarkerMain();
        this.removeActiveBeam();
        this.setActiveBeam();
        this.removeActiveSat();
        this.setActiveSat();

        // Если нажали на спутник
        const checkedSats = this.props.checkedSats;
        const prevCheckedSats = prevProps.checkedSats;
        if (checkedSats !== prevCheckedSats) {
          // Перебираем новый и проверяем добавился или убавился
          let result;
          checkedSats.forEach((id) => {
            result = prevCheckedSats.includes(id);
            if (!result) { // Значит добавился
              if (this._prevActiveSatId) { // Если есть активный спутник
                this.removeAllPoligons(this._prevActiveSatId);
              }
              this.setAllPoligons(this.props.activeSatId);
              this._prevActiveSatId = this.props.activeSatId;
            }
          });
          prevCheckedSats.forEach((id) => {
            result = checkedSats.includes(id);
            if (!result) { // Значит убавился
              this.removeAllPoligons(this._prevActiveSatId);
              this._prevActiveSatId = null;
            }
          });
        }
      }
    }
  }


  // Передаёт координаты выбранной точки в редюсер
  setPointerCoordToReducer(event) {
    // eslint-disable-next-line no-console
    console.log(`Координаты точки: `, event.latLng.lat() + `:` + event.latLng.lng());
    this.props.setActivePointerCoords({lat: event.latLng.lat(), lng: event.latLng.lng()});
  }


  setMarkerMain() {
    this._activeMarker = new window.google.maps.Marker({
      map: this._map,
      position: this.props.activePointerCoords,
      draggable: true,
      // animation: window.google.maps.Animation.DROP,
      // icon: image,
    });
    this._activeMarker.setMap(this._map);
    this._activeMarker.addListener(`dragend`, this.setPointerCoordToReducer);
  }

  removeMarkerMain() {
    this._activeMarker.setMap(null);
    this._activeMarker = null;
    // this._activeMarker.removeListener(`dragend`, this.setPointerCoordToReducer);
  }

  setActiveBeam() {
    const satIdx = SATELLITES.findIndex((it) => it.id === this.props.activeSatId);
    const coords = SATELLITES[satIdx].coordsBeam;
    this._activeBeam = new window.google.maps.Polyline({
      path: [coords, this.props.activePointerCoords],
      geodesic: true,
      strokeColor: `#019601`,
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    this._activeBeam.setMap(this._map);
  }

  removeActiveBeam() {
    if (this._activeBeam) {
      this._activeBeam.setMap(null);
      this._activeBeam = null;
    }
  }


  setActiveSat() {
    const satIdx = SATELLITES.findIndex((it) => it.id === this.props.activeSatId);
    const coords = SATELLITES[satIdx].coordsSat;
    // Маркер спутника
    this._markerSat = new window.google.maps.Marker({
      map: this._map,
      position: coords,
      draggable: false,
      // animation: window.google.maps.Animation.DROP,
      icon: `./img/satellite30.png`,
    });
    this._markerSat.setMap(this._map);
  }

  removeActiveSat() {
    if (this._markerSat) {
      this._markerSat.setMap(null);
      this._markerSat = null;
    }
  }

  // Вывести все полигоны спутника
  setAllPoligons(satId) {
    const satIdx = SATELLITES.findIndex((it) => it.id === satId);
    const beams = SATELLITES[satIdx].beams;
    for (let key in beams) {
      if (Object.prototype.hasOwnProperty.call(beams, key)) {
        this.setPoligon(satId, key);
      }
    }
  }

  // Убрать все полигоны спутника
  removeAllPoligons(satId) {
    if (satId) {
      const satIdx = SATELLITES.findIndex((it) => it.id === satId);
      const beams = SATELLITES[satIdx].beams;
      for (let key in beams) {
        if (Object.prototype.hasOwnProperty.call(beams, key)) {
          this.removePoligon(key);
        }
      }
    }
  }

  // Выводим на карту полигон и сохраняем в массив
  setPoligon(satId, beam) {
    const satIdx = SATELLITES.findIndex((it) => it.id === satId);
    if (satId) {
      const satPoligon = new window.google.maps.Polygon({
        paths: SATELLITES[satIdx].beams[beam],
        strokeColor: `#01a01b`,
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: `#01a01b`,
        fillOpacity: 0.35
      });
      satPoligon.setMap(this._map);
      const obj = {
        poligon: satPoligon,
        satId,
        beam,
      };
      this._poligonsSats.push(obj);

      // satPoligon.addListener(`click`, () => this.removePoligon(satId, beam));
    }
  }

  // Убираем с карты полигон
  removePoligon(beam) {
    const poligonIdx = this._poligonsSats.findIndex((obj) => obj.beam === beam);
    this._poligonsSats[poligonIdx].poligon.setMap(null);
    this._poligonsSats = [...this._poligonsSats.slice(0, poligonIdx), ...this._poligonsSats.slice(poligonIdx + 1)];
  }


  render() {

    return (
      <div id="map" style={{width: `960px`, height: 500 + `px`}}/>
    );
  }
}

GoogleMap.propTypes = {
  activePointerCoords: pt.shape(coordsType).isRequired,
  activeSatId: pt.string.isRequired,
  setActivePointerCoords: pt.func.isRequired,
  checkedSats: pt.arrayOf(pt.string),
};

const mapStateToProps = (state) => ({
  activePointerCoords: getActivePointerCoords(state),
  activeSatId: getActiveSatId(state),
  checkedSats: getCheckedSats(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
