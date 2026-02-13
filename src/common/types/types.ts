import type { Component } from '@/components/base/component';

/* ========================================================================== */
/*                              Global Interfaces                             */
/* ========================================================================== */

// prettier-ignore
export type AppEvents =
  | 'router:navigate';

export interface IComponent {
  tag?: keyof HTMLElementTagNameMap;
  className?: string | string[];
  text?: string;
  attrs?: Record<string, string>;
}

export interface IComponentChild {
  className?: string[];
  children?: Component[];
}

export interface IPage {
  render: () => void;
  destroy: () => void;
}
