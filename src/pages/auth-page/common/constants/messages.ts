export const messages = {
  authLogin: {
    labelText: 'Login',
    placeholder: 'Enter your login',
    id: 'login',
    errors: {
      required: 'Login is required',
      tooShort: 'Login must be at least 2 characters',
      tooLong: 'Login must be no more than 16 characters',
      latinOnly: 'Login must contain only Latin letters',
      alreadyTaken: 'This login is already taken',
    },
  },
  authEmail: {
    labelText: 'Email',
    placeholder: 'Enter your email',
    id: 'email',
    errors: {
      required: 'Email is required',
      invalid: 'Enter a valid email address',
      failed: 'Registration failed',
    },
  },
  password: {
    labelText: 'Password',
    placeholder: 'Enter your password',
    id: 'password',
    errors: {
      required: 'Password is required',
      tooShort: 'Password must be at least 6 characters',
      latinOnly: 'Password must contain only Latin letters and digits',
      noDigit: 'Password must contain at least one digit',
    },
  },
  confirmPassword: {
    labelText: 'Confirm your password',
    placeholder: 'Confirm your password',
    id: 'confirm-password',
    errors: {
      required: 'Please confirm your password',
      mismatch: 'Passwords do not match',
    },
  },
  registerButton: {
    text: 'Register',
  },
  loginForm: {
    loginOrEmail: {
      labelText: 'Login / Email',
      placeholder: 'Enter your login or email',
      id: 'login',
      errors: {
        notFound: 'User not found',
      },
    },
    password: {
      id: 'password',
      errors: {
        incorrect: 'Incorrect password',
      },
    },
    button: {
      text: 'Login',
    },
  },
  modal: {
    logo: 'TANDEM',
    label: 'system access // developer portal',
    tabs: {
      login: 'Login',
      register: 'Register',
    },
  },
};
