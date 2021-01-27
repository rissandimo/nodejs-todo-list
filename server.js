const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000);

app.get('/', (req, res) => {
    const todos = [
        {title: 'First Todo', description: 'This is the first description'},
        {title: 'Second Todo', description: 'This is the second description'},
        {title: 'Third Todo', description: 'This is the third description'},
    ]
    res.render('index', {title: 'All Todos', todos});
})

app.get('/create-task', (req, res) => {
    res.render('create-task', {title: 'Create New Task'});
})