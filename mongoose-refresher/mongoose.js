const mongoose = require('mongoose');
const Product = require('./models/product');

const url =
  "mongodb://app:apppassword@localhost:27017/products_test?authSource=admin&readPreference=primary&ssl=false";
mongoose.connect(url).then(() => {
  console.log('Connect to database!');
}).catch(()=>{
  console.log('Connection failed');
});

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name, 
    price: req.body.price
  });
  const result = await createdProduct.save();
  res.json(res);
};

const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;