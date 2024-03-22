const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const connectDB = require('./mondb.js');
connectDB();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'Backend', 'public')));

// Fallback route to serve HTML files
// app.get('*', (req, res) => {
 // const requestedFile = req.params['0'];
  //res.sendFile(path.join(__dirname, '..', 'Frontend', 'public', requestedFile));
// }); //

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('TechThread app listening on port 3000!');
});
