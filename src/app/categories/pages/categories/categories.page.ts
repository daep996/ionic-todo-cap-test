import { CategoryItemComponent } from '../../components/category-item/category-item.component'
import { CategoriesService } from 'src/app/service'
import { Component, OnInit } from '@angular/core'
import { Category } from 'src/app/interfaces'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { addSharp } from 'ionicons/icons'
import { addIcons } from 'ionicons'
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone'

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  imports: [
    CategoryItemComponent,
    FormsModule,
    IonButtons,
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
  standalone: true,
})
export class CategoriesPage implements OnInit {

  categories: Category[] = []

  constructor(private categoryService: CategoriesService) {
    addIcons({addSharp})
  }

  ngOnInit() {
    this.categories = this.categoryService.getCategories()
  }

}
