import React from 'react'
import HomeCollection from '../components/HomeCollection'
import HomeProducts from '../components/HomeProducts'

const Home = () => {
  return (
    <div className='home-container'>
        <HomeCollection />
        <HomeProducts />
    </div>
  )
}

export default Home