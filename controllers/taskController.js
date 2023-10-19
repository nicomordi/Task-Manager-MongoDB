const Task = require('../models/task');

const handleError = (err) => {
    const errors = {};

    if (err.message === 'Ingresa un ID válido.') {
        errors.id = 'ID inválido. Por favor, ingresa un ID válido.';
    }

    if (err.message === 'Ingresa un nombre.') {
        errors.nombre = 'Nombre requerido. Por favor, ingresa un nombre válido.';
    }

    if (err.message === 'Ingresa una descripción.') {
        errors.descripcion = 'Descripción requerida. Por favor, ingresa una descripción válida.';
    }

    if (err.message === 'El nombre debe contener al menos 6 caracteres.') {
        errors.nombre = 'El nombre debe tener al menos 6 caracteres.';
    }

    if (err.code === 11000) {
        errors.id = 'El ID ya está en uso.';
        return errors;
    }

    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};

module.exports.createTask = async (req,res) =>{
    const {id,nombre,descripcion,completada} = req.body
    if (nombre == undefined) {
        const err = {message:"Ingresar un nuevo nombre"}
        const errors = handlerError(err)
        res.status(400).json({errors})
        return
    }
    if (descripcion == undefined) {
        const err = {message:"Ingresar una descripcion"}
        const errors = handlerError(err)
        res.status(400).json({errors})
        return
    }
    const fechaCreacion = new Date()
    try {
        const newTask = await Task.create({id,name_,description,complete})
        res.status(201).json(newTask)
    } catch (error) {
        const errors = handlerError(error)
        res.status(400).json({errors})
    }

};

module.exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();

        if (tasks.length > 0) {
            return res.status(200).json(tasks);
        } else {
            return res.status(404).json('Esa tarea no existe');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error 404');
    }
};

module.exports.completeTasks = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findOne({ id });

        if (!task) {
            return res.status(404).json('Esa tarea no esta completa');
        }

        task.completada = true;
        await task.save();
        return res.status(200).json(task);
    } catch (error) {
        console.error(error);
        return res.status(500).json('Error 404');
    }
};