'use strict';

(function () {
  var uploadElement = window.utils.setupBlock.querySelector('.upload');

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

      window.utils.setupBlock.style.left = window.utils.setupBlock.offsetLeft - shiftX + 'px';
      window.utils.setupBlock.style.top = window.utils.setupBlock.offsetTop - shiftY + 'px';
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
