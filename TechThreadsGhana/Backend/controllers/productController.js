const Product = require('../models/Product');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

const ProductController = {
    // Create or Update a product
    async createProduct(req, res) {
    try {
      upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error', err);
          return res.status(400).json({ msg: 'Error uploading file' });
        } else if (err) {
            console.error('Error uploading file', err);
          return res.status(500).json({ msg: 'Internal server error' });
        }

        console.log('File uploaded successfully');
        console.log('req.file:', req.file);
        console.log('req.body:', req.body);

        const { name, description, price, quantity } = req.body;
        const imagePath = req.file ? req.file.path : '../public/images/default.jpg';

        console.log('imagePath:', imagePath);

        const product = new Product({ name, description, price, quantity, image: imagePath });

        try {
          await product.save();
          console.log('Product saved successfully:', product);
          return res.status(201).json({ msg: 'Product created successfully', product });
        } catch (error) {
          console.error(error);
          console.error('Error saving product:', error);
          return res.status(500).json({ msg: 'Internal server error' });
        }
      });
    } catch (error) {
      console.error('upload error:', error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  },

    // Update product by ID
    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const { name, description, price, quantity } = req.body;

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }

            // Update product fields
            if (name) product.name = name;
            if (description) product.description = description;
            if (price) product.price = price;
            if (quantity) product.quantity = quantity;

            await product.save();

            return res.json({ msg: 'Product updated successfully', product });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

     // Get all products
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            return res.json(products);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },


    // Get product by ID
    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);           
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }
            return res.json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    },

    // Delete product by ID
    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ msg: 'Product not found' });
            }
            await product.deleteOne();
            return res.json({ msg: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
};
module.exports = { Product, ProductController };