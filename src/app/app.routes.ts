import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/calendar/calendar.component').then(c => c.CalendarComponent),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
