import React from 'react';
import { useState, useEffect } from 'react';
import { takeOneBeer } from '../api/cosmetics'
import { config } from '../config';
import { Link, Navigate, useParams } from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'
import { selectBasket, modifyBasket } from "../slices/basketSlice"
import Popup from '../components/popup'


const Details = (props) => {
    
    const [quantity, setQuantity] = useState("")
    const [cosmetics, setCosmetics] = useState(null)
    const [error, setError] = useState(null)
    const [isPopUp, setPopUp] = useState(false)
    // ************************************
    const [total , setTotal] = useState(0)
    const mybasket = useSelector(selectBasket)
    const dispatch = useDispatch()
    const id = props.params.id
    
    useEffect(()=> {
        takeOneBeer(id)
        .then((res) => {
            setCosmetics(res.result)
        })
        .catch((err) => console.log("ERREUR",err))
    },[])


    // *** AJOUTER UN PRODUIT AU PANIER *********************************************
    const onClickBasket = (oldBasket, newProduct) =>{
        let myquantity;
        if(quantity === ""){
            myquantity += 1
        } else  {
            myquantity = quantity
        }

        let newBasket  = JSON.parse(JSON.stringify(oldBasket))
        let find = newBasket.basket.findIndex((b) => b.id === newProduct.id) 

        if(find === -1) {
            let newP = JSON.parse(JSON.stringify(newProduct))
            
            newP.quantityInCart = parseInt(myquantity)
            let push = [...newBasket.basket, newP]
            
            window.localStorage.setItem('b4y-basket', JSON.stringify(push))
            
            dispatch(modifyBasket(push))
        } else {

            newBasket.basket[find].quantityInCart += parseInt(myquantity)
            window.localStorage.setItem('b4y-basket', JSON.stringify(newBasket))

            dispatch(modifyBasket(newBasket.basket))
        } 

        setPopUp(true)

    }
  
    console.log(mybasket)
    return (
        <div className='page-produit'>
            {/* affichage */}
            {isPopUp && < Popup id={quantity}/> }
            <sub>product n : {props.params.id}</sub>
            {cosmetics !== null && <div className='details-container'>
                
                <img src={config.pict_url + cosmetics.photo} />
                <h3 className='title-details'>{cosmetics.name}</h3>
                <p>{cosmetics.description}</p>
                <p>{cosmetics.price} €</p>
                <form className='addtoCart'>
                    <input type="text" onChange={(e) => {
                        setQuantity(e.currentTarget.value)
                    }} />

                    <button className='add' onClick={(e) => {
                        e.preventDefault()
                    onClickBasket(mybasket,cosmetics)              

                    }}>addToCart</button>
                 
                </form>
            </div> }
           
        </div>
    );
}

export default Details;


