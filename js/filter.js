// Файл filter.js
'use strict';

(function () {
  var priceRangeMap = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingPrice = mapFilters.querySelector('#housing-price');

  var filteredAds;

  /**
   * @name makeFilterAdsByType
   * @description функция фильтрации объявлений по типу
   * @param {Object} ad
   * @return {boolean}
   */
  var makeFilterAdsByType = function (ad) {
    var housingTypeFlag = false;
    if (housingType.value === window.util.anyValue || housingType.value === ad.offer.type) {
      housingTypeFlag = true;
    }
    return housingTypeFlag;
  };

  /**
   * @name makeFilterAdsByPrice
   * @description функция фильтрации объявлений по цене жилья
   * @param {Object} ad
   * @return {boolean}
   */
  var makeFilterAdsByPrice = function (ad) {
    var housingPriceFlag = false;
    if (housingPrice.value === window.util.anyValue || priceRangeMap[housingPrice.value].min <= ad.offer.price && priceRangeMap[housingPrice.value].max >= ad.offer.price) {
      housingPriceFlag = true;
    }
    return housingPriceFlag;
  };

  /**
   * @name makeFilterAdsByRoom
   * @description функция фильтрации объявлений по колличеству комнат
   * @param {Object} ad
   * @return {boolean}
   */
  var makeFilterAdsByRoom = function (ad) {
    var housingRoomsFlag = false;
    if (housingRooms.value === window.util.anyValue || ad.offer.rooms === parseInt(housingRooms.value, 10)) {
      housingRoomsFlag = true;
    }
    return housingRoomsFlag;
  };

  /**
   * @name makeFilterAdsByGuests
   * @description функция фильтрации объявлений по колличеству гостей
   * @param {Object} ad
   * @return {boolean}
   */
  var makeFilterAdsByGuests = function (ad) {
    var housingGuestsFlag = false;
    if (housingGuests.value === window.util.anyValue ||
      ad.offer.guests === parseInt(housingGuests.value, 10)) {
      housingGuestsFlag = true;
    }
    return housingGuestsFlag;
  };

  /**
   * @name makeFilterAdsByFeatures
   * @description функция фильтрации объявлений по фитчам
   * @param {object} ad
   * @return {*}
   */
  var makeFilterAdsByFeatures = function (ad) {
    var featureFlag = true;
    var featuresChecked = mapFilters.querySelectorAll('.map__checkbox:checked');
    featuresChecked.forEach(function (feature) {
      featureFlag = featureFlag && ad.offer.features.includes(feature.value);
    });
    return featureFlag;
  };

  /**
   * @name filterForm
   * @description Функция фильтрации отображаемых объявлений, получаемых с сервера
   * @return {Array}
   */
  var filterForm = function () {
    filteredAds = window.util.defaultAdverts;
    var ads = [];
    for (var i = 0; i < filteredAds.length; i++) {
      if (makeFilterAdsByType(filteredAds[i]) &&
          makeFilterAdsByFeatures(filteredAds[i]) &&
          makeFilterAdsByPrice(filteredAds[i]) &&
          makeFilterAdsByRoom(filteredAds[i]) &&
          makeFilterAdsByGuests(filteredAds[i])) {
        ads.push(filteredAds[i]);
        if (ads.length === window.util.maxCountPins) {
          break;
        }
      }
    }
    return ads;
  };

  /**
   * @name updatePins
   * @description обновление пинов на карте
   */
  var updatePins = function () {
    window.card.remove();
    window.pin.remove();
    window.pin.render(filterForm());
  };

  /**
   * @name filterFormChangeHandler
   * @description обработчик
   */
  var filterFormChangeHandler = function () {
    window.util.debounce(updatePins);
  };

  mapFilters.addEventListener('change', filterFormChangeHandler);
})();
