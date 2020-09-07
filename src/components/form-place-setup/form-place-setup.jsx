import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';

import {getActivePointerCoords, getGeo} from '../../reducers/search/selectors';
import {ActionCreator} from '../../reducers/search/search';


const FormPlaceSetup = ({activePointerCoords, setActivePointerCoords, lastGeo, setGeo}) => {

  const geoRef = useRef(null);
  const latRef = useRef(null);
  const lngRef = useRef(null);

  const [latInput] = useState(activePointerCoords.lat);
  const [lngInput] = useState(activePointerCoords.lng);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    const geo = geoRef.current.value;
    if (geo !== lastGeo) {
      setGeo(geo);
    }
    const lat = +latRef.current.value;
    const lng = +lngRef.current.value;

    if (latInput && lngInput) {
      setActivePointerCoords({lat, lng});
    }
  };

  const handleChangeLat = (e) => {
    latRef.current.value = e.target.value;
    // setLatInput(e.target.value);
  };
  const handleChangeLng = (e) => {
    lngRef.current.value = e.target.value;
    // setLngInput(e.target.value);
  };

  let lastActiveCoords;
  if (lastActiveCoords !== activePointerCoords) { // Изменение пришло из вне
    if (latInput !== activePointerCoords.lat || lngInput !== activePointerCoords.lng) {
      // setLatInput(activePointerCoords.lat);
      // setLngInput(activePointerCoords.lng);
      latRef.current.value = +activePointerCoords.lat;
      lngRef.current.value = +activePointerCoords.lng;
      lastActiveCoords = activePointerCoords;
    }
  } else { // изменили input

  }

  const handleFocus = () => document.addEventListener(`keydown`, handleKeyPressed);
  const handleBlur = () => document.removeEventListener(`keydown`, handleKeyPressed);

  // Обработка нажатий клавиш
  const handleKeyPressed = (e) => {
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 27:
        handleSubmit();
        geoRef.current.blur();
        latRef.current.blur();
        lngRef.current.blur();
        document.removeEventListener(`keydown`, handleKeyPressed);
        break;
      case 13:
        handleSubmit();
        geoRef.current.blur();
        latRef.current.blur();
        lngRef.current.blur();
        document.removeEventListener(`keydown`, handleKeyPressed);
        break;
      default: return null;
    }
    return null;
  };

  return (
    <div className="form-place-setup">
      <div className="container-form input-form">
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <div className="input-place-container">
            <div className="title">МЕСТО УСТАНОВКИ</div>
            <input type="text" className="input-place" placeholder="Укажите адрес"
              onFocus={handleFocus}
              onBlur={handleBlur}
              ref={geoRef}
            />
          </div>

          <div className="input-coord-container">
            <div className="title">КООРДИНАТЫ</div>

            <div className="inputs-container">
              <input type="number" className="input-coord"
                defaultValue={+activePointerCoords.lat}
                onChange={handleChangeLat}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={latRef}
              />
              <input type="number" className="input-coord"
                defaultValue={+activePointerCoords.lng}
                onChange={handleChangeLng}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={lngRef}
              />
            </div>
          </div>

          <div className="input-button-container">
            <div className="title title-hide">.</div>
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
