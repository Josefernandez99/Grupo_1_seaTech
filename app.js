const express = require('express');
const app = express();
const path = require('path');

const indexRoute = require('./routes/index');

const usersRoute = require('./routes/users');
const productsRoute = require('./routes/products');

app.locals.baseUrl = '/';

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRoute);
app.use('/user', usersRoute);
app.use('/product', productsRoute);

const puerto = 3000
app.listen(puerto, () =>
    console.log('Servidor corriendo puerto: http://localhost:' + puerto));
