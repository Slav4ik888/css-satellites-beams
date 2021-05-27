// decimal - десятичные
// degrees - градусы

/**
 * Возвращает Десятичное значение координаты
 * @param {number} deg 
 * @param {number} min 
 * @param {number} sec 
 * @returns {number} decimal
 */
export const degToDec = (deg, min, sec) => {
  // console.log('deg: ', deg);
  // console.log('min: ', min);
  // console.log('sec: ', sec);
  const res = +deg + min / 60 + sec / 3600;
  // console.log('res: ', res);
  return res;
};

// Возвращает градусы, минуты и секунды
export const decToDeg = (decimal) => {               // 55.57
  const deg = Math.trunc(+decimal);            // 55
  const degRest = decimal - deg;              // 0.57

  const min = Math.trunc(degRest * 60);       // 34
  const minRest = decimal - deg - (min / 60); // 0.0033333333333336324

  const sec = Math.trunc(minRest * 3600)      // 12

  return { deg, min, sec };
}

// console.log(`degToDec - `, degToDec(55, 34, 12));
// console.log(`decToDeg - `, decToDeg(37.616667));

// console.log(`Test - `, checkAndConvertoNumber(`sdsdf`));
