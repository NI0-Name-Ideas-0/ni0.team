import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark = signal(this.resolveInitial());

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.dark());
      localStorage.setItem('theme', this.dark() ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.dark.update(v => !v);
  }

  private resolveInitial(): boolean {
    const stored = localStorage.getItem('theme');
    if (stored !== null) return stored === 'dark';
    //return window.matchMedia('(prefers-color-scheme: dark)').matches;
    return true; // Default to dark mode for first-time visitors
  }
}
