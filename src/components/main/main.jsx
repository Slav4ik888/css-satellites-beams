import React, {useState} from 'react';
import pt from 'prop-types';

import Instruction from '../instruction/instruction';
import SatList from '../sat-list/sat-list';
import FormPlaceSetup from '../form-place-setup/form-place-setup';
import GoogleMapEditBeam from '../google-map-edit-beam/google-map-edit-beam';
import GoogleMap from '../google-map/google-map';
import RenderCoordsForPoligon from '../render-coords-for-poligon/render-coords-for-poligon';
import Footer from '../footer/footer';


const Main = ({edit = false}) => {
  const [coords, setCoords] = useState([]);
  const handleSetCoord = (crds) => {
    console.log('coords: ', crds);
    setCoords(crds);
  };

  if (edit) {
    return (
      <div className="container">
        <GoogleMapEditBeam callback={handleSetCoord} />
        {coords && <RenderCoordsForPoligon coords={coords} />}
      </div>
    );
  } else {
    return (
      <div className="container">
        <Instruction />
        <FormPlaceSetup />
        <SatList />
        <GoogleMap />
        <Footer />
      </div>
    );
  }
};

Main.propTypes = {
  edit: pt.bool,
};

export default Main;
