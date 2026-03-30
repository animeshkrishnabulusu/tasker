import {Component, Input} from '@angular/core';
import { Task } from './task.service';

@Component({
    selector: 'task-list',
    standalone: true,
    template: `
        <ul style="padding:0">
            @for (task of tasks; track tasks) {
                <li>{{ task.title }}</li>
            } @empty {
                <li>No items found.</li>
            }
        </ul>
    `
})

export class TaskListComponent {
    @Input({required: true})
    tasks!: Task[]
}