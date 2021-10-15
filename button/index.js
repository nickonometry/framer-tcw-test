import { defineCustomElement } from '@tyler-components-web/core';
import { ButtonComponent } from './button';
export * from './button';
export * from './button-constants';
export function defineButtonComponent() {
    defineCustomElement(ButtonComponent);
}
