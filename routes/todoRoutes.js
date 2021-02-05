const express = require('express');
const Todo = require('../model/todo');

const router = express.Router();

// All todos
router.get('/todos', (req, res) => {
    Todo.find()
    .then(result => {
        res.render('index', {title: 'All Todos', todos: result});
    })
})

// Display new task form
router.get('/todos/create-task', (req, res) => {
    res.render('create-task', {title: 'Create New Task'});
})

// Display specific todo - details
router.get('/todos/:id', (req, res) => {
    const idToFind = req.params.id;

    Todo.findById(idToFind)
    .then(result => {
        res.render('details', { title: 'Details', todo: result });
    })
    .catch(error => console.log(error))
})

// Display edit page
router.get('/todos/update/:id', (req, res) => {
    const todoToDisplay = req.params.id;

    Todo.findById(todoToDisplay)
    .then(result => {
        res.render('edit', {title: 'Edit Todo', todo: result});
    })
})



// Edit specific todo
router.put('/todos/:id', (req, res) => {

    const updatedTodo = req.body;
    console.log('updated todo = ', updatedTodo);

    const idToDelete = updatedTodo.todo_id;
    
    Todo.findByIdAndUpdate({_id: idToDelete}, {
        title: updatedTodo.title,
        description: updatedTodo.description
    })
    .then(() => {
        console.log('Todo updated');
        res.redirect('/todos')
    })
    .catch(error => console.log(error))    
})


                                                                            // Todo Routes

// Create Todo                                                                            
router.post('/todos', (req, res) => {

    console.log('Post request inititated');

    // Create new todo object
    const todo = new Todo(req.body);

    // Save todo to MongoDB
    todo.save()
    .then(() => {
        console.log('Todo saved to DB');
        // Redirect back to Todos page
        res.redirect('/');
    })
    .catch(() => console.log(error => console.log(error)))
})

// Delete specific todo
router.delete('/todos/:id', (req, res) => {
    const idToDelete = req.params.id;
    Todo.findByIdAndDelete(idToDelete)
    .then(() => res.json({ redirect: '/'}))
    .catch(error => console.log(error))
})

module.exports = router;