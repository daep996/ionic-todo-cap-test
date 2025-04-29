import { Category, Task } from 'src/app/interfaces'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
})
export class TaskItemComponent {

  @Input() task!: Task
  @Input() category?: Category

  constructor() {}

  toggleComplete() {
    // UI-only implementation
    this.task.completed = !this.task.completed
  }

}
