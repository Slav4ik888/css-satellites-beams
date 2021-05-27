// // Проверяем данные на регистрацию пользователя
// const valid = (data) => {
//   let errors = {};
//   // Проверка email
//   if (isEmpty(data.email)) errors.email = `Поле email не должно быть пустым`;

//   return {
//     errors,
//     valid: Object.keys(errors).length === 0 ? true : false
//   }
// };


// Возвращает пустое ли поле
const isEmpty = (str) => {
  if (validNumber(str)) return false;
  if (!str || str.trim() === ``) {
    return true;
  } else {
    return false;
  }
};

// Возвращает является ли значение числом
const validNumber = (value) => {
  if (typeof value === `number` && !isNaN(value)) return true;
  return false;
};
  

// Проверяет, является ли значение числом, пробуем перевести в число, 
// а если не получается возвращает ошибку
const checkAndConvertoNumber = (value) => {
  let result = {
    value: `no`,
    valid: true,
    error: ``,
  };

  if (isEmpty(value)) {
    result.value = 0;
    return result;
  }
  if (validNumber(value)) {
    result.value = value;
    return result;
  }

  const numValue = Number(value);
  if (validNumber(numValue)) {
    result.value = numValue;
    return result;
  }

  result.valid = false;
  result.error = `Значение должно быть числом`;

  return result;
};
