import React from 'react';
import { Link } from 'react-router-dom';
const Popup = (props) => {
    return (
        <div>
            <div className='popup'>
                <h1>Super!</h1>
                <p>vous avez rajouté {props.id} cosmetiques a votre panier! </p>
                <Link to="/product">Retours aux achats</Link>
            </div>
        </div>
    );
}

export default Popup;
