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
