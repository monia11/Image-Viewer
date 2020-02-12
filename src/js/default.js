import { elements } from './base';
import { chosenImage, renderImage, srcDefault } from './control';

export const showDefault = () => {
  elements.uploadForm.style.display = 'none';
  elements.defaultBtn.style.display = 'none';
  elements.info.textContent = 'Choose an image!';

  elements.list.style.display = 'block';
  for (let i = 1; i <= 20; i++) {
    const imageAdd = `
    <li> <img class = "photo_list" id ="${i}"  src = "${srcDefault(i)}" /> </li>
    `;

    elements.imagesList.insertAdjacentHTML('beforeend', imageAdd);
    document.getElementById(`${i}`).addEventListener('click', () => {
      chosenImage(i);
      elements.initBox.style.display = 'none';
      elements.frame.style.display = 'block';
      elements.buttons.style.display = 'block';
      renderImage(srcDefault(i));
    });
  }
};
