// SATBEAMS

export const satUrl = `http://maps.satbeams.com/!ajax/displaymap?hsize=570&vsize=400&norad=27528&beam=3&lat=38&lng=0&marker_lat=38&marker_lng=0&zoom=2&minEIRP=42&levels=2&infowindow=1&direction=1&limits=1&marker=1&mapstyle=2&GMAK=${GMAK}`;

export const getFromSatBeamsData = (url) => {
  return fetch(url)
    .then(response => {
      console.log('response: ', response);
      response.json()
      console.log('response.json(): ', response.json());
    })
    // .then(res => res.DATA777);
};

// getFromSatBeamsData();