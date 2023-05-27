import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from './todo.model';
import { TodosStore } from './todos.store';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todosStore = inject(TodosStore);
  readonly todos$ = this.todosStore.todos$;

  http = inject(HttpClient);

  loadTodos = () => {
    this.http
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todosStore.setState({ todos });
      });
  };

  updateTodo = (todo: Todo) => {
    this.http
      .put<Todo>(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo)
      .subscribe((todoUpdated: Todo) =>
        this.todosStore.updateTodo(todoUpdated)
      );
  };

  deleteTodo = (id: number) => {
    this.http
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .subscribe(() => this.todosStore.deleteTodo(id));
  };
}
