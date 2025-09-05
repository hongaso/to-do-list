// En src/app/models/todo.model.ts
export interface Todo {
  id?: string; // ID automático de Firestore
  title: string; // Título de la tarea
  description?: string; // Descripción opcional
  completed: boolean; // Estado de completado
  createdAt: Date; // Fecha de creación
  updatedAt: Date; // Fecha de última actualización
  priority?: 'low' | 'medium' | 'high'; // Prioridad opcional
}
