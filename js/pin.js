// Файл pin.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var mapPins = mapDialog.querySelector('.map__pins');
  /**
   * функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
   * @param {Object} pinsDate - объект объявлений
   */
  var render = function (pinsDate) {
    var mapPinsFragment = document.createDocumentFragment();
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    pinsDate.forEach(function (pinDate) {
      var pinElement = pinTemplate.cloneNode(true);
      var imgElement = pinElement.querySelector('img');
      pinElement.style = 'left: ' + pinDate.location.x + 'px; top: ' + pinDate.location.y + 'px;';
      imgElement.src = pinDate.author.avatar;
      imgElement.alt = pinDate.offer.title;

      var pinClickHandler = function () {
        if (mapDialog.querySelector('.map__card')) {
          mapDialog.querySelector('.map__card').remove();
        }
        window.cards.renderCard(pinDate);
      };

      pinElement.addEventListener('click', pinClickHandler);

      mapPinsFragment.appendChild(pinElement);
    });

    mapPins.appendChild(mapPinsFragment);
  };

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
    render: render,
    removePin: removePin
  };
})();
