// Файл card.js
'use strict';
(function () {
  var mapDialog = document.querySelector('.map');
  var ROOMS_FORMS = [
    'комната',
    'комнаты',
    'комнат',
  ];

  var GUESTS_FORMS = [
    'гостя',
    'гостей',
    'гостей',
  ];

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

  // mapDialog.classList.remove('map--faded');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  /**
 * функция генерации карточки объявления
 * @param {Object} card - объект объявлений
 */

  var renderCard = function (card) {

    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.type[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + getPluralForm(ROOMS_FORMS, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + getPluralForm(GUESTS_FORMS, card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var features = cardElement.querySelector('.popup__features');
    var feature = features.querySelector('.popup__feature');
    var featureFragment = document.createDocumentFragment();
    features.innerHTML = '';
    feature.classList.remove('popup__feature--wifi');

    card.offer.features.forEach(function (featureItom) {
      var newFeature = feature.cloneNode(true);
      newFeature.classList.add('popup__feature--' + featureItom);
      featureFragment.appendChild(newFeature);
    });

    features.appendChild(featureFragment);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;

    var cardImg = cardElement.querySelector('.popup__photos');
    var imgFragment = document.createDocumentFragment();
    var photo = cardImg.querySelector('.popup__photo');
    cardImg.innerHTML = '';

    card.offer.photos.forEach(function (photoItom) {
      var newImg = photo.cloneNode(true);
      newImg.src = photoItom;
      imgFragment.appendChild(newImg);
    });
    cardImg.appendChild(imgFragment);

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    mapDialog.insertBefore(cardElement, mapFiltersContainer);

    var buttonPopupClose = mapDialog.querySelector('.popup__close');

    var cardCloseEnterPressHandler = function (evt) {
      if (evt.key === 'Enter') {
        closeCard();
      }
    };

    buttonPopupClose.addEventListener('click', function () {
      closeCard();
    });
    buttonPopupClose.addEventListener('keydown', cardCloseEnterPressHandler);
  };

  var closeCard = function () {
    if (mapDialog.querySelector('.map__card')) {
      mapDialog.querySelector('.map__card').remove();
    }
  };

  var cardCloseEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  document.addEventListener('keydown', cardCloseEscPressHandler);


  window.cards = {
    renderCard: renderCard,
  };
})();