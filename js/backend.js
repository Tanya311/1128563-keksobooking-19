// Файл backend.js
'use strict';

(function () {

  var URLGet = 'https://js.dump.academy/keksobooking/data';
  var STATUS_CODE_OK = 200;

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
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

