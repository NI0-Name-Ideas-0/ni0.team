import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.contentBaseUrl;

  private readonly date = Date.now(); // Used to prevent caching of content

  /**
   * Fetch content from the external content repository.
   * @param page The page name (e.g., 'team', 'home', 'project')
   * @returns A signal containing the fetched data, or null if an error occurred
   */
  fetchContent<T>(page: string) {
    const loading = signal(true);
    const error = signal<string | null>(null);

    const data = toSignal(
      this.http.get<T>(`${this.baseUrl}/${page}.json?_t=${this.date}`).pipe(
        map((response) => {
          loading.set(false);
          error.set(null);
          return response;
        }),
        catchError((err) => {
          loading.set(false);
          error.set(`Failed to load ${page} content: ${err.message}`);
          console.error(`Error loading ${page} content:`, err);
          return of(null);
        })
      ),
      { initialValue: null }
    );

    return { data, loading, error };
  }
}
