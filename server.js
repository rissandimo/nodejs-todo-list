const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.listen(3000);

app.get('/', (req, res) => {
    res.render('index', {title: 'All Todos'});
})