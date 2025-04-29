import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { Category, Task } from 'src/app/interfaces'
import { CategoriesService, TasksService } from '../../../service'

@Component({
  selector: 'app-taskstask-edit',
  templateUrl: './task-edit.page.html',
  styleUrls: ['./task-edit.page.scss'],
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
  standalone: true,
})
export class TaskstaskEditPage implements OnInit {
  taskForm!: FormGroup
  task!: Task
  categories!: Category[]
  isEditMode = false

  constructor(
    private categoryService: CategoriesService,
    private taskService: TasksService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isEditMode = Object.keys(this.route.snapshot.params).length !== 0;
    this.initForm();
    this.categories = this.categoryService.getCategories();
    if (this.isEditMode) {
      const taskId = this.route.snapshot.paramMap.get('id');
      if (taskId === null) {
        return;
      }
      this.task = this.taskService.getTask(taskId);
      if (!this.task) {
        return;
      }
      this.initForm();
      this.taskForm.patchValue({
        id: this.task.id,
        title: this.task.title,
        description: this.task.description,
        categoryId: this.task.categoryId,
        completed: this.task.completed,
      });
    }
  }

  initForm() {
    this.taskForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [''],
      completed: [false],
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.taskService.editTask(this.taskForm.value)
    } else if (!this.isEditMode) {
      this.taskService.addTask(this.taskForm.value)
    }
     else {
      console.log(`Error`);
    }
    this.router.navigate(['/tasks'])
  }
}
