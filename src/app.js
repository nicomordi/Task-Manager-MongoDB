const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const taskRoutes = require('../routes/taskRoutes')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))
app.use(express.json())


mongoose.connect('mongodb://localhost/Task Manager',function(err){
    if(!err){
        console.log('Se ha establecido conexion con MONGODB');
    }else{
        throw err;
    }
});

app.get('/', (request, response) => {
  response.send('Task Manager')
})

module.exports = app;