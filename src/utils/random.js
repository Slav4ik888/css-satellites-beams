/**
 * Выбор случайного числа в заданном промежутке
 * @param {Number} min - Минимальное допустимое значение (включительно)
 * @param {Number} max - Максимальное допустимое значение (включительно)
 * @return {Number} Случайное целое число в данном промежутке
 */
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Выбор случайного элемента массива
 * @param {Array} array
 * @return {Any} Случайный элемент массива
 */
export const getRandomElement = (array) => {
  const randomIndex = getRandomNumber(0, array.length - 1);
  return array[randomIndex];
};

/**
 * Генерация случайного значения true\false
 * @return {Boolean}
 */
export const getRandomBoolean = () => {
  return Boolean(getRandomNumber(0, 1));
};

