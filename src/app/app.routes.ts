import { Routes } from '@angular/router'
import { tasksRoutes } from './tasks/tasks.routes'
import { categoriesRoutes } from './categories/categories.routes'
import { AuthGuard } from './guards/auth.guard'

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/pages/login.page').then(m => m.LoginPage)
  },
  {
    path: 'logout',
    loadComponent: () => import('./login/pages/logout.page').then(m => m.LogoutPage)
  },
  {
    path: 'tasks',
    canActivate: [AuthGuard],
    children: tasksRoutes
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    children: categoriesRoutes
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
]
