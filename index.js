const express = require('express');
const app = express();
const path = require('path');

const puerto = 3000

app.listen(puerto, () => 
console.log('Servidor corriendo puerto:' + puerto));

app.get(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/home.html'))
})
