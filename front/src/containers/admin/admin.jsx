import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectCosmetic , loadCosmetic} from "../../slices/cosmeticSlices"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import { deleteOneBeer } from '../../api/cosmetics';
import { displayBeers } from '../../api/cosmetics';
import { getAllOrders } from '../../api/orders'
import moment from 'moment'


const Admin = () => {

    const  cosmetic = useSelector(selectCosmetic)
    const dispatch = useDispatch()
    const [products, setProducts] = useState([])

    const deleteOne = (id) => {
        deleteOneBeer(id)
        .then((res) => {
            console.log(res)
            displayBeers()
            .then((response)=> {
                console.log("ok", response)
                dispatch(loadCosmetic(response.result))
            })
                .catch((err)=> console.log('error', err))
        })
        .catch((err) => console.log("error occured", err))
    }
    
    useEffect(() => {
        
        getAllOrders()
        .then((res)  => {
           
            setProducts(res.result)
        })
        .catch((err)  => console.log(err))

    },[])

    return (
        <section>
        <div>
            <h1>Admin</h1>
            <Link to='/addcosmetics'>List a new Cosmetic</Link>

            <table>
                <thead>
                    <th>image</th>
                    <th>name</th>
                    <th>actions</th>
                </thead>

                <tbody>
                    {cosmetic.cosmetic.length > 0 ? cosmetic.cosmetic.map((i) => {
                        return <tr key="i.id">
                            <td><img src={config.pict_url + i.photo } alt="" /></td>
                            <td>{i.name}</td>
                            <td><Link to={`/editcosmetics/${i.id}`}>update</Link>
                            <button onClick={(e) => {
                                e.preventDefault()
                                deleteOne(i.id)
                            }}>remove</button>
                            </td>
                        </tr>
                    }) : <tr>
                        <td colSpan="3"></td>
                        </tr>}
                </tbody>
            </table>
        </div>
        <hr/>
        <article>
            <h3>orders</h3>
            <div>
                <h4>Waiting for payment</h4>
                <table>
                    <thead>
                        <tr>
                            <th>order number</th>
                            <th>total price</th>
                            <th>Confirmation date</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? products.map((p) => {
                            if(p.status === "not payed" || p.status === "cancelled"){
                                return <tr key={p.id}>
                                    <td><Link to={`/orderdetails/${p.id}`}>orders details</Link></td>
                                    <td>{p.totalAmount}</td>
                                    <td>{moment(p.creationTimestamp).format('DD-MM-YYY')}</td>
                                    <td>{p.status}</td>
                                </tr>
                            }
                        }): <tr>
                            <td colSpan="3"></td>
                            </tr>}
                    </tbody>
                </table>
            </div>
            <div>
                <h4>orders in progress</h4>
                <table>
                    <thead>
                        <th>order number</th>
                        <th>total Price</th>
                        <th>Confirmation date</th>
                        <th>status</th>
                    </thead>

                    <tbody>
                        {products.length > 0 ? products.map((p) =>  {
                            if(p.status === "payed"){
                                
                                return <tr key={p.id}>
                                    <td><Link to={`/orderdetails/${p.id}`}>order details</Link></td>
                                    <td>{p.totalAmount}</td>
                                    <td>{moment(p.creationTimestamp).format('DD-MM-YYY')}</td>
                                    <td>{p.status}</td>
                                </tr>
                            }
                        }): <tr>
                            <td colspan="3"></td>
                        </tr>}
                        
                    </tbody>
                </table>
            </div>
            <div>
                <h4>finish</h4>
                <table>
                    <thead>
                         <th>Numéro</th>
                         <th>Prix total</th>
                         <th>Date de confirmation</th>
                         <th>Etat</th>
                    </thead>
                    <tbody>
                        {products.length  > 0 ? products.map((p) =>  {
                            if( p.status === "finish"){
                                return <tr key={p.id}>
                                    <td><Link to={`/orderdetails/${p.id}`}>order details</Link></td>
                                    <td>{p.totalAmount}</td>
                                    <td>{moment(p.creationTimestamp).format('DD-MM-YYY')}</td>
                                    <td>{p.status}</td>
                                </tr>
                            }
                        }) : <tr>
                            <td colspan="3"></td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </article>
        </section>
    );
}

export default Admin;
