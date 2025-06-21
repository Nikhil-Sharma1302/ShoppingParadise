import React, { useEffect } from 'react';
import {useLogin} from "./LoginContext";
import {  useNavigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProductCarousel from './Components/ProductCarousel';
import AllProducts from './Components/AllProduct';
function Home() {
  let cart = useLogin();
  let go = useNavigate();
  useEffect(()=>{
    if(cart.user==null){
      go('/')
    } 
  },[cart.user,go])
  if(!cart.user) return null;
  return (
    <>
    <Navbar/>
    <ProductCarousel/>
    <AllProducts/>
    <Footer/>
    </>
  )
}

export default Home;