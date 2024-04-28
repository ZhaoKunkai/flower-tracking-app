// idGenerator.js
const FlowerStock = require('../models/FlowerStock');
const Product = require('../models/Product');

async function generateId(identifier,flowerName) {
    if (identifier === 'p') {
        const products = await Product.find({});
        const productid =  products.length+1;
        id = `p${productid}`;
    } else if (identifier === 'f') {
        const flowers =await FlowerStock.find({})
        const flowerid = flowers.length+1;
        id = `f${flowerid}`;
    } else {
        throw new Error('Invalid identifier');
    }
    return id;
}

module.exports = generateId;