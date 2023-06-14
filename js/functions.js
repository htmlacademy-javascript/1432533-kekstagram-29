// Функция для проверки длинны строки.

function comparisondLength(stringLength, maxLength) {
  if (stringLength.length <= maxLength) {
    return true;
  }
  return false;
}

console.log(comparisondLength('проверяемая строка', 18));
