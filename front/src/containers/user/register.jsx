import React from 'react';
import '../../App.css'
import { useEffect, useState } from 'react';
import {addOneUser} from '../../api/users'
import {Navigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
const Register = (props) => {

    // *****
    const  [firstName, setFirstName] = useState("")
    const  [lastName, setLastName] = useState("")
    const  [email, setEmail] = useState("")
    const  [password, setPassword] = useState("")
    const  [address, setAddress] = useState("")
    const  [zip, setZip] = useState("")
    const  [city, setCity] = useState("")
    const  [phone, setPhone] = useState("")

    const [redirect, setRedirect] = useState(false)
    
    const submit = (e) => {
        e.preventDefault()

        let infos = {
            firstName :  firstName,
            lastName : lastName,
            email : email,
            password : password, 
            address : address,
            zip : zip, 
            city : city,
            phone : phone
        }
        addOneUser(infos)
        .then((res) => {
            console.log(res)
            if(res.code === 200){
                setRedirect(true)
            } else {
                console.log('UNE ERREUR ',res)
            }
        })
        .catch((err => console.log("SALUT",err)))

    }
    
    if(redirect){
        return <Navigate to="/login" />
    }

    return (
        <div className='container--global'>

            <div className='titlea'>
            <h1>Register</h1>
           </div>
           <section className='container'> 
            <form
            className='register-form'
            onSubmit={submit}
            >

                <p className='title'>firstname</p>
                <input type="text"
                
                placeholder='firstName' 
                onChange={(e) =>{
                    setFirstName(e.currentTarget.value)
                }}/>
                <p className='title'>lastName</p>
                <input type="text" 
                placeholder='lastname'
                onChange={(e) =>{
                    setLastName(e.currentTarget.value)
                }}
                 />
                <p className='title'>email</p>
                <input type="email" 
                placeholder="Email"
                onChange={(e) =>{
                    setEmail(e.currentTarget.value)
                }}
                />
                <p className='title'>password</p>
                <input type="password" 
                placeholder='password'
                onChange={(e) =>{
                    setPassword(e.currentTarget.value)
                }}
                />
                <p className='title'>adress</p>
                <input type="text"  
                placeholder='Address'
                onChange={(e) =>{
                    setAddress(e.currentTarget.value)
                }}
                />
                <p className='title'>zip</p>
                <input type="text"
                placeholder='postal code'
                onChange={(e) =>{
                    setZip(e.currentTarget.value)
                }}
                />
                <p className='title'>city</p>

                <input type="text" 
                placeholder='city'
                onChange={(e) =>{
                    setCity(e.currentTarget.value)
                }}
                />
                <p className='title'>phone number</p>

                <input type="text" 
                placeholder='phone number'
                onChange={(e) =>{
                    setPhone(e.currentTarget.value)
                }}
                />

                <p className='mem'>already a member? 🤠</p>
                <Link to='/login' className='log'>login</Link>

                <input type="submit" value="register" className='submit'/>


            </form>
            </section>
        </div>
    );
}

export default Register;
