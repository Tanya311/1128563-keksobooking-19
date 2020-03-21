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
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  /** @function
   * @name createXhr
   * @description создает xhr запрос
   * @param {function} onLoad callback при успешной загрузки данных
   * @param {function} onError callback при ошибках загрузки данных
   * @return {XMLHttpRequest} xhr
   */
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

    xhr.timeout = TIMEOUT;
    return xhr;
  };

  /** @function
   * @name loadAds
   * @description загрузка данных с сервера
   * @param {function} onLoad callback при успешной загрузки данных
   * @param {function} onError callback при ошибках загрузки данных
   */
  var loadAds = function (onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('GET', Url.GET);
    xhr.send();
  };

  /** @function
   * @name saveAd
   * @description загрузка данных с сервера данных с сервера
   * @param {function} data
   * @param {function} onLoad callback при успешной загрузки данных
   * @param {function} onError callback при ошибках загрузки данных
   */
  var saveAd = function (data, onLoad, onError) {
    var xhr = createXhr(onLoad, onError);

    xhr.open('POST', Url.POST);
    xhr.send(data);
  };

  /** @function
   * @name errorHandler
   * @description Вывод сообщения об ошибке
   */
  var errorHandler = function () {
    var buttonErrorTemplate = errorTemplate.querySelector('.error__button');
    main.appendChild(errorTemplate);

    var closeError = function () {
      errorTemplate.remove();
      buttonErrorTemplate.removeEventListener('click', buttonErrorClickHandler);
      main.removeEventListener('click', mainClickHandler);
      document.removeEventListener('keydown', errorTemplateCloseEscPressHandler);
    };

    var buttonErrorClickHandler = function () {
      closeError();
    };

    var mainClickHandler = function () {
      closeError();
    };

    var errorTemplateCloseEscPressHandler = function (evt) {
      if (evt.key === window.util.escapeKey) {
        closeError();
      }
    };
    document.addEventListener('keydown', errorTemplateCloseEscPressHandler);
    buttonErrorTemplate.addEventListener('click', buttonErrorClickHandler);
    main.addEventListener('click', mainClickHandler);
  };

  /**
   * @name successMessege
   * @description функция вывода сообщения об успешной отправке данных
   */
  var successMessege = function () {
    main.appendChild(successTemplate);
    var successMessegeClose = function () {
      successTemplate.remove();
      main.removeEventListener('click', mainClickSuccessMessegeCloseHandler);
      document.removeEventListener('keydown', successTemplateCloseEscPressHandler);
    };
    var successTemplateCloseEscPressHandler = function (evt) {
      if (evt.key === window.util.escapeKey) {
        successMessegeClose();
      }
    };
    var mainClickSuccessMessegeCloseHandler = function () {
      successMessegeClose();
    };
    main.addEventListener('click', mainClickSuccessMessegeCloseHandler);
    document.addEventListener('keydown', successTemplateCloseEscPressHandler);
  };

  /**
   * @name dataLoadHandler
   * @description функция успешной загрузки данных
   */
  var dataLoadHandler = function () {
    window.map.activatePage(false);
    successMessege();
  };

  window.backend = {
    load: loadAds,
    save: saveAd,
    errorHandler: errorHandler,
    dataLoadHandler: dataLoadHandler
  };

})();

