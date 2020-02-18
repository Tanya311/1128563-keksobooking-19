// Файл map.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mapPinsButton = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersFormSelect = mapDialog.querySelectorAll('.map__filters select');
  var mapFiltersFormFieldsets = mapDialog.querySelectorAll('.map__filters fieldset');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adressAdForm = adForm.querySelector('#address');
  adressAdForm.value = window.data.pinDate.X_START + ' , ' + window.data.pinDate.Y_START;
  adressAdForm.setAttribute('readonly', 'readonly');

  mapFiltersFormSelect.forEach(function (select) {
    select.setAttribute('disabled', 'disabled');
  });
  mapFiltersFormFieldsets.forEach(function (fieldset) {
    fieldset.setAttribute('disabled', 'disabled');
  });
  adFormFieldsets.forEach(function (fieldset) {
    fieldset.setAttribute('disabled', 'disabled');
  });

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
    adressAdForm.value = (window.data.pinDate.X_START + Math.round(window.data.pinDate.WIDTH / 2)) + ' , ' + (window.data.pinDate.Y_START + window.data.pinDate.HEIGHT);
  };


  mapPinsButton.addEventListener('mousedown', function (evt) {
    if (evt.button === window.data.mousedownLeftButton) {
      activatePage();
    }
  });
  mapPinsButton.addEventListener('keydown', function (evt) {
    if (evt.key === window.data.enterKey) {
      activatePage();
    }
  });
})();
