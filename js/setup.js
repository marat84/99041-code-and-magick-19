'use strict';

(function () {
  var playerCoatClassName = window.variables.playerCoatClassName;
  var playerEyesClassName = window.variables.playerEyesClassName;

  var getRandomValue = window.utils.getRandomValue;
  var getInputByName = window.utils.getInputByName;
  var characterCoatColors = window.data.CHARACTER_COAT_COLORS;
  var characterEyesColors = window.data.CHARACTER_EYES_COLORS;
  var characterFireballColor = window.data.CHARACTER_FIREBALL_COLOR;

  var mainCharacter = window.variables.mainCharacter;

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
})();
