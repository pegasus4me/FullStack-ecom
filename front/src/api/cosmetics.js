import axios from 'axios'
import {config} from '../config'
const token = window.localStorage.getItem('b4y-token')


export function displayBeers(){
    return axios.get(`${config.api_url}/api/v1/cosmetics`)
    .then(res  => res.data)
    .catch(err => err)
}

export function takeOneBeer(id){
    return axios.get(`${config.api_url}/api/v1/one/${id}`)
    .then(res  => res.data)
    .catch(err => err)
}

export function addOneBeer(datas){
    return axios.post(`${config.api_url}/api/v1/newCosmetic`, datas)
    .then(res  => res.data)
    .catch(err => err)
}

export function updateOneBeer(datas, id){
    return axios.put(`${config.api_url}/api/v1/modifyCos/${id}`, datas)
    .then(res  => res.data)
    .catch(err => err)
}

export function deleteOneBeer(id){
    return axios.delete(`${config.api_url}/api/v1/deleteCos/${id}`)
    .then(res  => res.data)
    .catch(err => err)
}