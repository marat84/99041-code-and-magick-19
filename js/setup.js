'use strict';

(function () {
  var DEBOUNCE_TIMEOUT = 500;

  var mainCharacter = window.utils.setupBlock.querySelector('.setup-player');
  var setupForm = window.utils.setupBlock.querySelector('.setup-wizard-form');
  var setupFormButton = setupForm.querySelector('.setup-submit');
  var characterSimilarList = window.utils.setupBlock.querySelector('.setup-similar-list');
  var textButton = setupFormButton.textContent;

  var Input = function (coat, eyes, fireball) {
    this.coat = coat;
    this.eyes = eyes;
    this.fireball = fireball;
  };

  var hiddenInputs = new Input(
      window.utils.getInputByName('coat-color'),
      window.utils.getInputByName('eyes-color'),
      window.utils.getInputByName('fireball-color')
  );

  var randomCoatColor = hiddenInputs.coat.value;
  var randomEyesColor = hiddenInputs.eyes.value;
  var randomFireballColor = hiddenInputs.fireball.value;
  var character = [];

  var onLoad = function (loadData) {
    character = loadData;
    updateCoatColor();

    window.utils.setupBlock.querySelector('.setup-similar').classList.remove('hidden');
  };

  var lastTimeout;
  var debounce = function (cb) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(cb, DEBOUNCE_TIMEOUT);
  };

  var updateCoatColor = function () {
    characterSimilarList.innerHTML = '';
    characterSimilarList.appendChild(
        window.generateCharacter.appendCharacterInToFragment(
            window.filter.filterCharacter(randomCoatColor, randomEyesColor, character)
        )
    );
  };

  window.backend.load(onLoad, window.message.showMessage);

  var filterClickHandler = function (evt) {
    var target = evt.target;

    if (target && target.matches(window.utils.playerCoatClassName)) {
      randomCoatColor = window.utils.getRandomValue(window.data.CHARACTER_COAT_COLORS);

      target.style.fill = randomCoatColor;
      hiddenInputs.coat.value = randomCoatColor;

      debounce(updateCoatColor);
    }

    if (target && target.matches(window.utils.playerEyesClassName)) {
      randomEyesColor = window.utils.getRandomValue(window.data.CHARACTER_EYES_COLORS);

      target.style.fill = randomEyesColor;
      hiddenInputs.eyes.value = randomEyesColor;

      debounce(updateCoatColor);
    }

    if (target && target.matches('.setup-fireball')) {
      randomFireballColor = window.utils.getRandomValue(window.data.CHARACTER_FIREBALL_COLOR);

      target.parentElement.style.background = randomFireballColor;
      hiddenInputs.fireball.value = randomFireballColor;
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
