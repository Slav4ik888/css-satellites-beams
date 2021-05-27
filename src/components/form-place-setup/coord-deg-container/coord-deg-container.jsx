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
const CoordDegContainer = ({activePointerCoords, setActivePointerCoords, lastGeo, setGeo, onToogleCoordType}) => {

  const latGradRef = useRef(null);
  const lngGradRef = useRef(null);
  const latMinRef = useRef(null);
  const lngMinRef = useRef(null);
  const latSecRef = useRef(null);
  const lngSecRef = useRef(null);

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

  const handleChangeGradLat = (e) => latGradRef.current.value = e.target.value;
  const handleChangeGradLng = (e) => lngGradRef.current.value = e.target.value;

  const handleChangeMinLat = (e) => latMinRef.current.value = e.target.value;
  const handleChangeMinLng = (e) => lngMinRef.current.value = e.target.value;

  const handleChangeSecLat = (e) => latSecRef.current.value = e.target.value;
  const handleChangeSecLng = (e) => lngSecRef.current.value = e.target.value;



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

  

  return (
    <>
      <div className="coord-back">

        <CoordHeader onToogleCoordType={onToogleCoordType} />
        
        <div className="inputs-container">
          <div className="title-grad">
            <div className="str-grad-title"></div>
            <div className="str-grad">ШИРОТА</div>
            <div className="str-grad">ДОЛГОТА</div>
          </div>
          <div className="title-grad">
            <div className="str-grad-title">Град</div>
            <div className="str-grad">
              <input type="number" className="input-grad"
                ref={latGradRef} defaultValue={0}
                onChange={handleChangeGradLat} 
              />
            </div>
            <div className="str-grad">
              <input type="number" className="input-grad"
                ref={lngGradRef} defaultValue={0}
                onChange={handleChangeGradLng} 
              />
            </div>
          </div>
          <div className="title-grad">
            <div className="str-grad-title">Мин</div>
            <div className="str-grad">
              <input type="number" className="input-grad"
                ref={latMinRef} defaultValue={0}
                onChange={handleChangeMinLat} 
              />
            </div>
            <div className="str-grad">
              <input type="number" className="input-grad"
                ref={lngMinRef} defaultValue={0}
                onChange={handleChangeMinLng} 
              />
            </div>
          </div>
          <div className="title-grad">
            <div className="str-grad-title">Сек</div>
            <div className="str-grad">
              <input type="number" className="input-grad"
                ref={latSecRef} defaultValue={0}
                onChange={handleChangeSecLat} 
              />
            </div>
            <div className="str-grad">
              <input type="number" className="input-grad"
                ref={lngSecRef} defaultValue={0}
                onChange={handleChangeSecLng} 
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

CoordDegContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CoordDegContainer);
