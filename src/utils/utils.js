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


// function throttle(func, timePause, obj) {
//   return function (args) {
//     let previousCall = obj.lastCall;
//     obj.lastCall = Date.now();
//     if (previousCall === undefined // function is being called for the first time
//     // eslint-disable-next-line no-invalid-this
//         || (this.lastCall - previousCall) > timePause) { // throttle time has elapsed
//       func(args);
//     }
//   };
// }

// let logger = (args) => console.log(`My args are ${args}`);
// // throttle: call the logger at most once every two seconds
// let o = {};
// let throttledLogger = throttle(logger, 2000, o);

// throttledLogger([1, 2, 3]);
// throttledLogger([1, 2, 3]);
// throttledLogger([1, 2, 3]);
// throttledLogger([1, 2, 3]);
// throttledLogger([1, 2, 3]);

// // "My args are 1, 2, 3" - logged only once
