const mongoose = require('mongoose');

const FlowerStock = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    flowerName:{
        type:String,
        unique:false
    },
    flowerId: {
        type:String,
        unique:true
    },
    quantityInStock: {
        type:Number,
        default: 0
    }
});

module.exports = mongoose.model('flowerstock', FlowerStock);