import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
import PopularInMen from '../Components/Popular/PopularInMen'
import PopularInKids from '../Components/Popular/PopularInKids'

const Shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewsLetter/>
      <PopularInMen/>
      <PopularInKids/>
    </div>
  )
}

export default Shop
