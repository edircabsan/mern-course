const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb://app:apppassword@localhost:27017/products_test?authSource=admin&readPreference=primary&ssl=false";

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = await db.collection('products').insertOne(newProduct);
  } catch (error) {
    return res.json({message: 'Could not store data.'});
  }
  client.close();
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  let products;
  const client = new MongoClient(url);
  try{
    await client.connect();
    const db = client.db();
    products = await db.collection('products').find().toArray();
  }catch(error){
    return res.json({message: 'Could not retrieve data.'})
  }
  client.close();
  res.json(products);
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
