// Файл form.js
'use strict';
(function () {

  var priceOfHouseMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var guestsCout = adForm.querySelector('#capacity');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');


  price.setAttribute('max', '1000000');
  price.setAttribute('min', '1000');
  /**
   * функция валидации комнат для гостей
   */
  var validatRoomCapacity = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var guests = parseInt(guestsCout.value, 10);

    var roomGuests = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0]
    };
    if (roomGuests[rooms].indexOf(guests) === -1) {
      guestsCout.setCustomValidity('Количество гостей должно соответствовать количеству комнат');
    } else {
      guestsCout.setCustomValidity('');
    }
  };

  /**
   * функция валидации заголовка объявления
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
    }
  };

  /**
   * функция валидации стоимости
   * @param {*} evt
   */
  var validatуPrice = function (evt) {
    price.placeholder = priceOfHouseMap[evt.target.value];
    price.min = priceOfHouseMap[evt.target.value];
  };

  /**
   * функция валидации времени
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
   * функция изменений формы
   * @param {*} evt
   */
  // подумать как вынести в правила
  function formChangeHandler(evt) {
    switch (true) {
      case evt.target.matches('#type'):
        validatуPrice(evt);
        break;
      case evt.target.matches('#timein') || evt.target.matches('#timeout'):
        validateTimeInOut(evt);
        break;
      case evt.target.matches('#title'):
        validateTitle(evt);
        break;
      case evt.target.matches('#room_number') || evt.target.matches('#capacity'):
        validatRoomCapacity();
        break;
    }
  }
  /**
   * функция вывода сообщения об успешной отправке данных
   */
  var successHandler = function () {
    main.appendChild(successTemplate);
    main.addEventListener('click', function () {
      successTemplate.remove();
    });
  };

  var successTemplateCloseEscPressHandler = function (evt) {
    if (evt.key === window.util.escapeKey) {
      successTemplate.remove();
    }
  };
  document.addEventListener('keydown', successTemplateCloseEscPressHandler);

  var formSubmitHandler = function (evt) {
    window.backend.save(new FormData(adForm), function () {
      window.map.activatePage(false);
      successHandler();
    }, window.backend.errorHandler);
    evt.preventDefault();
  };

  window.form = {
    formSubmitHandler: formSubmitHandler,
    formChangeHandler: formChangeHandler
  };

})();
