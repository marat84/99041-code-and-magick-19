'use strict';

(function () {
  var mainCharacter = window.utils.setupBlock.querySelector('.setup-player');
  var setupForm = window.utils.setupBlock.querySelector('.setup-wizard-form');
  var setupFormButton = setupForm.querySelector('.setup-submit');
  var textButton = setupFormButton.textContent;

  var filterClickHandler = function (evt) {
    var target = evt.target;
    var randomCoatColor = window.utils.getRandomValue(window.data.CHARACTER_COAT_COLOR);
    var randomEyesColor = window.utils.getRandomValue(window.data.CHARACTER_EYES_COLORS);
    var randomFireballColor = window.utils.getRandomValue(window.data.CHARACTER_FIREBALL_COLOR);

    if (target && target.matches(window.utils.playerCoatClassName)) {
      target.style.fill = randomCoatColor;
      window.utils.getInputByName('coat-color').value = randomCoatColor;
    }

    if (target && target.matches(window.utils.playerEyesClassName)) {
      target.style.fill = randomEyesColor;
      window.utils.getInputByName('eyes-color').value = randomEyesColor;
    }

    if (target && target.matches('.setup-fireball')) {
      target.parentElement.style.background = randomFireballColor;
      window.utils.getInputByName('fireball-color').value = randomFireballColor;
    }
  };

  mainCharacter.addEventListener('click', filterClickHandler);

  var setDefaultStateButton = function () {
    setupFormButton.disabled = false;
    setupFormButton.textContent = textButton;
  };

  var setSendStateButton = function () {
    setupFormButton.disabled = true;
    setupFormButton.textContent = 'Сохранение данных...';
  };

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(setupForm);
    setSendStateButton();

    window.backend.save(data, function () {
      window.utils.setupBlock.classList.add('hidden');

      window.message.showMessage(
          {
            title: 'Поздравляю',
            text: 'Ваш запрос успешно отправлен'
          },
          true
      );

      setDefaultStateButton();
    }, function (status) {
      var statusMessage = (status && typeof status === 'object') ? status : window.message.getErrorStatus(status);

      window.message.showMessage(statusMessage);

      setDefaultStateButton();
    });
  });

})();
