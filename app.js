const express = require("express") // Importar el módulo de express
const app = express() // Crear el servidor
const port = 3000 // Crear el puerto 
const books = require('./data/books.json'); // Importar books.json


app.get('/', (req, res) => {
    res.send('Hello World!');
});


// 1
app.get('/all', (req, res) => {
    res.status(200).json(books);
});

//2
app.get('/first', (req, res) => {
    res.status(200).json(books[0]);
});

//3
app.get('/last', (req, res) => {
    res.status(200).json(books[books.length - 1]);
});

//4
app.get('/middle', (req, res) => {
    res.status(200).json(books[Math.floor(books.length / 2)]);
});

//5
app.get('/author/dante-alighieri', (req, res) => {
    books.find(book => {
        if (book.author === "Dante Alighieri") {
            res.status(200).json(book.title)
        }
    })
});

//6
app.get('/country/charles-dickens', (req, res) => {
    books.find(book => {
        if (book.author === "Charles Dickens") {
            res.status(200).json(book.country)
        }
    })
});

//7
app.get('/year&pages/cervantes', (req, res) => {
    let book = books.find(book => book.author === "Miguel de Cervantes")
    book = {pages: book.pages, year: book.year}
    res.status(200).json(book)
});

//8
app.get('/country/count/spain', (req, res) => {
    let book = books.filter(book => book.country === "Spain")
    res.status(200).json(book.length)
});

//9
app.get('/country/at-least/germany', (req, res) => {
    let book = books.some(book => book.country === "Germany")
    if (book) {
    res.status(200).json(book)
    } else {
        res.status(400).json(!book)
    }
});

//10
app.get('/pages/all-greater/200', (req, res) => {
    if (books.every(book => book.pages > 200)) {
    res.status(200).json(true)
    } else {
        res.json(false)
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});