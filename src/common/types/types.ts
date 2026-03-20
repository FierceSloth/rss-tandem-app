import type { Component } from '@/components/base/component';

/* ========================================================================== */
/*                              Global Interfaces                             */
/* ========================================================================== */

export interface IComponent {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  text?: string;
  attrs?: Record<string, string>;
}

export interface IComponentChild {
  className?: string[] | string;
}

export interface IPage {
  render: () => Component;
  destroy: () => void;
}

/* ========================================================================== */
/*                            Validation Interfaces                           */
/* ========================================================================== */

export interface IValidateResult {
  isValid: boolean;
  errorMessage?: string;
}

/* ========================================================================== */
/*                              System Intefaces                              */
/* ========================================================================== */
export interface SystemInfo {
  browser: string;
  os: string;
}
