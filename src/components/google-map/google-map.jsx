import React from 'react';


class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mapIsReady: false,
    };
  }

  componentDidMount() {
    const GMAK = `AIzaSyDN2t-jztEv0j2u-Ep3Zw9B8y0hneXCl6s`;
    const GOOGLE_MAP_SRC = `https://maps.googleapis.com/maps/api/js?key=${GMAK}`;

    const script = document.createElement(`script`);
    script.src = GOOGLE_MAP_SRC;

    script.async = true;
    script.defer = true;
    script.addEventListener(`load`, () => {
      this.setState({mapIsReady: true});
    });

    document.getElementsByTagName(`head`)[0].appendChild(script);
  }

  componentDidUpdate() {
    if (this.state.mapIsReady) {
      // Display the map
      this.map = new window.google.maps.Map(document.getElementById(`map`), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 12,
        mapTypeId: `roadmap`,
      });
      // You also can add markers on the map below
    }
  }

  render() {
    return (
      <div id="map"/>
    );
  }
}

export default GoogleMap;
