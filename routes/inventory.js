const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { ObjectId } = require('mongodb');
const FlowerStock = require('../models/FlowerStock');
//const generateId = require('../config/idGenerator');
const { validationResult, check } = require('express-validator');


//Add new flower to the inventory
router.post('/', auth, async (req, res)=> {
   try {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
      }

      const { flowerName, quantityToAdd } = req.body;
      const flower = await FlowerStock.findOne ({ flowerName, user:req.user.id });

      if (!flower ) {
        //const flowerId = await generateId('f');

        const flowerNew = new FlowerStock({
            flowerName,
            flowerId: new ObjectId(),
            quantityInStock:quantityToAdd,
            user:req.user.id
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
router.get('/', auth,async (req, res) => {
  try {
     const flowers = await FlowerStock.find({user:req.user.id});

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
router.delete('/:id', auth, async(req,res)=>{
  try {
       let flower = await FlowerStock.findById(req.params.id)
       
       if(!flower) return res.status(404).json({msg:'Flower Not Found'});
       if(flower.user.toString() !== req.user.id){
        return res.status(401).json({ msg:'Not authorized' });
       }
       await FlowerStock.findByIdAndDelete(req.params.id);

       res.json({ msg:'Flower removed'});
  } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error')
  }
})

module.exports = router;