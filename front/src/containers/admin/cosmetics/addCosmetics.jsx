import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneBeer } from '../../../api/cosmetics';
import axios from 'axios';
import {selectUser} from "../../../slices/userSlice"
import { loadCosmetic } from '../../../slices/cosmeticSlices'
import { displayBeers } from '../../../api/cosmetics';
import { config } from '../../../config';
import { Navigate } from 'react-router-dom';
const AddCosmetics = () => {

    
    // ***************  STATES   ************
    const [name, setName] =  useState("")
    const [description, setDescription]  = useState("")
    const [photo, setPhoto] = useState(null)
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [redirect, setRedirect] = useState(false)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    // **********
    // function add un Produit
    const addProd = (datas) => {
        addOneBeer(datas)
        .then((res) => {
            if(res.code === 200) {
                displayBeers()
                .then((resa)=> {
                    dispatch(loadCosmetic(resa.result))
                })
                .catch( err=> console.log(err))
            }
        }) 
        .catch((err)=>console.log(err))
    }   
    // function sauvegarde d'un produit

    // ******* LOGIQUE AJOUT NOUVEAU PRODUIT A MA LISTE DE PRODUITS
    const saveNewCosmetic= ()  => {
        // si l'user n'ajoute pas d'image on crée l'objet data avec la photo par defaut (no pic)
       
        if(photo === null){
            
            let datas = {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                photo: "no-pict.jpg"
            }
            addProd(datas)
        } else {
            // 1- on dois sauvegardé la photo que le user a chois dans le back
            // ********* SAUVVEGARDE PHOT****************
            let formData = new FormData()
            formData.append('image', photo)
            
            axios({
                method: "post",
                url : `${config.pict_url}/api/v1/pic`,
                data : formData,
                headers :  {
                    'content-type' :  'multipart/form-data',
                    'x-access-token': user.infos.token
                }
                
            })
            // *********************************************
            .then((res)=> {
                // on sauvegarde les infos dans le then de notre axios et on le
                // passe en parametre a addProd()
                if(res.data.code === 200) {

                    let datas= {
                        name: name,
                        description: description,
                        price: price,
                        quantity: quantity,
                        photo: res.data.url
                    }
                    
                    addProd(datas)
                }
            })
            .catch(err =>  console.log(err))
          
        }
    }
    // function envoi formulaire
    const submit = (e)  => {
        e.preventDefault()
        // verifier que tout les champs on eté remplis sinon on renvoi un message d"erreur
        if(name === "" || description === "" || price === "" || quantity === ""){
            return (
                <h1>the form is not complete</h1>
            )
        } else {
            saveNewCosmetic()
        }
    }
   
    return (
        <div className='add'>
            <h1>add a new Product</h1>
                <form onSubmit={submit}>
                    <input type="text"
                    placeholder='name'
                    onChange={(e)=> {
                        setName(e.currentTarget.value)
                    }} />
                    <input type="file" 

                    onChange={(e)=>{
                        setPhoto(e.currentTarget.files[0])
                    }}/>
                    <textarea cols="30" rows="10" onChange={(e)=> {
                        setDescription(e.currentTarget.value)
                    }}></textarea>
                
                    <input type="text" 
                    placeholder='quantity'
                    onChange={(e)=> {
                        setQuantity(e.currentTarget.value)
                    }} />
                    <input type="text"
                     placeholder='price'
                    onChange={(e)=> {
                        setPrice(e.currentTarget.value)
                    }} />
                        <input type="button" value="submit new product" onClick={submit} />
                </form>
        </div>
    );
}

export default AddCosmetics;
