import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {coordsType, satType} from '../../utils/prop-types-templates';

import {MAP_CENTER, MAP_ZOOM_START, MAP_TYPE_ID, MAP_MARKER_MAIN_POSITION} from '../../utils/const';
import {getActivePointerCoords, getActiveSatellite} from '../../reducers/search/selectors';
import {ActionCreator} from '../../reducers/search/search';


class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.setPointerCoordToReducer = this.setPointerCoordToReducer.bind(this);
    this.setMarkerMain = this.setMarkerMain.bind(this);
    this.removeMarkerMain = this.removeMarkerMain.bind(this);
    this.setActiveBeam = this.setActiveBeam.bind(this);
    this.removeActiveBeam = this.removeActiveBeam.bind(this);
    this.setActiveSatellite = this.setActiveSatellite.bind(this);
    this.removeActiveSatellite = this.removeActiveSatellite.bind(this);

    this._map = null;
    this._markerMain = null;
    this._activeBeam = null;
    this._markerSatellite = null;

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
      if (!this._map) {
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
        // Выводим луч
        this.setActiveBeam();
        this.setActiveSatellite();

      } else {
        // Удаляем старый луч и рисуем новый
        this.removeMarkerMain();
        this.setMarkerMain();
        this.removeActiveBeam();
        this.setActiveBeam();
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
    this._activeBeam = new window.google.maps.Polyline({
      path: [this.props.activeSatellite.coords, this.props.activePointerCoords],
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


  setActiveSatellite() {
    // Маркер спутника
    this._markerSatellite = new window.google.maps.Marker({
      map: this._map,
      position: this.props.activeSatellite.coords,
      draggable: false,
      animation: window.google.maps.Animation.DROP,
      icon: `./img/satellite30.png`,
    });
    this._markerSatellite.setMap(this._map);
  }

  removeActiveSatellite() {
    if (this._markerSatellite) {
      this._markerSatellite.setMap(null);
      this._markerSatellite = null;
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
  activeSatellite: pt.shape(satType).isRequired,
  setActivePointerCoords: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  activePointerCoords: getActivePointerCoords(state),
  activeSatellite: getActiveSatellite(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
