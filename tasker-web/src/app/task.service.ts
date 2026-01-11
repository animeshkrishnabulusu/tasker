import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';

export interface Task {
    id: number;
    title: string;
}

@Injectable({providedIn: 'root'})
export class TaskService {
    private http = inject(HttpClient);
    private baseUrl = environment.apiBaseUrl;

    getTasks() {
        return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
    }
}