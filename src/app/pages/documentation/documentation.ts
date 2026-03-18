import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { ProgressEntry } from '../../models/progress-entry';
import { ContentService } from '../../services/content.service';

type DocumentationContent = {
  entries: ProgressEntry[];
};

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {
  private readonly contentService = inject(ContentService);
  private readonly content = this.contentService.fetchContent<DocumentationContent>('documentation');

  protected readonly entries = computed(() => this.content.data()?.entries ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;
}
