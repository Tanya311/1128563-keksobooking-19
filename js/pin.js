// Файл pin.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPins = mapDialog.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * @name makePin
   * @description функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
   * @param {object} pinDate принимает объявление
   * @return {object} возвращает pinElement
   */
  var makePin = function (pinDate) {
    var pinElement = pinTemplate.cloneNode(true);
    var imgElement = pinElement.querySelector('img');
    pinElement.style.left = pinDate.location.x + 'px';
    pinElement.style.top = pinDate.location.y + 'px';
    imgElement.src = pinDate.author.avatar;
    imgElement.alt = pinDate.offer.title;

    var pinElementClickHandler = function () {
      var card = mapDialog.querySelector('.map__card');
      if (card) {
        card.remove();
        removeClassActiveForPin();
      }
      window.card.render(pinDate);
      pinElement.classList.add('map__pin--active');
    };

    pinElement.addEventListener('click', pinElementClickHandler);
    return pinElement;
  };

  /**
   * @name removeClassActiveForPin
   * @description функция удаления класса active у меток
   */
  var removeClassActiveForPin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  /**
   * @name renderPins
   * @description Вставляет пины в разметку
   * @param {array} pins массив объявлений
   */
  var renderPins = function (pins) {
    var fragment = document.createDocumentFragment();

    pins.slice(0, window.util.maxCountPins).forEach(function (pin) {
      if (pin.offer) {
        fragment.appendChild(makePin(pin));
      }
    });

    mapDialog.querySelector('.map__pins').appendChild(fragment);
  };

  /**
   * @name removePin
   * @description функция удаления пинов
   */
  var removePin = function () {
    var pins = mapPins.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  window.pin = {
    render: renderPins,
    removeClassActive: removeClassActiveForPin,
    remove: removePin
  };
})();
