import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { LinkSectionsComponent } from '../../components/link-sections/link-sections';
import { LinkSection } from '../../models/link-section';

type LinksContent = {
  sections: LinkSection[];
};

@Component({
  selector: 'app-links',
  imports: [LinkSectionsComponent],
  templateUrl: './links.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {
  private readonly contentService = inject(ContentService);
  private readonly content = this.contentService.fetchContent<LinksContent>('links');

  protected readonly sections = computed(() => this.content.data()?.sections ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;
}
