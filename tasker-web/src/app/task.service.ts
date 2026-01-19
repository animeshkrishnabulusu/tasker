import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';

export interface Task {
    id: number;
    title: string;
}

@Injectable({providedIn: 'root'})
export class TaskService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiBaseUrl;

    private _tasks = signal<Task[]>([]);
    readonly tasks = this._tasks.asReadonly();
    readonly taskCount = computed(() => this.tasks().length);

    load() {
        this.http.get<Task[]>(`${this.baseUrl}/tasks`)
        .subscribe(t => this._tasks.set(t));
    }

    add(title: string) {
        this.http
        .post<Task>(`${this.baseUrl}/tasks`, {title})
        .subscribe(task => {
            this._tasks.update(t => [...t, task]);
        });
    }
}