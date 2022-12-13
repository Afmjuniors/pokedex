import { Box, Button, ButtonGroup, Flex, Heading, Image, Link, Skeleton, Stack, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/Card/Card'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { goToHomePage } from '../../routes/coordinator'
import { GlobalContext } from '../../contexts/GlobalContext'

const PokedexPage = () => {
  const context = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()  

  useEffect(() => {
   
  }, [])



  return (
    <Layout>
      <Heading color={"#ffffff"}>Meus Pokémons</Heading>
      <Flex marginTop={"20px"} gap={"20px"} flexWrap={"wrap"}>       
        {context.pokedex.map((pokemon)=>
       ( <Skeleton key={pokemon} isLoaded={!isLoading}>
         <Card  pokemonName={pokemon} />
         </Skeleton>
         ))}
      </Flex>
    </Layout>
  )
}

export default PokedexPage