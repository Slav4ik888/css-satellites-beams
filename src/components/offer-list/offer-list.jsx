import React from 'react';
import {connect} from 'react-redux';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';

import OfferSatInfo from '../offer-sat-info/offer-sat-info';

import {getCheckedSats, getActivePointerCoords, getAllResultSats} from '../../reducers/search/selectors';


const OfferList = ({checkedSats, activePointerCoords, allResultSats}) => {
  if (!allResultSats.length || !checkedSats.length) return null;

  return (
    <div className="offerList">
      <div className="container">
        {
          checkedSats.map((item) => <OfferSatInfo
            key={item}
            satId={item}
            selectedCoords={activePointerCoords}
            allResultSats={allResultSats}
          />)
        }
      </div>
    </div>
  );
};

OfferList.propTypes = {
  checkedSats: pt.arrayOf(pt.string),
  activePointerCoords: pt.shape(coordsType).isRequired,
  allResultSats: pt.array.isRequired,
};

const mapStateToProps = (state) => ({
  checkedSats: getCheckedSats(state),
  activePointerCoords: getActivePointerCoords(state),
  allResultSats: getAllResultSats(state),

});

// const mapDispatchToProps = (dispatch) => ({
//   setActivePointerCoords(coords) {
//     dispatch(ActionCreator.setActivePointerCoords(coords));
//   },
// });

export default connect(mapStateToProps)(OfferList);
