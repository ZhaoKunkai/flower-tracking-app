import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React, { Fragment } from 'react';
import FlowerState from './context/flower/FlowerState';
import AuthState from './context/auth/AuthState';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import setAuthToken from './utils/setAuthToken';
import PrivateRoutes from './components/routing/PrivateRoutes';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{
  return (
    <AuthState>
       <FlowerState>
        <AlertState>
         <Router>
           <Fragment>
             <Navbar/>
               <div className='container'>
                <Alerts/>
                 <Routes>
                  <Route path ='/' element={<PrivateRoutes redirect="/login" element={<Home />} />}/>
                  <Route path ='/about' element={<About/>}/>
                  <Route path ='/register' element={<Register/>}/>
                  <Route path ='/login' element={<Login/>}/>
                 </Routes>
                </div>
           </Fragment>
         </Router>
        </AlertState>
       </FlowerState>
    </AuthState>
  );
}

export default App;
