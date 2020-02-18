// Файл data.js
'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var MOUSEDOWN_LEFT_BUTTON = 0;
  var ParametrOfPins = {
    MAP_WIDTH: 980,
    MAP_HEIGTH: 704,
    PIN_WIDTH: 50,
    PIN_HEIGTH: 70
};

  var TYPE = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PinMovementLimiting = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
  };

  var PinDate = {
    WIDTH: 65,
    HEIGHT: 87,
    X_START: 570,
    Y_START: 375
  };


  window.data = {
    enterKey: ENTER_KEY,
    mousedownLeftButton: MOUSEDOWN_LEFT_BUTTON,
    parametrOfPins: ParametrOfPins,
    type: TYPE,
    features: FEATURES,
    pinMovementLimiting: PinMovementLimiting,
    pinDate: PinDate
  };
})();
