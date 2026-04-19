import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { ExternalLink, LinkSection } from '../../models/link-section';
import { LinkVisitService, VisitedEntry } from '../../services/link-visit.service';

@Component({
  selector: 'app-link-sections',
  templateUrl: './link-sections.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkSectionsComponent {
  private readonly linkVisitService = inject(LinkVisitService);

  readonly sections = input.required<LinkSection[]>();
  readonly storageNamespace = input.required<string>();

  private readonly visitedLinks = signal<Record<string, VisitedEntry>>({});
  private readonly pdfContentLengths = signal<Record<string, number | null>>({});

  constructor() {
    effect(() => {
      this.visitedLinks.set(this.linkVisitService.load(this.storageNamespace()));
    });

    effect(() => {
      const pdfLinks = this.sections()
        .flatMap(s => s.links)
        .filter(l => this.linkVisitService.isPdf(l.url));

      for (const link of pdfLinks) {
        this.linkVisitService.fetchContentLength(link.url).subscribe(contentLength => {
          this.pdfContentLengths.update(prev => ({ ...prev, [link.url]: contentLength }));
        });
      }
    });
  }

  protected isNew(link: ExternalLink): boolean {
    const entry = this.visitedLinks()[link.url];
    if (!entry) return true;

    if (this.linkVisitService.isPdf(link.url)) {
      const serverLength = this.pdfContentLengths()[link.url];
      if (typeof serverLength === 'number' && typeof entry.contentLength === 'number' && serverLength !== entry.contentLength) {
        return true;
      }
    }

    return false;
  }

  protected markVisited(link: ExternalLink): void {
    const contentLength = this.linkVisitService.isPdf(link.url)
      ? (this.pdfContentLengths()[link.url] ?? null)
      : undefined;

    const entry: VisitedEntry = { contentLength };
    const updated = { ...this.visitedLinks(), [link.url]: entry };
    this.visitedLinks.set(updated);
    this.linkVisitService.save(this.storageNamespace(), updated);
  }

  protected faviconSrc(link: ExternalLink): string {
    return link.icon ?? `https://icons.duckduckgo.com/ip3/${new URL(link.url).hostname}.ico`;
  }

  protected faviconDarkSrc(link: ExternalLink): string {
    return link.iconDark ?? link.icon ?? `https://icons.duckduckgo.com/ip3/${new URL(link.url).hostname}.ico`;
  }
}
