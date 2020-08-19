

const textareaSubmit = document.querySelector(`.textarea-submit`);
const textareaInput = document.querySelector(`.textarea-input`);
const view = document.querySelector(`.view`);


textareaSubmit.addEventListener(`click`, () => {
  let value = textareaInput.value;
  console.log('value: ', value);
  let lat, lng;
  let arr = [];

  while (value) {
    lat = value.slice(0, value.indexOf(`,`) );
    console.log('lat: ', lat);
    value = value.slice(value.indexOf(`,`) + 1 ); // удаляем его из строки
    lng = value.slice(0, value.indexOf(`,`) );
    console.log('lng: ', lng);
    value = value.slice(value.indexOf(`,`) + 3 ); // удаляем его из строки и следующий 0
    arr.push({lat, lng});
  }

  // Создаём значения
  view.textContent = ``;
  // view.innerHTML = arr.map(({lat, lng}) => `{lat: ${lat}, lng: ${lng}} <br/>`);
  view.innerHTML = arr.map(({lat, lng}) => {
    if (lat || lng) {
      return `{lat: ${lat}, lng: ${lng}}`;
    }
  });

});







