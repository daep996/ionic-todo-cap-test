import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { CategoriesService, TasksService } from '../../../service'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Category, Task } from 'src/app/interfaces'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-tasks-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class TaskstaskEditPage implements OnInit, OnDestroy {
  taskForm!: FormGroup
  task!: Task
  categories!: Category[]
  isEditMode = false
  private subscription!: Subscription

  constructor(
    private categoryService: CategoriesService,
    private taskService: TasksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isEditMode = Object.keys(this.route.snapshot.params).length !== 0
    this.initForm()
    this.subscription = this.categoryService.getCategories().subscribe(
      categories => this.categories = categories
    )
    if (this.isEditMode) {
      const taskId = this.route.snapshot.paramMap.get('id')
      if (taskId === null) {
        return
      }
      this.task = this.taskService.getTask(taskId)
      if (!this.task) {
        return
      }
      this.initForm()
      this.taskForm.patchValue({
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        categoryId: this.task.categoryId,
        completed: this.task.completed,
      })
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [''],
      completed: [false],
    })
  }

  async onSubmit() {
    if (this.isEditMode) {
      await this.taskService.editTask(this.taskForm.value)
    } else if (!this.isEditMode) {
      await this.taskService.addTask(this.taskForm.value)
    }
     else {
      console.error(`Error`)
    }
    this.router.navigate(['/tasks'])
  }
}
