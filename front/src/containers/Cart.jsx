import React from 'react';
import { selectBasket, modifyBasket } from "../slices/basketSlice"
import {useSelector, useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'; 

const Basket = () => {

    const basket = useSelector(selectBasket)
    let obj= JSON.parse(basket.basket)
    console.log(obj.basket)
    return (
        <div className='cart-panier'>
        {basket.basket.length === 0 ?  <Link to='/product'>explorer nos produits</Link> : <div className='cart-content'>
        <table className='table'>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {obj.basket.map((item) => {
                        return <tr key={item.id}>
                            <td>{item.quantityInCart}</td>
                            <td>{item.name}</td>
                            <td>{item.price} €</td>
                        </tr>
                    })}
                </tbody>
        </table>

        </div>}
        </div>
    );
}

export default Basket;
