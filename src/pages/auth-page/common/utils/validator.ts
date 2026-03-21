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
      errorMessage: messages.errors.loginRequired,
    },
    {
      condition: (inputValue: string): boolean => inputValue.length < LOGIN_MIN_LENGTH,
      errorMessage: messages.errors.loginTooShort,
    },
    {
      condition: (inputValue: string): boolean => inputValue.length > LOGIN_MAX_LENGTH,
      errorMessage: messages.errors.loginTooLong,
    },
    {
      condition: (inputValue: string): boolean => !LOGIN_REGEX.test(inputValue),
      errorMessage: messages.errors.loginLatinOnly,
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
      errorMessage: messages.errors.passwordRequired,
    },
    {
      condition: (inputValue: string): boolean => inputValue.length < PASSWORD_MIN_LENGTH,
      errorMessage: messages.errors.passwordTooShort,
    },
    {
      condition: (inputValue: string): boolean => !PASSWORD_ALLOWED_REGEX.test(inputValue),
      errorMessage: messages.errors.passwordLatinOnly,
    },
    {
      condition: (inputValue: string): boolean => !PASSWORD_DIGIT_REGEX.test(inputValue),
      errorMessage: messages.errors.passwordNoDigit,
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
      errorMessage: messages.errors.emailRequired,
    },
    {
      condition: (inputValue: string): boolean => !EMAIL_REGEX.test(inputValue),
      errorMessage: messages.errors.emailInvalid,
    },
  ];

  const brokenRule = rules.find((rule) => rule.condition(value));

  if (brokenRule) {
    return { isValid: false, errorMessage: brokenRule.errorMessage };
  }

  return { isValid: true };
}
