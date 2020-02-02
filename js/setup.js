'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var getRandomValue = function (values) {
  return values[Math.floor(Math.random() * values.length)];
};

var CHARACTER_NAMES = [
  [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ],
  [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ]
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

var characterInformation = [
  {
    name: getRandomValue(CHARACTER_NAMES[0]) + ' ' + getRandomValue(CHARACTER_NAMES[1]),
    coatColor: getRandomValue(CHARACTER_COAT_COLORS),
    eyesColor: getRandomValue(CHARACTER_EYES_COLORS)
  },
  {
    name: getRandomValue(CHARACTER_NAMES[1]) + ' ' + getRandomValue(CHARACTER_NAMES[0]),
    coatColor: getRandomValue(CHARACTER_COAT_COLORS),
    eyesColor: getRandomValue(CHARACTER_EYES_COLORS)
  },
  {
    name: getRandomValue(CHARACTER_NAMES[0]) + ' ' + getRandomValue(CHARACTER_NAMES[1]),
    coatColor: getRandomValue(CHARACTER_COAT_COLORS),
    eyesColor: getRandomValue(CHARACTER_EYES_COLORS)
  },
  {
    name: getRandomValue(CHARACTER_NAMES[1]) + ' ' + getRandomValue(CHARACTER_NAMES[0]),
    coatColor: getRandomValue(CHARACTER_COAT_COLORS),
    eyesColor: getRandomValue(CHARACTER_EYES_COLORS)
  }
];

var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderCharacter = function (character) {
  var characterClone = characterTemplate.cloneNode(true);

  characterClone.querySelector('.wizard-coat').style.fill = character.coatColor;
  characterClone.querySelector('.wizard-eyes').style.fill = character.eyesColor;
  characterClone.querySelector('.setup-similar-label').textContent = character.name;

  return characterClone;
};

var characterSimilarList = setupBlock.querySelector('.setup-similar-list');

var characterFragment = document.createDocumentFragment();

for (var i = 0; i < characterInformation.length; i++) {
  characterFragment.appendChild(renderCharacter(characterInformation[i]));
}

characterSimilarList.appendChild(characterFragment);

document.querySelector('.setup-similar').classList.remove('hidden');
