import { describe, it, expect } from 'vitest';
import { loginValidator, emailValidator, registerPasswordValidator } from '../common/utils/validator';

describe('loginValidator', () => {
  it('returns error if field is empty', () => {
    const result = loginValidator('');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Login is required');
  });

  it('returns error if less than 2 characters', () => {
    const result = loginValidator('a');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Login must be at least 2 characters');
  });

  it('returns error if more than 16 characters', () => {
    const result = loginValidator('aaaaaaaaaaaaaaaaa');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Login must be no more than 16 characters');
  });

  it('returns error if contains non-latin characters', () => {
    const result = loginValidator('user123');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Login must contain only Latin letters');
  });

  it('returns isValid true for valid login', () => {
    const result = loginValidator('Anna');
    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBeUndefined();
  });
});

describe('registerPasswordValidator', () => {
  it('returns error if field is empty', () => {
    const result = registerPasswordValidator('');
    expect(result.isValid).toBe(false);
  });

  it('returns error if less than 6 characters', () => {
    const result = registerPasswordValidator('Ab1');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Password must be at least 6 characters');
  });

  it('returns error if no digit present', () => {
    const result = registerPasswordValidator('AbcdefG');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Password must contain at least one digit');
  });

  it('returns error if contains special characters', () => {
    const result = registerPasswordValidator('Abc123!');
    expect(result.isValid).toBe(false);
  });

  it('returns isValid true for valid password', () => {
    const result = registerPasswordValidator('Abcdef1');
    expect(result.isValid).toBe(true);
  });
});

describe('emailValidator', () => {
  it('returns error if field is empty', () => {
    const result = emailValidator('');
    expect(result.isValid).toBe(false);
  });

  it('returns error for invalid email', () => {
    const result = emailValidator('notanemail');
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe('Enter a valid email address');
  });

  it('returns isValid true for valid email', () => {
    const result = emailValidator('test@gmail.com');
    expect(result.isValid).toBe(true);
  });
});
