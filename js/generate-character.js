'use strict';

(function () {
  var setupBlock = window.variables.setupBlock;
  var characterTemplate = window.variables.characterTemplate;
  var playerCoatClassName = window.variables.playerCoatClassName;
  var playerEyesClassName = window.variables.playerEyesClassName;

  var characterInformation = window.data.generateData(4);

  // Запись персонажа в созданный фрагмент
  var appendCharacterInToFragment = function (characters) {
    var characterFragment = document.createDocumentFragment();

    for (var i = 0; i < characters.length; i++) {
      characterFragment.appendChild(renderCharacter(characters[i]));
    }

    return characterFragment;
  };

  // Создание персонажа со случайными параметрами
  var renderCharacter = function (character) {
    var characterClone = characterTemplate.cloneNode(true);

    characterClone.querySelector(playerCoatClassName).style.fill = character.coatColor;
    characterClone.querySelector(playerEyesClassName).style.fill = character.eyesColor;
    characterClone.querySelector('.setup-similar-label').textContent = character.name;

    return characterClone;
  };

  var characterSimilarList = setupBlock.querySelector('.setup-similar-list');

  characterSimilarList.appendChild(appendCharacterInToFragment(characterInformation));

  setupBlock.querySelector('.setup-similar').classList.remove('hidden');
})();
