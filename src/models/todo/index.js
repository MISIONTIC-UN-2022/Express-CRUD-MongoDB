import { Schema, model } from 'mongoose';

const todoSchema = new Schema(
  {
    isCompleted: {
      type: Boolean,
      default: false,
      required: false,
    },
    title: {
      type: String,
      validate: {
        validator: (v) => /^[ a-záéíóúñA-ZÁÉÍÓÚÑ0-9]*$/.test(v),
        message: 'El título no cumple con el formato especificado',
      },
      min: [3, 'El título ha de tener mínimo 3 caracteres'],
      max: [50, 'El título ha de tener máximo 50 caracteres'],
      required: [true, 'Título de la tarea requerido.'],
    },
    task: {
      type: String,
      validate: {
        validator: (v) => /^[ a-záéíóúñA-ZÁÉÍÓÚÑ,&0-9]*$/.test(v),
        message: 'La descripción no cumple con el formato especificado',
      },
      min: [3, 'La descripción ha de tener mínimo 3 caracteres'],
      max: [400, 'La descripción ha de tener máximo 400 caracteres'],
      required: [true, 'Descripción de la tarea requerido.'],
    },
    createdBy: {
      type: String,
      validate: {
        validator: (v) => /^[a-záéíóúñA-ZÁÉÍÓÚÑ]*$/.test(v),
        message: 'El dueño de la tarea no cumple con el formato especificado',
      },
      min: [3, 'El dueño de la tarea ha de tener mínimo 3 caracteres'],
      required: [true, 'Dueño de la tarea requerido.'],
    },
    completedAt: {
      type: Date,
      default: null,
      required: false,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
);

const Todo = model('Todo', todoSchema);

export default Todo;
