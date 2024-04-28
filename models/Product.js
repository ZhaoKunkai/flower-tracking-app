const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productId:String,
    productName:String,
    description:String,
    flowers:[{
       flowerId:String,
       quantityRequired:Number
    }]
});

module.exports = mongoose.model('product', ProductSchema);