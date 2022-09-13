const errorTypes = [
  'valueMissing',
  'patternMismatch',
]

const errorMessages = {
  name: {
      valueMissing: 'O campo de nome não pode estar vazio.',
      patternMismatch: 'O nome precisa ter pelo menos três letras e no máximo cento e vinte letras. Não é possível informar números'
  },
  birthday: {
      valueMissing: 'O campo de data de nascimento não pode estar vazio.',
      patternMismatch: 'A data precisa estar no formato DD/MM/AAAA.'
  }
}

export const validate = (input) => {
  const inputType = input.dataset.field;
  const msgError = input.parentElement.nextElementSibling;

  if (input.validity.valid) {
    msgError.innerHTML = '';
  } else {
    msgError.innerHTML = showErrorMessage(inputType, input);
  }
}

function showErrorMessage(inputType, input) {
  let message = ''
  errorTypes.forEach(erro => {
      if(input.validity[erro]) {
          message = errorMessages[inputType][erro]
      }
  })
  
  return message
}

