// Файл backend.js
'use strict';

(function () {

  var STATUS_CODE_OK = 200;
  var TIMEOUT = 10000;
  var Url = {
    'GET': 'https://js.dump.academy/keksobooking/data',
    'POST': 'https://js.dump.academy/keksobooking'
  };

  var main = document.querySelector('main');

  /**
   * функция загрузки данных с сервера
   * @param {Function} onLoad
   * @param {Function} onError
   */
  var load = function (onLoad, onError) {
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
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODE_OK) {
        onLoad(xhr.response);
        successHandler();
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

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  /**
   * функция вывода сообщения об ошибках
   */
  var errorHandler = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
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
      if (evt.key === window.data.escapeKey) {
        errorTemplate.remove();
      }
    };
    document.addEventListener('keydown', errorTemplateCloseEscPressHandler);
  };

  /**
   * функция вывода сообщения об успешной отправке данных
   */
  var successHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    main.appendChild(successTemplate);
    main.addEventListener('click', function () {
      successTemplate.remove();
    });
    var successTemplateCloseEscPressHandler = function (evt) {
      if (evt.key === window.data.escapeKey) {
        successTemplate.remove();
      }
    };
    document.addEventListener('keydown', successTemplateCloseEscPressHandler);
  };

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler,
  };

})();

