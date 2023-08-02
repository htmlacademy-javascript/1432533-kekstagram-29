import { getData, showAlert } from './create-api.js';
import { renderGallery } from './gallery.js';
import { userFotoFormSubmit } from './formupload.js';


getData()
  .then((usersFoto) => {
    renderGallery(usersFoto);
  })
  .catch((err) => {
    showAlert(err.message);
  });

userFotoFormSubmit();
