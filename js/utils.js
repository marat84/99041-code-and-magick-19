'use strict';

(function () {
  // Получение максимального числа из массива со множеством чисел
  var getHighestValue = function (numbers) {
    var max = 0;

    for (var i = 0; i < numbers.length; i++) {
      if (numbers[i] > max) {
        max = numbers[i];
      }
    }

    return max;
  };

  // Получение случайного значения из массива данных
  var getRandomValue = function (values) {
    return values[Math.floor(Math.random() * values.length)];
  };

  // Генерация массива с определённым количеством объектов
  var generateData = function (count) {
    var arrayResult = [];

    for (var i = 0; i < count; i++) {
      arrayResult.push({
        name: getRandomValue(window.data.CHARACTER_NAMES) + ' ' + getRandomValue(window.data.CHARACTER_SECOND_NAMES),
        coatColor: getRandomValue(window.data.CHARACTER_COAT_COLORS),
        eyesColor: getRandomValue(window.data.CHARACTER_EYES_COLORS)
      });
    }

    return arrayResult;
  };

  // Получение поля input через его имя
  var getInputByName = function (inputName) {
    return document.querySelector('input[name="' + inputName + '"]');
  };

  window.utils = {
    getHighestValue: getHighestValue,
    getRandomValue: getRandomValue,
    generateData: generateData,
    getInputByName: getInputByName
  };
})();
