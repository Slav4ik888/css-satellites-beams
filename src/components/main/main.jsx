import React from 'react';

import Instruction from '../instruction/instruction';
import SatList from '../sat-list/sat-list';
import FormPlaceSetup from '../form-place-setup/form-place-setup';
import GoogleMap from '../google-map/google-map';
import Footer from '../footer/footer';


const Main = () => {
  return (
    <div className="container">
      <Instruction />
      <FormPlaceSetup />
      <SatList />
      <GoogleMap />
      <Footer />
    </div>
  );
};

export default Main;
