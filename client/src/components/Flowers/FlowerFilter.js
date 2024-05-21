import React, { useContext, useRef, useEffect } from 'react';
import FlowerContext from '../../context/flower/flowerContext';

const FlowerFilter = () => {
  const flowerContext = useContext(FlowerContext);
  const text = useRef();
  
  const { filterFlowers, clearFilter, filtered } = flowerContext;
  
  useEffect(() => {
     if (filtered ===null ) {
        text.current.value = '';
     }
  },[filtered])

  const onChange = e => {
    if(text.current.value !==""){
        filterFlowers(e.target.value);
    } else{
        clearFilter();
    }
  }
  return (
    <form>
        <input ref={text} type = "text" placeholder = "Filter Flowers..." onChange = {onChange}/>
    </form>
  )
}

export default FlowerFilter
