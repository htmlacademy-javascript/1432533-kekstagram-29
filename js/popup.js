import {onDocumentEscKeydown} from './formupload.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const successPopup = successTemplate.cloneNode(true);
const successInner = successPopup.querySelector('.success__inner');
const successTitle = successPopup.querySelector('.success__title');
const successButton = successPopup.querySelector('.success__button');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const errorPopup = errorTemplate.cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');
const errorInner = errorPopup.querySelector('.error__inner');
const errorTitle = errorPopup.querySelector('.error__title');


const closeSuccessPopup = () => {
  successPopup.remove();
  document.removeEventListener('keydown', onSuccessKeydown);
  document.removeEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};


const showSuccessPopup = () => {
  document.body.append(successPopup);
  successButton.addEventListener('click', () => {
    closeSuccessPopup();
  });
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};


function onSuccessKeydown (evt) {
  if (evt.key === 'Escape') {
    closeSuccessPopup();
  }
}


function onSuccessClick (evt) {
  if (evt.target !== successInner && evt.target !== successTitle) {
    closeSuccessPopup();
  }
}


const closeErrorPopup = () => {
  errorPopup.remove();
  document.removeEventListener('keydown', onErrorKeydown);
  document.removeEventListener('click', onErrorClick);
  document.addEventListener('keydown', onDocumentEscKeydown);
};


const showErrorPopup = () => {
  document.body.append(errorPopup);
  errorButton.addEventListener('click', () => {
    closeErrorPopup();
  });
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};


function onErrorKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeErrorPopup();
  }
}


function onErrorClick (evt) {
  if (evt.target !== errorInner && evt.target !== errorTitle) {
    closeErrorPopup();
  }
}

export {showSuccessPopup , showErrorPopup};
