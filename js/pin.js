// Файл pin.js
'use strict';
(function () {
  var MAX_COUNT_PINS = 5;
  var mapDialog = document.querySelector('.map');
  var mapPins = mapDialog.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
   * @param {object} pinDate принимает объявление
   * @return {object} возвращает pinElement
   */
  var makePin = function (pinDate) {
    var pinElement = pinTemplate.cloneNode(true);
    var imgElement = pinElement.querySelector('img');
    pinElement.style = 'left: ' + pinDate.location.x + 'px; top: ' + pinDate.location.y + 'px;';
    imgElement.src = pinDate.author.avatar;
    imgElement.alt = pinDate.offer.title;

    var pinClickHandler = function () {
      if (mapDialog.querySelector('.map__card')) {
        mapDialog.querySelector('.map__card').remove();
      }
      window.cards.render(pinDate);
    };

    pinElement.addEventListener('click', pinClickHandler);
    return pinElement;
  };


  /** @function
   * @name renderPins
   * @description Вставляет пины в разметку
   * @param {array} pins массив объявлений
   */
  function renderPins(pins) {
    var fragment = document.createDocumentFragment();

    pins.slice(0, MAX_COUNT_PINS).forEach(function (pin) {
      if (pin.offer) {
        fragment.appendChild(makePin(pin));
      }
    });

    mapDialog.querySelector('.map__pins').appendChild(fragment);
  }

  /**
   * функция удаления пинов
   *
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
    remove: removePin
  };
})();
