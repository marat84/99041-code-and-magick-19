'use strict';

(function () {
  var fireballSize = 22;
  var getFireballSpeed = function (left) {
    return (left === true) ? 5 : 2;
  };
  var wizardSpeed = 3;
  var wizardWidth = 70;
  var getWizardHeight = function () {
    return 1.337 * wizardWidth;
  };
  var getWizardX = function (width) {
    return width / 2 - wizardWidth / 2;
  };
  var getWizardY = function (height) {
    return (height / 3 * 2) - getWizardHeight();
  };

  window.fireballSize = fireballSize;
  window.getFireballSpeed = getFireballSpeed;
  window.wizardSpeed = wizardSpeed;
  window.getWizardHeight = getWizardHeight;
  window.getWizardX = getWizardX;
  window.getWizardY = getWizardY;
})();
