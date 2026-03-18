import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { Milestone } from '../../models/milestone';
import { ContentService } from '../../services/content.service';

type PlanContent = {
  milestones: Milestone[];
};

@Component({
  selector: 'app-plan',
  templateUrl: './plan.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanComponent {
  private readonly contentService = inject(ContentService);
  private readonly content = this.contentService.fetchContent<PlanContent>('plan');

  protected readonly milestones = computed(() => this.content.data()?.milestones ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;
}
