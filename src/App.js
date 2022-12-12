import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './constants/BASE_URL'
import { typePokemon } from './constants/type'
import { GlobalContext } from './contexts/GlobalContext'
import Router from './routes/Router'




const App = () => {
  const [pokedex,setPokedex] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [flow, setFlow] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [pokemon, setPokemon] = useState({})
  const [type1, setType1] = useState({})
  const [type2, setType2] = useState({})


  
  // const {isOpen,onOpen,onClose} = useDisclosure()

  const fromLocalStorage = () =>{
    const newPokedex = JSON.parse(window.localStorage.getItem("pokedex"))
    setPokedex(newPokedex)
  }

  const removePokedexFromLocalStorage = () =>{
    window.localStorage.removeItem("pokedex")
  }
  const fetchPokemonByName = async (pokemonName) => {
    try {
        setIsLoading(true)
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`)
        setPokemon(response.data)
        if (response.data.types[0]) {
            setType1(typePokemon[response.data.types[0].type.name])
            if (response.data.types[1]) {
              setType2(typePokemon[response.data.types[1].type.name])
              }
        }
        
        setIsLoading(false)

    } catch (error) {
        setIsLoading(false)
        console.log(error);
    }
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
    isLoading,
    setIsLoading,
    pokemon,
    setPokemon,
    type1,
    setType1,
    type2,
    setType2,
    removePokedexFromLocalStorage,
    fromLocalStorage,
    handleChangePokedex,
    fetchPokemonByName
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