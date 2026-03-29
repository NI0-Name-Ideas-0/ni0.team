import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly menuOpen = signal(false);

  protected readonly navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'Projekt', path: '/project' },
    { label: 'Team', path: '/team' },
    { label: 'Projektplan', path: '/plan' },
    { label: 'Dokumentation', path: '/documentation' },
    { label: 'Links', path: '/links' },
  ];

  protected toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
