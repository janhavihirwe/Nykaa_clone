import React from 'react'
import Navbar from './Navbar'
import Subnavbar from './Subnavbar'
import Slider from 'react-slick'
import SliderComponent from './Slider'

function Home() {
  return (
    <div>
        <Navbar/>
        <Subnavbar/>
        <SliderComponent/>
    </div>
  )
}

export default Home