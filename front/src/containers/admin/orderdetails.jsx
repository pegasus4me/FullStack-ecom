import React from 'react';
import { Navigate } from 'react-router-dom';
import { getOneOrder } from '../../api/orders';
import { useState, useEffect } from 'react';
import moment from 'moment'
import faPhone from '@fortawesome/free-solid-svg-icons'
import '../../App.css'
const Orderdetails = (props) => {

    let id = props.params.id
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState([])
    const [order, setOrder] = useState([])
    const showData = (id) => {
        
        getOneOrder(id)
        .then((res)=>{
           
                setUser(res.user)
                setOrder(res.order)
                setLoad(false)
           
           
        })
        .catch((err)=>console.log(err))

    }
    
    useEffect(()=> {
        showData(id)
    },[])
    
 
    
    const  {creationTimestamp, status, totalAmount, user_id} = order
    const {address, city, firstName, lastName, phone, zip} = user
    return (
        <div>
           
            <div className='orderdetails'>
                <h1 className='detail'> orders details</h1>
              <table className='infos'>
                <thead className='a'>
                    <tr className='b'>
                        <th>order date</th>
                        <th>status</th>
                        <th>totalAmount</th>
                        <th>order ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{moment(creationTimestamp).format('DD-MM-YY')}</th>
                       {status === 'not payed' ? <p className='not-payed'>{status}</p>:
                       <p className='payed'>{status}</p>}
                        <th>{totalAmount}</th>
                        <th>{id}</th>
                    </tr>
                </tbody>
              </table>
            
            </div>
            <div className='user-details'>
                <h2>user details</h2>
                <p> delivery adress : {address}</p>
                <p> city : {city}</p>
                <p>zip : {zip}</p>
                <p>firstName : {firstName}</p>
                <p>lastName : {lastName}</p>
                <p>phone : {phone}</p>
            </div>
        </div>
    );
}

export default Orderdetails;
