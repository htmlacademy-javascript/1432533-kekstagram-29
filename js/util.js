const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Function for generating a random non-repeating comment ID:
const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const debounce = (callback, timeoutDelay) => {
  //Используем замыкание, чтобы id таймаута приклеился к возвращаемой функции с setTimeout для его перезаписи
  let timeoutId;

  return (...rest) => {
    //Удаляем предыдущий таймаут, чтобы не копились
    clearTimeout(timeoutId);
    //Устанавливаем новый таймаут с вызовом колбэка
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getRandomArrayElement, createIdGenerator, debounce};
