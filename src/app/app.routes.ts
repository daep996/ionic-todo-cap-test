import { Routes } from '@angular/router'
import { tasksRoutes } from './tasks/tasks.routes'
import { categoriesRoutes } from './categories/categories.routes'

export const routes: Routes = [
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
