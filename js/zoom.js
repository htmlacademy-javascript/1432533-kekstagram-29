const INITIAL_SCALE = 100;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview img');


const scaleImage = (value) => {
  previewImage.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};


const onSmallerButtonClick = () => {
  scaleImage(
    Math.max(parseInt(scaleValue.value, 10) - SCALE_STEP, MIN_SCALE)
  );
};


const onBiggerButtonClick = () => {
  scaleImage(
    Math.min(parseInt(scaleValue.value, 10) + SCALE_STEP, MAX_SCALE)
  );
};


const resetScale = () => scaleImage(INITIAL_SCALE);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export { resetScale };
