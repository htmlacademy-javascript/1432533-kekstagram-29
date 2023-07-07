// Функция для проверки длинны строки:

function comparisondLength(stringLength, maxLength) {
  if (stringLength.length <= maxLength) {
    return true;
  }
  return false;
}

// eslint-disable-next-line
console.log(comparisondLength('проверяемая строка', 18));

// Функция для проверки, является ли строка палиндромом:

const checkPalindrome = function (palindrome) {
  const textClean = palindrome.toLowerCase().replaceAll(' ', '');

  const lastIndex = textClean.length - 1;
  for (let i = 0; i <= textClean.length / 2; i++) {
    if (textClean[i] === textClean[lastIndex - i]) {
      return true;
    }
    return false;
  }
};

// eslint-disable-next-line
console.log(checkPalindrome ('Лёша на полке клопа нашёл'));
