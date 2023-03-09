import { createSlice } from "@reduxjs/toolkit";

let basketls = window.localStorage.getItem('b4y-basket')

if(basketls === null) {
    basketls = []
}


function calculateAmount (basket) {
    let basketprice = 0
    for (let i = 0; i < basket.length; i++) {

        basketprice += parseInt(basket[i].quantityInCart) * parseFloat(basket[i].price) // verivier back
    }
    return basketprice
}

let totalPrice = calculateAmount(basketls)



let initialState = {
    basket : basketls,
    totalPrice : totalPrice
}

export const basketSlice = createSlice({

    name : "basket",
    initialState,
        reducers : {
            modifyBasket : (state, actions) => {
                let totalPrice = calculateAmount(actions.payload)
                state.basket = actions.payload
                state.totalPrice = totalPrice
            },
            cleanBasket : (state) => {
                state.basket = []
                state.totalPrice = 0
            }
        }
})


export const {modifyBasket, cleanBasket} = basketSlice.actions
export const selectBasket = (state) => state.basket
export default  basketSlice.reducer