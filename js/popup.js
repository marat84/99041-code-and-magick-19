'use strict';

(function () {
  var enterKey = window.data.ENTER_KEY;
  var escapeKey = window.data.ESCAPE_KEY;

  var setupBlock = window.utils.setupBlock;
  var setupButtonOpen = document.querySelector('.setup-open');
  var setupButtonClose = setupBlock.querySelector('.setup-close');
  var setupInput = setupBlock.querySelector('.setup-user-name');

  // Работа над открытием и закрытием диалогового окна настройки персонажа
  var closeDialog = function () {
    setupBlock.classList.add('hidden');

    setupBlock.style.top = '';
    setupBlock.style.left = '';

    document.removeEventListener('keydown', documentKeyDownHandler);
  };

  var openDialog = function () {
    setupBlock.classList.remove('hidden');

    document.addEventListener('keydown', documentKeyDownHandler);
  };

  var documentKeyDownHandler = function (evt) {
    if (evt.key === escapeKey && evt.target !== setupInput) {
      closeDialog();
    }
  };

  setupButtonOpen.addEventListener('click', function () {
    openDialog();
  });

  setupButtonClose.addEventListener('click', function () {
    closeDialog();
  });

  setupButtonOpen.addEventListener('keydown', function (evt) {
    if (evt.key === enterKey) {
      openDialog();
    }
  });

  setupButtonClose.addEventListener('keydown', function (evt) {
    if (evt.key === enterKey) {
      closeDialog();
    }
  });
})();
