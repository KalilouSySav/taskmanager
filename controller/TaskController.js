const Task = require('../model/task');

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.render('allTasks', { title: 'Mes tâches', tasks })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = new Task({ title, description, status, dueDate });
        await task.save();
        res.render('addTask', { title: 'Créer une tâche', message: 'La tâche a bien été créee.' })
    } catch (error) {
        res.render('addTask', { title: 'Créer une tâche', message: 'La tâche n\'a pas été créee.' })
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, dueDate } = req.body;
        const task = await Task.findByIdAndUpdate(id, { title, description, status, dueDate }, { new: true });
        if (!task) {
            return res.render('editTask', { title: 'Modifier une tâche', message: 'La tâche n\'a pas été modifiée. Elle est introuvable.', task })
        }
        const tasks = await Task.find();
        res.render('allTasks', { title: 'Mes tâches', message: 'La tâche a bien été modifiée.', tasks })
    } catch (error) {
        res.render('editTask', { title: 'Modifier une tâche', message: 'La tâche n\'a pas été modifiée.', task })
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        const tasks = await Task.find();
        res.render('allTasks', { title: 'Mes tâches', message: 'La tâche a bien été supprimée.', tasks })
    } catch (error) {
        res.render('allTasks', { title: 'Mes tâches', message: 'La tâche n\'a pas été supprimée.' })
    }
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};