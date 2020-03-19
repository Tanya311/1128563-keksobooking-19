// Файл map.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersFormSelect = mapDialog.querySelectorAll('.map__filters select');
  var mapFiltersFormCheckbox = mapDialog.querySelectorAll('.map__checkbox');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adressAdForm = adForm.querySelector('#address');
  var formResetButton = document.querySelector('.ad-form__reset');

  /**
   * @name activateForm
   * @description функция разблокировки формы
   */
  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (formFieldset) {
      formFieldset.removeAttribute('disabled');
    });
    adressAdForm.value = (window.util.pinDate.X_START + Math.round(window.util.pinDate.WIDTH / 2)) + ' , ' + (window.util.pinDate.Y_START + window.util.pinDate.HEIGHT);
    adForm.addEventListener('submit', window.form.submitHandler);
    adForm.addEventListener('change', window.form.changeHandler);
  };

  /**
   * @name disabledForm
   * @description функция блокировки формы
   */
  var disabledForm = function () {
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.upload.removePhoto();
    adressAdForm.value = Math.round(window.util.pinDate.X_START + window.util.pinDate.WIDTH / 2) + ' , ' + Math.round(window.util.pinDate.Y_START + window.util.pinDate.HIGHT_PIN / 2);
    adressAdForm.setAttribute('readonly', 'readonly');
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
  };

  /**
   * @name activateFilter
   * @description функция разблокировки фильтров
   */
  var activateFilter = function () {
    mapFiltersFormSelect.forEach(function (filterSelect) {
      filterSelect.removeAttribute('disabled');
      filterSelect.value = 'any';
    });
    mapFiltersFormCheckbox.forEach(function (filterCheckbox) {
      filterCheckbox.removeAttribute('disabled');
      filterCheckbox.checked = false;
    });
  };

  /**
   * @name disabledFilter
   * @description функция блокировки фильтров
   */
  var disabledFilter = function () {
    mapFiltersFormSelect.forEach(function (filterSelect) {
      filterSelect.setAttribute('disabled', 'disabled');
    });
    mapFiltersFormCheckbox.forEach(function (filterCheckbox) {
      filterCheckbox.setAttribute('disabled', 'disabled');
    });
  };

  /**
   * @name activatePage
   * @description функция активации и деактивации страницы
   * @param {boolean} active
   */
  var activatePage = function (active) {
    if (active) {
      mapDialog.classList.remove('map--faded');
      window.backend.load(successHandler, window.backend.errorHandler);
      activateForm();
      mapPinMain.removeEventListener('mousedown', pageActiveHandler);
      mapPinMain.removeEventListener('keydown', pageActiveHandler);
      formResetButton.addEventListener('click', formResetButtonHandler);

    } else {
      mapDialog.classList.add('map--faded');
      window.pin.remove();
      window.card.remove();

      mapPinMain.style.top = window.util.pinDate.Y_START + 'px';
      mapPinMain.style.left = window.util.pinDate.X_START + 'px';

      disabledFilter();
      disabledForm();

      mapPinMain.addEventListener('mousedown', pageActiveHandler);
      mapPinMain.addEventListener('keydown', pageActiveHandler);
    }
  };

  /**
   * @name pageActiveHandler
   * @description функция активации страницы по нажатию на кнопку мыши
   * @param {evt} evt
   */
  var pageActiveHandler = function (evt) {
    if (evt.button === window.util.mousedownLeftButton) {
      activatePage(true);
    }
  };

  activatePage(false);

  /**
   * @name formResetButtonHandler
   * @description функция дезактивации страницы по нажатию на кнопку reset
   */
  var formResetButtonHandler = function () {
    activatePage(false);
    formResetButton.removeEventListener('click', formResetButtonHandler);
  };

  /**
   * @name successHandler
   * @description функция отрабатывается при загрузке данных
   * @param {*} data
   */
  var successHandler = function (data) {
    window.util.defaultAdverts = data;
    window.pin.render(window.util.defaultAdverts);
    activateFilter();
  };

  window.map = {
    activatePage: activatePage,
  };

})();
