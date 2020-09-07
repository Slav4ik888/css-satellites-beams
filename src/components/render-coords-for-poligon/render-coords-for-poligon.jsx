import React from 'react';
import pt from 'prop-types';

import {coordsType} from '../../utils/prop-types-templates';

// Рисует полигон
const RenderCoordsForPoligon = ({coords}) => {
  const startStr = `[`;
  const endStr = coords && coords.length && `{lat: ${coords[0].lat}, lng: ${coords[0].lng}}],`;
  return (
    <div className="view-cover">
      <div className="view-container">
        {startStr}
        {coords.map((it) => `{lat: ${it.lat}, lng: ${it.lng}}, `)}
        {endStr}
      </div>
    </div>
  );
};

RenderCoordsForPoligon.propTypes = {
  coords: pt.arrayOf(pt.shape(coordsType)).isRequired,
};

export default RenderCoordsForPoligon;
