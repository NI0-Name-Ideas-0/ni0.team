import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { TeamMember } from '../../models/team-member';
import { ContentService } from '../../services/content.service';

type TeamContent = {
  teamMembers: TeamMember[];
};

@Component({
  selector: 'app-team',
  templateUrl: './team.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
  private readonly contentService = inject(ContentService);
  private readonly content = this.contentService.fetchContent<TeamContent>('team');

  protected readonly members = computed(() => this.content.data()?.teamMembers ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;

  protected getAvatarUrl(github: string): string {
    const username = github.split('/').pop()!;
    return `https://github.com/${username}.png`;
  }
}
