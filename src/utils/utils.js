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
 * Обрезает и оставляет нужное кол-во знаков после запятой
 * Если знаков не хватает добавляет 0
 * @param {String} numberStr
 * @param {Number} cut
 *
 * @return {String}
 */
export const addNullToNumber = (numberStr, cut) => {
  let result = numberStr;

  if (cut > 0) {
    if (result.length > cut) {
      result = result.slice(0, cut + 1);
    } else { // добавляем 0
      let tar = cut - result.length;
      for (let i = 0; i <= tar; i++) {
        result += `0`;
      }
    }
  }
  return result;
};

/**
 * Возвращает строку с разделением тысяч пробелом
 * @param {String | Number} number
 * @param {Number} cut - сколько знаков после запятой нужно сделать,
 * если знаков не хватает добавляет 0
 * @param {String} char - `,` если нужно запятую вместо точки
 * @return {String}
 */
export const addSpaceToNumber = (number, cut, char) => {
  let newNumber = number;

  if (typeof (newNumber) === `number`) {
    // Перевести в строку
    newNumber = String(number);
  }

  if (typeof (newNumber) === `string`) {
    // Является ли вообще числом
    if (!isFinite(newNumber)) {
      // Если , то пробуем заменить на . и перепроверить
      newNumber = newNumber.replace(/,/g, `.`);
      if (!isFinite(newNumber)) {
        // eslint-disable-next-line no-console
        console.log(newNumber, ` - не число`);
        return newNumber;
      }
    }
  }

  let afterChar = ``;
  let beforeChar = newNumber;

  // Разрезаем до и после знака
  if (newNumber.includes(`.`)) {
    afterChar = newNumber.slice(newNumber.indexOf(`.`));
    beforeChar = newNumber.slice(0, newNumber.indexOf(`.`));
  }

  // Добавляем пробелы
  let resBefore = ``;
  let newResBefore = ``;

  if (beforeChar.length > 2) {
    let num = 0; // Чтобы отсчитывать по 3 числа
    for (let i = beforeChar.length - 1; i > -1; i--) {
      num++;
      // if (resBefore.length/3 === Math.floor(resBefore.length/3) && (resBefore.length > 0)) {
      if (num / 4 === Math.floor(num / 4) && (num > 0)) {
        num = 0;
        resBefore += ` `;
        i++;
      } else {
        resBefore += beforeChar[i];
      }
    }
    // Переводим в обратную сторону
    for (let i = resBefore.length - 1; i > -1; i--) {
      newResBefore += resBefore[i];
    }
    beforeChar = newResBefore;
  }

  // Обрабатываем дробную часть, сокращаем на нужное кол-во знаков или добавляем
  if (afterChar) {
    afterChar = addNullToNumber(afterChar, cut);
  }

  // Если разделитеть , меняем на неё
  if (char === `,`) {
    afterChar = afterChar.replace(/\./g, `,`);
  }

  let result = (beforeChar + afterChar);
  return result;
};
// console.log(`addSpaceToNumber: `, addSpaceToNumber(25000.9299, 3, `,`));
