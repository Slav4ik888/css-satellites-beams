import React, { useState, useRef } from 'react';
// Redux
import { connect } from 'react-redux';
import { getActivePointerCoords, getGeo } from '../../../reducers/search/selectors';
import { ActionCreator } from '../../../reducers/search/search';
// Components
import CoordHeader from '../coord-header/coord-header';
// Types / consts
import pt from 'prop-types';
import { coordsType } from '../../../utils/prop-types-templates';
import { coordsTypeView } from '../../../utils/const';


// Форма для ввода данных
const CoordDecContainer = ({activePointerCoords, setActivePointerCoords, lastGeo, setGeo, onToogleCoordType}) => {

  const latRef = useRef(null);
  const lngRef = useRef(null);

  const [latInput] = useState(activePointerCoords.lat);
  const [lngInput] = useState(activePointerCoords.lng);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

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

  const handleChangeLat = (e) => latRef.current.value = e.target.value;
  const handleChangeLng = (e) => lngRef.current.value = e.target.value;


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
        latRef.current.blur();
        lngRef.current.blur();
        document.removeEventListener(`keydown`, handleKeyPressed);
        break;
      case 13:
        handleSubmit();
        latRef.current.blur();
        lngRef.current.blur();
        document.removeEventListener(`keydown`, handleKeyPressed);
        break;
      default: return null;
    }
    return null;
  };


  return (
    <>
      <CoordHeader onToogleCoordType={onToogleCoordType} />

      <div className="inputs-container">
        <div className="inputs-container-box">
          <div className="title-grad">ШИРОТА</div>
          <input type="number" className="input-coord"
            defaultValue={+activePointerCoords.lat}
            onChange={handleChangeLat}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={latRef}
          />
        </div>
        <div className="inputs-container-box">
          <div className="title-grad">ДОЛГОТА</div>
          <input type="number" className="input-coord"
            defaultValue={+activePointerCoords.lng}
            onChange={handleChangeLng}
            onFocus={handleFocus}
            onBlur={handleBlur}
            ref={lngRef}
          />
        </div>
      </div>
    </>
  );
};

CoordDecContainer.propTypes = {
  activePointerCoords: pt.shape(coordsType).isRequired,
  setActivePointerCoords: pt.func.isRequired,
  lastGeo: pt.string.isRequired,
  setGeo: pt.func.isRequired,
  onToogleCoordType: pt.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(CoordDecContainer);
