import { messages } from '../constants/messages';
import {
  LOGIN_REGEX,
  LOGIN_MIN_LENGTH,
  LOGIN_MAX_LENGTH,
  PASSWORD_ALLOWED_REGEX,
  PASSWORD_DIGIT_REGEX,
  PASSWORD_MIN_LENGTH,
  EMAIL_REGEX,
} from '../constants/constants';
import type { IValidateResult } from '@/common/types/types';

export function loginValidator(value: string): IValidateResult {
  const rules = [
    {
      condition: (inputValue: string): boolean => inputValue.length === 0,
      errorMessage: messages.authLogin.errors.required,
    },
    {
      condition: (inputValue: string): boolean => inputValue.length < LOGIN_MIN_LENGTH,
      errorMessage: messages.authLogin.errors.tooShort,
    },
    {
      condition: (inputValue: string): boolean => inputValue.length > LOGIN_MAX_LENGTH,
      errorMessage: messages.authLogin.errors.tooLong,
    },
    {
      condition: (inputValue: string): boolean => !LOGIN_REGEX.test(inputValue),
      errorMessage: messages.authLogin.errors.latinOnly,
    },
  ];

  const brokenRule = rules.find((rule) => rule.condition(value));

  if (brokenRule) {
    return { isValid: false, errorMessage: brokenRule.errorMessage };
  }

  return { isValid: true };
}

export function registerPasswordValidator(value: string): IValidateResult {
  const rules = [
    {
      condition: (inputValue: string): boolean => inputValue.length === 0,
      errorMessage: messages.password.errors.required,
    },
    {
      condition: (inputValue: string): boolean => inputValue.length < PASSWORD_MIN_LENGTH,
      errorMessage: messages.password.errors.tooShort,
    },
    {
      condition: (inputValue: string): boolean => !PASSWORD_ALLOWED_REGEX.test(inputValue),
      errorMessage: messages.password.errors.latinOnly,
    },
    {
      condition: (inputValue: string): boolean => !PASSWORD_DIGIT_REGEX.test(inputValue),
      errorMessage: messages.password.errors.noDigit,
    },
  ];

  const brokenRule = rules.find((rule) => rule.condition(value));

  if (brokenRule) {
    return { isValid: false, errorMessage: brokenRule.errorMessage };
  }

  return { isValid: true };
}

export function emailValidator(value: string): IValidateResult {
  const rules = [
    {
      condition: (inputValue: string): boolean => inputValue.length === 0,
      errorMessage: messages.authEmail.errors.required,
    },
    {
      condition: (inputValue: string): boolean => !EMAIL_REGEX.test(inputValue),
      errorMessage: messages.authEmail.errors.invalid,
    },
  ];

  const brokenRule = rules.find((rule) => rule.condition(value));

  if (brokenRule) {
    return { isValid: false, errorMessage: brokenRule.errorMessage };
  }

  return { isValid: true };
}
