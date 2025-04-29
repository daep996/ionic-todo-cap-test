import { Routes } from '@angular/router'
import { tasksRoutes } from './tasks/tasks.routes'
import { categoriesRoutes } from './categories/categories.routes'

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/pages/login.page').then(m => m.LoginPage)
  },
  {
    path: 'tasks',
    children: tasksRoutes
  },
  {
    path: 'categories',
    children: categoriesRoutes
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
]
