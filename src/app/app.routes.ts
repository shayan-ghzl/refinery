import { Routes } from '@angular/router';
import { Add } from './pages/add/add';
import { List } from './pages/list/list';

export const routes: Routes = [
    { path: 'list', component: List },
    { path: 'add', component: Add },
    { path: '**', redirectTo: 'list' },
];
