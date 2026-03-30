import { Component, effect, inject, signal } from '@angular/core';
import { TaskListComponent } from './task-list';
import { TaskService } from './task.service';
import { TaskAddComponent } from './task-add';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskAddComponent, TaskListComponent],
  template: `
    <h1 style="border-bottom: 3px solid dodgerblue; margin: 0;">Tasker</h1>
    <h2 style="border-bottom: 1px solid #ccc; margin: 0;">My Tasks</h2>
    <task-add (addTask)="add($event)" />
    <task-list [tasks]="tasks()" />

    <div style="font-size: 0.8rem;">
      @if (count()) { {{count()}} tasks left } @else { No work, no song! }</div>
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
  add(title: string) {
    this.taskService.add(title);
  }
}
