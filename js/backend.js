'use strict';

(function () {
  var XHR_LOAD_URL = 'https://js.dump.academy/code-and-magick/data';
  var XHR_SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var XHR_TIMEOUT = 10000;
  var XHR_TYPE = 'json';

  var getErrorStatus = function (status) {
    switch (status) {
      case 500:
        return {
          title: 'Сервер обнаружил непредвиденное состояние, которое не позволило ему выполнить запрос',
          text: 'Попробуйте зайти позже'
        };
      case 400:
      case 404:
      case 410:
        return {
          title: 'Не возможно получить доступ к странице',
          text: 'Возможно, введён некорректный адрес или страница была удалена'
        };
      case 401:
      case 403:
      case 407:
        return {
          title: 'У вас нет доступа',
          text: 'Попробуйте сбросить кэш браузера и очистить cookies'
        };
      case 405:
      case 411:
      case 412:
      case 413:
      case 414:
      case 415:
      case 416:
      case 417:
      case 501:
        return {
          title: 'Некорректно указанный запрос',
          text: 'Проверте правильность запроса'
        };
      case 503:
        return {
          title: 'Сервер не доступен',
          text: 'Попробуйте зайти позже'
        };
      case 419:
      case 504:
        return {
          title: 'Время на выполнение запроса истекло',
          text: 'Попробуйте зайти позже'
        };
      default:
        return {
          title: 'Неизвестный статус: ' + status,
          text: 'Проверте правильность запроса'
        };
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
        onError(getErrorStatus(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError({
        title: 'Ошибка соединения',
        text: 'Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение'
      });
    });

    xhr.addEventListener('timeout', function () {
      onError({
        title: 'Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен',
        text: 'Проверте ваше интернет соединение или попробуйте зайти позже'
      });
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

        onLoad(
            {
              title: 'Поздравляю',
              text: 'Ваш запрос успешно отправлен'
            },
            true
        );
      } else {
        onError(getErrorStatus(xhr.status));
        resetButtonForm();
      }
    });

    xhr.addEventListener('error', function () {
      onError({
        title: 'Ошибка соединения',
        text: 'Возможно, введён некорректный адрес или у вас отсутсвует интернет соединение'
      });
      resetButtonForm();
    });

    xhr.addEventListener('timeout', function () {
      onError({
        title: 'Время на выполнение запроса истекло. Возможно, ваше интерент соединение не стабильно или сервер перегружен',
        text: 'Проверте ваше интернет соединение или попробуйте зайти позже'
      });
      resetButtonForm();
    });

    xhr.send(data);

  };

  window.backend = {
    load: load,
    save: save
  };

})();
