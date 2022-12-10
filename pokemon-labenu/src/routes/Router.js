import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import DeatailsPage from '../pages/Details/DeatailsPage'
import HomePage from '../pages/Home/HomePage'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import PokedexPage from '../pages/Pokedex/PokedexPage'

const Router = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="*" element={<PageNotFound />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/pokedex" element={<PokedexPage/>}/>
        <Route path="/pokemon/:pokemonID" element={<DeatailsPage/>}/>
    </Routes>

   </BrowserRouter>
  )
}

export default Router