import { resetScale } from './zoom.js';
import { resetEffect } from './effects.js';
import {sendData} from './create-api.js';
import {showSuccessPopup , showErrorPopup} from './popup.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const UNUNIQUE_TAGS_ERROR_TEXT = 'Ошибка хэштэга: повторяющийся хэштэг - уберите повтор в любом регистре !';
const INVALID_CONTENT_ERROR_TEXT = 'Ошибка хэштэга: неверное содержимое хэштэга - начать с #, плюс от 1  до 19 символов a-z,а-я, 0-9';
const INVALID_COUNT_ERROR_TEXT = 'Ошибка хэштэга: превышено допустимое количество хэштэгов - не более 5 !';
const SUBMIT_BUTTON_TEXT_SENDING = 'Публикую...';
const SUBMIT_BUTTON_TEXT = 'Опубликовать';


const body = document.querySelector('body');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const cancelCross = document.querySelector('#upload-cancel');
const buttonSubmit = document.querySelector('#upload-submit');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});


const showModal = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentEscKeydown);
  hashtagField.addEventListener('keyup', onTextKeyUp);
  descriptionField.addEventListener('keyup', onTextKeyUp);
};


const hideModal = () => {
  uploadForm.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  hashtagField.removeEventListener('keyup', onTextKeyUp);
  descriptionField.removeEventListener('keyup', onTextKeyUp);
};


const blockingСonditionOnFocus = () =>
  document.activeElement === hashtagField || document.activeElement === descriptionField;


function onDocumentEscKeydown(evt) {
  if (evt.key === 'Escape' && !blockingСonditionOnFocus()) {
    evt.preventDefault();
    hideModal();
  }
}

const onOpenFileChange = () => {
  showModal();
};

const onCancelCrossClick = () => {
  hideModal();
};


const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));


const isValidTag = (value) => normalizeTags(value).every((tag) => HASHTAGS_RULES.test(tag));


const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAGS_COUNT;


const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};


pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  UNUNIQUE_TAGS_ERROR_TEXT, 1, true
);


pristine.addValidator(
  hashtagField,
  isValidTag,
  INVALID_CONTENT_ERROR_TEXT, 2, true
);


pristine.addValidator(
  hashtagField,
  hasValidCount,
  INVALID_COUNT_ERROR_TEXT, 3, true
);


function onTextKeyUp() {
  if (hasUniqueTags(hashtagField.value) && isValidTag(hashtagField.value) && hasValidCount(hashtagField.value) && descriptionField.value.length < 141) {
    buttonSubmit.disabled = false;
  } else {
    buttonSubmit.disabled = true;
  }
}


const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = SUBMIT_BUTTON_TEXT_SENDING;
};


const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = SUBMIT_BUTTON_TEXT;
};

const userFotoFormSubmit = () => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          hideModal();
          showSuccessPopup();
        })
        .catch(() => {
          showErrorPopup();
        })
        .finally(unblockSubmitButton);
    }
  });
};

fileField.addEventListener('change', onOpenFileChange);
cancelCross.addEventListener('click', onCancelCrossClick);

export {userFotoFormSubmit, onDocumentEscKeydown};
