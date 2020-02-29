// Файл pin.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  /**
   * функция клонирования шаблона и заполнения его данными: заголовок, ссылка на аватар, местоположение на карте
   * @param {Object} pinDate - объект объявлений
   * @return {*}  - шаблон заполненный данными
   */
  var render = function (pinDate) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
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

    return pinElement;
  };


  window.pin = {
    render: render,
  };
})();
