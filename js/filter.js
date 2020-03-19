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
  var featuresArray = Array.from(mapFilters.querySelectorAll('.map__checkbox'));

  var filteredAds;

  /**
   * @name filteringType
   * @description функция фильтрации объявлений по типу
   * @param {Object} ad
   * @return {boolean}
   */
  var filteringType = function (ad) {
    return housingType.value === 'any' ? true : ad.offer.type === housingType.value;
  };

  /**
   * @name filteringPrice
   * @description функция фильтрации объявлений по цене жилья
   * @param {Object} ad
   * @return {boolean}
   */
  var filteringPrice = function (ad) {
    return housingPrice.value === 'any' ? true : priceRangeMap[housingPrice.value].min <= ad.offer.price && priceRangeMap[housingPrice.value].max >= ad.offer.price;
  };

  /**
   * @name filteringRoom
   * @description функция фильтрации объявлений по колличеству комнат
   * @param {Object} ad
   * @return {boolean}
   */
  var filteringRoom = function (ad) {
    return housingRooms.value === 'any' ? true : ad.offer.rooms === parseInt(housingRooms.value, 10);
  };

  /**
   * @name filteringGuests
   * @description функция фильтрации объявлений по колличеству гостей
   * @param {Object} ad
   * @return {boolean}
   */
  var filteringGuests = function (ad) {
    return housingGuests.value === 'any' ? true : ad.offer.guests === parseInt(housingGuests.value, 10);
  };

  /**
   * @name filteringFeatures
   * @description функция фильтрации объявлений по фитчам
   * @param {object} ad
   * @return {Array}
   */
  var filteringFeatures = function (ad) {
    return featuresArray
      .filter(function (checkedFeature) {
        return checkedFeature.checked;
      })
      .every(function (checkedFeature) {
        return (ad.offer.features.some(function (adFeature) {
          return checkedFeature.value === adFeature;
        }));
      });
  };

  /**
   * @name filterFormChangeHandler
   * @description Функция фильтрации отображаемых объявлений
   */
  var filterFormChangeHandler = function () {
    filteredAds = window.util.defaultAdverts;
    filteredAds = filteredAds.filter(filteringType)
      .filter(filteringPrice)
      .filter(filteringRoom)
      .filter(filteringGuests)
      .filter(filteringFeatures);
    window.util.debounce(updatePins);
  };

  /**
   * @name updatePins
   * @description обновление пинов на карте
   */
  var updatePins = function () {
    window.card.remove();
    window.pin.remove();
    window.pin.render(filteredAds);
  };

  mapFilters.addEventListener('change', filterFormChangeHandler);
})();
