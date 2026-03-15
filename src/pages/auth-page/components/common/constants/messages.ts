export const messages = {
  authLogin: {
    labelText: 'Login',
    placeholder: 'Enter your login',
    errors: {
      required: 'Login is required',
      tooShort: 'Login must be at least 2 characters',
      tooLong: 'Login must be no more than 16 characters',
      latinOnly: 'Login must contain only Latin letters',
    },
  },
  authEmail: {
    labelText: 'Email',
    placeholder: 'Enter your email',
  },
  password: {
    labelText: 'Password',
    placeholder: 'Enter your password',
    errors: {
      required: 'Password is required',
      tooShort: 'Password must be at least 6 characters',
      latinOnly: 'Password must contain only Latin letters and digits',
      noDigit: 'Password must contain at least one digit',
    },
  },
  confirmPassword: {
    labelText: 'Confirm your password',
    placeholder: 'Enter your password',
    errors: {
      required: 'Please confirm your password',
      mismatch: 'Passwords do not match',
    },
  },
  registerButton: {
    text: 'Register',
  },
};
