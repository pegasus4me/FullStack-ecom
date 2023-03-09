import React from 'react';
import { useState } from 'react';
import { loginUser } from '../../api/users';
import { Navigate } from 'react-router-dom';

const Login = () => {
    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [redirect, setRedirect] = useState(false)
    const send = (e) =>  {
        e.preventDefault()

        let user = {
            password : password,
            email : email
        }
        console.log(user)
        loginUser(user)
        .then((res)=> {
            if(res.code === 200) {
                console.log(res)
                window.localStorage.setItem('b4y-token', res.msg)
                setRedirect(true)
            } else {
                
            }
        })
        .catch((err) => console.log("erreur", err))
    }
    
    if(redirect) {
        return  <Navigate to="/" />
    }

    return (
        <div className='login'>
            
           
           
            <form
            className='login-form'
            onSubmit={send}>

                <input type="email" 
                placeholder="Email"
                onChange={(e) =>{
                    setEmail(e.currentTarget.value)
                }}
                />
                <input type="password" 
                placeholder='password'
                onChange={(e) =>{
                    setPassword(e.currentTarget.value)
                }}
                />

            <input type="submit" value="welcome back" className='submit'/>
            </form>
        </div>
    );
}

export default Login;
