// Файл card.js
'use strict';
(function () {
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

  var mapDialog = document.querySelector('.map');

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  /**
   * функция создания карточки объявления
   * @param {Object} card - объект
   * @return {*}
   */
  var makeCard = function (card) {

    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.util.typeOfHouseMap[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.util.getPluralForm(ROOMS_FORMS, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + window.util.getPluralForm(GUESTS_FORMS, card.offer.guests);
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
    return cardElement;
  };

  /**
   * функция генерации карточки объявления
   * @param {Object} card - объект
   */
  var renderCard = function (card) {
    var cardEl = makeCard(card);
    var buttonPopupClose = cardEl.querySelector('.popup__close');
    mapDialog.insertBefore(cardEl, mapFiltersContainer);

    var buttonPopupCloseEnterPressHandler = function (evt) {
      if (evt.key === window.util.enterKey) {
        closeCard();
      }
    };

    var buttonPopupCloseClickHandler = function () {
      closeCard();
    };

    buttonPopupClose.addEventListener('click', buttonPopupCloseClickHandler);
    buttonPopupClose.addEventListener('keydown', buttonPopupCloseEnterPressHandler);
    document.addEventListener('keydown', cardCloseEscPressHandler);
  };

  /**
   * функция закрытия карточек объявления
   * @param {Object} card - объект
   */
  var closeCard = function () {
    removeCard();
    window.pin.removeClassActive();
  };

  /**
   * функция закрытия карточек объявления по нажатию Esc
   * @param {*} evt
   */
  var cardCloseEscPressHandler = function (evt) {
    if (evt.key === window.util.escapeKey) {
      closeCard();
    }
  };

  /**
   * функция удаления карточек объявлений
   *
   */
  var removeCard = function () {
    var cards = mapDialog.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      card.remove();
      document.removeEventListener('keydown', cardCloseEscPressHandler);
    });
  };


  window.card = {
    render: renderCard,
    remove: removeCard
  };
})();
