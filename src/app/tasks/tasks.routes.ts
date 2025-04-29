import { Routes } from '@angular/router';

export const tasksRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/tasks/tasks.page').then((m) => m.TasksPage),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/task-edit/task-edit.page').then((m) => m.TaskstaskEditPage),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/task-edit/task-edit.page').then((m) => m.TaskstaskEditPage),
  }
];