import React from 'react'
import all from "../assets/all2.jpg"
import newIn from "../assets/new.jpg"
import collab from "../assets/collab1.png"
const HomeProducts = () => {
  return (
    <div className='home-products-container'>
        <div className='home-products-grid'>
            <div className='home-product-grid-item'>
                <div className='home-product-grid-item__text'>
                    <p>NEW IN</p>
                    <p>SUMMER 2024</p>
                </div>
                <div className='home-product-grid-img-wrapper'>
                    <img src={newIn}/>
                </div>
            </div>
            <div className='home-product-grid-item'>
                 <div className='home-product-grid-item__text'>
                    <p>NAME x MODIFY</p>
                    <p></p>
                </div>
                <div className='home-product-grid-img-wrapper'>
                    <img src={collab}/>
                </div>
            </div>
            <div className='home-product-grid-item'>
                <div className='home-product-grid-item__text'>
                    <p>ALL</p>
                    <p></p>
                </div>
                <div className='home-product-grid-img-wrapper'>
                    <img src={all}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeProducts