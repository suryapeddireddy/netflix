import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import { trending,popular,top_rated,upcoming } from '../Requests'
const Home = () => {
  return (
    <div>
     <Main/> 
     <Row title='Up Coming' fetchURL={upcoming}/>
     <Row title='Popular' fetchURL={popular}/>
     <Row title='Trending' fetchURL={trending}/>
     <Row title='Top rated' fetchURL={top_rated}/>
    </div>
  )
}

export default Home
