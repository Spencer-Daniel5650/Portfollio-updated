'use strict';

const express = require('express');
const multer = require('multer');
const path = require('path');
const products = require('./products.js').products;
const app = express();
const PORT = 3000;

// Middleware to handle form data and file uploads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Function to find product details based on user selection
const findProduct = (productName) => {
    return products.find(product => product.product === productName);
};

// Route to render the index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle contact form submission
app.post('/submit-form', upload.single('attachment'), (req, res) => {
    const { name, email, phone, contactMethod, reason, customReason, message } = req.body;
    const attachment = req.file ? req.file.originalname : "No file uploaded";

    const contactDetails = contactMethod === "email" ? `your email at ${email}` : `your phone number at ${phone}`;
    const contactReason = reason === "Other" ? customReason : reason;

    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Submission Received</title>
            <link rel="stylesheet" href="/main.css">
        </head>
        <body>
            <header>
                <h1>Submission Received</h1>
            </header>
            <nav class="global-nav">
                <a href="/index.html">Home</a>
                <a href="/gallery.html">Gallery</a>
                <a href="/contact.html">Contact</a>
                <a href="/order.html">Order</a>
            </nav>
            <main>
                <section>
                    <h2>Thank you, ${name}!</h2>
                    <p>Hello ${name}, we have received your contact request. We see that you would like to be reached via ${contactMethod}, and the method you listed is ${contactDetails}. Finally, we see that you are reaching out regarding ${contactReason}.</p>
                    <p><strong>Message:</strong> ${message}</p>
                    <p><strong>File Attached:</strong> ${attachment}</p>
                </section>
            </main>
            <footer>
                <p>&#169; 2024 Daniel Spencer</p>
            </footer>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

// Route to handle order form submission
app.post('/submit-order', (req, res) => {
    const { name, email, address, product, quantity, instructions } = req.body;
    const selectedProduct = findProduct(product);
    
    if (!selectedProduct) {
        res.status(400).send("Invalid product selected.");
        return;
    }

    const companyName = selectedProduct.company;
    const unitPrice = selectedProduct.price;
    const totalCost = (unitPrice * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    const htmlResponse = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <link rel="stylesheet" href="/main.css">
        </head>
        <body>
            <header>
                <h1>Order Confirmation</h1>
            </header>
            <nav class="global-nav">
                <a href="/index.html">Home</a>
                <a href="/gallery.html">Gallery</a>
                <a href="/contact.html">Contact</a>
                <a href="/order.html">Order</a>
            </nav>
            <main>
                <section>
                    <h2>Thank you for your order, ${name}!</h2>
                    <p>You are purchasing ${quantity} ${selectedProduct.product} from ${companyName}. The price of one is ${unitPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} and the total price for this order is ${totalCost}.</p>
                    <p>Delivery will be sent to ${address} with these instructions: ${instructions || 'No special instructions provided.'}</p>
                </section>
            </main>
            <footer>
                <p>&#169; 2024 Daniel Spencer</p>
            </footer>
        </body>
        </html>
    `;

    res.send(htmlResponse);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
