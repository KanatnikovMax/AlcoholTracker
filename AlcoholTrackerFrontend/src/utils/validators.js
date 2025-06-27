export const validateLoginForm = (email, password) => {
  const errors = { email: '', password: '', general: '' };
  let isValid = true;

  if (!email.trim()) {
    errors.email = 'Введите email';
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = 'Некорректный email';
    isValid = false;
  }

  if (!password) {
    errors.password = 'Введите пароль';
    isValid = false;
  } else if (password.length < 4) {
    errors.password = 'Пароль должен содержать минимум 4 символа';
    isValid = false;
  }

  return { isValid, errors };
};

export const validateRegisterForm = (username, email, password) => {
  const errors = { username: '', email: '', password: '', general: '' };
  let isValid = true;

  if (!username.trim()) {
    errors.username = 'Введите имя пользователя';
    isValid = false;
  }

  const emailValidation = validateLoginForm(email, 'dummy').errors;
  if (emailValidation.email) {
    errors.email = emailValidation.email;
    isValid = false;
  }

  if (!password) {
    errors.password = 'Введите пароль';
    isValid = false;
  } else if (password.length < 4) {
    errors.password = 'Пароль должен содержать минимум 4 символа';
    isValid = false;
  }

  return { isValid, errors };
};