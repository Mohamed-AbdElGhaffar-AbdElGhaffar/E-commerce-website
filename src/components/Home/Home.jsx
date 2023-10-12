import React, { useContext } from 'react'
import style from '../Home/Home.module.css'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import {Helmet} from "react-helmet";

export default function Home() {
  return <>
    <MainSlider/>
    <CategorySlider/>
    <Products/>
    <Helmet>
      <title>home component</title>
    </Helmet>
  </>
}