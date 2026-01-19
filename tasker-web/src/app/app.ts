import { Component, effect, inject, signal } from '@angular/core';
import { TaskList } from './task-list';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList],
  template: `
    <h1>Tasker</h1>
    <h2>My Tasks    <span>
      @if (count()) {
        - {{count()}}
      }
      @else {
        No tasks
      }
    </span>
</h2>
    <button (click)="add()">Add task</button>
    <task-list [tasks]="tasks()" />
  `
})
export class App {
  private taskService = inject(TaskService);
  tasks = this.taskService.tasks;
  readonly count = this.taskService.taskCount;

  constructor() {
    effect(() => {
      this.taskService.load();
    });
  }
  add() {
    this.taskService.add('New Task' + this.titleHelper());
  }

  titleHelper() {
    return ` ${Date.now()}`
  }
}
