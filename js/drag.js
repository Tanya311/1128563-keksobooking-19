// Файл drag.js
'use strict';
(function () {

  var mapPinsButton = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');

  mapPinsButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinsButton.style.top = (mapPinsButton.offsetTop - shift.y) + 'px';
      mapPinsButton.style.left = (mapPinsButton.offsetLeft - shift.x) + 'px';

      var left = mapPinsButton.offsetLeft - shift.x;
      var top = mapPinsButton.offsetTop - shift.y;


      // органичение перемещения метки
      if (mapPinsButton.offsetLeft <= (window.util.pinMovementLimiting.X_MIN - Math.round(window.util.pinDate.WIDTH / 2))) {
        mapPinsButton.style.left = (window.util.pinMovementLimiting.X_MIN - Math.round(window.util.pinDate.WIDTH / 2)) + 'px';
        left = (window.util.pinMovementLimiting.X_MIN - Math.round(window.util.pinDate.WIDTH / 2));
      }

      if (mapPinsButton.offsetLeft >= (window.util.pinMovementLimiting.X_MAX - Math.round(window.util.pinDate.WIDTH / 2))) {
        mapPinsButton.style.left = (window.util.pinMovementLimiting.X_MAX - Math.round(window.util.pinDate.WIDTH / 2)) + 'px';
        left = (window.util.pinMovementLimiting.X_MAX - Math.round(window.util.pinDate.WIDTH / 2));
      }

      if (mapPinsButton.offsetTop <= (window.util.pinMovementLimiting.Y_MIN - window.util.pinDate.HEIGHT)) {
        mapPinsButton.style.top = (window.util.pinMovementLimiting.Y_MIN - window.util.pinDate.HEIGHT) + 'px';
        top = (window.util.pinMovementLimiting.Y_MIN - window.util.pinDate.HEIGHT);
      }

      if (mapPinsButton.offsetTop >= (window.util.pinMovementLimiting.Y_MAX - window.util.pinDate.HEIGHT)) {
        mapPinsButton.style.top = (window.util.pinMovementLimiting.Y_MAX - window.util.pinDate.HEIGHT) + 'px';
        top = (window.util.pinMovementLimiting.Y_MAX - window.util.pinDate.HEIGHT);
      }

      adFormAddress.value = (left + Math.round(window.util.pinDate.WIDTH / 2)) + ', ' + (top + window.util.pinDate.HEIGHT);
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);


  });


})();
