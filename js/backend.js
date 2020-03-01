// Файл backend.js
'use strict';

(function () {

  var URLGet = 'https://js.dump.academy/keksobooking/data';

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      }
    });


    xhr.open('GET', URLGet);
    xhr.send();
  };


  window.backend = {
    load: load
  };

})();

