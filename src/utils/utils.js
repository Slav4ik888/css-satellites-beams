/**
 * Возвращает объект объединив 2 принятых объекта
 * @param {Object} a
 * @param {Object} b
 *
 * @return {Object} - дата в нужном формате
 */

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};


/**
 * Возвращает число с Х знаками после запятой
 * @param {Number} number
 * @param {Number} x
 *
 * @return {Number}
 */

export const removeNumAfterComma = (number, x) => {
  let result = number;
  if (typeof result === `number`) {
    console.log(`Число`);
    

  } else {
    console.log(`Не число`);
  }
  return result;
};
