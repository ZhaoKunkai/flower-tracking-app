import React from 'react';
import Flowers from '../Flowers/Flowers';
import FlowerForm from '../Flowers/FlowerForm';

const Home = () => {
  return (
    <div className='grid-2'>
       <div><FlowerForm/></div>
       <div><Flowers/></div>
    </div>
  )
}

export default Home;
