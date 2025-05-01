import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDocsFromServer,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.taskSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadTasks()
  }

  private async loadTasks() {
    try {
      const tasksRef = collection(this.firestore, 'Task')
      const q = query(tasksRef)
      const tasksSnapshot = await getDocsFromServer(q)
      const tasks: Task[] = []
      tasksSnapshot.forEach((task) => tasks.push(task.data() as Task))
      this.taskSubject.next(tasks)
    } catch (error) {
      console.error('Error load Tasks.', error)
    }
  }

  getTasks() {
    return this.tasks$;
  }

  getTask(id: string) {
    return this.taskSubject.value.filter((task) => task.id === id)[0];
  }

  async editTask(task: Task) {
    const tasks = this.taskSubject.value
    const index = tasks.findIndex((t) => t.id === task.id)
    if (index !== -1) {
      const taskRef = collection(this.firestore, 'Task')
      const q = query(taskRef, where('id', '==', task.id))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const docToUpdate = querySnapshot.docs[0]
        await updateDoc(doc(this.firestore, 'Task', docToUpdate.id), {
          ...task,
        })
        //update local state
        tasks[index] = task
        this.taskSubject.next([...tasks])
        return true
      }
    }
    return false
  }

  async addTask(task: Task) {
    try {
      const taskRef = collection(this.firestore, 'Task')
      await addDoc(taskRef, {
        ...task,
        id: String(this.taskSubject.value.length + 1),
      })
      this.loadTasks()
      return true
    } catch (error) {
      return false
    }
  }

  async deleteTask(id: string) {
    try {
      const taskRef = collection(this.firestore, 'Task')
      const q = query(taskRef, where('id', '==', id))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        const docToDelete = querySnapshot.docs[0]
        await deleteDoc(doc(this.firestore, 'Task', docToDelete.id))
        const currentTasks = this.taskSubject.value
        const updatedTasks = currentTasks.filter(
          (task) => task.id !== id
        )
        this.taskSubject.next(updatedTasks)
        return true
      } else {
        throw new Error('Task not found')
      }
    } catch (error) {
      console.error('Error deleting task:', error)
      throw new Error('Error in Delete')
    }
  }
}
