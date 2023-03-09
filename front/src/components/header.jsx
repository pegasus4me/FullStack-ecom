import React from 'react';
import '../App.css'
import { Link } from 'react-router-dom';
import Logo from '../assets/img/logo.svg'
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { selectBasket } from '../slices/basketSlice';
const Header = ({name}) => {

    const user = useSelector(selectUser)
    const basket = useSelector(selectBasket)
    console.log(user)
    return (
        <div className='navbar'>
            <img src={Logo} alt="logo" className='img'/>
            <div className='list1'>
                <Link to="/">Home</Link>
                <Link to="/product">products</Link>
            </div>  
            {user.isLogged === false ? <div className='list2'>
                <Link to="/register">register</Link>
                <Link to="/login">login</Link>         
                <Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/></Link>
            </div> : <div className='list2'>            
            {console.log(user)}
            {user.infos.role === "admin" && <Link to="/admin">Administration</Link> }
                <Link to="/logout">logout</Link>
                <Link to="/profile">{user.infos.firstName} {user.infos.lastName.toUpperCase()}</Link>
                <Link to="/cart"><FontAwesomeIcon icon={faCartShopping}/>{basket.basket.length > 0 && <span>{basket.basket.length}</span> }</Link>
            </div>}

        </div>
    );
}

export default Header;



