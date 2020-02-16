'use strict';

(function () {
  var playerCoatClassName = window.utils.playerCoatClassName;
  var playerEyesClassName = window.utils.playerEyesClassName;

  var getRandomValue = window.utils.getRandomValue;
  var getInputByName = window.utils.getInputByName;
  var characterCoatColors = window.data.CHARACTER_COAT_COLORS;
  var characterEyesColors = window.data.CHARACTER_EYES_COLORS;
  var characterFireballColor = window.data.CHARACTER_FIREBALL_COLOR;

  var mainCharacter = window.utils.setupBlock.querySelector('.setup-player');
  var setupForm = window.utils.setupBlock.querySelector('.setup-wizard-form');
  var setupFormButton = setupForm.querySelector('.setup-submit');

  var filterClickHandler = function (evt) {
    var target = evt.target;
    var randomCoatColor = getRandomValue(characterCoatColors);
    var randomEyesColor = getRandomValue(characterEyesColors);
    var randomFireballColor = getRandomValue(characterFireballColor);

    if (target && target.matches(playerCoatClassName)) {
      target.style.fill = randomCoatColor;
      getInputByName('coat-color').value = randomCoatColor;
    }

    if (target && target.matches(playerEyesClassName)) {
      target.style.fill = randomEyesColor;
      getInputByName('eyes-color').value = randomEyesColor;
    }

    if (target && target.matches('.setup-fireball')) {
      target.parentElement.style.background = randomFireballColor;
      getInputByName('fireball-color').value = randomFireballColor;
    }
  };

  mainCharacter.addEventListener('click', filterClickHandler);

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var data = new FormData(setupForm);

    window.backend.save(data, window.message.showMessage, window.message.showMessage);
  });

  window.setup = {
    setupFormButton: setupFormButton
  };

})();
