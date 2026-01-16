import {Component, Input} from '@angular/core';
import { Task } from './task.service';

@Component({
    selector: 'task-list',
    standalone: true,
    template: `
        <ul>
            @for (task of tasks; track tasks) {
                <li>{{ task.title }}</li>
            } @empty {
                <li>No items found.</li>
            }
        </ul>
    `
})

export class TaskList {
    @Input({required: true})
    tasks!: Task[]
}