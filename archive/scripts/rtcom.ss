// eslint-disable-next-line strict
'use strict';
kkkjjj
let _typeof = typeof Symbol === `function` && typeof Symbol.iterator === `symbol` ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === `function` && obj.constructor === Symbol && obj !== Symbol.prototype ? `symbol` : typeof obj;
};

$(document).ready(function ($) {
  let $btnDetailed = $(`.coverage-satellite__footer-link--detailed`);

  // $item = $('.coverage-satellite__item'),
  let itemClass = `coverage-satellite__item`;
  let openItemClass = `coverage-satellite__item--opened`;
  let helperOpenItemClass = `coverage-satellite__item--helper-opened`;
  let $option = $(`.coverage-satellite__option`);

  $option.each(function (i, el) {
    let $el = $(el);
    $el.css(`maxHeight`, $el.height());
  });
  $btnDetailed.click(function () {
    let $this = $(this);
    let $currentItem = $this.closest(`.` + itemClass);

    if ($currentItem.hasClass(openItemClass)) {
      // т.е. блок был открыт и сейчас закрыватся
      $currentItem.removeClass(openItemClass);
      setTimeout(function () {
        $currentItem.removeClass(helperOpenItemClass);
      }, 400);
    } else {
      $currentItem.addClass(openItemClass);
      $currentItem.addClass(helperOpenItemClass);
    }
  });

  $(`.coverage-choice-open`).click(function () {
    $(`.coverage-choice`).addClass(`coverage-choice--opened`);
    $(`body`).addClass(`overflow-hidden`);
  });

  $(`.coverage-choice-close`).click(function () {
    $(`.coverage-choice`).removeClass(`coverage-choice--opened`);
    $(`body`).removeClass(`overflow-hidden`);
  });

  // тут данные
  let Store = {
    diapasons: {}
  };

  (function () {

    if (!$(`#coverage-map`).length) return;

    let Mytypes = Object.entries(coverageData);
    // console.log(Mytypes);
    // console.log(coverageData);
    let mapId = `coverage-map`;
    ymaps.ready(init);

    function init() {
      // let suggestView1 = new ymaps.SuggestView('coverage-form__search');

      let myMap = new ymaps.Map(mapId, {
        center: [59.994675, 29.702651], // Москва
        zoom: 3,
        controls: [`zoomControl`]
      }, {
        // Будет производиться поиск по топонимам и организациям.
        searchControlProvider: `yandex#search`
      });
      myMap.behaviors.disable(`scrollZoom`);

      window.sputnikPlace = false;
      window.resultKml = ``;
      window.resultKmlInit = ``;
      window.checkedId = [];

      // метка

      /* Начальный адрес метки */

      let address = `Россия, Москва, Тверская, д. 7`;

      ymaps.geocode(address).then(function (res) {

        let coord = res.geoObjects.get(0).geometry.getCoordinates();

        window.myPlacemark = new ymaps.Placemark(coord, null, {

          preset: `islands#blueDotIcon`,
          draggable: true

        });

        myMap.geoObjects.add(myPlacemark);
        myMap.setCenter(coord, 2);

        // Создадим ломаную.
        let StartCoord = myPlacemark.geometry.getCoordinates();

        let polyline = new ymaps.geometry.LineString([[StartCoord[0], StartCoord[1]], [0, 55]], {
          draggable: false,
          strokecolor: `#000000`,
          strokewidth: 4,
          geodesic: true
        });
        // Добавляем линию на карту.
        let geoLine = new ymaps.GeoObject({
          geometry: polyline
        });
        myMap.geoObjects.add(geoLine);

        /* иконка спутника */

        let SputnikIcon = new ymaps.Placemark([0, 55], {}, {
          iconLayout: `default#image`,
          iconImageHref: `/local/static/build/img/svg/choice.svg`,
          iconImageSize: [32, 32],
          iconImageOffset: [-17, -16]
        });

        myMap.geoObjects.add(SputnikIcon);

        //* *************

        // Слушаем клик на карте.
        myMap.events.add(`click`, function(e) {
          // console.log(coordsClick);
          let coordsClick = e.get(`coords`);
          console.log(coordsClick);
          console.log(`map_click`);

          // Если метка уже создана – просто передвигаем ее.


          // не понял зачем нужна эта функция здесь, грохнул
          /* setTimeout(function () {
                        let haveChecked = false;
                        $('.switch.coverage-choice__item-switch input[type="checkbox"]:checked').each(function () {
                            haveChecked = true;
                        });
                        if (!haveChecked) {*/
          /* myMap.geoObjects.remove(resultKmlInit);
                    ymaps.geoQuery(resultKmlInit).each(function (pm) {
                        console.log(pm);
                        myMap.geoObjects.remove(pm);
                        // resultKmlInit = resultKmlInit.remove(pm);
                    });

                    }, 500);*/

          // Проверяем объекты, уничтожаем объекты которые являются зонами со strokeOpacity
          let obj = [];
          myMap.geoObjects.each(function (pm) {
            if (pm.options.get(`strokeOpacity`) > 0) {
              console.log(pm.options.get(`strokeOpacity`));
              obj.push(pm);
            }
          });
          obj.map(function (item) {
            myMap.geoObjects.remove(item);
          });

          // throw new Error("stop");
          // Перерисовываем после этого все нужные объекты
          /* setTimeout(function () {*/
          resultKml = ``;
          // checkedInit = true;
          resultKmlInit = ymaps.geoQuery(allSputnikArray).addTo(myMap.geoObjects);
          $(`.coverage-satellite__item`).show();
          /* }, 10000);*/

          if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coordsClick);
          }
          // Если нет – создаем.
          // }else {
          //     myPlacemark = createPlacemark(coordsClick);
          //     myMap.geoObjects.add(myPlacemark);
          //     // Слушаем событие окончания перетаскивания на метке.
          //     myPlacemark.events.add('dragend', function () {
          //         getAddress(myPlacemark.geometry.getCoordinates());
          //     });
          // }
          // getAddress(coords);
        });

        myPlacemark.events.add(`geometrychange`, function (e) {

          let cord = e.get(`target`).geometry.getCoordinates();

          if (resultKml != ``) {

            let objectsInsideCircle = resultKml.searchContaining(myPlacemark);

            objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
            objectsInsideCircle.setOptions(`zIndex`, -9);
            objectsInsideCircle.setOptions(`strokeOpacity`, 1);

            let removeResultKml = resultKml.remove(objectsInsideCircle);
            removeResultKml.setOptions(`fillOpacity`, 0.05);
            removeResultKml.setOptions(`zIndex`, -1);
            removeResultKml.setOptions(`strokeOpacity`, 0.7);

            $(`.coverage-satellite__item`).hide();
            ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
              sputnikPlace = pm.properties.get(`name`);
              sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
              $(`.coverage-satellite__item`).each(function (indx, element) {
                if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                  $(this).show();
                } else {
                  // $(this).hide();
                }
              });
            });

            /**/
            if (myPlacemark) {
              objectsInsideCircle = resultKmlInit.searchContaining(myPlacemark);

              $(`.coverage-choice__item`).find(`input`).prop(`checked`, false);
              if (checkedId && checkedId.length > 0) {
                checkedId.map(function (item) {
                  $(`.coverage-choice__item[data-id='` + item + `']`).find(`input`).prop(`checked`, true);
                });
              }

              ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                let nameChangeSp = pm.properties.get(`name`);
                $(`.coverage-choice__item[data-id='` + nameChangeSp + `']`).find(`input`).prop(`checked`, true);
              });

              objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
              objectsInsideCircle.setOptions(`zIndex`, -9);
              objectsInsideCircle.setOptions(`strokeOpacity`, 1);

              let removeResultKmlInit = resultKmlInit.remove(objectsInsideCircle);
              removeResultKmlInit.setOptions(`fillOpacity`, 0);
              removeResultKmlInit.setOptions(`zIndex`, -1);
              removeResultKmlInit.setOptions(`strokeOpacity`, 0.000001);

              $(`.coverage-satellite__item`).hide();
              ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                sputnikPlace = pm.properties.get(`name`);
                sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
                $(`.coverage-satellite__item`).each(function (indx, element) {
                  if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                    $(this).show();
                  } else {
                    // $(this).hide();
                  }
                });
              });
            }
          } else if (resultKmlInit != ``) {

            let objectsInsideCircle = resultKmlInit.searchContaining(myPlacemark);
            $(`.coverage-choice__item`).find(`input`).prop(`checked`, false);
            ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
              let nameChangeSp = pm.properties.get(`name`);
              $(`.coverage-choice__item[data-id='` + nameChangeSp + `']`).find(`input`).prop(`checked`, true);
            });

            objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
            objectsInsideCircle.setOptions(`zIndex`, -9);
            objectsInsideCircle.setOptions(`strokeOpacity`, 1);

            let removeResultKmlInit = resultKmlInit.remove(objectsInsideCircle);
            removeResultKmlInit.setOptions(`fillOpacity`, 0);
            removeResultKmlInit.setOptions(`zIndex`, -1);
            removeResultKmlInit.setOptions(`strokeOpacity`, 0.000001);

            $(`.coverage-satellite__item`).hide();
            ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
              sputnikPlace = pm.properties.get(`name`);
              sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
              $(`.coverage-satellite__item`).each(function (indx, element) {
                if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                  $(this).show();
                } else {
                  // $(this).hide();
                }
              });
            });
          }

          $(`#point_lat`).val(cord[0].toFixed(4));
          $(`#point_lng`).val(cord[1].toFixed(4));
          if (sputnikPlace) {

            Mytypes.map(function (item, index) {

              let angle = Calculator.angle(parseInt(item[1].standing_coords), cord[0], cord[1]);

              // antenna = Calculator.antenna(1216, angle),
              let azimuth = Calculator.azimuth(parseInt(item[1].standing_coords), cord[0], cord[1]);
              let distance = Calculator.distance(parseInt(item[1].standing_coords), cord[0], cord[1]);
              let angleTextBox = $(`.coverage-satellite__title:contains("` + item[1].name + `")`).parent().find($(`.coverage-satellite__option-key:contains("Угол места")`)).parent().find(`.coverage-satellite__option-value`);

              // antennaTextBox = $('.coverage-satellite__title:contains("' + sputnikName + '")').parent().find($('.coverage-satellite__option-key:contains("Размер антенны")')).parent().find(".coverage-satellite__option-value"),
              let azimuthTextBox = $(`.coverage-satellite__title:contains("` + item[1].name + `")`).parent().find($(`.coverage-satellite__option-key:contains("Азимут")`)).parent().find(`.coverage-satellite__option-value`);
              let distanceTextBox = $(`.coverage-satellite__title:contains("` + item[1].name + `")`).parent().find($(`.coverage-satellite__option-key:contains("Расстояние")`)).parent().find(`.coverage-satellite__option-value`);

              angleTextBox.text(angle);
              // antennaTextBox.text(antenna);
              azimuthTextBox.text(azimuth);
              distanceTextBox.text(distance);
            });
            // let angle = Calculator.angle(sputnikPlace, cord[0], cord[1]),
            //     // antenna = Calculator.antenna(1216, angle),
            //     azimuth = Calculator.azimuth(sputnikPlace, cord[0], cord[1]),
            //     distance = Calculator.distance(sputnikPlace, cord[0], cord[1]),
            //     angleTextBox = $('.coverage-satellite__title:contains("' + sputnikName + '")').parent().find($('.coverage-satellite__option-key:contains("Угол места")')).parent().find(".coverage-satellite__option-value"),
            //     // antennaTextBox = $('.coverage-satellite__title:contains("' + sputnikName + '")').parent().find($('.coverage-satellite__option-key:contains("Размер антенны")')).parent().find(".coverage-satellite__option-value"),
            //     azimuthTextBox = $('.coverage-satellite__title:contains("' + sputnikName + '")').parent().find($('.coverage-satellite__option-key:contains("Азимут")')).parent().find(".coverage-satellite__option-value"),
            //     distanceTextBox = $('.coverage-satellite__title:contains("' + sputnikName + '")').parent().find($('.coverage-satellite__option-key:contains("Расстояние")')).parent().find(".coverage-satellite__option-value");
            //
            // angleTextBox.text(angle);
            // // antennaTextBox.text(antenna);
            // azimuthTextBox.text(azimuth);
            // distanceTextBox.text(distance);
          }

          // console.log('%c'+ angle +'', 'background: red; color: blue; font-size: 48px');

          geoLine.geometry.splice(0, 2, [cord[0], cord[1]], [0, sputnikPlace]);
          SputnikIcon.geometry.setCoordinates([0, sputnikPlace]);
        });

        myPlacemark.events.add(`dragend`, function (e) {
          myPlacemark.events.fire(`click`, {
            position: myPlacemark.geometry.getCoordinates()
          });
          // throw new Error("stop");
          let coords = myPlacemark.geometry.getCoordinates();
          console.log(coords);
          // Область видимости геообъекта.
          //  bounds = res.geoObjects.get(0).properties.get('boundedBy');

          if (myPlacemark) {
            myPlacemark.geometry.setCoordinates(coords);
            console.log(`Есть метка`);
          }
          // Если нет – создаем.
          else {
            console.log(`Нет метки`);
            myPlacemark = createPlacemark(coords);
            myMap.geoObjects.add(myPlacemark);
            // Слушаем событие окончания перетаскивания на метке.
            myPlacemark.events.add(`dragend`, function () {
              getAddress(myPlacemark.geometry.getCoordinates());
            });
          }

          let obj = [];
          myMap.geoObjects.each(function (pm) {
            if (pm.options.get(`strokeOpacity`) > 0) {
              obj.push(pm);
            }
          });
          obj.map(function (item) {
            myMap.geoObjects.remove(item);
          });
          // throw new Error("stop");
          // resultKml = '';
          resultKmlInit = ``;
          resultKml = ymaps.geoQuery(allSputnikArray).addTo(myMap.geoObjects);
          $(`.coverage-satellite__item`).show();

          // МЕСТОПОЛОЖЕНИЕ ЕСЛИ НУЖНО БУДЕТ ВЫВОДИТЬ В ТЕКСТОВОЕ ПОЛЕ
          ymaps.geocode(coords).then(function (res) {
            let data = res.geoObjects.get(0).properties.getAll();
            $(`#coverage-form__search`).val(data.text);
          });
        });

        // ПОИСК ИЗ ИНПУТА ПО КАРТЕ
        $(`.coverage-form__btn`).on(`click`, function (e) {

          let placeSearch = $(`#coverage-form__search`).val().toString();
          let placeCoord = [+$(`#point_lat`).val(), +$(`#point_lng`).val()];

          if (placeSearch !== ``) {

            ymaps.geocode(placeSearch, {
              results: 1
            }).then(function (res) {
              // Координаты геообъекта.
              let coords = res.geoObjects.get(0).geometry.getCoordinates();
              // Область видимости геообъекта.
              //  bounds = res.geoObjects.get(0).properties.get('boundedBy');

              if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
              }
              // Если нет – создаем.
              else {
                myPlacemark = createPlacemark(coords);
                myMap.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add(`dragend`, function () {
                  getAddress(myPlacemark.geometry.getCoordinates());
                });
              }

              // myMap.setBounds(bounds, {
              //     // Проверяем наличие тайлов на данном масштабе.
              //     checkZoomRange: false
              // });

              myMap.setCenter(coords, 3, {
                checkZoomRange: true
              });

              // myMap.setBounds(myPlacemark.getBounds());
            });
          } else {
            myPlacemark.geometry.setCoordinates(placeCoord);
            myMap.setCenter(placeCoord, 3, {
              checkZoomRange: true
            });
          }
        });

        /* ЗАГРУЗКА KML ПРИ ПЕРВОЙ ИНИЦИАЛИЗАЦИИ КАРТЫ*/
        function loadKmlInit(url, id) {
          ymaps.geoXml.load(url).then(function (res) {
            res.geoObjects.each(function (obj) {
              obj.options.set({preset: `islands#blackCircleIcon`});
              if (!obj.geometry) {
                obj.each(function (obj, index) {
                  obj.options.set({
                    strokeWidth: 3,
                    fillOpacity: 0,
                    strokeOpacity: 0.000001,
                    zIndex: -1
                  });
                });
              }
            });
            onGeoXmlLoadItin(res, id);
          }).catch(function (error) {
            return console.log(error);
          });
        }

        function onGeoXmlLoadItin(res, sputnik) {

          if (resultKmlInit != ``) {
            let mmHHH = ymaps.geoQuery(res.geoObjects).setProperties(`name`, sputnik);
            resultKmlInit = resultKmlInit.add(mmHHH).addTo(myMap.geoObjects);
            resultKmlInit.setOptions(`interactivityModel`, `default#silent`);
          } else {
            resultKmlInit = ymaps.geoQuery(res.geoObjects).addTo(myMap.geoObjects);
            resultKmlInit.setProperties(`name`, sputnik);
            resultKmlInit.setOptions(`interactivityModel`, `default#silent`);
          }

          $(`.coverage-choice__item[data-id='` + sputnik + `']`).attr(`data-index-map`, sputnik);

          if (res.mapState) {
            res.mapState.applyToMap(myMap);
          } else {
            // myMap.setBounds(res.geoObjects.getBounds());
          }
          if (resultKmlInit.isReady) {

            if (resultKml != ``) {
              let objectsInsideCircle = resultKml.searchContaining(myPlacemark);

              ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                let nameChangeSp = pm.properties.get(`name`);
                $(`.coverage-choice__item[data-id='` + nameChangeSp + `']`).find(`input`).prop(`checked`, true);
              });

              objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
              objectsInsideCircle.setOptions(`zIndex`, -9);
              objectsInsideCircle.setOptions(`strokeOpacity`, 1);

              let removeResultKml = resultKml.remove(objectsInsideCircle);
              removeResultKml.setOptions(`fillOpacity`, 0);
              removeResultKml.setOptions(`zIndex`, -1);
              removeResultKml.setOptions(`strokeOpacity`, 0.000001);

              $(`.coverage-satellite__item`).hide();
              ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                sputnikPlace = pm.properties.get(`name`);
                sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
                $(`.coverage-satellite__item`).each(function (indx, element) {
                  if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                    $(this).show();
                  } else {
                    // $(this).hide();
                  }
                });
              });
            } else if (resultKmlInit != ``) {
              window.allSputnikArray = resultKmlInit;
              let objectsInsideCircle = resultKmlInit.searchContaining(myPlacemark);

              ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                let nameChangeSp = pm.properties.get(`name`);
                $(`.coverage-choice__item[data-id='` + nameChangeSp + `']`).find(`input`).prop(`checked`, true);
              });

              objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
              objectsInsideCircle.setOptions(`zIndex`, -9);
              objectsInsideCircle.setOptions(`strokeOpacity`, 1);

              let removeResultKmlInit = resultKmlInit.remove(objectsInsideCircle);
              removeResultKmlInit.setOptions(`fillOpacity`, 0);
              removeResultKmlInit.setOptions(`zIndex`, -1);
              removeResultKmlInit.setOptions(`strokeOpacity`, 0.000001);

              $(`.coverage-satellite__item`).hide();
              ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                sputnikPlace = pm.properties.get(`name`);
                sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
                $(`.coverage-satellite__item`).each(function (indx, element) {
                  if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                    $(this).show();
                  } else {
                    // $(this).hide();
                  }
                });
              });
            }
          }
        }

        // Обработчик загрузки XML-файлов.

        let MytypesInit = Mytypes.filter(function (item) {
          /* UPD 16.07.2020 Выводится должны спутники из всех диапазонов при клике на карту, раньше не выводились с id группы равным 10*/
          return item[1].group !== `10`;
        });
        // console.log(MytypesInit);

        MytypesInit.map(function (item, index) {
          let sputnikIdInit = item[1].id;
          loadKmlInit(item[1].files, sputnikIdInit);
          if (Mytypes.length - 1 === index) {
            window.allSpLoad = true;
          } else {
            window.allSpLoad = false;
          }
        });

        /* ЗАГРУЗКА KML ПРИ ПЕРВОЙ ИНИЦИАЛИЗАЦИИ КАРТЫ*/
      });

      window.checkedInit = true;

      $(`.switch.coverage-choice__item-switch input[type="checkbox"]`).click(function () {
        // console.log(myMap.geoObjects.removeAll());

        let _this = this;
        if (checkedInit) {
          $(`.coverage-choice__item`).find(`input`).prop(`checked`, false);
          $(this).prop(`checked`, true);
          checkedInit = false;
        }
        /* setTimeout(function () {
                    let haveChecked = false;
                    $('.switch.coverage-choice__item-switch input[type="checkbox"]:checked').each(function () {
                        haveChecked = true;
                    });
                    if (!haveChecked) {
                        resultKml = '';
                        checkedInit = true;
                        // console.log(allSputnikArray);
                        resultKmlInit = ymaps.geoQuery(allSputnikArray).addTo(myMap.geoObjects);
                        $('.coverage-satellite__item').show();
                    }
                }, 500);*/

        if ($(this).is(`:checked`)) {

          if (resultKmlInit != ``) {

            ymaps.geoQuery(resultKmlInit).each(function (pm) {
              myMap.geoObjects.remove(pm);
              resultKmlInit = resultKmlInit.remove(pm);
            });

            resultKmlInit = resultKmlInit.remove(resultKmlInit);
            myMap.geoObjects.remove(resultKmlInit);
          }

          if (_typeof($(this).data(`group`)) !== (typeof undefined === `undefined` ? `undefined` : _typeof(undefined)) && $(this).data(`group`) !== false) {
          }
          else
          {
            window.sputnikId = $(this).parents(`.coverage-choice__item`).data(`id`);
            window.sputnikUrl = coverageData[sputnikId].files;
            window.sputnikName = coverageData[sputnikId].name;
            window.sputnikPlace = parseInt(coverageData[sputnikId].standing_coords);
            let cordCheck = myPlacemark.geometry.getCoordinates();
            if (sputnikPlace) {

              let angle = Calculator.angle(sputnikPlace, cordCheck[0], cordCheck[1]);

              // antenna = Calculator.antenna(1216, angle),
              let azimuth = Calculator.azimuth(sputnikPlace, cordCheck[0], cordCheck[1]);
              let distance = Calculator.distance(sputnikPlace, cordCheck[0], cordCheck[1]);
              let angleTextBox = $(`.coverage-satellite__title:contains("` + sputnikName + `")`).parent().find($(`.coverage-satellite__option-key:contains("Угол места")`)).parent().find(`.coverage-satellite__option-value`);

              // antennaTextBox = $('.coverage-satellite__title:contains("' + sputnikName + '")').parent().find($('.coverage-satellite__option-key:contains("Размер антенны")')).parent().find(".coverage-satellite__option-value"),
              let azimuthTextBox = $(`.coverage-satellite__title:contains("` + sputnikName + `")`).parent().find($(`.coverage-satellite__option-key:contains("Азимут")`)).parent().find(`.coverage-satellite__option-value`);
              let distanceTextBox = $(`.coverage-satellite__title:contains("` + sputnikName + `")`).parent().find($(`.coverage-satellite__option-key:contains("Расстояние")`)).parent().find(`.coverage-satellite__option-value`);

              angleTextBox.text(angle);
              azimuthTextBox.text(azimuth);
              distanceTextBox.text(distance);

              $(`.coverage-satellite__item`).hide();

              // $('.coverage-satellite__item').each(function(indx, element){
              //             if($(this).attr("sputnik-id") === ''+ sputnikId +'') {
              //                 $(this).show();
              //             } else {
              //                 // $(this).hide();
              //             }
              // });

              $(`.switch.coverage-choice__item-switch input[type="checkbox"]:checked`).each(function () {

                let spId = $(this).parents(`.coverage-choice__item`).data(`id`);

                $(`.coverage-satellite__item`).each(function (indx, element) {
                  if ($(this).attr(`sputnik-id`) === `` + spId + ``) {
                    $(this).show();
                  } else {
                    // $(this).hide();
                  }
                });
              });
            }
          }

          if (_typeof($(this).data(`group`)) !== (typeof undefined === `undefined` ? `undefined` : _typeof(undefined)) && $(this).data(`group`) !== false) {
            // console.log($(this).data('group'));
            // console.log(groupSpArray);
            /* ЗАГРУЗКА KML ПРИ ПЕРВОЙ ИНИЦИАЛИЗАЦИИ КАРТЫ*/
            let loadKmlInit = function loadKmlInit(url, id) {
              ymaps.geoXml.load(url).then(function (res) {
                // let arr = ["c93636", "136b01", "695684", "000000", "c93636" ];

                res.geoObjects.each(function (obj) {
                  obj.options.set({preset: `islands#blackCircleIcon`});
                  if (!obj.geometry) {
                    obj.each(function (obj, index) {
                      obj.options.set({
                        strokeWidth: 3,
                        fillOpacity: 0.3,
                        strokeOpacity: 0.1,
                        zIndex: -9
                      });
                    });
                  }
                });
                onGeoXmlLoadItin(res, id);
              }).catch(function (error) {
                return console.log(error);
              });
            };

            let onGeoXmlLoadItin = function onGeoXmlLoadItin(res, sputnik) {

              if (resultKmlInit != ``) {
                let mmHHH = ymaps.geoQuery(res.geoObjects).setProperties(`name`, sputnik);
                resultKmlInit = resultKmlInit.add(mmHHH).addTo(myMap.geoObjects);
                resultKmlInit.setOptions(`interactivityModel`, `default#silent`);
              } else {
                resultKmlInit = ymaps.geoQuery(res.geoObjects).addTo(myMap.geoObjects);
                resultKmlInit.setProperties(`name`, sputnik);
                resultKmlInit.setOptions(`interactivityModel`, `default#silent`);
              }

              $(`.coverage-choice__item[data-id='` + sputnik + `']`).attr(`data-index-map`, sputnik);

              if (res.mapState) {
                res.mapState.applyToMap(myMap);
              } else {
                // myMap.setBounds(res.geoObjects.getBounds());
              }
              if (resultKmlInit.isReady) {

                if (resultKml != ``) {
                  let objectsInsideCircle = resultKml.searchContaining(myPlacemark);

                  ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                    let nameChangeSp = pm.properties.get(`name`);
                    $(`.coverage-choice__item[data-id='` + nameChangeSp + `']`).find(`input`).prop(`checked`, true);
                  });

                  objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
                  objectsInsideCircle.setOptions(`zIndex`, -9);
                  objectsInsideCircle.setOptions(`strokeOpacity`, 1);

                  let removeResultKml = resultKml.remove(objectsInsideCircle);
                  removeResultKml.setOptions(`fillOpacity`, 0);
                  removeResultKml.setOptions(`zIndex`, -1);
                  removeResultKml.setOptions(`strokeOpacity`, 0.000001);

                  $(`.coverage-satellite__item`).hide();
                  ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                    sputnikPlace = pm.properties.get(`name`);
                    sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
                    $(`.coverage-satellite__item`).each(function (indx, element) {
                      if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                        $(this).show();
                      } else {
                        // $(this).hide();
                      }
                    });
                  });
                } else if (resultKmlInit != ``) {
                  window.allSputnikArray = resultKmlInit;
                  let objectsInsideCircle = resultKmlInit;

                  ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                    let nameChangeSp = pm.properties.get(`name`);
                    $(`.coverage-choice__item[data-id='` + nameChangeSp + `']`).find(`input`).prop(`checked`, true);
                  });

                  objectsInsideCircle.setOptions(`fillOpacity`, 0.1);
                  objectsInsideCircle.setOptions(`zIndex`, -9);
                  objectsInsideCircle.setOptions(`strokeOpacity`, 1);

                  // let removeResultKmlInit = resultKmlInit.remove(objectsInsideCircle);
                  // removeResultKmlInit.setOptions('fillOpacity', 0);
                  // removeResultKmlInit.setOptions('zIndex', -1);
                  // removeResultKmlInit.setOptions('strokeOpacity', 0.000001);

                  $(`.coverage-satellite__item`).hide();
                  ymaps.geoQuery(objectsInsideCircle).each(function (pm) {
                    sputnikPlace = pm.properties.get(`name`);
                    sputnikPlace = parseInt(coverageData[pm.properties.get(`name`)].standing_coords);
                    $(`.coverage-satellite__item`).each(function (indx, element) {
                      if ($(this).attr(`sputnik-id`) === `` + pm.properties.get(`name`) + ``) {
                        $(this).show();
                      } else {
                        // $(this).hide();
                      }
                    });
                  });
                }
              }
            };

            let groupSpArray = Mytypes.filter(function (item) {
              return +item[1].group === +$(_this).data(`group`);
            });
            $(`input[data-group]`).each(function () {
              let _this2 = this;

              if ($(this).is(`:checked`)) {
                let groupOld = Mytypes.filter(function (item) {
                  return +item[1].group === +$(_this2).data(`group`);
                });
                groupSpArray = groupSpArray.concat(groupOld);
              }
            });
            groupSpArray.map(function (item, index) {

              let sputnikIdInit = item[1].id;
              loadKmlInit(item[1].files, sputnikIdInit);
              if (groupSpArray.length - 1 === index) {
                window.allSpLoad = true;
              } else {
                window.allSpLoad = false;
              }
            });
          } else {
            window.checkedId.push(sputnikId);
            loadKml(sputnikUrl);
            // throw new Error("stop");
            /* UPD 16.07.2020 Не отрисовываем заново области на карте*/
            // resultKmlInit = ymaps.geoQuery(allSputnikArray).addTo(myMap.geoObjects);
          }
        } else {

          let delIndex = $(this).parents(`.coverage-choice__item`).attr(`data-index-map`);
          checkedId = checkedId.filter(function (item) {
            return item !== +delIndex;
          });

          // myMap.geoObjects.get(delIndex).options.set({visible: false});
          // let resultRemoveCheck = resultKml.search('properties.name="'+ delIndex +'"').removeFromMap(myMap);
          // resultKml.add(mmHHH).addTo(myMap.geoObjects);
          ymaps.geoQuery(resultKml).each(function (pm) {
            // console.log(pm.properties.get('name'));
            if (pm.properties.get(`name`) == `` + delIndex + ``) {
              myMap.geoObjects.remove(pm);
              resultKml = resultKml.remove(pm);
            }
          });

          $(`.coverage-satellite__item`).each(function (indx, element) {
            if ($(this).attr(`sputnik-id`) === `` + delIndex + ``) {
              $(this).hide();
            }
          });

          if (_typeof($(this).data(`group`)) !== (typeof undefined === `undefined` ? `undefined` : _typeof(undefined)) && $(this).data(`group`) !== false) {
            let groupSpArrayDel = Mytypes.filter(function (item) {
              return +item[1].group === +$(_this).data(`group`);
            });

            groupSpArrayDel.map(function (item, index) {
              setTimeout(function () {
                $(`.coverage-choice__item[data-id=` + item[1].id + `]`).find(`input`).prop(`checked`, false);
              }, 600);

              ymaps.geoQuery(resultKmlInit).each(function (pm) {
                if (pm.properties.get(`name`) == `` + item[1].id + ``) {
                  myMap.geoObjects.remove(pm);
                  resultKmlInit = resultKmlInit.remove(pm);
                }
              });

              $(`.coverage-satellite__item`).each(function (indx, element) {
                if ($(this).attr(`sputnik-id`) === `` + item[0].id + ``) {
                  $(this).hide();
                }
              });
            });
          }
        }
      });

      function loadKml(url) {
        ymaps.geoXml.load(url).then(function (res) {
          // let arr = ["c93636", "136b01", "695684", "000000", "c93636" ];

          res.geoObjects.each(function (obj) {
            obj.options.set({preset: `islands#blackCircleIcon`});
            if (!obj.geometry) {
              obj.each(function (obj, index) {
                obj.options.set({strokeWidth: 3, fillOpacity: 0.1, strokeOpacity: 0.6, zIndex: -1});
              });
            }
          });
          onGeoXmlLoad(res, sputnikId);
        }).catch(function (error) {
          return console.log(error);
        });
      }

      // Обработчик загрузки XML-файлов.
      function onGeoXmlLoad(res, sputnik) {

        if (resultKml != ``) {
          let mmHHH = ymaps.geoQuery(res.geoObjects).setProperties(`name`, sputnik);
          resultKml = resultKml.add(mmHHH).addTo(myMap.geoObjects);
          resultKml.setOptions(`interactivityModel`, `default#silent`);
        } else {
          resultKml = ymaps.geoQuery(res.geoObjects).addTo(myMap.geoObjects);
          resultKml.setProperties(`name`, sputnik);
          resultKml.setOptions(`interactivityModel`, `default#silent`);
        }

        $(`.coverage-choice__item[data-id='` + sputnik + `']`).attr(`data-index-map`, sputnik);

        if (res.mapState) {
          res.mapState.applyToMap(myMap);
        } else {
          // myMap.setBounds(res.geoObjects.getBounds());
        }
      }
    };
  })();

  // для расчетов величин относительно позиции на карте
  let Calculator = {
    angle: function angle(degree, lat, lng) {
      let toRad = Math.PI / 180.0;
      let toDeg = 180.0 / Math.PI;
      let elevation = degree - lng;

      while (elevation < -180) {
        elevation += 360;
      }
      while (elevation > 180) {
        elevation -= 360;
      }
      elevation = Math.atan((Math.cos(Math.acos(Math.cos(elevation * toRad) * Math.cos(lat * toRad))) - 0.1513) / Math.sin(Math.acos(Math.cos(elevation * toRad) * Math.cos(lat * toRad)))) * toDeg;
      return elevation.toFixed(2);
    },
    // поиск доступных антенн в диапазоне
    antenna: function antenna(diapason, angle) {
      let result = false;

      if (Store.diapasons[diapason] === undefined) return result;

      if (Store.diapasons[diapason].possibility.length == 0) return result;

      angle = parseInt(angle);
      Store.diapasons[diapason].possibility.forEach(function (antenna) {
        if (parseInt(antenna.degree_from) <= angle && angle <= parseInt(antenna.degree_to)) {
          if (!result || result > parseFloat(antenna.diametr)) result = parseFloat(antenna.diametr);
        }
      });
      if (result == false) {
        return `<a href="#" class="btn--query--add">Уточняйте</a>`;
      } else {
        return result + ` м`;
      }
    },
    polarity: function polarity(degree, lat, lng) {
      let toRad = Math.PI / 180.0;

      let polarity = Math.atan(Math.sin(lng * toRad - degree * toRad) / Math.tan(lat * toRad)) / toRad;
      return polarity.toFixed(2) + ` °`;
    },
    azimuth: function azimuth(degree, lat, lng) {
      let toRad = Math.PI / 180.0;
      let azimuth = (Math.PI + Math.atan(Math.tan(lng * toRad - degree * toRad) / Math.sin(lat * toRad))) / toRad;
      return azimuth.toFixed(2) + ` °`;
    },
    distance: function distance(degree, lat, lng) {
      return parseInt(6378.16 * Math.sqrt(Math.pow(42164 / 6378, 2) + 1 - 2 * (42164 / 6378) * Math.cos((lng - degree) * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)))) + ` км`;
    }
  };
});