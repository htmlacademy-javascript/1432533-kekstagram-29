import { resetScale } from './zoom.js';
import { resetEffect } from './effects.js';

const MAX_HASHTAGS_COUNT = 5;
const HASHTAGS_RULES = /^#[a-zа-яё0-9]{1,19}$/i;
const UNUNIQUE_TAGS_ERROR_TEXT = 'Ошибка хэштэга: повторяющийся хэштэг - уберите повтор в любом регистре !';
const INVALID_CONTENT_ERROR_TEXT = 'Ошибка хэштэга: неверное содержимое хэштэга - начать с #, плюс от 1  до 19 символов a-z,а-я, 0-9 !';
const INVALID_COUNT_ERROR_TEXT = 'Ошибка хэштэга: превышено допустимое количество хэштэгов - не более 5 !';

const body = document.querySelector('body');
const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const fileField = document.querySelector('#upload-file');
const hashtagField = document.querySelector('.text__hashtags');
const descriptionField = document.querySelector('.text__description');
const cancelCross = document.querySelector('#upload-cancel');
const buttonSubmit = document.querySelector('#upload-submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error'
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  hashtagField.addEventListener('keyup', onTextKeyUp);
  descriptionField.addEventListener('keyup', onTextKeyUp);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagField.removeEventListener('keyup', onTextKeyUp);
  descriptionField.removeEventListener('keyup', onTextKeyUp);
};

const blockingСonditionOnFocus = () =>
  document.activeElement === hashtagField || document.activeElement === descriptionField;

function onDocumentKeydown(evt) {
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

fileField.addEventListener('change', onOpenFileChange);
cancelCross.addEventListener('click', onCancelCrossClick);
