import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GlobalContext } from './contexts/GlobalContext'
import Router from './routes/Router'




const App = () => {
  const [pokedex,setPokedex] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [flow, setFlow] = useState(1)
  // const {isOpen,onOpen,onClose} = useDisclosure()
  useEffect(()=>{
  },[])

  const fromLocalStorage = () =>{
    const newPokedex = JSON.parse(window.localStorage.getItem("pokedex"))
    setPokedex(newPokedex)
  }

  const removePokedexFromLocalStorage = () =>{
    window.localStorage.removeItem("pokedex")
  }


  const handleChangePokedex = (pokemon, type) =>{
    const pokemonIndex = pokedex.indexOf(pokemon)
    const newPokedex =[...pokedex]
    if(type === "remove"){
      newPokedex.splice(pokemonIndex,1)
      setPokedex(newPokedex)
    }else if(type==="add"){
      if(!pokedex.includes(pokemon)){
        newPokedex.push(pokemon)
      }}
    setPokedex(newPokedex)
    const pokexStrinfy = JSON.stringify(newPokedex)
    window.localStorage.setItem("pokedex",pokexStrinfy)
  }


  const context = {
    pokedex,
    setPokedex,
    isOpen,
    setIsOpen,
    flow,
    setFlow,
    removePokedexFromLocalStorage,
    fromLocalStorage,
    handleChangePokedex,
  }

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <Router/>
      </ChakraProvider>
    </GlobalContext.Provider>
    
  )
}

export default App