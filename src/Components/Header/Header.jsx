import React from 'react';
import './Header.css';
import {Link} from 'react-router-dom';

const Header = () => {

  return (
    <div className="app-header__container">
        <Link to="/"><h1 className="app_name">Cryptoverse</h1></Link>
    </div>
  )
}

export default Header;
