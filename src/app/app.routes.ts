import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent),
  },
  {
    path: 'project',
    loadComponent: () =>
      import('./pages/under-construction/under-construction').then(m => m.UnderConstructionComponent),
  },
  {
    path: 'team',
    loadComponent: () => import('./pages/team/team').then(m => m.TeamComponent),
  },
  {
    path: 'plan',
    loadComponent: () => import('./pages/plan/plan').then(m => m.PlanComponent),
  },
  {
    path: 'documentation',
    loadComponent: () =>
      import('./pages/under-construction/under-construction').then(m => m.UnderConstructionComponent),
  },
  {
    path: 'links',
    loadComponent: () => import('./pages/links/links').then(m => m.LinksComponent),
  },
];
