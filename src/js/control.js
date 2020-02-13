import { elements } from './base';

const state = {
  renderedImages: [],
  rotations: 0,
  currentImg: 0,
  uploadedFiles: {},
  defaultSource: false
};

export const uploadImages = event => {
  state.uploadedFiles = event.target.files;
  state.countFiles = state.uploadedFiles.length;
  console.log(state);
  changeInitBox();
  displayList(srcUpload, state.countFiles);
};

export const showDefault = () => {
  state.defaultSource = true;
  console.log(state);
  changeInitBox();
  displayList(srcDefault, 20);
};

export const rotateImage = w => {
  state.rotations++;
  console.log(state);
  let angle;
  if (w == 'anticlock') {
    angle = state.rotations * 270;
  } else if (w == 'clock') {
    angle = state.rotations * -270;
  }
  elements.photo.style.transform = `rotate(${angle}deg)`;

  elements.photo.classList.toggle('rotate_image');
};

export const changeImage = w => {
  const countFiles = state.uploadedFiles.length;
  if (!state.defaultSource) {
    counter(w, countFiles);
    displayImage(state.currentImg, srcUpload);
  } else {
    counter(w, 20);
    displayImage(state.currentImg, srcDefault);
  }

  chosenImage(state.currentImg);
};

const counter = (w, num) => {
  if (w == 'n' && state.currentImg < num - 1) {
    state.currentImg++;
  } else if (w == 'p' && state.currentImg > 0) {
    state.currentImg--;
  } else {
    state.currentImg = state.currentImg;
  }
};

const changeInitBox = () => {
  elements.defaultBtn.style.display = 'none';
  elements.uploadForm.style.display = 'none';
  elements.list.style.display = 'block';
  elements.info.textContent = 'Choose an image!';
};

const displayList = (source, sourceLength) => {
  for (let i = 0; i < sourceLength; i++) {
    var imageAdd = `
    <li> <img class = "photo_list" id ="${i}" src = "${source(i)}"/> </li>
    `;
    elements.imagesList.insertAdjacentHTML('beforeend', imageAdd);
    //document.getElementById(`${i}`).src = source(i);
    const currentID = i;
    document
      .getElementById(`${i}`)
      .addEventListener('click', () => displayImage(currentID, source));
  }
};
const srcUpload = i => {
  const url = URL.createObjectURL(state.uploadedFiles[i]);
  return url;
};
const srcDefault = i => {
  const url = `https://picsum.photos/id/${i}/500/700`;
  return url;
};
const displayImage = (cur, source) => {
  console.log(state);
  chosenImage(cur);
  elements.initBox.style.display = 'none';
  elements.frame.style.display = 'block';
  elements.buttons.style.display = 'block';
  state.currentImg = cur;
  elements.photo.src = source(cur);
};

const chosenImage = cur => {
  state.renderedImages.push(cur);
  document.getElementById(`${cur}`).style.borderRadius = '25px';
  const rendImgLength = state.renderedImages.length;

  if (
    rendImgLength > 1 &&
    state.renderedImages[rendImgLength - 2] !==
      state.renderedImages[rendImgLength - 1]
  ) {
    document.getElementById(
      `${state.renderedImages[rendImgLength - 2]}`
    ).style.borderRadius = '0px';
  }
};
