import { type JSX } from 'react';

export class Modal {
  constructor(private setModal: (component: JSX.Element | null) => void) {}

  set(component: JSX.Element): void {
    this.setModal(component);
  }

  close(): void {
    this.setModal(null);
  }
}
