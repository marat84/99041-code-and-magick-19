'use strict';

(function () {

  var XHR_LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var XHR_SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var XHR_TIMEOUT = 10000;
  var XHR_TYPE = 'json';
  var ERROR_COLOR = 'orangeRed';
  var SUCCESS_COLOR = '#1cb34d';
  var ERROR_SHOW_TIME = 6000;
  var TRANSITION_DURATION = 0.5;

  var hideTimeoutMessage = function (block, success) {
    var colorTimerBlock = (success) ? SUCCESS_COLOR : ERROR_COLOR;
    var timerBlock = document.createElement('div');
    var pointOfStart = 100;

    timerBlock.setAttribute('style', 'position:absolute; left:0; top:0; height:4px; width:100%; background-color: ' + colorTimerBlock + ';');

    var interval = setInterval(function () {
      pointOfStart--;

      timerBlock.style.width = pointOfStart + '%';
    }, ERROR_SHOW_TIME / pointOfStart);

    setTimeout(function () {
      clearInterval(interval);

      block.style.top = '-50%';

      setTimeout(function () {
        block.remove();
      }, TRANSITION_DURATION * 1000);

    }, ERROR_SHOW_TIME);

    block.appendChild(timerBlock);
  };

  var showMessage = function (message, tip, success) {
    var colorMessage = (success) ? SUCCESS_COLOR : ERROR_COLOR;
    var wrapBlockError = document.createElement('section');
    var titleErrorMessage = document.createElement('h2');
    var textErrorMessage = document.createElement('p');

    wrapBlockError.classList.add('js-message');

    wrapBlockError.setAttribute('style', 'position: absolute; top:-50%; left:calc(50% - 300px); width: 600px; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.7); text-align: center; padding: 30px; background-color: white; color: ' + colorMessage + '; z-index: 10; transition: all ' + TRANSITION_DURATION + 's;');
    titleErrorMessage.setAttribute('style', 'text-shadow: none;');

    titleErrorMessage.textContent = message;
    textErrorMessage.textContent = tip;

    wrapBlockError.appendChild(titleErrorMessage);
    wrapBlockError.appendChild(textErrorMessage);

    document.body.appendChild(wrapBlockError);

    setTimeout(function () {
      wrapBlockError.style.top = '10px';
    }, 100);

    hideTimeoutMessage(wrapBlockError, success);
  };

  var getErrorStatus = function (status) {
    switch (status) {
      case 500:
        showMessage('Сервер обнаружил непредвиденное состояние, которое не позволило ему выполнить запрос', 'Попробуйте зайти позже');
        break;
      case 400:
      case 404:
      case 410:
        showMessage('Не возможно получить доступ к странице', 'Возможно, введён некорректный адрес или страница была удалена');
        break;
      case 401:
      case 403:
      case 407:
        showMessage('У вас нет доступа', 'Попробуйте сбросить кэш браузера и очистить cookies');
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
        showMessage('Некорректно указанный запрос', 'Проверте правильность запроса');
        break;
      case 503:
        showMessage('Сервер не доступен', 'Попробуйте зайти позже');
        break;
      case 419:
      case 504:
        showMessage('Время на выполнение запроса истекло', 'Попробуйте зайти позже');
        break;
      default:
        showMessage('Неизвестный статус: ' + status, 'Проверте правильность запроса');
    }
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = XHR_TYPE;
    xhr.timeout = XHR_TIMEOUT;

    xhr.open('GET', XHR_LOAD_URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        getErrorStatus(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения', 'Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение');
    });

    xhr.addEventListener('timeout', function () {
      onError('Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен', 'Проверте ваше интернет соединение или попробуйте зайти позже');
    });

    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = XHR_TIMEOUT;

    xhr.open('POST', XHR_SAVE_URL);
    var textButton = window.setup.setupFormButton.textContent;

    window.setup.setupFormButton.disabled = true;
    window.setup.setupFormButton.textContent = 'Сохранение данных...';

    var resetButtonForm = function () {
      window.setup.setupFormButton.disabled = false;
      window.setup.setupFormButton.textContent = textButton;
    };

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.utils.setupBlock.classList.add('hidden');
        resetButtonForm();

        onLoad('Поздравляю', 'Ваш запрос успешно отправлен', true);
      } else {
        getErrorStatus(xhr.status);
        resetButtonForm();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения', 'Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение');
      resetButtonForm();
    });

    xhr.addEventListener('timeout', function () {
      onError('Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен', 'Проверте ваше интернет соединение или попробуйте зайти позже');
      resetButtonForm();
    });

    xhr.send(data);

  };

  window.backend = {
    load: load,
    save: save,
    showMessage: showMessage
  };

})();
