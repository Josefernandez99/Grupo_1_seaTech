const express = require('express');
const app = express();
const path = require('path');

const indexRoute = require('./routes/index');



app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRoute);

const puerto = 3000
app.listen(puerto, () =>
    console.log('Servidor corriendo puerto: http://localhost:' + puerto));
