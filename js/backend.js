'use strict';

(function () {
  var XHR_LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var XHR_SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var XHR_TIMEOUT = 10000;
  var XHR_TYPE = 'json';

  var errorConnectMessage = {
    title: 'Ошибка соединения',
    text: 'Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение'
  };

  var errorTimeoutMessage = {
    title: 'Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен',
    text: 'Проверте ваше интернет соединение или попробуйте зайти позже'
  };

  var xhrCreate = function () {
    var xhr = new XMLHttpRequest();
    xhr.timeout = XHR_TIMEOUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrCreate();

    xhr.responseType = XHR_TYPE;

    xhr.open('GET', XHR_LOAD_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(errorConnectMessage);
    });

    xhr.addEventListener('timeout', function () {
      onError(errorTimeoutMessage);
    });

    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = xhrCreate();

    xhr.open('POST', XHR_SAVE_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError(errorConnectMessage);
    });

    xhr.addEventListener('timeout', function () {
      onError(errorTimeoutMessage);
    });

    xhr.send(data);

  };

  window.backend = {
    load: load,
    save: save
  };

})();
