import { renderThumbnail } from './thimbnail.js';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thimbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thimbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thimbnail.dataset.thumbnailId
    );
    showBigPicture(picture);
  });

  renderThumbnail(pictures, container);
};

export {renderGallery};
