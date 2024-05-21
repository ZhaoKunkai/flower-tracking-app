import React, {useEffect,useContext} from 'react';
import Flowers from '../Flowers/Flowers';
import FlowerForm from '../Flowers/FlowerForm';
import FlowerFilter from '../Flowers/FlowerFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(()=>{
    authContext.loadUser();
    // eslint-disable-next-line
  },[])
  return (
    <div className='grid-2'>
       <div>
          <FlowerForm/>
        </div>
       <div>
          <FlowerFilter/>
          <Flowers/>
        </div>
    </div>
  )
}

export default Home;
