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
    console.log('Listening for incoming requests');
}).catch(error => console.log(error));


// App Routes
app.get('/', (req, res) => {
    const todos = [
        // {title: 'First Todo', description: 'This is the first description'},
        // {title: 'Second Todo', description: 'This is the second description'},
        // {title: 'Third Todo', description: 'This is the third description'},
    ]
    res.render('index', {title: 'All Todos', todos});
})

app.get('/add-todo', (req, res) => {
    const todo = new Todo({
        title: 'New Hard Coded Todo',
        description: 'Some hard coded description'
    });

    todo.save().then((result) => res.send(result))
    .catch(error => console.log(error));
})

app.get('/create-task', (req, res) => {
    res.render('create-task', {title: 'Create New Task'});
})

// Blog Routes
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