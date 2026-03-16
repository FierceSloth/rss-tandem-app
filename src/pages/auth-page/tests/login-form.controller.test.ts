/* eslint-disable @typescript-eslint/unbound-method */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LoginForm } from '../components/features/login-form/login-form.view';
import { LoginFormController } from '../components/features/login-form/login-form.controller';

vi.mock('@/service/auth/auth.service', () => ({
  authService: {
    login: vi.fn(),
  },
}));

import { authService } from '@/service/auth/auth.service';

describe('LoginFormController', () => {
  let view: LoginForm;

  beforeEach(() => {
    view = new LoginForm({});
    new LoginFormController(view);
    document.body.append(view.node);
  });

  afterEach(() => {
    view.destroy();
    vi.clearAllMocks();
  });

  it('login button is disabled by default', () => {
    expect(view.loginButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('login button is disabled if loginOrEmail is empty', () => {
    const input = view.loginOrEmail.node.querySelector('input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.loginButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('login button is disabled if password is empty', () => {
    const input = view.password.node.querySelector('input');
    if (input) {
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.loginButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('login button is disabled if email format is invalid', () => {
    const loginInput = view.loginOrEmail.node.querySelector('input');
    if (loginInput) {
      loginInput.value = 'notanemail@';
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Anna12';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.loginButton.node.hasAttribute('disabled')).toBe(true);
  });

  it('login button is enabled when login and password are valid', () => {
    const loginInput = view.loginOrEmail.node.querySelector('input');
    if (loginInput) {
      loginInput.value = 'Sara';
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Anna12';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    expect(view.loginButton.node.hasAttribute('disabled')).toBe(false);
  });

  it('calls authService.login when form is submitted', async () => {
    vi.mocked(authService.login).mockResolvedValue({ success: true });

    const loginInput = view.loginOrEmail.node.querySelector('input');
    if (loginInput) {
      loginInput.value = 'Dan';
      loginInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    const passwordInput = view.password.node.querySelector('input');
    if (passwordInput) {
      passwordInput.value = 'Anna12';
      passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
    }

    view.form.node.dispatchEvent(new Event('submit', { bubbles: true }));

    await vi.waitFor(() => {
      expect(vi.mocked(authService.login)).toHaveBeenCalledWith('Dan', 'Anna12');
    });
  });

  it('does not call authService.login if form is invalid', () => {
    view.form.node.dispatchEvent(new Event('submit', { bubbles: true }));

    expect(vi.mocked(authService.login)).not.toHaveBeenCalled();
  });
});
