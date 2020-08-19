import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {coordsType, satType} from '../../utils/prop-types-templates';

import {getActiveSatellite} from '../../reducers/search/selectors';
import {ActionCreator} from '../../reducers/search/search';
import {SATELLITES} from '../../utils/const';


const SatList = ({activeSatellite}) => {

  return (
    <div className="sat-list">
      <div className="container">
        {SATELLITES.map((sat) => (<div key={sat.id} className="input-container">
          <input type="checkbox" className="input-button"
            onChange={() => {}} id={sat.id} />
          <label className="game__check" htmlFor={sat.id}>{sat.name}</label>
        </div>))}
      </div>
    </div>
  );
};

SatList.propTypes = {
  activeSatellite: pt.shape(satType).isRequired,
};

const mapStateToProps = (state) => ({
  activeSatellite: getActiveSatellite(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SatList);
