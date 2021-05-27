import React from 'react';
// Icons
import IconChangeCoordType from '../../../icons/icon-change-coord-type';
// Types / consts
import pt from 'prop-types';


// Форма для ввода данных
const CoordHeader = ({ onToogleCoordType }) => {

  return (
    <div className="title-block">
      <div className="title">КООРДИНАТЫ</div>
      <div onClick={onToogleCoordType}>
        <IconChangeCoordType fill={`#999999`} width={`12px`} height={`12px`} />
      </div>
    </div>
  );
};

CoordHeader.propTypes = {
  onToogleCoordType: pt.func.isRequired,
};

export default CoordHeader;
