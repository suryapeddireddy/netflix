import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import Footer from '../components/Footer'
import { trending,popular,top_rated,upcoming } from '../Requests'
import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <div>
     <Navbar/>
     <Main/> 
     <Row title='Up Coming' fetchURL={upcoming}/>
     <Row title='Popular' fetchURL={popular}/>
     <Row title='Trending' fetchURL={trending}/>
     <Row title='Top rated' fetchURL={top_rated}/>
     <Footer/>
    </div>
  )
}

export default Home
