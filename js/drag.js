// Файл drag.js
'use strict';
(function () {

  var mapPinMain = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');

  /* Обработчики событий */
  /** @function
   * @name mapPinsButtonHandler
   * @description перемещение главного пина по карте
   * @param {event} evt
   */
  var mapPinMainHandler = function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      var left = mapPinMain.offsetLeft - shift.x;
      var top = mapPinMain.offsetTop - shift.y;
      if (mapPinMain.offsetLeft <= (window.util.pinMovementLimiting.X_MIN - Math.round(window.util.pinDate.WIDTH / 2))) {
        mapPinMain.style.left = (window.util.pinMovementLimiting.X_MIN - Math.round(window.util.pinDate.WIDTH / 2)) + 'px';
        left = (window.util.pinMovementLimiting.X_MIN - Math.round(window.util.pinDate.WIDTH / 2));
      }

      if (mapPinMain.offsetLeft >= (window.util.pinMovementLimiting.X_MAX - Math.round(window.util.pinDate.WIDTH / 2))) {
        mapPinMain.style.left = (window.util.pinMovementLimiting.X_MAX - Math.round(window.util.pinDate.WIDTH / 2)) + 'px';
        left = (window.util.pinMovementLimiting.X_MAX - Math.round(window.util.pinDate.WIDTH / 2));
      }

      if (mapPinMain.offsetTop <= (window.util.pinMovementLimiting.Y_MIN - window.util.pinDate.HEIGHT)) {
        mapPinMain.style.top = (window.util.pinMovementLimiting.Y_MIN - window.util.pinDate.HEIGHT) + 'px';
        top = (window.util.pinMovementLimiting.Y_MIN - window.util.pinDate.HEIGHT);
      }

      if (mapPinMain.offsetTop >= (window.util.pinMovementLimiting.Y_MAX - window.util.pinDate.HEIGHT)) {
        mapPinMain.style.top = (window.util.pinMovementLimiting.Y_MAX - window.util.pinDate.HEIGHT) + 'px';
        top = (window.util.pinMovementLimiting.Y_MAX - window.util.pinDate.HEIGHT);
      }

      adFormAddress.value = (left + Math.round(window.util.pinDate.WIDTH / 2)) + ', ' + (top + window.util.pinDate.HEIGHT);
    };


    var mouseUpHandler = function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

  };

  mapPinMain.addEventListener('mousedown', mapPinMainHandler);

})();
