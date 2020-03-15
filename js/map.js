// Файл map.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPinsButton = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersFormSelect = mapDialog.querySelectorAll('.map__filters select');
  var mapFiltersFormFieldsets = mapDialog.querySelectorAll('.map__filters fieldset');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adressAdForm = adForm.querySelector('#address');
  var formResetButton = document.querySelector('.ad-form__reset');

  /**
   * функция активации и деактивации страницы
   * @param {boolean} active
   */
  var activatePage = function (active) {
    if (active) {
      mapDialog.classList.remove('map--faded');
      window.backend.load(window.pin.render, window.backend.errorHandler);
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
      adressAdForm.value = (window.util.pinDate.X_START + Math.round(window.util.pinDate.WIDTH / 2)) + ' , ' + (window.util.pinDate.Y_START + window.util.pinDate.HEIGHT);
      mapPinsButton.removeEventListener('mousedown', pageActiveHandler);
      mapPinsButton.removeEventListener('keydown', pageActiveHandler);
      adForm.addEventListener('submit', window.form.formSubmitHandler);
      adForm.addEventListener('change', window.form.formChangeHandler);
    } else {
      mapDialog.classList.add('map--faded');
      window.pin.remove();
      window.cards.remove();
      adForm.classList.add('ad-form--disabled');
      adForm.reset();
      mapPinsButton.style.top = window.util.pinDate.Y_START + 'px';
      mapPinsButton.style.left = window.util.pinDate.X_START + 'px';
      adressAdForm.value = Math.round(window.util.pinDate.X_START + window.util.pinDate.WIDTH / 2) + ' , ' + Math.round(window.util.pinDate.Y_START + window.util.pinDate.HIGHT_PIN / 2);
      adressAdForm.setAttribute('readonly', 'readonly');
      mapFiltersFormSelect.forEach(function (select) {
        select.setAttribute('disabled', 'disabled');
        select.value = 'any';
      });
      mapFiltersFormFieldsets.forEach(function (fieldset) {
        fieldset.setAttribute('disabled', 'disabled');
      });
      adFormFieldsets.forEach(function (fieldset) {
        fieldset.setAttribute('disabled', 'disabled');
      });
      mapPinsButton.addEventListener('mousedown', pageActiveHandler);
      mapPinsButton.addEventListener('keydown', pageActiveHandler);
    }
  };

  activatePage(false);

  var pageActiveHandler = function (evt) {
    if (evt.button === window.util.mousedownLeftButton) {
      activatePage(true);
    }
  };

  mapPinsButton.addEventListener('mousedown', pageActiveHandler);
  mapPinsButton.addEventListener('keydown', pageActiveHandler);

  formResetButton.addEventListener('click', function () {
    activatePage(false);
  });

  window.map = {
    activatePage: activatePage,
    pageActiveHandler: pageActiveHandler
  };

})();
