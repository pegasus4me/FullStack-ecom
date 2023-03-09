import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { updateProfil } from "../../api/users"
import {Navigate, useParams} from 'react-router-dom'


const Profil = (props)=>{
    const params = useParams()

    const  [firstName, setFirstName] = useState("")
    const  [lastName, setLastName] = useState("")
    const  [email, setEmail] = useState("")
    const  [password, setPassword] = useState("")
    const  [address, setAddress] = useState("")
    const  [zip, setZip] = useState("")
    const  [city, setCity] = useState("")
    const  [phone, setPhone] = useState("")

    const [redirect, setRedirect] = useState(false)

    const update = () => {

        const update = {
            firstName :  firstName,
            lastName : lastName,
            email : email,
            password : password, 
            address : address,
            zip : zip, 
            city : city,
            phone : phone
        }
        
        updateProfil(update, params)
    }

    if(redirect) {
        return <Navigate to="/" />
    }

    return (
        <section className='profile'>
       <form
            className='register-form'
            onSubmit={update}
            >


                <input type="text"
             
                onChange={(e) =>{
                    setFirstName(e.currentTarget.value)
                }}/>
                <input type="text" 
                placeholder='lastname'
                onChange={(e) =>{
                    setLastName(e.currentTarget.value)
                }}
                 />
                <input type="email" 
                onChange={(e) =>{
                    setEmail(e.currentTarget.value)
                }}
                />
                <input type="password" 
                onChange={(e) =>{
                    setPassword(e.currentTarget.value)
                }}
                />
                <input type="text"  
                onChange={(e) =>{
                    setAddress(e.currentTarget.value)
                }}
                />
                <input type="text"
                onChange={(e) =>{
                    setZip(e.currentTarget.value)
                }}
                />
                <input type="text" 
                onChange={(e) =>{
                    setCity(e.currentTarget.value)
                }}
                />
                <input type="text" 
                onChange={(e) =>{
                    setPhone(e.currentTarget.value)
                }}
                />

                <button>Update Profile</button>


            </form>
            
        </section>
    )
}

export default Profil