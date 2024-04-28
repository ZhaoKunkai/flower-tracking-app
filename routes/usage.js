const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const FlowerStock = require('../models/FlowerStock');
const FlowerUsed = require('../models/FlowerUsed');

router.post('/', async (req,res) => {
   try {
        const { productId } = req.body;
        const flower = await Product.findOne({ productId: productId });
        if (!flower) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const { flowers } = flower;//这返回一个数组，数组的每一个元素都包含了flowerId，quantityRequired，_id这三个key value pair
        
        for (let i = 0; i < flowers.length; i++) {
            const flowerinstock = await FlowerStock.findOne({ flowerId:flowers[i].flowerId });
            
            const flowerUsed = new FlowerUsed({
                productId:productId,
                flowerName:flowerinstock.flowerName,
                flowerId:flowers[i].flowerId,
                quantityUsed:flowers[i].quantityRequired,
                date:new Date
            });
            await flowerUsed.save();
            
            flowerinstock.quantityInStock -= flowerUsed.quantityUsed;
            await flowerinstock.save();
            //会保存到原来的document而不是新建一个document再保存，如果像前面的const flowerUsed = new FlowerUsed 则会新建一条document，save的也会是新的document，不会覆盖原来的
        }
    
        res.json({ message: 'Flowers used saved successfully' });
        
    } catch (err) {
        console.error(err.message);
        res.status(400).send(' Invalid request data ');
    }
}
)

module.exports = router;
//每一个models中的js文件都对应了mongoDB中的一个collections，collections的名字是由module.exports = mongoose.model('product', ProductSchema);中的'product'定义的。
//在调试程序的时候可以一步一步调试阶段性结果，可以更容易找出问题所在
