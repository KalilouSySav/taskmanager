const express = require('express');
const taskController = require('../controller/taskController');
const Task = require('../model/task');

const router = express.Router();

//get form to add task
router.get('/add', (req, res) => {
    res.render('addTask', { title: 'Créer une tâche' })
});

//get form to edit task
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('editTask', { title: 'Modifier une tâche', task })
});

//get table of all tasks
router.get('/all', async (req, res) => {
    const tasks = await Task.find();
    res.render('allTasks', { title: 'Mes tâches', tasks })
})

// Get all tasks
router.get('/', taskController.getAllTasks);

// Create a new task
router.post('/', taskController.createTask);

// Update a task
router.post('/update/:id', taskController.updateTask);

// Delete a task
router.get('/delete/:id', taskController.deleteTask);

module.exports = router;