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
import { Component, OnDestroy, OnInit } from '@angular/core'
import { TasksService } from 'src/app/service'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-tasks',
  templateUrl: 'tasks.page.html',
  styleUrls: ['tasks.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonMenuButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonItem, IonBadge, IonCardContent, IonIcon, IonToast, IonFab, IonFabButton, RouterLink],
  standalone: true,
})
export class TasksPage implements OnInit, OnDestroy {
  tasks: Task[] = []
  private subscription!: Subscription
  selectedCategory: string | null = null
  isToastOpen = false
  
  constructor(private tasksService: TasksService) {
    addIcons({ 'add-sharp': addSharp, 'trash-bin': trashBin, pencil })
  }

  ngOnInit() {
    this.subscription = this.tasksService.getTasks().subscribe(
      (tasks) => this.tasks = tasks
    )
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  async deleteTask(id: string) {
    if (await this.tasksService.deleteTask(id)) {
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
