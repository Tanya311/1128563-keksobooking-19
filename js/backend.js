// Файл backend.js
'use strict';

(function () {

  var STATUS_CODE_OK = 200;
  var TIMEOUT = 10000;
  var Url = {
    'GET': 'https://js.dump.academy/keksobooking/data',
    'POST': 'https://js.dump.academy/keksobooking'
  };
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  var main = document.querySelector('main');

  var createXhr = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения. Повторите попытку');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс. Проверьте соединение');
    });

    xhr.timeout = TIMEOUT; // 10s
    return xhr;
  };

  /**
   * функция загрузки данных с сервера
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var load = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  /**
   * функция отправки данных на сервер
   * @param {Function} data
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var save = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  /**
   * функция вывода сообщения об ошибках
   */
  var errorHandler = function () {
    var buttonErrorTemplate = errorTemplate.querySelector('.error__button');
    errorTemplate.style = 'z-index: 100';
    errorTemplate.style.position = 'fixed';
    main.appendChild(errorTemplate);
    buttonErrorTemplate.addEventListener('click', function () {
      errorTemplate.remove();


    });
    main.addEventListener('click', function () {
      errorTemplate.remove();
    });
    var errorTemplateCloseEscPressHandler = function (evt) {
      if (evt.key === window.util.escapeKey) {
        errorTemplate.remove();
      }
    };
    document.addEventListener('keydown', errorTemplateCloseEscPressHandler);
  };


  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler,
  };

})();

