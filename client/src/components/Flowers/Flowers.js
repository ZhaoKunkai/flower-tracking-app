import React, { Fragment, useContext, useEffect } from 'react';
import FlowerItem from './FlowerItem';
import FlowerContext from '../../context/flower/flowerContext';

const Flowers = () => {
  const flowerContext = useContext(FlowerContext);

  const { flowers, getFlowers } = flowerContext;
  
  useEffect(()=>{
    getFlowers();
    //eslint-disable-next-line
  },[])

  if(flowers !== null && flowers.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment> 
       {flowers != null && flowers.map(flower => (
         flower && // 检查 flower 是否为 undefined
         <div key={flower.flowerId} timeout={500} className='item'>
           <FlowerItem flower={flower} />
         </div>
       ))}
    </Fragment>
  )
}

export default Flowers;
