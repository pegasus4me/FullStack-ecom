import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
//import des action qui chargera les bière venant dun back
import { selectUser, connectUser } from '../slices/userSlice'
import {Navigate, useParams} from 'react-router-dom'
import { checkMyToken } from '../api/users'
import { selectCosmetic, loadCosmetic } from '../slices/cosmeticSlices'
import { displayBeers } from '../api/cosmetics'

//HOC de controle des datas et de la sécurité
const RequireDataAuth = (props) =>{
    const params = useParams()
    const user = useSelector(selectUser)
    const cosmetic = useSelector(selectCosmetic)
    const dispatch = useDispatch()
    const Child = props.child
    const [redirect, setRedirect] = useState(false)
    
    useEffect(()=>{
        if(cosmetic.cosmetic.length === 0 ) {
            displayBeers()
            .then((res)=> {
                dispatch(loadCosmetic(res.result))
            })
            .catch((err) => console.log('erreur fetch display cos', err))
        }

            if(user.isLogged === false ){
                
                const token = window.localStorage.getItem('b4y-token')
                console.log('coucou')
                if(token === null && props.auth) {
                    
                    setRedirect(true)
                } else{
                    if(token !== null ) {
                        console.log("token", token)
                        checkMyToken()
                        .then((res) => {
                            
                            if(res.code !== 200) {
                                console.log("ddd",res)
                                if(props.auth) {
                                    setRedirect(true)
                                }
                            } else {
                                
                                let user = res.user
                                console.log("require", user)
                                user.token = token
                                 dispatch(connectUser(user))
                                
                            }
                        })
                        .catch((err) => console.log(err))
                    }
                    
                }
            }
       

    }, [props])
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (<Child {...props} params={params}/>)
}

export default RequireDataAuth