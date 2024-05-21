import React, { useContext } from 'react';
import FlowerContext from '../../context/flower/flowerContext';
import PropTypes from 'prop-types';

const FlowerItem = ({ flower }) => {
//接受FlowerContext里flowers中的每个flower对象
  const flowerContext = useContext(FlowerContext);
  
  const { deleteFlower, clearCurrent } = flowerContext;

  const { flowerName, flowerId , quantityInStock, _id} = flower;
  
  const onDelete = () =>{
    deleteFlower(_id);
    clearCurrent();
    //window.location.reload()
  }

  return (
    <div className='card bg-light'>
        <h3 className='text-primary text-left'>
            {flowerName}{''}<span style={{float:'right'}} 
               className='badge badge-success'></span>
        </h3>
        <ul className='list'>
           <li><strong>FlowerId: </strong>{flowerId}</li>
           <li><strong>QuantityInStock: </strong>{quantityInStock}</li>
        </ul>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>Delete</button>
    </div>
  )
}

FlowerItem.propTypes = {
  flower:PropTypes.object.isRequired
}

export default FlowerItem;
