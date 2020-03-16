'use strict';

(function () {
  var FILE_EXTENSIONS = ['jpg', 'png', 'gif'];
  var uploadBlock = document.querySelector('.upload');
  var uploadButton = uploadBlock.querySelector('input[type="file"]');
  var uploadImage = uploadBlock.querySelector('.setup-user-pic');

  uploadButton.addEventListener('change', function (evt) {
    evt.preventDefault();

    var file = uploadButton.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();

      var isFileImage = FILE_EXTENSIONS.some(function (current) {
        return fileName.endsWith(current);
      });
    }

    if (isFileImage) {
      var fileReader = new FileReader();
      fileReader.addEventListener('load', function (fileReadEvt) {
        uploadImage.src = fileReadEvt.target.result;
      });
      fileReader.readAsDataURL(file);
    }
  });
})();
