'use strict';

(function () {
  var ERROR_COLOR = 'orangeRed';
  var SUCCESS_COLOR = '#1cb34d';
  var ERROR_SHOW_TIME = 6000;
  var TRANSITION_DURATION = 0.5;

  var hideTimeoutMessage = function (block, isSuccess) {
    var colorTimerBlock = (isSuccess) ? SUCCESS_COLOR : ERROR_COLOR;
    var timerBlock = document.createElement('div');
    var pointOfStart = 100;

    timerBlock.setAttribute('style', 'position:absolute; left:0; top:0; height:4px; width:100%; background-color: ' + colorTimerBlock + ';');

    var interval = setInterval(function () {
      pointOfStart--;

      timerBlock.style.width = pointOfStart + '%';
    }, ERROR_SHOW_TIME / pointOfStart);

    setTimeout(function () {
      clearInterval(interval);

      block.style.top = '-50%';

      setTimeout(function () {
        block.remove();
      }, TRANSITION_DURATION * 1000);

    }, ERROR_SHOW_TIME);

    block.appendChild(timerBlock);
  };

  var showMessage = function (message, isSuccess) {
    var colorMessage = (isSuccess) ? SUCCESS_COLOR : ERROR_COLOR;
    var wrapBlockError = document.createElement('section');
    var titleErrorMessage = document.createElement('h2');
    var textErrorMessage = document.createElement('p');

    wrapBlockError.classList.add('js-message.js');

    wrapBlockError.setAttribute('style', 'position: absolute; top:-50%; left:calc(50% - 300px); width: 600px; box-shadow: 10px 10px 0 0 rgba(0,0,0,0.7); text-align: center; padding: 30px; background-color: white; color: ' + colorMessage + '; z-index: 10; transition: all ' + TRANSITION_DURATION + 's;');
    titleErrorMessage.setAttribute('style', 'text-shadow: none;');

    titleErrorMessage.textContent = message.title;
    textErrorMessage.textContent = message.text;

    wrapBlockError.appendChild(titleErrorMessage);
    wrapBlockError.appendChild(textErrorMessage);

    document.body.appendChild(wrapBlockError);

    setTimeout(function () {
      wrapBlockError.style.top = '10px';
    }, 100);

    hideTimeoutMessage(wrapBlockError, isSuccess);
  };

  window.message = {
    showMessage: showMessage
  };

})();

