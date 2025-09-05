import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TodoService } from '../../services/todo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm {
  todoForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private todoService: TodoService, private router: Router) {
    this.todoForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      priority: ['medium', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.todoForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const todoData = {
        title: this.todoForm.value.title.trim(),
        description: this.todoForm.value.description?.trim() || '',
        priority: this.todoForm.value.priority,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      this.todoService
        .createTodo(todoData)
        .then(() => this.router.navigate(['/todos']))
        .catch((error) => {
          console.error('Error creating todo:', error);
          this.isSubmitting = false;
          alert('Error al crear la tarea. Intenta nuevamente.');
        });
    }
  }

  onCancel(): void {
    this.router.navigate(['/todos']);
  }

  get title() {
    return this.todoForm.get('title');
  }
  get description() {
    return this.todoForm.get('description');
  }
  get priority() {
    return this.todoForm.get('priority');
  }
}
