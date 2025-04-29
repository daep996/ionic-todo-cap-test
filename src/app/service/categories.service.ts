import { addDoc, collection, Firestore, getDocsFromServer, query, deleteDoc, where, doc, getDocs } from '@angular/fire/firestore'
import { Category } from 'src/app/interfaces'
import { Injectable} from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadCategories()
  }

  private async loadCategories() {
    try {
      const categoriesRef = collection(this.firestore, "Category")
      const q = query(categoriesRef)
      const categorySnapshot = await getDocsFromServer(q)
      const categories: Category[] = []
      categorySnapshot.forEach((cat) => categories.push(cat.data() as Category))
      this.categoriesSubject.next(categories)
    } catch (error) {
      console.error(error)
    }
  }

  getCategories(): Observable<Category[]> {
    return this.categories$
  }

  getCurrentCategories(): Category[] {
    return this.categoriesSubject.value
  }

  getCategory(id: string) {
    return this.categoriesSubject.value.find((category) => category.id === id)
  }

  editCategory(cat: Category) {
    const categories = this.categoriesSubject.value
    const index = categories.findIndex((c) => c.id === cat.id)
    if (index !== -1) {
      categories[index] = cat
      this.categoriesSubject.next([...categories])
      return true
    }
    return false
  }

  async addCategory(cat: Category) {
    try {
      const categoryRef = collection(this.firestore, "Category")
      await addDoc(categoryRef, { ...cat, id: String(this.categoriesSubject.value.length + 1) })
      await this.loadCategories()
      return true
    } catch (error) {
      return false
    }
  }

  async deleteCategory(id: string) {
    try {
      const categoryRef = collection(this.firestore, "Category");
      const q = query(categoryRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0];
        await deleteDoc(doc(this.firestore, "Category", docToDelete.id));
        const currentCategories = this.categoriesSubject.value;
        const updatedCategories = currentCategories.filter(cat => cat.id !== id);
        this.categoriesSubject.next(updatedCategories);
        return true;
      } else {
        throw new Error('Category not found');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new Error('Error in Delete');
    }
  }

}
