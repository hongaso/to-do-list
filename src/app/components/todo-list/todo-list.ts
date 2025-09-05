import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TodoService } from '../../services/todo';
import { Todo } from '../../models/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos$: Observable<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todos$ = this.todoService.getTodos() as Observable<Todo[]>;
  }

  deleteTodo(id?: string): void {
    if (!id) return;

    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      this.todoService.deleteTodo(id).catch((error) => {
        console.error('Error al eliminar la tarea:', error);
        alert('No se pudo eliminar la tarea. Intenta nuevamente.');
      });
    }
  }
}
