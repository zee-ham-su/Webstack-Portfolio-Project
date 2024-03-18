const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

require('dotenv').config();

const connectDB = require('./mondb.js');
connectDB();


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/profile', authMiddleware.authenticateToken);
app.use('/api/update-profile', authMiddleware.authenticateToken);
app.use('/api/change-password', authMiddleware.authenticateToken);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/reviews', authMiddleware.authenticateToken);
app.use('/api/reviews', reviewRoutes)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('TechThread app listening on port 3000!');
});