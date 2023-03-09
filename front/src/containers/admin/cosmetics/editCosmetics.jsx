import React from 'react';
import { useState, useEffect } from 'react';
import { updateOneBeer } from '../../../api/cosmetics';
import { useDispatch, useSelector } from 'react-redux';
import { loadCosmetic } from '../../../slices/cosmeticSlices'
import { displayBeers } from '../../../api/cosmetics';
import axios from 'axios';
import { config } from '../../../config';
import { selectUser } from '../../../slices/userSlice';
import { takeOneBeer } from '../../../api/cosmetics';
const EditCosmetics = (props) => {

    const [name, setName] =  useState("")
    const [description, setDescription]  = useState("")
    const [photo, setPhoto] = useState(null)
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [oldPict, setOldPict] = useState(null)
    
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()

    let id = props.params.id
    
    const update = (datas) =>{
        updateOneBeer(datas, id)
            .then((res)=> {
                    if(res.code === 200) {
                        displayBeers()
                        .then((resultat)=> {
                            dispatch(loadCosmetic(resultat.result))
                        })
                        .catch(err => console.log(err))
                    }
            })
            .catch(err=>console.log(err))
        }   
    

    const  updateNewCosmetic = () => {
        if(photo === null){
            let datas = {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                photo: oldPict
            }
            update(datas)
        } else {
            let formData = new FormData()
            formData.append('image', photo)
            // ====================================================
            axios({
                method : 'put',
                url : `${config.pict_url}/api/v1/pic`,
                data: formData,
                headers : {
                    'content-type' : "multipart/form-data",
                    'x-access-token': user.infos.token
                }
            })
            .then((res)=> {

                if(res.data.code === 200){
                    
                    let datas = {
                        name: name,
                        description: description,
                        price: price,
                        quantity: quantity,
                        photo: res.data.url
                    }
                    update(datas)
                }
            })
        }
    }
    
    const Submit = ()  => {
        if(name === "" || description === "" || price === "" || quantity === ""){
            return (
                <h1>you can't leave the form empty</h1>
            )
        }
        updateNewCosmetic()
    }


    useEffect(() => {
        takeOneBeer(id)
        .then((res)=> {
            console.log('moi', res.result)
            setName(res.result.name)
            setDescription(res.result.description)
            setPrice(res.result.price)
            setOldPict(res.result.photo)
            setQuantity(res.result.quantity)
        })
    },[])
    return (
        <div className='add'>
            <h1>Update product : {id}</h1>
                <form onSubmit={Submit}>
                    <input type="text"
                    defaultValue={name}
                    placeholder='name'
                    onChange={(e)=> {
                        setName(e.currentTarget.value)
                    }} />
                    <input type="file" 
                    defaultValue={oldPict}
                    onChange={(e)=>{
                        setPhoto(e.currentTarget.files[0])
                    }}/>
                    <textarea cols="30" rows="10" 
                    defaultValue={description}
                    onChange={(e)=> {
                        setDescription(e.currentTarget.value)
                    }}></textarea>
                
                    <input type="text" 
                    defaultValue={quantity}
                    placeholder='quantity'
                    onChange={(e)=> {
                        setQuantity(e.currentTarget.value)
                    }} />
                    <input type="text"
                    defaultValue={price}
                     placeholder='price'
                    onChange={(e)=> {
                        setPrice(e.currentTarget.value)
                    }} />
                        <input type="button" value="submit new product" onClick={Submit} />
                </form>
        </div>
    );
    
}

export default EditCosmetics;
