// services/todo.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todosRef;

  constructor(private firestore: Firestore) {
    this.todosRef = collection(this.firestore, 'todos');
  }

  createTodo(todo: Omit<Todo, 'id'>) {
    const newTodo = {
      ...todo,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
    };
    return addDoc(this.todosRef, newTodo);
  }

  getTodos() {
    return collectionData(this.todosRef, { idField: 'id' });
  }

  updateTodo(id: string, todo: Partial<Todo>) {
    const todoDoc = doc(this.firestore, `todos/${id}`);
    return updateDoc(todoDoc, {
      ...todo,
      updatedAt: new Date(),
    });
  }

  deleteTodo(id: string) {
    const todoDoc = doc(this.firestore, `todos/${id}`);
    return deleteDoc(todoDoc);
  }
}
