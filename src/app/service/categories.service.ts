import { Category } from 'src/app/interfaces'
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories: Category[] = []

  constructor() {
    this.categories = [
      { id: '1', name: 'Personal', color: '#ff5722' },
      { id: '2', name: 'Work', color: '#2196f3' },
      { id: '3', name: 'Health', color: '#4caf50' },
    ]
  }

  getCategories() {
    return this.categories
  }

  getCategory(id: string) {
    return this.categories.filter((category) => category.id === id)[0]
  }

  editCategory(cat: Category) {
    let updateCategory = this.getCategory(cat.id)
    if (updateCategory) {
      let newCategories = this.getCategories()
      const index = this.categories.findIndex((c) => c.id === cat.id)
      newCategories[index] = cat
      this.categories = newCategories
      return true
    }
    return false
  }

  addCategory(cat: Category) {
    this.categories.push({ ...cat, id: String(this.categories.length + 1) })
    return true
  }

  deleteCategory(id: string): boolean {
    const index = this.categories.findIndex(cat => cat.id === id)
    if (index !== -1) {
      this.categories.splice(index, 1)
      return true
    }
    return false
  }

}
