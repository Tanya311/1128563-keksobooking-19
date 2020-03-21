// Файл map.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapFiltersFormSelect = mapDialog.querySelectorAll('.map__filters select');
  var mapFiltersFormCheckbox = mapDialog.querySelectorAll('.map__checkbox');
  var formResetButton = document.querySelector('.ad-form__reset');

  /**
   * @name activateFilter
   * @description функция разблокировки фильтров
   */
  var activateFilter = function () {
    mapFiltersFormSelect.forEach(function (filterSelect) {
      filterSelect.removeAttribute('disabled');
      filterSelect.value = window.util.anyValue;
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
      window.form.activate();
      mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
      mapPinMain.removeEventListener('keydown', mapPinMainEnterPressHandler);
      formResetButton.addEventListener('click', formResetButtonClickHandler);

    } else {
      mapDialog.classList.add('map--faded');
      window.pin.remove();
      window.card.remove();

      mapPinMain.style.top = window.util.pinDate.Y_START + 'px';
      mapPinMain.style.left = window.util.pinDate.X_START + 'px';

      disabledFilter();
      window.form.disabled();

      mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
      mapPinMain.addEventListener('keydown', mapPinMainEnterPressHandler);
    }
  };

  /**
   * @name mapPinMainMousedownHandler
   * @description функция активации страницы по нажатию на кнопку мыши
   * @param {evt} evt
   */
  var mapPinMainMousedownHandler = function (evt) {
    if (evt.button === window.util.mousedownLeftButton) {
      activatePage(true);
    }
  };

  /**
   * @name pageActiveHandler
   * @description функция активации страницы по нажатию на кнопку мыши
   * @param {evt} evt
   */
  var mapPinMainEnterPressHandler = function (evt) {
    if (evt.key === window.util.enterKey) {
      activatePage(true);
    }
  };

  activatePage(false);

  /**
   * @name formResetButtonHandler
   * @description функция дезактивации страницы по нажатию на кнопку reset
   */
  var formResetButtonClickHandler = function () {
    activatePage(false);
    formResetButton.removeEventListener('click', formResetButtonClickHandler);
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
