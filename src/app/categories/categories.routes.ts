import { Routes } from '@angular/router'

export const categoriesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/categories/categories.page').then((m) => m.CategoriesPage),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/category-edit/category-edit.page').then((m) => m.CategoryEditPage),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/category-edit/category-edit.page').then((m) => m.CategoryEditPage),
  }
]