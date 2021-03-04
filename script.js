const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPasword = document.getElementById('confirmPassowrd');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArr) {
  inputArr.forEach(
    function(input) {
      if(input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }
    }
  )
}

function checkLength(input, min, max) {
  const length = input.value.length;
  if(length < min) {
    showError(input, `${getFieldName(input)} must be more than ${min} characters`);
  } else if(length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, `Must be a valid Email address`);
  }
}

function checkPassword(password, confirmPassword) {
  if(password.value !== confirmPassword.value) {
    showError(confirmPassword, `Passwords do not match`);
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPassword(password, confirmPassword);
})