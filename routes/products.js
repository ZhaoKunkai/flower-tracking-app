const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const FlowerStock = require('../models/FlowerStock');
const generateId = require('../config/idGenerator');

//Add New Product
router.post('/', async(req,res)=> {
      try {
        const { productName, description, flowers } = req.body;
        const productId = await generateId('p');
        const newProduct = new Product({
            productId,
            productName,
            description,
            flowers
        });

        await newProduct.save();
        res.status(200).send(' New product added successfully ');
      } catch (err) {
        console.error(err.message);
        res.status(400).send(' Invalid request data ');
      }
});

// Retrieves current inventory levels for all types of flowers.
router.get('/',async(req,res)=>{
  try {
    const flowerStock = await FlowerStock.find({});
    res.json(flowerStock);
  } catch (err) {
    console.error(err.message);
        res.status(400).send(' Invalid request data ');
  }
})


module.exports = router;
