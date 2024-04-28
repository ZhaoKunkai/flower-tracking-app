const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const FlowerStock = require('../models/FlowerStock');
//const generateId = require('../config/idGenerator');


//Add new flower to the inventory
router.post('/', async (req, res)=> {
   try {
      const { flowerName, quantityToAdd } = req.body;
      const flower = await FlowerStock.findOne ({ flowerName });

      if (!flower) {
        //const flowerId = await generateId('f');

        const flowerNew = new FlowerStock({
            flowerName,
            flowerId: new ObjectId(),
            quantityInStock:quantityToAdd
        })
        await flowerNew.save();
        return res.status(200).json( { flowerNew });
     };

      if (flower.flowerName === flowerName) {
        flower.quantityInStock += parseInt(quantityToAdd); //保证数据类型的一致，否则容易被当作字符串相加
        await flower.save();//这里会直接覆盖原来document里的数据，因为这是通过find找到的，而不是new新建的
        return res.status(200).json( { flower });
      }  else {
        return res.status(400).json({ error: 'Invalid flower name' });
      };
   } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: 'Invalid request data' });
   };
});

//得到所有现存的花卉
router.get('/', async (req, res) => {
  try {
     const flowers = await FlowerStock.find({});

     if (flowers.length === 0) {
       return res.status(404).json({ error: 'No flowers found' });
     }

     res.status(200).json(flowers);
   } catch (err) {
       console.error(err.message);
       res.status(500).json({ error: 'Server error' });
   }
});

//DeleteFlower
router.delete('/:flowerId', async(req,res)=>{
  try {
       let flower = FlowerStock.findOne({flowerId:req.params.flowerId})

       if(!flower) return res.status(404).json({msg:'Flower Not Found'});

       await FlowerStock.findOneAndDelete({flowerId:req.params.flowerId});

       res.json({ msg:'Flower removed'});
  } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
  }
})

module.exports = router;