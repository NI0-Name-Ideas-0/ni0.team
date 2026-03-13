import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import type { TeamMember } from '../../models/team-member';

@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  protected getAvatarUrl(github: string): string {
    const username = github.split('/').pop()!;
    return `https://github.com/${username}.png`;
  }

  protected readonly members = signal<TeamMember[]>([
    {
      name: 'Paul Berndt',
      roles: ['Projektleitung'],
      github: 'https://github.com/Vectabyte',
    },
    {
      name: 'Felix Weglehner',
      roles: ['Verantwortlicher für Modellierung'],
      github: 'https://github.com/Placeblock',
    },
    {
      name: 'Elias Kerlin',
      roles: ['Technische Assistenz', 'Verantwortlicher für Tests'],
      github: 'https://github.com/LordEliasTM',
    },
    {
      name: 'Konstantin Fastovski',
      roles: ['Verantwortlicher für Qualitätssicherung und Dokumentation'],
      github: 'https://github.com/Konstantin-Fastovski',
    },
    {
      name: 'Silas Rißler',
      roles: ['Verantwortlicher für Recherche', 'Verantwortlicher für Implementierung'],
      github: 'https://github.com/orgs/NI0-Name-Ideas-0/people/R88issi',
    },
  ]);
}
