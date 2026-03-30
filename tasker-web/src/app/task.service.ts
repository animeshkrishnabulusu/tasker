import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { tap, finalize } from 'rxjs/operators';

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

    private _adding = signal(0);
    readonly adding = computed(() => this._adding() > 0);

    load() {
        this.http.get<Task[]>(`${this.baseUrl}/tasks`)
        .subscribe(t => this._tasks.set(t));
    }

    add(title: string) {
        this.http
        .post<Task>(`${this.baseUrl}/tasks`, {title})
        .pipe(
            tap(task => {
                this._tasks.update(t => [...t, task]);
            }),
            finalize(() => {
                this._adding.update(n => Math.max(0, n-1));
            })
        )
        .subscribe({
            //this._tasks.update(t => [...t, task]);
            error: (err) => {
                console.error('Failed to add task', err);
            }
        });
    }
}