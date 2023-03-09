import React, { useState } from 'react';
import { config } from '../config';
import { Link } from 'react-router-dom';
import Popup from './popup'
const ArticlesProduit = (props) => {
    
    const [quantity, setQuantity] = useState("")
    const [error, setError] = useState(null)
    const [ispop, setPop] = useState(false)
    return (
        <div className='container-product'>
           
            <Link to={`/details/${props.prod.id}`}>
             
                <div>
                    <h3 className='title-product'>{props.prod.name}</h3>
                    <img src={config.pict_url + props.prod.photo}  />
                    <p className='desc'>{props.prod.description.substr(0,50)}</p>
                    <p>{props.prod.price} €</p>
                </div>
           </Link>
           
                <input type="text" className='input-product'
                value={quantity}
                onChange={(e) => {
                    setQuantity(e.currentTarget.value)
                }}
                />
                <div className='addToBasket'
                onClick={(e)=> {
                    e.preventDefault()
                }}
                >
                    cart
                </div>
  
        </div>
    );
}

export default ArticlesProduit;
