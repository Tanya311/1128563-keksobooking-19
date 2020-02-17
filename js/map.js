// Файл map.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersFormSelect = mapDialog.querySelectorAll('.map__filters select');
  var mapFiltersFormFieldsets = mapDialog.querySelectorAll('.map__filters fieldset');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adressAdForm = adForm.querySelector('#address');

  mapFiltersFormSelect.forEach(function (select) {
    select.setAttribute('disabled', 'disabled');
  });
  mapFiltersFormFieldsets.forEach(function (fieldset) {
    fieldset.setAttribute('disabled', 'disabled');
  });
  adFormFieldsets.forEach(function (fieldset) {
    fieldset.setAttribute('disabled', 'disabled');
  });
  adressAdForm.setAttribute('readonly', 'readonly');
  adressAdForm.value = (window.data.parametrOfPins.PIN_WIDTH / 2, window.data.parametrOfPins.MAP_WIDTH - window.data.parametrOfPins.PIN_WIDTH / 2) + ' , ' + (window.data.parametrOfPins.PIN_HEIGTH, window.data.parametrOfPins.MAP_HEIGTH - window.data.parametrOfPins.PIN_HEIGTH * 2);


  var activatePage = function () {
    mapPins.appendChild(window.pin.mapPinsFragment);
    mapDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (formFieldset) {
      formFieldset.removeAttribute('disabled');
    });
    mapFiltersFormSelect.forEach(function (filterSelect) {
      filterSelect.removeAttribute('disabled');
    });
    mapFiltersFormFieldsets.forEach(function (filterFieldset) {
      filterFieldset.removeAttribute('disabled');
    });
  };


  mapPins.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  });
  mapPins.addEventListener('keydown', function (evt) {
    if (evt.key === window.data.enterKey) {
      activatePage();
    }
  });
})();
