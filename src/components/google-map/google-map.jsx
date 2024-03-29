import React from 'react';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';
// Redux
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducers/search/search';
import {getActivePointerCoords, getActiveSatId, getCheckedSats, getCheckedSat, getGeo, getIsMap} from '../../reducers/search/selectors';
// Components
import OfferBox from '../offer-box/offer-box';
// Functions
import {geocodeAddress} from '../../utils/geocode';
import {getTargetPoligons} from '../../utils/poligons';
import {MAP_CENTER, MAP_ZOOM_START, MAP_TYPE_ID, MAP_MARKER_MAIN_POSITION} from '../../utils/const';
import {SATELLITES} from '../../utils/const';



class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.setAllPoligonsToAllPoligonsSats = this.setAllPoligonsToAllPoligonsSats.bind(this);

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
    this._allPoligonsSats = []; // Все полигоны, данные по которым у нас есть
    this._prevActiveSatId = null; // Id последнего активного спутника

    this.setGeocodAdress = this.setGeocodAdress.bind(this);
    this._lastGeo = null; // Сохранённый изменённый текст в Места установки
    this._geocoder = null;

    this.state = {
      poligonsSats: [], // Выведенные полигоны на карту
    };
  }

  componentDidMount() {
    const script = document.createElement(`script`);
    const GMAK = `AIzaSyDN2t-jztEv0j2u-Ep3Zw9B8y0hneXCl6s`;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GMAK}`;
    script.async = true;
    script.defer = true;
    script.addEventListener(`load`, () => {
      this.props.setIsMap(true);
    });

    document.getElementsByTagName(`head`)[0].appendChild(script);
  }

  componentDidUpdate(prevProps) {
    if (this.props.isMap) {
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

        // При клике на карту маркер перемещается
        window.google.maps.event.addListener(this._map, `click`, this.setPointerCoordToReducer);

        // Выводим луч и спутник и все лучи этого спутника
        this.setActiveBeam();
        this.setActiveSat();
        this.setAllPoligonsSat(this.props.activeSatId);
        this._prevActiveSatId = this.props.activeSatId;

        // Сохраняем все полигоны
        this.setAllPoligonsToAllPoligonsSats(SATELLITES);

        // Инициализируем Геокодер
        this._geocoder = new window.google.maps.Geocoder();
        document.querySelector(`.input-button`).addEventListener(`click`, () => this.setGeocodAdress(this._geocoder));

      } else { // Все последующие UPDATE

        // При изменении текста в Месте установки, запускаем Геокодер
        if (this.props.geo !== this._lastGeo) {
          this.setGeocodAdress(this._geocoder);
          this._lastGeo = this.props.geo;
        }

        // Если было изменение координат маркера
        if (prevProps.activePointerCoords !== this.props.activePointerCoords) {
          // Удаляем старый луч и рисуем новый
          this.removeActiveMarker();
          this.setActiveMarker();
          this.removeActiveBeam();
          this.setActiveBeam();
          this.removeActiveSat();
          this.setActiveSat();

          // При изменении положения курсора по координатам
          // Берём текущую позицию маркера и пересчитываем все выведенные объекты
          const LatLng = this._activeMarker.getPosition();
          this.setTargetPoligons(LatLng);

        } else {
          // Не было изменений координат маркера
         
        }
        // Если нажали на спутник
        const checkedSats = this.props.checkedSats;
        const prevCheckedSats = prevProps.checkedSats;
        const activeSatId = this.props.activeSatId;
        // const prevActiveSatId = this._prevActiveSatId;

        if (checkedSats !== prevCheckedSats) {

          // Перебираем новый и проверяем добавился или убавился
          let result;
          checkedSats.forEach((id) => {
            result = prevCheckedSats.includes(id);
            if (!result) { // Значит добавился
              // console.log(`добавился: `);
              // if (prevActiveSatId) { // Если есть активный спутник
              //   this.removeAllPoligonsSat(prevActiveSatId);
              // }
              // this.removeAllActivePoligons();

              if (!prevCheckedSats.length) {
                // console.log(`Нет выбранных спутников, удаляем все полигоны`);
                this.removeAllActivePoligons();
              }

              this.setAllPoligonsSat(this.props.checkedSat);
              this._prevActiveSatId = activeSatId;
              // Активируем новый спутник
              this.removeActiveBeam();
              this.setActiveBeam();
              this.removeActiveSat();
              this.setActiveSat();
            }
          });
          prevCheckedSats.forEach((id) => {
            result = checkedSats.includes(id);
            if (!result) { // Значит убавился
              // console.log(`убавился: `, this.props.checkedSat);
              this.removeAllPoligonsSat(this.props.checkedSat);
              // this.removeAllActivePoligons();
              this._prevActiveSatId = null;
            }
          });
          // Проверяем и сразу же выводим лучи выбранного/отменённого спутника
          // this.setTargetPoligons(this.getTargetPoligons(this._activeMarker.position, this._allPoligonsSats));
        }
      }
    }
  }


  // Обработка изменений координат activeMarker
  setPointerCoordToReducer(event) {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    // eslint-disable-next-line no-console
    // console.log(`Координаты точки: `, lat + `:` + lng);

    this.setTargetPoligons(event.latLng); // Выводит те полигоны в которые попадают координады
    this.props.setActivePointerCoords({lat, lng}); // В редьюсер
  }

  // Запуск Геокодера
  setGeocodAdress(geocoder) {
    geocodeAddress(geocoder, (coords) => {
      // Отменить все выбранные спутники
      this.props.checkedSats.forEach((satId) => this.props.removeCheckedSat(satId));
      // Активируем спутники
      this.setTargetPoligons(coords);
      this.props.setActivePointerCoords({lat: coords.lat(), lng: coords.lng()});
    });
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
              strokeColor: sat.color,
              strokeOpacity: 0.8,
              strokeWeight: 2.5,
              fillColor: sat.color,
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


  // Выводит только те полигоны, в которые попадает маркер по отмеченным спутникам
  setTargetPoligons(latLng) {
    this.removeAllActivePoligons();
    // Массив полигонов которые находятся в указанных кординатах
    const poligons = getTargetPoligons(latLng, this._allPoligonsSats);
    // В редьюсер спутники которые попадают в координаты
    const allSatsInCoord = [...new Set(poligons.map((pol) => pol.satId))];
    this.props.setAllResultSats(allSatsInCoord);

    // Фильтруем только те, что выбраны, а если не выбрано, то среди всех
    let targetPoligons = poligons.concat();
    const checkedSats = this.props.checkedSats;
    if (checkedSats.length) {
      targetPoligons = [];
      checkedSats.forEach((satId) => {
        let resFilter = poligons.filter((poligon) => poligon.satId === satId);
        if (resFilter) {
          resFilter.forEach((res) => targetPoligons.push(res));
        }
      });
    }

    targetPoligons.forEach((poligon) => this.setPoligon(poligon.satId, poligon.beam));

    if (targetPoligons.length) { // Устанавливаем активный спутник, чтобы выведенный спутник был среди активных полигонов
      this.props.setActiveSatId(targetPoligons[0].satId);
    }
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
      strokeColor: SATELLITES[satIdx].color,
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
    const iconUrl = SATELLITES[satIdx].icon;
    // Маркер спутника
    this._markerSat = new window.google.maps.Marker({
      map: this._map,
      position: coords,
      draggable: false,
      // animation: window.google.maps.Animation.DROP,
      icon: iconUrl,
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

  // Убрать все активные полигоны и очистить this.state.poligonsSats
  removeAllActivePoligons() {
    this.state.poligonsSats.forEach((poligon) => poligon.poligon.setMap(null));
    this.setState({poligonsSats: []});
  }

  // Выводим на карту полигон и сохраняем в массив
  setPoligon(satId, beam) {
    const satIdx = SATELLITES.findIndex((it) => it.id === satId);
    if (satId) {
      const satPoligon = new window.google.maps.Polygon({
        paths: SATELLITES[satIdx].beams[beam],
        strokeColor: SATELLITES[satIdx].color,
        strokeOpacity: 2,
        strokeWeight: 2,
        fillColor: SATELLITES[satIdx].color,
        fillOpacity: 0.35,
      });
      satPoligon.setMap(this._map);

      const obj = {
        poligon: satPoligon,
        satId,
        beam,
      };

      this.setState((prevState) => {
        let newPols = prevState.poligonsSats.concat();
        return {
          poligonsSats: [...newPols, obj],
        };
      });
    }
  }

  // Убираем с карты полигон
  removePoligon(beam) {
    const poligons = this.state.poligonsSats;
    const poligonIdx = poligons.findIndex((obj) => obj.beam === beam);
    if (poligons[poligonIdx]) {
      poligons[poligonIdx].poligon.setMap(null);
    }
    this.setState({
      poligonsSats: [...poligons.slice(0, poligonIdx), ...poligons.slice(poligonIdx + 1)],
    });
  }


  render() {

    return (
      <div id="map" style={{width: `100%`, height: 500 + `px`}}>
        {/* <OfferBox /> */}
      </div>
    );
  }
}

GoogleMap.propTypes = {
  activePointerCoords: pt.shape(coordsType).isRequired,
  activeSatId: pt.string.isRequired,
  setActivePointerCoords: pt.func.isRequired,
  checkedSats: pt.arrayOf(pt.string),
  checkedSat: pt.string.isRequired,
  removeCheckedSat: pt.func.isRequired,
  setCheckedSat: pt.func.isRequired,
  setActiveSatId: pt.func.isRequired,
  setIsMap: pt.func.isRequired,
  isMap: pt.bool.isRequired,
  setAllResultSats: pt.func.isRequired,
  geo: pt.string.isRequired,
};

const mapStateToProps = (state) => ({
  activePointerCoords: getActivePointerCoords(state),
  activeSatId: getActiveSatId(state),
  checkedSats: getCheckedSats(state),
  checkedSat: getCheckedSat(state),
  isMap: getIsMap(state),
  geo: getGeo(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
  setActiveSatId(id) {
    dispatch(ActionCreator.setActiveSatId(id));
  },
  setCheckedSat(id) {
    dispatch(ActionCreator.setCheckedSat(id));
  },
  removeCheckedSat(id) {
    dispatch(ActionCreator.removeCheckedSat(id));
  },
  setIsMap(status) {
    dispatch(ActionCreator.setIsMap(status));
  },
  setAllResultSats(sats) {
    dispatch(ActionCreator.setAllResultSats(sats));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GoogleMap);
