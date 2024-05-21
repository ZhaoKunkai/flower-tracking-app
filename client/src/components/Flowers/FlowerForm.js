import React, { useContext, useEffect, useState } from 'react';
import FlowerContext from '../../context/flower/flowerContext';

const FlowerForm = () => {
  const flowerContext = useContext(FlowerContext);
  
  const { addFlowers } = flowerContext;
  
  useEffect(()=>{
     SetFlower({
      flowerName:'',
      quantityToAdd:''
     })
  },[flowerContext])

  const onSubmit = () =>{
      if (flowerName!==null && quantityToAdd!==null){ addFlowers(flower);}
  }
  //去掉了e.preventDefault,因为在添加花卉的时候会出现先在flowerContext里的flower里面增加一个新的数组。
  //因为flowerId是通过IdGenerator生成的，可能会导致这个问题

  const [flower, SetFlower] = useState({
      flowerName:'',
      quantityToAdd:''
  })
  
  const { flowerName, quantityToAdd } = flower;
  
  const onChange = e =>{
    SetFlower({...flower, [e.target.name]:e.target.value})
  }
  //用state来存储和处理输入的数据

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
          Add new raw Flower
      </h2>
      <input
          type ='text'
          placeholder ='Flower Name'
          name ='flowerName'
          value = {flowerName}
          onChange={onChange}
      />
      <input
          type ='text'
          placeholder ='Quantity to Add'
          name ='quantityToAdd'
          value={quantityToAdd}
          onChange={onChange}
      />

      <div>
        <input
           type='submit'
           value='Add Flowers'
           className='btn btn-primary btn-block'/>
      </div>
      
    </form>
  )
}

export default FlowerForm;

//<button className='btn btn-light btn-block' onClick={onClick}>Add new raw flower</button>
//<button className='btn btn-danger btn-block' onClick={onClick}>Add new Product</button>
