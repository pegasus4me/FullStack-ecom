import React from 'react';
import Carousel from "framer-motion-carousel";
import '../App.css'
 import Img1  from "../assets/img/diapo2.jpeg"
 import Img2  from "../assets/img/diapo3.jpeg"
const Carrousel = () => {

    const colors = [Img1, Img2];
    console.log(colors)
    return (
        <div className='carrousel'>
            <Carousel>
            {colors.map((item, i) => (
                <div
                key={i}
               
                >
                    <img src={item} alt="" className='diapo' />
                </div>
            ))}
            </Carousel>
        </div>
    );
}

export default Carrousel;
