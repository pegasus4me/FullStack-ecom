import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem('b4y-token')

export function addOneUser(datas){
    
    return axios.post(`${config.api_url}/api/v1/register`, datas)
    .then( res => res.data )
    .catch( err => err )
}

export function loginUser(datas){
    
    return axios.post(`${config.api_url}/api/v1/login`, datas)
    .then( res => res.data )
    .catch( err => err )
    
}

export function updateProfil(datas, id){
    return axios.put(`${config.api_url}/api/v1/modify/${id}`,datas, {headers: {"x-access-token" : token} })
    .then( res => res.data )
    .catch( err => err )
    
}

export function checkMyToken(){
    console.log("ddd",token)
    return axios.get(`${config.api_url}/api/v1/user/checkToken`, {headers: {"x-access-token" : token} })
    .then( res => res.data )
    .catch( err => err )
}