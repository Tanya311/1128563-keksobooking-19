// Файл upload.js
'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT = 'img/muffin-grey.svg';
  var PHOTO_STYLE = 'width: 70px; height: 70px; margin-right: 5px; margin-bottom: 5px';
  var PHOTO_CONTAINER_STYLE = 'display: flex; flex-wrap: wrap; width: 300px';
  var avatarUploadField = document.querySelector('.ad-form-header__input');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoUploadField = document.querySelector('.ad-form__input');
  var photosPreview = document.querySelector('.ad-form__photo');

  /**
   * @name checTypeFile
   * @description функция проверки типа файла
   * @param {*} file
   * @return {*}
   */
  var checTypeFile = function (file) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  /**
   * @name avatarUploadFieldChangeHandler
   * @description функция загрузки аватара
   * @param {evt} evt
   */
  var avatarUploadFieldChangeHandler = function (evt) {
    var file = evt.target.files[0];

    if (checTypeFile(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  /**
   * @name photoUploadFieldChangeHandler
   * @description функция загрузки фотографии
   * @param {evt} evt
   */
  var photoUploadFieldChangeHandler = function (evt) {
    var file = evt.target.files[0];

    if (checTypeFile(file)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photosPreview.style = PHOTO_CONTAINER_STYLE;
        photo.style = PHOTO_STYLE;
        photosPreview.appendChild(photo);
        photo.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

  };

  avatarUploadField.addEventListener('change', avatarUploadFieldChangeHandler);
  photoUploadField.addEventListener('change', photoUploadFieldChangeHandler);

  /**
   * @name removePhoto
   * @description Удаляет фотографии жилья и возвращает иконку аватара по умолчанию
   */
  var removePhoto = function () {
    avatarPreview.src = AVATAR_DEFAULT;
    photosPreview.querySelectorAll('.ad-form__photo img').forEach(function (photo) {
      photo.remove();
    });
  };

  window.upload = {
    removePhoto: removePhoto
  };

})();
