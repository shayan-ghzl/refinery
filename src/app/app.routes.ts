import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'list',
        loadComponent: () => import('./pages/list/list'),
    },
    {
        path: 'add',
        loadComponent: () => import('./pages/add/add'),
    },
    { path: '**', redirectTo: 'list' },
];
