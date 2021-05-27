import { isEmpty, validNumber } from './validations';


const mocksIsEmpty = [
  { VALUE: ``, RESULT: true },
  { VALUE: undefined, RESULT: true },
  { VALUE: `1`, RESULT: false },
  { VALUE: 1, RESULT: false },
];

const mocksValidNumber = [
  { VALUE: 0, RESULT: true },
  { VALUE: -1, RESULT: true },
  { VALUE: 100, RESULT: true },
  { VALUE: "", RESULT: false },
  { VALUE: "1", RESULT: false },
  { VALUE: "длывоа", RESULT: false },
];

describe(`Converter`, () => {
  mocksIsEmpty.forEach((m) =>
    it(`isEmpty - "${m.VALUE}"`, () => {
      expect(isEmpty(m.VALUE)).toEqual(m.RESULT);
    })
  );

  mocksValidNumber.forEach((m) =>
    it(`validNumber - "${m.VALUE}"`, () => {
      expect(validNumber(m.VALUE)).toEqual(m.RESULT);
    })
  );

});


// npm run test src/utils/validations.test.js
