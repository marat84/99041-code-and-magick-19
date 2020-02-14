'use strict';

(function () {

  var XHR_URL = 'https://js.dump.academy/code-and-magick/data';
  var XHR_TIMEOUT = 10000;
  var XHR_TYPE = 'json';
  var ERROR_COLOR = 'orangeRed';
  var ERROR_SHOW_TIME = 6000;

  var hideTimeoutMessage = function (block, success) {
    var colorTimerBlock = (success) ? 'green' : ERROR_COLOR;
    var timerBlock = document.createElement('div');
    var pointOfStart = 100;

    timerBlock.setAttribute('style', 'position:absolute; left:0; top:0; height:4px; width:100%; background-color: ' + colorTimerBlock + ';');

    var interval = setInterval(function () {
      pointOfStart--;
      timerBlock.style.width = pointOfStart + '%';
    }, ERROR_SHOW_TIME / 100);

    setTimeout(function () {
      clearInterval(interval);
      block.style.top = '-50%';
    }, ERROR_SHOW_TIME);

    block.appendChild(timerBlock);
  };

  var showError = function (error, tip) {
    var wrapBlockError = document.createElement('section');
    var titleErrorMessage = document.createElement('h2');
    var textErrorMessage = document.createElement('p');

    wrapBlockError.classList.add('js-message');

    wrapBlockError.setAttribute('style', 'position: absolute; top:-50%; left:calc(50% - 300px); width: 600px; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.7); text-align: center; padding: 30px; background-color: white; color: ' + ERROR_COLOR + '; z-index: 10; transition: all 0.5s;');
    titleErrorMessage.setAttribute('style', 'text-shadow: none;');

    titleErrorMessage.textContent = error;
    textErrorMessage.textContent = tip;

    wrapBlockError.appendChild(titleErrorMessage);
    wrapBlockError.appendChild(textErrorMessage);

    document.body.appendChild(wrapBlockError);

    setTimeout(function () {
      wrapBlockError.style.top = '10px';
    }, 100);

    hideTimeoutMessage(wrapBlockError);
  };

  var getErrorStatus = function (status) {
    switch (status) {
      case 500:
        showError('Сервер обнаружил непредвиденное состояние, которое не позволило ему выполнить запрос', 'Попробуйте зайти позже');
        break;
      case 400:
      case 404:
      case 410:
        showError('Не возможно получить доступ к странице', 'Возможно, введён некорректный адрес или страница была удалена');
        break;
      case 401:
      case 403:
      case 407:
        showError('У вас нет доступа', 'Попробуйте сбросить кэш браузера и очистить cookies');
        break;
      case 405:
      case 411:
      case 412:
      case 413:
      case 414:
      case 415:
      case 416:
      case 417:
      case 501:
        showError('Некорректно указанный запрос', 'Проверте правильность запроса');
        break;
      case 503:
        showError('Сервер не доступен', 'Попробуйте зайти позже');
        break;
      case 419:
      case 504:
        showError('Время на выполнение запроса истекло', 'Попробуйте зайти позже');
        break;
    }
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = XHR_TYPE;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        getErrorStatus(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения', 'Проверте подключение к интернету');
    });

    xhr.addEventListener('timeout', function () {
      onError('Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен', 'Проверте ваше интернет соединение или попробуйте зайти позже');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open('GET', XHR_URL);
    xhr.send();
  };

  window.backend = {
    load: load,
    showError: showError
  };

})();
