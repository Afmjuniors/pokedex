import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import DeatailsPage from '../pages/Details/DeatailsPage'
import HomePage from '../pages/Home/HomePage'
import PageNotFound from '../pages/PageNotFound/PageNotFound'
import PokedexPage from '../pages/Pokedex/PokedexPage'
import TypesPage from '../pages/TypesPage/TypesPage'

const Router = () => {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="*" element={<PageNotFound />}/>
        <Route path="/" element={<HomePage />}/>
        <Route path="/page/:page" element={<HomePage />}/>
        <Route path="/pokedex" element={<PokedexPage/>}/>
        <Route path="/pokemon/:pokemonName" element={<DeatailsPage/>}/>
        <Route path="/tipo/:type" element={<TypesPage/>}/>
    </Routes>

   </BrowserRouter>
  )
}

export default Router