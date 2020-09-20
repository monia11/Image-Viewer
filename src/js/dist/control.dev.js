"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeImage = exports.rotateImage = exports.showDefault = exports.uploadImages = void 0;

var _base = require("./base");

var state = {
  renderedImages: [],
  rotations: 0,
  currentImg: 0,
  uploadedFiles: {},
  defaultSource: false
};

var uploadImages = function uploadImages(event) {
  state.uploadedFiles = event.target.files;
  state.countFiles = state.uploadedFiles.length;
  changeInitBox();
  displayList(srcUpload, state.countFiles);
};

exports.uploadImages = uploadImages;

var showDefault = function showDefault() {
  state.defaultSource = true;
  changeInitBox();
  displayList(srcDefault, 20);
};

exports.showDefault = showDefault;

var rotateImage = function rotateImage(w) {
  state.rotations++;
  var angle;

  if (w == 'anticlock') {
    angle = state.rotations * 270;
  } else if (w == 'clock') {
    angle = state.rotations * -270;
  }

  _base.elements.photo.style.transform = "rotate(".concat(angle, "deg)");

  _base.elements.photo.classList.toggle('rotate_image');
};

exports.rotateImage = rotateImage;

var changeImage = function changeImage(w) {
  var countFiles = state.uploadedFiles.length;

  if (!state.defaultSource) {
    counter(w, countFiles);
    displayImage(state.currentImg, srcUpload);
  } else {
    counter(w, 20);
    displayImage(state.currentImg, srcDefault);
  }

  chosenImage(state.currentImg);
};

exports.changeImage = changeImage;

var counter = function counter(w, num) {
  if (w == 'n' && state.currentImg < num - 1) {
    state.currentImg++;
  } else if (w == 'p' && state.currentImg > 0) {
    state.currentImg--;
  } else {
    state.currentImg = state.currentImg;
  }
};

var changeInitBox = function changeInitBox() {
  _base.elements.defaultBtn.style.display = 'none';
  _base.elements.uploadForm.style.display = 'none';
  _base.elements.list.style.display = 'block';
  _base.elements.info.textContent = 'Choose an image!';
};

var displayList = function displayList(source, sourceLength) {
  var _loop = function _loop(i) {
    imageAdd = "\n    <li> <img class = \"photo_list\" id =\"".concat(i, "\" src = \"").concat(source(i), "\"/> </li>\n    ");

    _base.elements.imagesList.insertAdjacentHTML('beforeend', imageAdd);

    var currentID = i;
    document.getElementById("".concat(i)).addEventListener('click', function () {
      return displayImage(currentID, source);
    });
  };

  for (var i = 0; i < sourceLength; i++) {
    var imageAdd;

    _loop(i);
  }
};

var srcUpload = function srcUpload(i) {
  var url = URL.createObjectURL(state.uploadedFiles[i]);
  return url;
};

var srcDefault = function srcDefault(i) {
  var randomPicture = i * Math.floor(Math.random() * 10 + 1) + 1;
  var url = "https://picsum.photos/id/".concat(randomPicture, "/500/700");
  return url;
};

var displayImage = function displayImage(cur, source) {
  chosenImage(cur);
  _base.elements.initBox.style.display = 'none';
  _base.elements.frame.style.display = 'block';
  _base.elements.buttons.style.display = 'block';
  state.currentImg = cur;
  _base.elements.photo.src = source(cur);
};

var chosenImage = function chosenImage(cur) {
  state.renderedImages.push(cur);
  document.getElementById("".concat(cur)).style.borderRadius = '25px';
  var rendImgLength = state.renderedImages.length;

  if (rendImgLength > 1 && state.renderedImages[rendImgLength - 2] !== state.renderedImages[rendImgLength - 1]) {
    document.getElementById("".concat(state.renderedImages[rendImgLength - 2])).style.borderRadius = '0px';
  }
};