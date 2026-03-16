/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { RegisterForm } from '../components/features/register-form/register-form.view';
import { RegisterFormController } from '../components/features/register-form/register-form.controller';

vi.mock('@/service/auth/auth.service', () => ({
  authService: {
    register: vi.fn(),
    isUsernameTaken: vi.fn(),
  },
}));

import { authService } from '@/service/auth/auth.service';

describe('RegisterFormController', () => {
  let view: RegisterForm;

  beforeEach(() => {
    vi.mocked(authService.isUsernameTaken).mockResolvedValue(false);
    view = new RegisterForm({});
    new RegisterFormController(view);
    document.body.append(view.node);
  });

  afterEach(() => {
    view.destroy();
    vi.clearAllMocks();
  });

  it('register button is disabled by default', () => {
    expect(view.registerButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('register button is disabled if login is empty', () => {
    const input = view.login.node.querySelector('input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.registerButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('register button is disabled if email is empty', () => {
    const input = view.email.node.querySelector('input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.registerButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('register button is disabled if password is empty', () => {
    const input = view.password.node.querySelector('input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.registerButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('register button is disabled if email format is invalid', () => {
    const loginInput = view.login.node.querySelector('input');
    if (loginInput) {
      loginInput.value = 'Sara';
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const emailInput = view.email.node.querySelector('input');
    if (emailInput) {
      emailInput.value = 'notanemail';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Anna12';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const confirmInput = view.confirmPassword.node.querySelector('input');
    if (confirmInput) {
      confirmInput.value = 'Anna12';
      confirmInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.registerButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('register button is disabled if passwords do not match', () => {
    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Sara123';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const confirmInput = view.confirmPassword.node.querySelector('input');
    if (confirmInput) {
      confirmInput.value = 'Anna123';
      confirmInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.registerButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('register button is enabled when all fields are valid', () => {
    const loginInput = view.login.node.querySelector('input');
    if (loginInput) {
      loginInput.value = 'Sara';
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const emailInput = view.email.node.querySelector('input');
    if (emailInput) {
      emailInput.value = 'sara@gmail.com';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Anna12';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const confirmInput = view.confirmPassword.node.querySelector('input');
    if (confirmInput) {
      confirmInput.value = 'Anna12';
      confirmInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.registerButton.node.hasAttribute('disabled')).toBe(false);
  });

  it('calls authService.register when form is submitted', async () => {
    vi.mocked(authService.register).mockResolvedValue({ success: true });

    const loginInput = view.login.node.querySelector('input');
    if (loginInput) {
      loginInput.value = 'Dan';
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const emailInput = view.email.node.querySelector('input');
    if (emailInput) {
      emailInput.value = 'dan@gmail.com';
      emailInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Anna12';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const confirmInput = view.confirmPassword.node.querySelector('input');
    if (confirmInput) {
      confirmInput.value = 'Anna12';
      confirmInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    view.form.node.dispatchEvent(new Event('submit', { bubbles: true }));

    await vi.waitFor(() => {
      expect(vi.mocked(authService.register)).toHaveBeenCalledWith('Dan', 'dan@gmail.com', 'Anna12');
    });
  });
});
