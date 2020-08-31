
export function geocodeAddress(geocoder, func) {
  const address = document.querySelector(`.input-place`).value;
  if (address) {
    geocoder.geocode({address}, function (results, status) {
      if (status === `OK`) {
        document.querySelector(`.input-place`).value = results[0].formatted_address;
        func(results[0].geometry.location);
      } else {
        // eslint-disable-next-line no-alert
        alert(`По вашему запросу ничего не найдено, попрбуйте ещё.` + status);
      }
    });
  }
}
