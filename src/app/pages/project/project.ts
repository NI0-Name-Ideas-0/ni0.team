import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex-1 flex flex-col' },
})
export class ProjectComponent {
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly safeDocsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.docsUrl);
}
