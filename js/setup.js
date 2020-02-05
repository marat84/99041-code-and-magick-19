'use strict';

var ENTER_KEY = 'Enter';
var ESCAPE_KEY = 'Escape';

var setupBlock = document.querySelector('.setup');
var setupButtonOpen = document.querySelector('.setup-open');
var setupButtonClose = document.querySelector('.setup-close');
var setupInput = setupBlock.querySelector('.setup-user-name');

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var CHARACTER_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var CHARACTER_SECOND_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var CHARACTER_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var CHARACTER_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var CHARACTER_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var generateData = function (count) {
  var arrayResult = [];

  for (var i = 0; i < count; i++) {
    arrayResult.push({
      name: getRandomValue(CHARACTER_NAMES) + ' ' + getRandomValue(CHARACTER_SECOND_NAMES),
      coatColor: getRandomValue(CHARACTER_COAT_COLORS),
      eyesColor: getRandomValue(CHARACTER_EYES_COLORS)
    });
  }

  return arrayResult;
};

var characterInformation = generateData(4);

var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderCharacter = function (character) {
  var characterClone = characterTemplate.cloneNode(true);

  characterClone.querySelector('.wizard-coat').style.fill = character.coatColor;
  characterClone.querySelector('.wizard-eyes').style.fill = character.eyesColor;
  characterClone.querySelector('.setup-similar-label').textContent = character.name;

  return characterClone;
};

var characterSimilarList = setupBlock.querySelector('.setup-similar-list');

var appendCharacterInToFragment = function (characters) {
  var characterFragment = document.createDocumentFragment();

  for (var i = 0; i < characters.length; i++) {
    characterFragment.appendChild(renderCharacter(characters[i]));
  }

  return characterFragment;
};

characterSimilarList.appendChild(appendCharacterInToFragment(characterInformation));

document.querySelector('.setup-similar').classList.remove('hidden');

var closeDialog = function () {
  setupBlock.classList.add('hidden');

  document.removeEventListener('keydown', documentKeyDownHandler);
};

var openDialog = function () {
  setupBlock.classList.remove('hidden');

  document.addEventListener('keydown', documentKeyDownHandler);
};

var documentKeyDownHandler = function (evt) {
  if (evt.key === ESCAPE_KEY && evt.target !== setupInput) {
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
  if (evt.key === ENTER_KEY) {
    openDialog();
  }
});

setupButtonClose.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closeDialog();
  }
});


var mainCharacter = document.querySelector('.setup-player');

var getInputByName = function (inputName) {
  return mainCharacter.querySelector('input[name="' + inputName + '"]');
};

var filterClickHandler = function (evt) {
  var target = evt.target;
  var randomCoatColor = getRandomValue(CHARACTER_COAT_COLORS);
  var randomEyesColor = getRandomValue(CHARACTER_EYES_COLORS);
  var randomFireballColor = getRandomValue(CHARACTER_FIREBALL_COLOR);

  if (target && target.matches('.wizard-coat')) {
    target.style.fill = randomCoatColor;
    getInputByName('coat-color').value = randomCoatColor;
  }

  if (target && target.matches('.wizard-eyes')) {
    target.style.fill = randomEyesColor;
    getInputByName('eyes-color').value = randomEyesColor;
  }

  if (target && target.matches('.setup-fireball')) {
    target.parentElement.style.background = randomFireballColor;
    getInputByName('fireball-color').value = randomFireballColor;
  }
};

mainCharacter.addEventListener('click', filterClickHandler);
