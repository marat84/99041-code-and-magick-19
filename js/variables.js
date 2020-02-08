'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupButtonOpen = document.querySelector('.setup-open');
  var characterTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupButtonClose = setupBlock.querySelector('.setup-close');
  var setupInput = setupBlock.querySelector('.setup-user-name');
  var mainCharacter = setupBlock.querySelector('.setup-player');
  var playerCoatClassName = '.wizard-coat';
  var playerEyesClassName = '.wizard-eyes';

  window.variables = {
    setupBlock: setupBlock,
    setupButtonOpen: setupButtonOpen,
    characterTemplate: characterTemplate,
    setupButtonClose: setupButtonClose,
    setupInput: setupInput,
    mainCharacter: mainCharacter,
    playerCoatClassName: playerCoatClassName,
    playerEyesClassName: playerEyesClassName
  };
})();
