import { checkAndConvertoNumber } from './converter';


const mocksCheckAndConvertoNumber = [
  { VALUE: 0, RESULT: { value: 0, valid: true, error: `` } },
  { VALUE: -1, RESULT: { value: -1, valid: true, error: `` } },
  { VALUE: 100, RESULT: { value: 100, valid: true, error: `` } },
  { VALUE: "", RESULT: { value: 0, valid: true, error: `` } },
  { VALUE: "1", RESULT: { value: 1, valid: true, error: `` } },
  { VALUE: "длывоа", RESULT: { value: `no`, valid: false, error: `Значение должно быть числом` } },
];


describe(`Converter`, () => {
  mocksCheckAndConvertoNumber.forEach((m) =>
    it(`checkAndConvertoNumber - "${m.VALUE}"`, () => {
      expect(checkAndConvertoNumber(m.VALUE)).toEqual(m.RESULT);
    })
  );
});


// npm run test src/utils/converter.test.js
