// Функция для проверки длинны строки.

function comparisondLength(stringLength, maxLength) {
  if (stringLength.length <= maxLength) {
    return true;
  }
  return false;
}

// eslint-disable-next-line
console.log(comparisondLength('проверяемая строка', 18));
