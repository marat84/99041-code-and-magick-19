'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESCAPE_KEY = 'Escape';
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

  // Генерация массива с определённым количеством объектов
  var generateData = function (count) {
    var arrayResult = [];

    for (var i = 0; i < count; i++) {
      arrayResult.push({
        name: window.utils.getRandomValue(CHARACTER_NAMES) + ' ' + window.utils.getRandomValue(CHARACTER_SECOND_NAMES),
        coatColor: window.utils.getRandomValue(CHARACTER_COAT_COLORS),
        eyesColor: window.utils.getRandomValue(CHARACTER_EYES_COLORS)
      });
    }

    return arrayResult;
  };

  window.data = {
    generateData: generateData,
    ENTER_KEY: ENTER_KEY,
    ESCAPE_KEY: ESCAPE_KEY,
    CHARACTER_NAMES: CHARACTER_NAMES,
    CHARACTER_SECOND_NAMES: CHARACTER_SECOND_NAMES,
    CHARACTER_COAT_COLORS: CHARACTER_COAT_COLORS,
    CHARACTER_EYES_COLORS: CHARACTER_EYES_COLORS,
    CHARACTER_FIREBALL_COLOR: CHARACTER_FIREBALL_COLOR
  };
})();
