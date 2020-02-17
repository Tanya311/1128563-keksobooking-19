// Файл data.js
'use strict';
(function () {
  var ENTER_KEY = 'Enter';
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


  window.data = {
    enterKey: ENTER_KEY,
    parametrOfPins: ParametrOfPins,
    type: TYPE,
    features: FEATURES,
  };
})();
