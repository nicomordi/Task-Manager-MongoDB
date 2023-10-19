const { Routes } = require('express');
const taskController = require('../controllers/taskController');

const routes = Routes();

routes.get('/task', taskController.getTasks);
routes.get('/task/:id', taskController.createTask );
routes.put('/task/complete/:id', taskController.completeTasks);


module.exports = routes;