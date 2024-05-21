import React, { Fragment, useContext}from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FlowerContext from '../../context/flower/flowerContext';
import AuthContext from '../../context/auth/authContext';

const Navbar = ( { title, icon }) => {
  const authContext = useContext(AuthContext);
  const flowerContext = useContext(FlowerContext);
  
  const {isAuthenticated, logout,user} = authContext;
  const {clearFlowers} = flowerContext;

  const onLogout = () => {
    logout();
    clearFlowers();
  }

  const authLinks = (
    <Fragment>
      <li>Hello { user && user.name }</li>
      <li>
        <a onClick={onLogout} href = "#!">
           <i className="fas fa-sign-out-alt"></i><span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
          <li>
            <Link to='/register'>Register</Link>
          </li> 
          <li>
            <Link to='/login'>Login</Link>
          </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-success'>
        <h1>
            <i className={icon}/>{title}
        </h1>
        <ul>
          {isAuthenticated ? authLinks :guestLinks}
        </ul>
    </div>
  )
}

Navbar.propTypes = {
    title : PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
    title: 'Miugi FlowerShop',
    icon:'fas fa-id-card-alt'
}

export default Navbar
