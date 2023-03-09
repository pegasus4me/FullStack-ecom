
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import {displayBeers} from '../api/cosmetics'
import ArticleDetail from '../components/articles-produit'
import { selectCosmetic } from '../slices/cosmeticSlices'
// import Banner from '../assets/img/banner.jpg'

const Product = (props) => {
    
    const products = useSelector(selectCosmetic)
    console.log(products)
    return (
        <section className='products'>
        <div className='title'>
                <h1>BEST SELLERS</h1>
        </div>
        
        {products.cosmetic.length > 0 && <ul className='produit-container'>
            {products.cosmetic.map((item)=> {
                return <ArticleDetail key={item.id} prod={item}/>
                
            })}
        
        </ul>} 
        </section>
    )
}
export default Product