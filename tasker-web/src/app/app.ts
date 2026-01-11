import { Component, signal } from '@angular/core';
import { TaskList } from './task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList],
  // templateUrl: './app.html',
  // styleUrl: './app.css'
  template: `
    <h1>Tasker</h1>
    <task-list />
  `
})
export class App {
  protected readonly title = signal('tasker-web');
}
