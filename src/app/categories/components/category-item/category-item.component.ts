import {
  IonBadge,
  IonButton,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonToast,
} from '@ionic/angular/standalone'
import { pencil, trashBin } from 'ionicons/icons'
import { CategoriesService } from 'src/app/service'
import { Component, Input } from '@angular/core'
import { Category } from 'src/app/interfaces'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
  imports: [
    IonBadge,
    IonButton,
    IonIcon,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonToast,
    RouterLink,
  ]
})
export class CategoryItemComponent {

  @Input() category!: Category

  constructor(private categoryService: CategoriesService) {
    addIcons({pencil, 'trash-bin': trashBin})
  }

  async deleteCategory(id: string) {
    try {
      const deleted = await this.categoryService.deleteCategory(id)
      if (!deleted) {
        console.error(`Error deleting category ${id}`)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

}
