const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Ingrese un ID para la tarea'],
        unique: [true, 'Este ID ya esta en uso'],
        minlength: [6, 'El ID debe tener al menos 6 caracteres.'],
        lowercase: true
    },
    name_: {
        type: String,
        required: [true, 'Ingrese el nombre de la tarea'],
        minlength: [6, 'El nombre debe tener como minimo 6 caracteres']
    },
    description: {
        type: String,
        required: [true, 'Por favor, ingresa una descripción.'],
        minlength: [10, 'La descripcion debe tener como minimo 10 caracteres']
    },
  
    complete: {
        type: Boolean,
        required: false
    },
});

taskSchema.statics.getAllTasks = async function () {
    return await this.find();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;