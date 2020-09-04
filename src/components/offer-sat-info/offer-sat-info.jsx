import React from 'react';
import pt from 'prop-types';
import {coordsType} from '../../utils/prop-types-templates';

import {calcAngleGuidance, calcAzimut} from '../../utils/calculation';
import {SATELLITES} from '../../utils/const';


const OfferSatInfo = ({satId, selectedCoords}) => {
  const sat = SATELLITES.find((it) => it.id === satId);
  const satLng = sat.coordsSat.lng;
  const mLng = selectedCoords.lng;
  const mLat = selectedCoords.lat;
  const angleGuidance = calcAngleGuidance(satLng, mLng, mLat);
  const azimut = calcAzimut(satLng, mLng, mLat);
  const satName = sat.name;
  const range = sat.range;

  return (
    <div className="offerSatInfo">
      <div className="satTitle">
        <div className="box">
          <div className="title">СПУТНИК</div>
          <div className="data">{`${satName} (${range})`}</div>
        </div>
      </div>
      <div className="box">
        <div className="title">УГОЛ МЕСТА</div>
        <div className="data">{angleGuidance}</div>
      </div>
      <div className="box">
        <div className="title">АЗИМУТ</div>
        <div className="data">{azimut}</div>
      </div>
    </div>
  );
};

OfferSatInfo.propTypes = {
  satId: pt.string.isRequired,
  selectedCoords: pt.shape(coordsType).isRequired,
};


export default OfferSatInfo;
