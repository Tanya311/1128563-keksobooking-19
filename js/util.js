// Файл data.js
'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var MOUSEDOWN_LEFT_BUTTON = 0;
  var DEBOUNCE_INTERVAL = 500;
  var ANY_VALUE = 'any';
  var MAX_COUNT_PINS = 5;

  var PinMovementLimiting = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
  };

  var PinDate = {
    WIDTH: 65,
    HIGHT_PIN: 65,
    HEIGHT: 87,
    X_START: 570,
    Y_START: 375
  };

  var typeOfHouseMap = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var lastTimeout;
  var defaultAdverts = [];

  /**
   * @name getPluralForm
   * @description функция создания правильных окончаний
   * @param {Array<String>} forms
   * @param {Number} n
   * @return {String}
   */
  var getPluralForm = function (forms, n) {
    var idx;
    if (n % 10 === 1 && n % 100 !== 11) {
      idx = 0; // many
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      idx = 1; // few
    } else {
      idx = 2; // one
    }
    return forms[idx] || '';
  };

  /**
   * @name debounce
   * @description функция устранения дреббезга
   * @param {function} cb
   */
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.util = {
    enterKey: ENTER_KEY,
    escapeKey: ESCAPE_KEY,
    mousedownLeftButton: MOUSEDOWN_LEFT_BUTTON,
    typeOfHouseMap: typeOfHouseMap,
    pinMovementLimiting: PinMovementLimiting,
    pinDate: PinDate,
    getPluralForm: getPluralForm,
    debounce: debounce,
    defaultAdverts: defaultAdverts,
    anyValue: ANY_VALUE,
    maxCountPins: MAX_COUNT_PINS
  };
})();
