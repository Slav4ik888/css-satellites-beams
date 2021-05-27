import React from 'react';
import pt from 'prop-types';


const IconChangeCoordType = ({fill, height, width}) => {
  // console.log('fill: ', fill);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} focusable="false" viewBox="0 0 12 12">
        <path fill={fill} stroke="currentColor" strokeLinecap="round" d="M7 1L.5 7.5m11-3L5 11M3.5.5H7c.3 0 .5.2.5.5v3.5m1 7H5c-.3 0-.5-.2-.5-.5V7.5"/>
      </svg>
      {/* <svg height={height} width={width} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z" fill={fill} fillOpacity=".7"/></svg> */}
    </>
  );
};

IconChangeCoordType.propTypes = {
  fill: pt.string.isRequired,
  height: pt.string.isRequired,
  width: pt.string.isRequired,
};


export default IconChangeCoordType;
