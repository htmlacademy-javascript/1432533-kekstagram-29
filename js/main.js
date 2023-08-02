import { getData, showAlert } from './create-api.js';
import { renderGallery } from './gallery.js';
import { submitUserPhoto } from './formupload.js';


getData()
  .then((usersPhoto) => {
    renderGallery(usersPhoto);
  })
  .catch((err) => {
    showAlert(err.message);
  });

submitUserPhoto();
