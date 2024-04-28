import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { Fragment } from 'react';
import FlowerState from './context/flower/FlowerState';

const App = () =>{
  return (
    <FlowerState>
     <Router>
     <Fragment>
       <Navbar/>
       <div className='container'>
         <Routes>
           <Route path ='/' element={<Home/>}/>
           <Route path ='/about' element={<About/>}/>
         </Routes>
      </div>
     </Fragment>
     </Router>
    </FlowerState>
  );
}

export default App;
