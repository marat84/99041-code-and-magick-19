'use strict';

(function () {
  var setupBlock = window.utils.setupBlock;
  var uploadElement = setupBlock.querySelector('.upload');

  uploadElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startX = evt.clientX;
    var startY = evt.clientY;

    var isMove = false;

    var mouseMoveHandler = function (mouseMove) {
      mouseMove.preventDefault();
      isMove = true;

      var endX = mouseMove.clientX;
      var endY = mouseMove.clientY;

      var shiftX = startX - endX;
      var shiftY = startY - endY;

      startX = endX;
      startY = endY;

      setupBlock.style.left = setupBlock.offsetLeft - shiftX + 'px';
      setupBlock.style.top = setupBlock.offsetTop - shiftY + 'px';
    };

    var mouseUpHandler = function (mouseUp) {
      mouseUp.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      if (isMove) {
        var clickUploadHandler = function (clickEvt) {
          clickEvt.preventDefault();
          uploadElement.removeEventListener('click', clickUploadHandler);
        };
        uploadElement.addEventListener('click', clickUploadHandler);
      }
    };

    window.addEventListener('mouseup', mouseUpHandler);
    document.addEventListener('mousemove', mouseMoveHandler);
  });
})();
