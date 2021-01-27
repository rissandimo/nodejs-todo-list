const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Todo = require('./model/todo');

app.set('view engine', 'ejs');

// Access css styles
app.use(express.static('public'));

// Parse url data from form and put into request object 
app.use(express.urlencoded({extended: true}));


const mongooseURI = 'mongodb+srv://rissandimo:q7iASCVlmTIsCq1R@cluster0.5y4lz.mongodb.net/todo-list?retryWrites=true&w=majority'
mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Connected to DB');
    app.listen(3000);
}).catch(error => console.log(error));


                                                                            // App Routes

// Home Page - All todos 
app.get('/', (req, res) => {
    Todo.find()
    .then(result => {
        res.render('index', {title: 'All Todos', todos: result});
    })
})

// Display new task form
app.get('/create-task', (req, res) => {
    res.render('create-task', {title: 'Create New Task'});
})

                                                                            // Blog Routes

// Create Todo                                                                            
app.post('/todos', (req, res) => {

    console.log('Post request inititated');

    // Create new todo object
    const todo = new Todo(req.body);

    // Save blog to MongoDB
    todo.save()
    .then(() => {
        console.log('Todo saved to DB');
        // Redirect back to Todos page
        res.redirect('/');
    })
    .catch(() => console.log(error => console.log(error)))
})