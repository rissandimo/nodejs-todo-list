require('dotenv').config();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}



const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./model/todo');

app.set('view engine', 'ejs');

// Access css styles
app.use(express.static('public'));

// Parse url data from form and put into request object 
app.use(express.urlencoded({extended: true}));

mongoose.Types.ObjectId;

var methodOverride = require('method-override');
app.use(methodOverride('_method'));

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to DB');
    app.listen(3000);
}).catch(error => console.log(error));

app.get('/', (req, res) => {
    res.redirect('/todos');
})
                                                                            // App Routes

// Home Page - All todos 
app.get('/todos', (req, res) => {
    Todo.find()
    .then(result => {
        res.render('index', {title: 'All Todos', todos: result});
    })
})

// Display new task form
app.get('/todos/create-task', (req, res) => {
    res.render('create-task', {title: 'Create New Task'});
})

// Display specific todo - details
app.get('/todos/:id', (req, res) => {
    const idToFind = req.params.id;

    Todo.findById(idToFind)
    .then(result => {
        res.render('details', { title: 'Details', todo: result });
    })
    .catch(error => console.log(error))
})

// Display edit page
app.get('/todos/update/:id', (req, res) => {
    const todoToDisplay = req.params.id;

    Todo.findById(todoToDisplay)
    .then(result => {
        res.render('edit', {title: 'Edit Todo', todo: result});
    })
})



// Edit specific todo
app.put('/todos/:id', (req, res) => {

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
app.post('/todos', (req, res) => {

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
app.delete('/todos/:id', (req, res) => {
    const idToDelete = req.params.id;
    Todo.findByIdAndDelete(idToDelete)
    .then(() => res.json({ redirect: '/'}))
    .catch(error => console.log(error))
})

// Display 404 page
app.use((req, res) => {
    res.status(404).render('404');
});