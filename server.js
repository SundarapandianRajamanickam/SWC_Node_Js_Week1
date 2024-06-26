const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

let products = [];


app.get('/', (req, res) => {
    res.render('index', { products: products });
});


app.post('/add-product', (req, res) => {
    const { productName } = req.body;
    if (productName) {
        products.push(productName);
    }
    res.redirect('/');
});


app.post('/delete-product', (req, res) => {
    const { productName } = req.body;
    products = products.filter(product => product !== productName);
    res.redirect('/');
});


app.post('/update-product', (req, res) => {
    const { oldProductName, newProductName } = req.body;
    const productIndex = products.indexOf(oldProductName);
    if (productIndex > -1 && newProductName) {
        products[productIndex] = newProductName;
    }
    res.redirect('/');
});


app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
