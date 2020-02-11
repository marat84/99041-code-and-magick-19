'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var playerCoatClassName = '.wizard-coat';
  var playerEyesClassName = '.wizard-eyes';

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

  // Получение поля input через его имя
  var getInputByName = function (inputName) {
    return setupBlock.querySelector('input[name="' + inputName + '"]');
  };

  window.utils = {
    getHighestValue: getHighestValue,
    getRandomValue: getRandomValue,
    getInputByName: getInputByName,
    setupBlock: setupBlock,
    playerCoatClassName: playerCoatClassName,
    playerEyesClassName: playerEyesClassName
  };
})();
