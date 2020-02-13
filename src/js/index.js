import { elements } from './base';

import { uploadImages, showDefault, rotateImage, changeImage } from './control';

//Show default images from Lorem Picsum
elements.defaultBtn.addEventListener('click', () => showDefault());

//Handle upload event
elements.uploadedImages.addEventListener('change', event =>
  uploadImages(event)
);

//Anticlockwise rotation
elements.rotateAnticlock.addEventListener('click', () =>
  rotateImage('anticlock')
);

//Clockwise rotation
elements.rotateClock.addEventListener('click', () => rotateImage('clock'));

//Show the previous image
elements.previous.addEventListener('click', () => changeImage('p'));

//Show the next image

elements.next.addEventListener('click', () => changeImage('n'));
