import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, map, of } from 'rxjs';

export type VisitedEntry = {
  /** Content-Length from HEAD request at last visit. undefined = never fetched, null = request failed. */
  contentLength?: number | null;
};

@Injectable({
  providedIn: 'root',
})
export class LinkVisitService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  private storageKey(namespace: string): string {
    return `ni0_visited_links_${namespace}`;
  }

  load(namespace: string): Record<string, VisitedEntry> {
    if (!isPlatformBrowser(this.platformId)) return {};

    const stored = localStorage.getItem(this.storageKey(namespace));
    if (!stored) return {};

    try {
      const parsed = JSON.parse(stored) as Record<string, unknown>;
      const result: Record<string, VisitedEntry> = {};

      for (const [key, value] of Object.entries(parsed)) {
        if (typeof value === 'object' && value !== null) {
          result[key] = value as VisitedEntry;
        }
      }

      return result;
    } catch {
      return {};
    }
  }

  save(namespace: string, visited: Record<string, VisitedEntry>): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.storageKey(namespace), JSON.stringify(visited));
  }

  isPdf(url: string): boolean {
    try {
      return new URL(url).pathname.toLowerCase().endsWith('.pdf');
    } catch {
      return false;
    }
  }

  /** Makes a HEAD request to check the current Content-Length of a resource. */
  fetchContentLength(url: string): Observable<number | null> {
    return this.http.head(url, { observe: 'response' }).pipe(
      map(res => {
        const cl = res.headers.get('Content-Length');
        return cl !== null ? Number(cl) : null;
      }),
      catchError(() => of(null)),
    );
  }
}
