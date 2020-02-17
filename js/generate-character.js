'use strict';

(function () {
  var CHARACTER_COUNT = 4;

  var setupBlock = window.utils.setupBlock;
  var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var characterSimilarList = setupBlock.querySelector('.setup-similar-list');

  // Создание персонажа со случайными параметрами
  var renderCharacter = function (character) {
    var characterClone = characterTemplate.cloneNode(true);

    characterClone.querySelector(window.utils.playerCoatClassName).style.fill = character.colorCoat;
    characterClone.querySelector(window.utils.playerEyesClassName).style.fill = character.colorEyes;
    characterClone.querySelector('.setup-similar-label').textContent = character.name;

    return characterClone;
  };

  // Запись персонажа в созданный фрагмент
  var appendCharacterInToFragment = function (characters) {
    var characterFragment = document.createDocumentFragment();

    for (var i = 0; i < CHARACTER_COUNT; i++) {
      characterFragment.appendChild(renderCharacter(characters[i]));
    }

    return characterFragment;
  };

  var onLoad = function (loadData) {
    loadData = loadData || window.message.showMessage({
      title: 'Данные отсутсвуют',
      text: 'Проверте правильность запроса'
    });

    characterSimilarList.appendChild(appendCharacterInToFragment(loadData));

    setupBlock.querySelector('.setup-similar').classList.remove('hidden');

  };

  window.backend.load(onLoad, window.message.showMessage);
})();
