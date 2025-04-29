import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenuButton,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/angular/standalone'
import { addSharp, pencil, trashBin } from 'ionicons/icons'
import { Category, Task } from '../../../interfaces'
import { Component, OnInit } from '@angular/core'
import { TasksService } from 'src/app/service'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonBadge, IonCardContent, IonIcon, IonToast, IonFab, IonFabButton, RouterLink],
  standalone: true,
})
export class TasksPage implements OnInit {
  tasks: Task[] = []
  categories: Category[] = []
  selectedCategory: string | null = null
  isToastOpen = false
  
  constructor(private tasksService: TasksService) {
    addIcons({ 'add-sharp': addSharp, 'trash-bin': trashBin, pencil })
  }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks()
  }

  deleteTask(id: string) {
    if (this.tasksService.deleteTask(id)) {
      this.setOpen(true)
    } else {
      console.error(`NOT Deleted ${id}`)
      this.setOpen(false)
    }
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen
  }

}
