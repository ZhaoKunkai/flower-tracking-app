import React, { Fragment, useContext, useEffect } from 'react';
import FlowerItem from './FlowerItem';
import FlowerContext from '../../context/flower/flowerContext';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Flowers = () => {
  const flowerContext = useContext(FlowerContext);

  const { flowers, getFlowers, filtered, loading } = flowerContext;
  
  useEffect(()=>{
    getFlowers();
    //eslint-disable-next-line
  },[])

  if(flowers==null && !loading) {
    return <h4>Please add a Flower</h4>;
  }

  return (
    <Fragment> 
       {flowers && flowers!==null && !loading ? 
        (<TransitionGroup>
         {filtered && filtered !== null 
            ?   filtered.map(flower =>(
                 <CSSTransition key={flower._id} timeout={500} classNames='item'>
                  <FlowerItem flower = {flower}/>
                 </CSSTransition> 
                ))
            :   flowers.map(flower => (
                <CSSTransition key={flower._id} timeout={500} classNames='item'>
                 <FlowerItem flower = {flower}/>
                </CSSTransition> 
                ))
          }
        </TransitionGroup>)
          : <Spinner/>}
    </Fragment>
  )
}

export default Flowers;

/*{flowers !=null && !loading ? 
        <>
         {filtered !== null 
            ?   filtered.map(flower =>(
                  <FlowerItem flower = {flower}/>
                ))
            :   flowers.map(flower => (
                  <FlowerItem flower = {flower}/>
                ))
          }
        </>
          : <Spinner/>}*/ 