import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoDataService {
  http = inject(HttpClient);

  get = () => {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  };

  put = (todo: Todo) => {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );
  };

  delete(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }
}
