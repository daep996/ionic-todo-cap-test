import { Injectable } from '@angular/core'
import { Task } from 'src/app/interfaces'

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = []

  constructor() {
    this.tasks = [
      { id: "1", title: "Buy groceries", completed: false, description: "Find a store near", categoryId: "1" },
      { id: "2", title: "Finish project", completed: true, description: "It's done!", categoryId: "2" },
      { id: "3", title: "Call mom", completed: false, description: "Call at 8:00 AM" },
      { id: "4", title: "Send important email", completed: false, description: "Send the work email soon" },
    ]
  }

  getTasks() {
    return this.tasks
  }

  getTask(id: string) {
    return this.tasks.filter((task) => task.id === id)[0]
  }

  editTask(task: Task) {
    let updateTask = this.getTask(task.id)
    if(updateTask) {
      let newTask = this.getTasks()
      const index = this.tasks.findIndex(t => t.id === task.id)
      newTask[index] = task
      this.tasks = newTask
      return true
    }
    return false
  }

  addTask(task: Task) {
    this.tasks.push({...task, id: String(this.tasks.length + 1)})
    return true
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }

}
