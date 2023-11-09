import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing page/Landing'
import Carousel from './components/Landing page/Carousel'



function App(){
  return (
  <div>
  <Navbar/>
  <Landing/>
  <Carousel/>
  </div>
)
}


export default App
