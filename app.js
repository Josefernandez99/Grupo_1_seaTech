const express = require('express');
const app = express();
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.get('/index',(req,res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'))
});

app.get('/productDetail',(req,res) => {
    res.sendFile(path.join(__dirname, 'views/productDetail.html'))
});

app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname, 'views/login.html'))
});

app.get('/cart',(req,res) => {
    res.sendFile(path.join(__dirname, 'views/cart.html'))
});

app.get('/register',(req,res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'))
});

const puerto = 3000
app.listen(puerto, () => 
console.log('Servidor corriendo puerto: http://localhost:' + puerto));