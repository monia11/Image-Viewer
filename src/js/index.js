import { elements } from './base';

var i = 0;
var files;
var numClick = 0;

function Files(uploadedFiles) {
  this.uploadedFiles = uploadedFiles;
  this.countFiles = this.uploadedFiles.length;
}

document
  .getElementById('uploaded_images')
  .addEventListener('change', event => uploadImages(event));

var uploadImages = event => {
  files = new Files(event.target.files);

  elements.info.textContent = 'Choose an image!';
  elements.uploadForm.style.display = 'none';
  elements.list.style.display = 'block';

  displayList();

  return files;
};

var displayList = () => {
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

var displayImage = cur => {
  document.getElementById(`${i}`).addEventListener('click', () => {
    elements.initBox.style.display = 'none';
    elements.frame.style.display = 'block';
    elements.buttons.style.display = 'block';
    renderImage(cur);
    i = cur;
  });
};

var renderImage = cur => {
  elements.photo.src = URL.createObjectURL(files.uploadedFiles[cur]);
};

var rotateImage = w => {
  numClick++;
  elements.frame.classList.toggle('rotate_frame');
  var angle;
  if (w == 'anticlock') {
    angle = numClick * 270;
  } else if (w == 'clock') {
    angle = numClick * -270;
  }
  elements.frame.style.transform = `rotate(${angle}deg)`;
};

var changeImage = w => {
  if (w == 'n' && i < files.countFiles - 1) {
    i++;
  } else if (w == 'p' && i > 0) {
    i--;
  } else {
    i = i;
  }
  renderImage(i);
};
elements.rotateAnticlock.addEventListener('click', () =>
  rotateImage('anticlock')
);
elements.rotateClock.addEventListener('click', () => rotateImage('clock'));

elements.previous.addEventListener('click', () => changeImage('p'));

elements.next.addEventListener('click', () => changeImage('n'));
