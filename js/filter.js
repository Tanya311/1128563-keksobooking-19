// Файл filter


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

  var filteredAds = [];

  /**
   * функция фильтрации объявлений по типу
   * @param {object} ad
   * @return {boolean}
   */
  var filteringType = function (ad) {
    return housingType.value === 'any' ? true : ad.offer.type === housingType.value;
  };

  /**
   * функция фильтрации объявлений по цене жилья
   * @param {object} ad
   * @return {boolean}
   */
  var filteringPrice = function (ad) {
    return housingPrice.value === 'any' ? true : priceRangeMap[housingPrice.value].min <= ad.offer.price && priceRangeMap[housingPrice.value].max >= ad.offer.price;
  };

  /**
   * функция фильтрации объявлений по колличеству комнат
   * @param {object} ad
   * @return {boolean}
   */
  var filteringRoom = function (ad) {
    return housingRooms.value === 'any' ? true : ad.offer.rooms === parseInt(housingRooms.value, 10);
  };

  /**
   * функция фильтрации объявлений по колличеству гостей
   * @param {object} ad
   * @return {boolean}
   */
  var filteringGuests = function (ad) {
    return housingGuests.value === 'any' ? true : ad.offer.guests === parseInt(housingGuests.value, 10);
  };


  /**
   * Функция фильтрации отображаемых объявлений
   * @param {array} ads - массив объектов объявлений
   */
  var filtersAds = function (ads) {
    filteredAds = ads
      .filter(filteringType)
      .filter(filteringPrice)
      .filter(filteringRoom)
      .filter(filteringGuests);
    window.debounce.debounce(function () {
      window.pin.render(filteredAds);
    });
  };


  var filterFormChangeHandler = function () {
    window.cards.remove();
    window.pin.remove();
    window.backend.load(filtersAds);
  };

  mapFilters.addEventListener('change', filterFormChangeHandler);
})();
