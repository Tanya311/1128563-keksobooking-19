// Файл filter


'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');

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
