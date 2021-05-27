import React, { useState, useRef, useEffect } from 'react';
import cl from 'classnames';
import pt from 'prop-types';
import { coordsType } from '../../utils/prop-types-templates';
// Redux
import { connect } from 'react-redux';
import { getActivePointerCoords, getGeo } from '../../reducers/search/selectors';
import { ActionCreator } from '../../reducers/search/search';
// Components
import CoordHeader from './coord-header/coord-header';
// Functions
import { degToDec, decToDeg } from '../../utils/converter';
// Types / consts
import { coordsTypeView } from '../../utils/const';


// Форма для ввода данных
const FormPlaceSetup = ({activePointerCoords, setActivePointerCoords, lastGeo, setGeo}) => {

  const geoRef = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);

  const latGradRef = useRef(null);
  const lngGradRef = useRef(null);
  const latMinRef = useRef(null);
  const lngMinRef = useRef(null);
  const latSecRef = useRef(null);
  const lngSecRef = useRef(null);

  const [latInput] = useState(activePointerCoords.lat);
  const [lngInput] = useState(activePointerCoords.lng);

  // Тип координат
  const [coordType, setCoordType] = useState(coordsTypeView.DECIMAL);
  const handleToogleCoordType = () => {
    if (coordType === coordsTypeView.DECIMAL) {
      setCoordType(coordsTypeView.DEGREES);
      setTimeout(() => installRefValue(coordsTypeView.DEGREES, activePointerCoords), 400); // Обновляем значения Ref активными координатами
    
    } else {
      setCoordType(coordsTypeView.DECIMAL);
      setTimeout(() => installRefValue(coordsTypeView.DECIMAL, activePointerCoords), 400); // Обновляем значения Ref активными координатами
    }
  };


  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const geo = geoRef.current.value;
    if (geo !== lastGeo) {
      setGeo(geo);
    }

    let lat, lng;
    if (coordType === coordsTypeView.DECIMAL) {
      lat = +latRef.current.value;
      lng = +lngRef.current.value;
      
    } else if (coordType === coordsTypeView.DEGREES) {
      lat = degToDec(latGradRef.current.value, latMinRef.current.value, latSecRef.current.value);
      lng = degToDec(lngGradRef.current.value, lngMinRef.current.value, lngSecRef.current.value);
    }
    if (latInput && lngInput) {
      setActivePointerCoords({ lat, lng });
    }
  };

  const handleChangeLat = (e) => latRef.current.value = e.target.value;
  const handleChangeLng = (e) => lngRef.current.value = e.target.value;

  const handleChangeGradLat = (e) => latGradRef.current.value = e.target.value;
  const handleChangeGradLng = (e) => lngGradRef.current.value = e.target.value;

  const handleChangeMinLat = (e) => latMinRef.current.value = e.target.value;
  const handleChangeMinLng = (e) => lngMinRef.current.value = e.target.value;

  const handleChangeSecLat = (e) => latSecRef.current.value = e.target.value;
  const handleChangeSecLng = (e) => lngSecRef.current.value = e.target.value;


  // Обновляем значения Ref активными координатами
  const installRefValue = (type, activePointerCoords) => {
    if (type === coordsTypeView.DECIMAL) {
      latRef.current.value = activePointerCoords.lat;
      lngRef.current.value = activePointerCoords.lng;

    } else if (type === coordsTypeView.DEGREES) {
      const lat = decToDeg(activePointerCoords.lat);
      const lng = decToDeg(activePointerCoords.lng);
      latGradRef.current.value = lat.deg;
      lngGradRef.current.value = lng.deg;
      latMinRef.current.value = lat.min;
      lngMinRef.current.value = lng.min;
      latSecRef.current.value = lat.sec;
      lngSecRef.current.value = lng.sec;
    }
  };


  useEffect(() => {
    // Изменение координат в input при перемещении на карте
    if (latInput !== activePointerCoords.lat || lngInput !== activePointerCoords.lng) {
      if (coordType === coordsTypeView.DECIMAL) {
        if (latRef && lngRef) {
          installRefValue(coordsTypeView.DECIMAL, activePointerCoords);
          
        } else console.log(`НЕТ latRef и lngRef`);

      } else if (coordType === coordsTypeView.DEGREES) {
        if (latGradRef && lngGradRef && latMinRef && lngMinRef && latSecRef && lngSecRef) {
          installRefValue(coordsTypeView.DEGREES, activePointerCoords);

        } else console.log(`НЕТ latGradRef && lngGradRef && latMinRef && lngMinRef && latSecRef && lngSecRef`);
      }
    }
  }, [activePointerCoords]);


  const handleFocus = () => document.addEventListener(`keydown`, handleKeyPressed);
  const handleBlur = () => document.removeEventListener(`keydown`, handleKeyPressed);

  // Обработка нажатий клавиш
  const handleKeyPressed = (e) => {
    const handleBlur = () => {
      geoRef.current.blur();
      if (coordType === coordsTypeView.DECIMAL) {
        latRef.current.blur();
        lngRef.current.blur();
      } else {
        latGradRef.current.blur();
        lngGradRef.current.blur();
        latMinRef.current.blur();
        lngMinRef.current.blur();
        latSecRef.current.blur();
        lngSecRef.current.blur();
      }
    }
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 27:
        handleSubmit();
        handleBlur();
        document.removeEventListener(`keydown`, handleKeyPressed);
        break;
      case 13:
        handleSubmit();
        handleBlur();
        document.removeEventListener(`keydown`, handleKeyPressed);
        break;
      default: return null;
    }
    return null;
  };


  
  const clCoordsType = cl(`input-coord-container`,
      {'done': coordType !== coordsTypeView.DECIMAL}
  );



  return (
    <div className="form-place-setup">
      <div className="container-form input-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-place-container">
            <div className="title">МЕСТО УСТАНОВКИ</div>
            <input
              type="text" className="input-place" placeholder="Укажите адрес"
              ref={geoRef} onFocus={handleFocus} onBlur={handleBlur} />
          </div>

          <div className={clCoordsType}>
            <div className="coord-inner">
              
              {
                coordType === coordsTypeView.DECIMAL ?
                  <>
                    <CoordHeader onToogleCoordType={handleToogleCoordType} />

                    <div className="inputs-container">
                      <div className="inputs-container-box">
                        <div className="title-grad">ШИРОТА</div>
                        <input type="number" className="input-coord" tabIndex={1}
                          defaultValue={+activePointerCoords.lat}
                          onChange={handleChangeLat}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          ref={latRef}
                        />
                      </div>
                      <div className="inputs-container-box">
                        <div className="title-grad">ДОЛГОТА</div>
                        <input type="number" className="input-coord" tabIndex={2}
                          defaultValue={+activePointerCoords.lng}
                          onChange={handleChangeLng}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                          ref={lngRef}
                        />
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className="coord-back">

                      <CoordHeader onToogleCoordType={handleToogleCoordType} />
                      
                      <div className="inputs-container">
                        <div className="title-grad">
                          <div className="str-grad-title"></div>
                          <div className="str-grad">ШИРОТА</div>
                          <div className="str-grad">ДОЛГОТА</div>
                        </div>
                        <div className="title-grad">
                          <div className="str-grad-title">Град</div>
                          <div className="str-grad">
                            <input type="number" className="input-grad" tabIndex={4}
                              ref={latGradRef} defaultValue={0}
                              onChange={handleChangeGradLat} onFocus={handleFocus} onBlur={handleBlur}
                            />
                          </div>
                          <div className="str-grad">
                            <input type="number" className="input-grad" tabIndex={7}
                              ref={lngGradRef} defaultValue={0}
                              onChange={handleChangeGradLng} onFocus={handleFocus} onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div className="title-grad">
                          <div className="str-grad-title">Мин</div>
                          <div className="str-grad">
                            <input type="number" className="input-grad" tabIndex={5}
                              ref={latMinRef} defaultValue={0}
                              onChange={handleChangeMinLat} onFocus={handleFocus} onBlur={handleBlur}
                            />
                          </div>
                          <div className="str-grad">
                            <input type="number" className="input-grad" tabIndex={8}
                              ref={lngMinRef} defaultValue={0}
                              onChange={handleChangeMinLng} onFocus={handleFocus} onBlur={handleBlur}
                            />
                          </div>
                        </div>
                        <div className="title-grad">
                          <div className="str-grad-title">Сек</div>
                          <div className="str-grad">
                            <input type="number" className="input-grad" tabIndex={6}
                              ref={latSecRef} defaultValue={0}
                              onChange={handleChangeSecLat} onFocus={handleFocus} onBlur={handleBlur}
                            />
                          </div>
                          <div className="str-grad">
                            <input type="number" className="input-grad" tabIndex={9}
                              ref={lngSecRef} defaultValue={0}
                              onChange={handleChangeSecLng} onFocus={handleFocus} onBlur={handleBlur}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
              }
            </div>
          </div>

          <div className="input-button-container">
            <input type="button" onClick={handleSubmit} className="input-button" value="НАЙТИ"/>
          </div>
        </form>
      </div>
    </div>
  );
};

FormPlaceSetup.propTypes = {
  activePointerCoords: pt.shape(coordsType).isRequired,
  setActivePointerCoords: pt.func.isRequired,
  lastGeo: pt.string.isRequired,
  setGeo: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  activePointerCoords: getActivePointerCoords(state),
  lastGeo: getGeo(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
  setGeo(geo) {
    dispatch(ActionCreator.setGeo(geo));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPlaceSetup);
