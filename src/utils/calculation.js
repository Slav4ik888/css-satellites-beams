// Вернуть градусы в радианах
const getR = (x) => x * Math.PI / 180;
// Вернуть радианы в градусы
const getG = (x) => 180 / Math.PI * x;

// Возвращает угол места
export const calcAngleGuidance = (g1, g2, v) => {
  let result = getG(Math.atan(
      (Math.cos(getR(g2 - g1)) * Math.cos(getR(v)) - 0.151) /
      Math.sqrt(1 - Math.pow(Math.cos(getR(g2 - g1)), 2) * Math.pow(Math.cos(getR(v)), 2))
  ));
  return result.toFixed(2);
};

// = 180° +- arctg{tg(g2 - g1)/sin(v)}
export const calcAzimut = (g1, g2, v) => (180 + getG(Math.atan(Math.tan(getR(g2 - g1)) / Math.sin(getR(v))))).toFixed(2);

// console.log('Солнечногорск: ', calcAngleGuidance(36, 37, 56.1851));
// console.log('calcAngleGuidance: ', calcAngleGuidance(140, 104.3071, 52.2736));
// console.log(`calcAzimut`, calcAzimut(140, 104.3071, 52.2736));


// // 0.7853981633974483
// console.log('Math.atan(0,4875): 26', Math.atan(0.4875));
// // 0
// console.log('Math.atan(0);: ', Math.atan(0));
// const a = Math.cos(getR(g2 - g1));
// console.log(`g2 - g1: 0,9998 `, a);

// const b = Math.cos(getR(v));
// console.log(`cos(v): 0,83109 `, b);

// const resUp = a * b - 0.151;

// const d = Math.pow(Math.cos(getR(g2 - g1)), 2);
// console.log(`Math.cos 2: 0,9996 `, d);
// const e = Math.pow(Math.cos(getR(v)), 2);
// console.log(`Math.pow(Math.cos(getR(v)): 0,3094 `, e);

// const resDown = Math.sqrt(1 - d * e);
// console.log(`Math.sqrt(1 - d * e): 0,5561 `, resDown);

// const res = resUp / resDown;
// console.log(`res: `, res);


// const resultA = getG(Math.atan(res));
// console.log('result: ', resultA);


// const a = Math.tan(getR(g2 - g1));
// console.log(`Math.tan(getR(g2 - g1): `, a);
// const b = Math.sin(getR(v));
// console.log(`Math.sin(getR(v): `, b);
// const c = a / b;
// console.log(`a / b : `, c);
// const atan = Math.atan(getR(c));
// console.log(`atanR: `, atan);
// console.log(`atanG: `, getG(atan));

// console.log(`Math.tan(getR(g2 - g1)) / Math.sin(getR(v)))`, Math.atan(getR(Math.tan(getR(g2 - g1)) / Math.sin(getR(v)))));
