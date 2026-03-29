import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ContentService } from '../../services/content.service';

type ExternalLink = {
  label: string;
  url: string;
  icon?: string;
  iconDark?: string;
};

type LinkSection = {
  title: string;
  links: ExternalLink[];
};

type LinksContent = {
  sections: LinkSection[];
};

@Component({
  selector: 'app-links',
  imports: [],
  templateUrl: './links.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinksComponent {
  private readonly contentService = inject(ContentService);
  private readonly content = this.contentService.fetchContent<LinksContent>('links');

  protected readonly sections = computed(() => this.content.data()?.sections ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;

  protected faviconSrc(link: ExternalLink): string {
    return link.icon ?? `https://icons.duckduckgo.com/ip3/${new URL(link.url).hostname}.ico`;
  }

  protected faviconDarkSrc(link: ExternalLink): string {
    return link.iconDark ?? link.icon ?? `https://icons.duckduckgo.com/ip3/${new URL(link.url).hostname}.ico`;
  }
}
