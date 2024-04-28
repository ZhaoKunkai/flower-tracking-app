import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ( { title, icon }) => {
  return (
    <div className='navbar bg-success'>
        <h1>
            <i className={icon}/>{title}
        </h1>
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
