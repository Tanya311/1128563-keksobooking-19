// Файл form.js
'use strict';
(function () {
  var BORDER_VALID_STYLE = '1px solid #d9d9d3';
  var BORDER_INVALID_STYLE = '2px solid red';
  var PRICE_MIN = '1000';
  var PRICE_MAX = '1000000';


  var priceOfHouseMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var roomCapacityMap = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCout = adForm.querySelector('#capacity');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adressAdForm = adForm.querySelector('#address');
  var inputTitle = adForm.querySelector('#title');
  var houseingType = adForm.querySelector('#type');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');


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
    adForm.addEventListener('submit', adFormSubmitHandler);
    adForm.addEventListener('change', adFormChangeHandler);
    adFormSubmit.addEventListener('click', adFormSubmitClickHandler);
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
    price.placeholder = PRICE_MIN;
    price.setAttribute('max', PRICE_MAX);
    price.setAttribute('min', PRICE_MIN);
    price.style.border = BORDER_VALID_STYLE;
    guestsCout.style.border = BORDER_VALID_STYLE;
    inputTitle.style.border = BORDER_VALID_STYLE;
  };

  /**
   * @name validateRoomCapacity
   * @description функция валидации комнат для гостей
   */
  var validateRoomCapacity = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var guests = parseInt(guestsCout.value, 10);
    if (roomCapacityMap[rooms].indexOf(guests) === -1) {
      guestsCout.setCustomValidity('Количество гостей должно соответствовать количеству комнат');
    } else {
      guestsCout.setCustomValidity('');
      guestsCout.style.border = BORDER_VALID_STYLE;
    }
  };

  /**
   * @name validateTitle
   * @description функция валидации заголовка объявления
   * @param {*} evt
   */
  var validateTitle = function (evt) {
    switch (true) {
      case evt.target.validity.tooShort:
        evt.target.setCustomValidity('Заголовок не может содержать менее 30-ти символов');
        break;
      case evt.target.validity.tooLong:
        evt.target.setCustomValidity('Заголовок не должен превышать 100 символов');
        break;
      case evt.target.validity.valueMissing:
        evt.target.setCustomValidity('Обязательное поле');
        break;
      default:
        evt.target.setCustomValidity('');
        evt.target.style.border = BORDER_VALID_STYLE;
    }
  };


  /**
   * @name validatуPrice
   * @description функция валидации поля стоимости жилья
   * @param {*} evt
   */
  var validatуPrice = function () {
    price.setAttribute('min', priceOfHouseMap[houseingType.value]);
    price.setAttribute('placeholder', priceOfHouseMap[houseingType.value]);
    var min = priceOfHouseMap[houseingType.value];

    switch (true) {
      case price.validity.rangeUnderflow:
        price.setCustomValidity('Цена должная быть равна или больше ' + min);
        break;
      case price.validity.rangeOverflow:
        price.setCustomValidity('Цена должная быть равна или меньше 1000000');
        break;
      case price.validity.valueMissing:
        price.setCustomValidity('Обязательное поле');
        break;
      case !price.validity.valueMissing:
        price.setCustomValidity('');
        price.style.border = BORDER_VALID_STYLE;
    }
  };

  /**
   * @name validateTimeInOut
   * @description функция валидации времени
   * @param {*} evt
   */
  var validateTimeInOut = function (evt) {
    if (evt.target.matches('#timein')) {
      timeOut.selectedIndex = timeIn.selectedIndex;
    } else {
      timeIn.selectedIndex = timeOut.selectedIndex;
    }
  };

  /**
   * @name formChangeHandler
   * @description функция изменений формы
   * @param {*} evt
   */
  var adFormChangeHandler = function (evt) {
    switch (true) {
      case evt.target.matches('#timein') || evt.target.matches('#timeout'):
        validateTimeInOut(evt);
        break;
      case evt.target.matches('#price') || evt.target.matches('#type'):
        validatуPrice();
        break;
      case evt.target.matches('#title'):
        validateTitle(evt);
        break;
      case evt.target.matches('#room_number') || evt.target.matches('#capacity'):
        validateRoomCapacity();
        break;
    }
  };

  /**
   * @name formSubmitHandler
   * @description функция отправки формы
   * @param {*} evt
   */
  var adFormSubmitHandler = function (evt) {
    window.backend.save(new FormData(adForm), window.backend.dataLoadHandler, window.backend.errorHandler);
    evt.preventDefault();
  };

  /**
   * @name adFormSubmitClickHandler
   * @description функция действий при невалидных полях
   */
  var adFormSubmitClickHandler = function () {
    if (guestsCout.checkValidity() === false) {
      guestsCout.style.border = BORDER_INVALID_STYLE;
    }
    if (price.checkValidity() === false) {
      price.style.border = BORDER_INVALID_STYLE;
    }
    if (inputTitle.checkValidity() === false) {
      inputTitle.style.border = BORDER_INVALID_STYLE;
    }
  };

  window.form = {
    activate: activateForm,
    disabled: disabledForm
  };

})();
