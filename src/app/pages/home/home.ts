import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { ThemeService } from '../../services/theme.service';

type HomeContent = {
  projectName: string;
  projectStatus: string;
  tagline: string;
  heroSubtitle: string;
  features: string[];
};

type ImageSlide = {
  dark: string;
  light: string;
  alt: string;
};

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly contentService = inject(ContentService);
  private readonly themeService = inject(ThemeService);
  private readonly content = this.contentService.fetchContent<HomeContent>('home');

  protected readonly projectName = computed(() => this.content.data()?.projectName ?? '');
  protected readonly tagline = computed(() => this.content.data()?.tagline ?? '');
  protected readonly projectStatus = computed(() => this.content.data()?.projectStatus ?? '');
  protected readonly features = computed(() => this.content.data()?.features ?? []);
  protected readonly loading = this.content.loading;
  protected readonly error = this.content.error;

  protected readonly slides = signal<ImageSlide[]>([
    {
      dark: '/product_images/Screenshot 2026-05-17 183717.png',
      light: '/product_images/Screenshot 2026-05-17 183910.png',
      alt: 'Hauptseite',
    },
    {
      dark: '/product_images/Screenshot 2026-05-17 184034.png',
      light: '/product_images/Screenshot 2026-05-17 184012.png',
      alt: 'Aufgabe erstellen',
    },
    {
      dark: '/product_images/Screenshot 2026-05-17 184115.png',
      light: '/product_images/Screenshot 2026-05-17 184149.png',
      alt: 'Arbeitspräferenzen',
    },
  ]);
  protected readonly currentSlide = signal(0);

  protected readonly currentImage = computed(() => {
    const slide = this.slides()[this.currentSlide()];
    return this.themeService.dark() ? slide.dark : slide.light;
  });

  protected readonly currentAlt = computed(() => this.slides()[this.currentSlide()].alt);

  protected readonly lightboxOpen = signal(false);
  private readonly lightboxDialog = viewChild<ElementRef<HTMLDialogElement>>('lightboxDialog');

  constructor() {
    effect(() => {
      const dialog = this.lightboxDialog()?.nativeElement;
      if (!dialog) return;
      if (this.lightboxOpen()) {
        dialog.showModal();
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }

  protected openLightbox(): void {
    this.lightboxOpen.set(true);
  }

  protected closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  protected prev(): void {
    this.currentSlide.update(i => (i - 1 + this.slides().length) % this.slides().length);
  }

  protected next(): void {
    this.currentSlide.update(i => (i + 1) % this.slides().length);
  }
}
