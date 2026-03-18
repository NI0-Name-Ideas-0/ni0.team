import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ContentService } from '../../services/content.service';

type ExternalLink = {
  label: string;
  url: string;
  icon?: string;
  iconDark?: string;
};

type Slide = {
  title: string;
  description: string;
};

type HomeContent = {
  projectName: string;
  projectStatus: string;
  tagline: string;
  heroSubtitle: string;
  slides: Slide[];
  features: string[];
  externalLinks: ExternalLink[];
};

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly contentService = inject(ContentService);
  private readonly content = this.contentService.fetchContent<HomeContent>('home');

  protected readonly projectName = computed(() => this.content.data()?.projectName ?? '');
  protected readonly tagline = computed(() => this.content.data()?.tagline ?? '');
  protected readonly projectStatus = computed(() => this.content.data()?.projectStatus ?? '');
  protected readonly slides = computed(() => this.content.data()?.slides ?? []);
  protected readonly features = computed(() => this.content.data()?.features ?? []);
  protected readonly externalLinks = computed(() => this.content.data()?.externalLinks ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;

  protected readonly currentSlide = signal(0);
  protected readonly slide = computed(() => this.slides()[this.currentSlide()] ?? { title: '', description: '' });

  protected prev(): void {
    this.currentSlide.update(i => (i - 1 + this.slides().length) % this.slides().length);
  }

  protected next(): void {
    this.currentSlide.update(i => (i + 1) % this.slides().length);
  }

  protected faviconSrc(link: ExternalLink): string {
    return link.icon ?? `https://icons.duckduckgo.com/ip3/${new URL(link.url).hostname}.ico`;
  }

  protected faviconDarkSrc(link: ExternalLink): string {
    return link.iconDark ?? link.icon ?? `https://icons.duckduckgo.com/ip3/${new URL(link.url).hostname}.ico`;
  }
}
