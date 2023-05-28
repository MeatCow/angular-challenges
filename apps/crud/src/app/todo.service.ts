import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  loadTodos = () =>
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

  updateTodo = (todo: Todo) =>
    this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      todo
    );

  deleteTodo = (id: number) =>
    this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`);
}
