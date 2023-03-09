import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../slices/userSlice';
import { Navigate } from 'react-router-dom';



const Logout = () => {

    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        dispatch(logoutUser())
        window.localStorage.removeItem('b4y-token')
        setRedirect(true)
    },[])
    if(redirect) {
        return <Navigate to="/login" />
    }
    return (
        <div>
            h1dodo
        </div>
    );
}

export default Logout;
