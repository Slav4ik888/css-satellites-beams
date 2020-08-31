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
    this.setAllPoligonsToAllPoligonsSats = this.setAllPoligonsToAllPoligonsSats.bind(this);

    this.getTargetPoligons = this.getTargetPoligons.bind(this);
    this.setTargetPoligons = this.setTargetPoligons.bind(this);

    this.setActiveMarker = this.setActiveMarker.bind(this);
    this.removeActiveMarker = this.removeActiveMarker.bind(this);

    this.setActiveBeam = this.setActiveBeam.bind(this);
    this.removeActiveBeam = this.removeActiveBeam.bind(this);

    this.setActiveSat = this.setActiveSat.bind(this);
    this.removeActiveSat = this.removeActiveSat.bind(this);

    this.setPoligon = this.setPoligon.bind(this);
    this.removePoligon = this.removePoligon.bind(this);
    this.setAllPoligonsSat = this.setAllPoligonsSat.bind(this);
    this.removeAllPoligonsSat = this.removeAllPoligonsSat.bind(this);
    this.removeAllActivePoligons = this.removeAllActivePoligons.bind(this);

    this.setPointerCoordToReducer = this.setPointerCoordToReducer.bind(this);

    this._map = null;
    this._activeMarker = null; // Активный маркер на карте
    this._activeBeam = null; // Луч выведенный на карту
    this._markerSat = null; // Иконка активного спутника на карте
    this._poligonsSats = []; // Выведенные полигоны на карту
    this._allPoligonsSats = []; // Все полигоны, данные по которым у нас есть
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
        this._activeMarker.addListener(`dragend`, (event) => {
          // console.log(event.latLng.lat().toFixed(3) + `:` + event.latLng.lng().toFixed(3));
          this.setPointerCoordToReducer(event);
          return null;
        });

        // Выводим луч и спутник и все лучи этого спутника
        this.setActiveBeam();
        this.setActiveSat();
        this.setAllPoligonsSat(this.props.activeSatId);
        this._prevActiveSatId = this.props.activeSatId;

        // Сохраняем все полигоны
        this.setAllPoligonsToAllPoligonsSats(SATELLITES);

      } else { // Все последующие update
        // Удаляем старый луч и рисуем новый
        this.removeActiveMarker();
        this.setActiveMarker();
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
                this.removeAllPoligonsSat(this._prevActiveSatId);
              }
              this.setAllPoligonsSat(this.props.activeSatId);
              this._prevActiveSatId = this.props.activeSatId;
            }
          });
          prevCheckedSats.forEach((id) => {
            result = checkedSats.includes(id);
            if (!result) { // Значит убавился
              this.removeAllPoligonsSat(this._prevActiveSatId);
              this._prevActiveSatId = null;
            }
          });
        }
      }
    }
  }


  // Передаёт координаты выбранной точки в редюсер
  setPointerCoordToReducer(event) {
    const latLng = event.latLng;
    // eslint-disable-next-line no-console
    console.log(`Координаты точки: `, latLng.lat() + `:` + latLng.lng());
    // const result = window.google.maps.geometry.poly.containsLocation(latLng, this._poligonsSats[0].poligon);
    // console.log('result: ', result);
    const poligons = this._allPoligonsSats;
    const targetPoligons = this.getTargetPoligons(latLng, poligons);
    this.setTargetPoligons(targetPoligons);
    this.props.setActivePointerCoords({lat: latLng.lat(), lng: latLng.lng()});
  }

  // Сохраняем все полигоны, чтобы потом можно было в них искать
  setAllPoligonsToAllPoligonsSats(dataSats) {
    dataSats.forEach((sat) => {
      let beams = sat.beams;
      for (let key in beams) {
        if (Object.prototype.hasOwnProperty.call(beams, key)) {
          let obj = {};
          // obj.poligon = null;
          obj = {
            poligon: new window.google.maps.Polygon({
              paths: beams[key],
              strokeColor: `#01a01b`,
              strokeOpacity: 0.8,
              strokeWeight: 2.5,
              fillColor: `#01a01b`,
              fillOpacity: 0.35,
            }),
            satId: sat.id,
            beam: key,
          };
          this._allPoligonsSats.push(obj);
        }
      }
    });
    // console.log(`TEST`, this._allPoligonsSats);
  }

  // Возвращает массив полигонов которые находятся в указанных кординатах
  getTargetPoligons(point, poligons) {
    let arr = [];
    if (poligons) {
      poligons.forEach((poligon) => window.google.maps.geometry.poly.containsLocation(point, poligon.poligon) ? arr.push(poligon) : null);
    }
    return arr;
  }

  // Выводит только те полигоны, в которые попадает маркер
  setTargetPoligons(poligons) {
    // this.removeAllPoligonsSat(this._prevActiveSatId);
    this.removeAllActivePoligons();
    // Фильтруем только те, что выбраны, а если не выбрано, то среди всех
    let targetPoligons = poligons.concat();
    const checkedSats = this.props.checkedSats;
    if (checkedSats.length) {
      targetPoligons = [];
      checkedSats.forEach((satId) => {
        let resFilter = poligons.find((poligon) => poligon.satId === satId);
        if (resFilter) {
          targetPoligons.push(resFilter);
        }
      });
    }
    targetPoligons.forEach((poligon) => this.setPoligon(poligon.satId, poligon.beam));
  }
  // satPoligon.addListener(`click`, () => {
  //   // console.log('satPoligon: ', satPoligon);
  //   satPoligon.setOptions({fillColor: `#03dd27`});
  // });
  // satPoligon.addListener(`mouseout`, () => {
  //   satPoligon.setOptions({fillColor: `#01a01b`});
  // });


  setActiveMarker() {
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

  removeActiveMarker() {
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
  setAllPoligonsSat(satId) {
    const satIdx = SATELLITES.findIndex((it) => it.id === satId);
    const beams = SATELLITES[satIdx].beams;
    for (let key in beams) {
      if (Object.prototype.hasOwnProperty.call(beams, key)) {
        this.setPoligon(satId, key);
      }
    }
  }

  // Убрать все полигоны спутника
  removeAllPoligonsSat(satId) {
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

  // Убрать все активные полигоны и очистить this._poligonsSats
  removeAllActivePoligons() {
    this._poligonsSats.forEach((poligon) => poligon.poligon.setMap(null));
    this._poligonsSats = [];
  }

  // Выводим на карту полигон и сохраняем в массив
  setPoligon(satId, beam) {
    const satIdx = SATELLITES.findIndex((it) => it.id === satId);
    if (satId) {
      const satPoligon = new window.google.maps.Polygon({
        paths: SATELLITES[satIdx].beams[beam],
        strokeColor: SATELLITES[satIdx].color,
        strokeOpacity: 0.8,
        strokeWeight: 2.5,
        fillColor: SATELLITES[satIdx].color,
        fillOpacity: 0.35,
      });
      satPoligon.setMap(this._map);

      // satPoligon.addListener(`mousemove`, () => {
      //   // console.log('satPoligon: ', satPoligon);
      //   satPoligon.setOptions({fillColor: `#03dd27`});
      // });
      // satPoligon.addListener(`mouseout`, () => {
      //   satPoligon.setOptions({fillColor: `#01a01b`});
      // });

      // satPoligon.addListener(`click`, () => {
      //   // console.log('satPoligon: ', satPoligon);
      //   satPoligon.setOptions({fillColor: `#03dd27`});
      // });
      // satPoligon.addListener(`mouseout`, () => {
      //   satPoligon.setOptions({fillColor: `#01a01b`});
      // });

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
    if (this._poligonsSats[poligonIdx]) {
      this._poligonsSats[poligonIdx].poligon.setMap(null);
    }
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
