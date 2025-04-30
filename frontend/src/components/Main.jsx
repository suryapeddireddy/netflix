import React from 'react'
import { useState,useEffect } from 'react';
import {popular,top_rated,upcoming, trending} from '../Requests'
import axios from 'axios'
const Main = () => {
const [movies, setmovies] = useState([]);
const [currentmovie, setcurrentmovie] = useState(''); // Initialize as an empty string
useEffect(() => {
const getcurrentmovie=async()=>{
try {
const res=await axios.get(popular);
setmovies(res.data.results);
// Set currentmovie only if movies array has data
if (res.data.results && res.data.results.length > 0) {
  setcurrentmovie(`https://image.tmdb.org/t/p/original/${res.data.results[Math.floor(Math.random()*res.data.results.length)].backdrop_path}`);
}
console.log(currentmovie);
} catch (error) {
console.log(error);
}
}
getcurrentmovie();
}, [])

return(
<div className="w-full h-[500px]">
<div className='w-full h-full'>
  <img src={currentmovie} alt="current" className="w-full h-full object-cover"></img>
</div>
</div>
)
}

export default Main