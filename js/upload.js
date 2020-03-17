// Файл upload.js
'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var avatarUploadField = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoUploadField = document.querySelector('.ad-form__input');
  var photosPreview = document.querySelector('.ad-form__photo');

  /**
   * функция загрузки фотографии
   * @param {evt} evt
   */
  var avatarUploadHandler = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  };

  /**
   * функция загрузки фотографии
   * @param {evt} evt
   */
  var photoUploadHandler = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photosPreview.style = 'display: flex; flex-wrap: wrap; width: 300px;';
        photo.style = 'width: 70px; height: 70px; margin-right: 5px; margin-bottom: 5px';
        photosPreview.appendChild(photo);
        photo.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  };

  avatarUploadField.addEventListener('change', avatarUploadHandler);
  photoUploadField.addEventListener('change', photoUploadHandler);

})();
