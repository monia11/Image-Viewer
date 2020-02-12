import { elements } from './base';

export const renderedImages = [];
export let numClick = 0;

export let i = 0;

export let files;
export const chosenImage = cur => {
  renderedImages.push(cur);
  document.getElementById(`${cur}`).style.borderRadius = '25px';

  if (
    renderedImages.length > 1 &&
    renderedImages[renderedImages.length - 2] !==
      renderedImages[renderedImages.length - 1]
  ) {
    document.getElementById(
      `${renderedImages[renderedImages.length - 2]}`
    ).style.borderRadius = '0px';
  }
};

export const rotateImage = w => {
  numClick++;

  var angle;
  if (w == 'anticlock') {
    angle = numClick * 270;
  } else if (w == 'clock') {
    angle = numClick * -270;
  }
  elements.photo.style.transform = `rotate(${angle}deg)`;

  elements.photo.classList.toggle('rotate_image');
};

export const renderImage = cur => {
  elements.photo.src = cur;
};

export const changeImage = w => {
  if (files) {
    counter(w, files.countFiles - 1);
    renderImage(srcUpload(i));
  } else {
    counter(w, 20);
    renderImage(srcDefault(i));
  }

  chosenImage(i);
};

export const srcDefault = i => {
  let url = `https://picsum.photos/id/${i}/500/700`;
  return url;
};

export const srcUpload = i => {
  let src = URL.createObjectURL(files.uploadedFiles[i]);

  return src;
};
const counter = (w, num) => {
  if (w == 'n' && i < num) {
    i++;
  } else if (w == 'p' && i > 0) {
    i--;
  } else {
    i = i;
  }
};

export function Files(uploadedFiles) {
  this.uploadedFiles = uploadedFiles;
  this.countFiles = this.uploadedFiles.length;
}

export const uploadImages = event => {
  files = new Files(event.target.files);
  elements.defaultBtn.style.display = 'none';

  elements.uploadForm.style.display = 'none';
  elements.list.style.display = 'block';
  displayList();
  elements.info.textContent = 'Choose an image!';
  return files;
};

export const displayList = () => {
  for (i; i < files.countFiles; i++) {
    var imageAdd = `
    <li> <img class = "photo_list" id ="${i}"   /> </li>
    `;
    elements.imagesList.insertAdjacentHTML('beforeend', imageAdd);
    document.getElementById(`${i}`).src = URL.createObjectURL(
      files.uploadedFiles[i]
    );
    const currentID = i;

    displayImage(currentID);
  }
};

export const displayImage = cur => {
  document.getElementById(`${cur}`).addEventListener('click', () => {
    chosenImage(cur);
    elements.initBox.style.display = 'none';
    elements.frame.style.display = 'block';
    elements.buttons.style.display = 'block';
    i = cur;
    const src = URL.createObjectURL(files.uploadedFiles[cur]);

    renderImage(src);
  });
};
