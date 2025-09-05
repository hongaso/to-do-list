import { Routes } from '@angular/router';
import { TodoList } from '../app/components/todo-list/todo-list';
import { TodoForm } from '../app/components/todo-form/todo-form';

export const routes: Routes = [
  { path: 'todos', component: TodoList },
  { path: 'todos/create', component: TodoForm },
  { path: 'todos/edit/:id', component: TodoForm },
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: '**', redirectTo: '/todos' },
];
