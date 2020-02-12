import { elements } from './base';
import { showDefault } from './default';
import { rotateImage, changeImage, uploadImages } from './control';

elements.defaultBtn.addEventListener('click', () => showDefault());

elements.uploadedImages.addEventListener('change', event =>
  uploadImages(event)
);

elements.rotateAnticlock.addEventListener('click', () =>
  rotateImage('anticlock')
);
elements.rotateClock.addEventListener('click', () => rotateImage('clock'));

elements.previous.addEventListener('click', () => changeImage('p'));

elements.next.addEventListener('click', () => changeImage('n'));
