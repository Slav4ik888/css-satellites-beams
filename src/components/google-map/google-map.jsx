import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';

import {MAP_CENTER, MAP_ZOOM_START, MAP_TYPE_ID, MAP_MARKER_MAIN_POSITION} from '../../utils/const';
import {getActivePointerCoords, getActiveSatellite, getCheckedSats} from '../../reducers/search/selectors';
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
    this.setPoligon = this.setPoligon.bind(this);
    this.removePoligon = this.removePoligon.bind(this);

    this._map = null;
    this._markerMain = null;
    this._activeBeam = null;
    this._markerSat = null;
    this._poligonSats = [];
    this._SatBeam1 = null;

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
        this._markerMain = new window.google.maps.Marker({
          map: this._map,
          position: MAP_MARKER_MAIN_POSITION,
          draggable: true,
          animation: window.google.maps.Animation.DROP,
          // icon: image,
        });
        this._markerMain.setMap(this._map);
        this._markerMain.addListener(`dragend`, this.setPointerCoordToReducer);
        // Выводим луч и спутник
        this.setActiveBeam();
        this.setActiveSat();

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
              this.setPoligon();
            }
          });
          prevCheckedSats.forEach((id) => {
            result = checkedSats.includes(id);
            if (!result) { // Значит убавился
              this.removePoligon();
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

  setActiveBeam() {
    const coords = SATELLITES[SATELLITES.findIndex((it) => it.id === this.props.activeSatellite)].coordsBeam;
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
    const coords = SATELLITES[SATELLITES.findIndex((it) => it.id === this.props.activeSatellite)].coordsSat;
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

  setPoligon() {
    this._SatBeam1 = new window.google.maps.Polygon({
      paths: SATELLITES[0].beams.beam1,
      strokeColor: `#01a01b`,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: `#01a01b`,
      fillOpacity: 0.35
    });
    this._SatBeam1.setMap(this._map);
    this._SatBeam1.addListener(`click`, this.removePoligon);
  }

  removePoligon() {
    if (this._SatBeam1) {
      this._SatBeam1.setMap(null);
    }
  }


  render() {

    return (
      <div id="map" style={{width: `960px`, height: 500 + `px`}}/>
    );
  }
}

GoogleMap.propTypes = {
  activePointerCoords: pt.shape(coordsType).isRequired,
  activeSatellite: pt.string.isRequired,
  setActivePointerCoords: pt.func.isRequired,
  checkedSats: pt.arrayOf(pt.string),
};

const mapStateToProps = (state) => ({
  activePointerCoords: getActivePointerCoords(state),
  activeSatellite: getActiveSatellite(state),
  checkedSats: getCheckedSats(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
