// Файл debounce.js
'use strict';
(function () {

  var lastTimeout;

  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, 500);
  };
  window.debounce = {
    debounce: debounce
  };

})();
