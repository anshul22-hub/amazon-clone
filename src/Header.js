import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from "./firebase";


function Header(){
    const [{ basket, user }, dispatch] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

  return (
    <div className='header'> 

        <Link to="/">
        <img 
          className="header_logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" 
        />
        </Link>

        <div
        className="header_search">
            <input className="header_searchInput" type="text"/>
            <SearchIcon className="header_searchIcon" />
        </div>

        <div className="header_nav">
            <Link to={!user && '/login'}>
                <div onClick={handleAuthentication} className='header_option'>
                    <span className='header_optionLineone'>
                       Hello {!user ? 'Guest' : user?.email}
                    </span>
                    <span className='header_optionLinetwo'>
                        {user ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>

            <div className='header_option'>
                <span className='header_optionLineone'>
                    Return
                </span>
                <span className='header_optionLinetwo'>
                    &Orders
                </span>
            </div>

            <div className='header_option'>
                <span className='header_optionLineone'>
                    Your
                </span>
                <span className='header_optionLinetwo'>
                    Prime
                </span>
                
            </div> 

            <Link to="/checkout">
                <div className="header_optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header__optionLineTwo header__basketCount">
                       {basket?.length}
                    </span>
                </div>
            </Link>

        </div>

    </div>
  )
}

export default Header

