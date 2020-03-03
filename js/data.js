// Файл data.js
'use strict';
(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
  var MOUSEDOWN_LEFT_BUTTON = 0;
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

  var ParametrOfPins = {
    MAP_WIDTH: 980,
    MAP_HEIGTH: 704,
    PIN_WIDTH: 50,
    PIN_HEIGTH: 70
  };

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
  var PinPositionStart = {
    x: 570,
    y: 375,
  };

  /**
   * функция генерации случайных чисел
   * @param {number} min - минимальное значение
   * @param {number} max - максимальное значение
   * @return {number} случайное число из диапазона
   */
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * max) + min;
  };

  /**
   * функция возвращает случайный элемент из массива без повторений
   * @param {Array} array - массив
   * @return {*}  - рандомный элемент из массива
   */
  var getRandomUniqueElementFromArray = function (array) {
    var randomUniqueElement = array[getRandomNumber(0, array.length - 1)];
    array.splice(array.indexOf(randomUniqueElement, 0), 1);
    return randomUniqueElement;
  };

  /**
   * функция возвращает случайный элемент из массива
   * @param {Array} array - массив
   * @return {*}  - рандомный элемент из массива
   */
  var getRandomElementFromArray = function (array) {
    var randomElement = array[getRandomNumber(0, array.length)];
    return randomElement;
  };

  /**
   * функция создает массив случайных элементов случайной длинны
   * @param {Array} originalArray - массив
   * @return {Array}  - массив случайных элементов случайной длинны
   */
  var generateArrayWithRandomLength = function (originalArray) {
    var oldArray = originalArray.slice();
    var newArray = [];
    var length = getRandomNumber(1, oldArray.length);

    for (var i = 0; i < length; i++) {
      newArray[i] = getRandomUniqueElementFromArray(oldArray);
    }
    return newArray;
  };

  /**
   * функция создания правильных окончаний
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

  window.data = {
    enterKey: ENTER_KEY,
    escapeKey: ESCAPE_KEY,
    mousedownLeftButton: MOUSEDOWN_LEFT_BUTTON,
    parametrOfPins: ParametrOfPins,
    type: TYPE,
    features: FEATURES,
    pinMovementLimiting: PinMovementLimiting,
    pinDate: PinDate,
    pinPositionStart: PinPositionStart,
    getRandomElementFromArray: getRandomElementFromArray,
    generateArrayWithRandomLength: generateArrayWithRandomLength,
    getRandomNumber: getRandomNumber,
    getPluralForm: getPluralForm

  };
})();
