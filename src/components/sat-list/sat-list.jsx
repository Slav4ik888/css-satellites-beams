import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
// import {coordsType, satType} from '../../utils/prop-types-templates';

import {// getActiveSatId
  getCheckedSats} from '../../reducers/search/selectors';
import {ActionCreator} from '../../reducers/search/search';
import {SATELLITES} from '../../utils/const';


const SatList = ({// activeSatId,
  setActiveSatId, checkedSats, setCheckedSat, removeCheckedSat}) => {

  const handleToggleCheckedSat = (e, id) => {
    const value = e.target.checked;
    if (value) {
      setCheckedSat(id);
      setActiveSatId(id);
    } else {
      removeCheckedSat(id);
    }
  };

  return (
    <div className="sat-list">
      <div className="container">
        {SATELLITES.map((sat) => (<div key={sat.id} className="input-container">
          <input type="checkbox" className="sat-list-checkbox" id={sat.id}
            onChange={(e) => handleToggleCheckedSat(e, sat.id)}
            checked={checkedSats.includes(sat.id)}
          />
          <label className="sat-list-checkbox-label" htmlFor={sat.id}>{sat.name + ` (${sat.range})`}</label>
        </div>))}
      </div>
    </div>
  );
};

SatList.propTypes = {
  // activeSatId: pt.string.isRequired,
  checkedSats: pt.arrayOf(pt.string),
  setCheckedSat: pt.func.isRequired,
  removeCheckedSat: pt.func.isRequired,
  setActiveSatId: pt.func.isRequired,
};

const mapStateToProps = (state) => ({
  // activeSatId: getActiveSatId(state),
  checkedSats: getCheckedSats(state),
});

const mapDispatchToProps = (dispatch) => ({
  setActivePointerCoords(coords) {
    dispatch(ActionCreator.setActivePointerCoords(coords));
  },
  setCheckedSat(id) {
    dispatch(ActionCreator.setCheckedSat(id));
  },
  removeCheckedSat(id) {
    dispatch(ActionCreator.removeCheckedSat(id));
  },
  setActiveSatId(id) {
    dispatch(ActionCreator.setActiveSatId(id));
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(SatList);
