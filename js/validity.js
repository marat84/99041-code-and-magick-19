'use strict';

(function () {
  var setupInput = window.utils.setupBlock.querySelector('.setup-user-name');

  // Работа над валидацие поля имени персонажа в диалоговом окне
  var inputMinLength = +setupInput.getAttribute('minlength') || 2;
  var inputMaxLength = +setupInput.getAttribute('maxlength') || 25;

  setupInput.addEventListener('input', function (evt) {
    var target = evt.target;

    if ((target.validity.tooShort || target.value.length < inputMinLength) && target.value.length !== 0) {
      target.setCustomValidity('Имя персонажа не может содержать менее ' + inputMinLength + ' символов');
    } else if ((target.validity.tooLong || target.value.length > inputMaxLength) && target.value.length !== 0) {
      target.setCustomValidity('Максимальная длина имени персонажа — ' + inputMaxLength + ' символов');
    } else {
      target.setCustomValidity('');
    }
  });

})();
