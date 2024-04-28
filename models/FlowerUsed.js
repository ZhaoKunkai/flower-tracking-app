const mongoose = require('mongoose');

const FlowerSchema = mongoose.Schema({
    productId:{
        type:String
    },
    flowerName:{
        type: String,
        unique:false
    },
    flowerId: { 
        type:String
    },
    quantityUsed: {
        type: Number
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('flowerused', FlowerSchema);