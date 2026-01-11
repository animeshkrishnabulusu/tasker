import {Component, inject, signal} from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
    selector: 'task-list',
    standalone: true,
    template: `
        <ul>
            @for (task of tasks(); track task) {
                <li>{{ task.title }}</li>
            } @empty {
                <li>No items found.</li>
            }
        </ul>
    `
})

export class TaskList {
    private taskService = inject(TaskService);
    tasks = signal<Task[]>([]);

    ngOnInit() {
        this.taskService.getTasks().subscribe(t => this.tasks.set(t));
    }
}