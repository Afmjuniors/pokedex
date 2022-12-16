

import { Box, Flex, Heading, Skeleton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/Card/Card'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../../contexts/GlobalContext'
import TypeModal from '../../components/modal/TypeModal'

const TypesPage = () => {
  const { pokedex } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])

  const params = useParams()

  useEffect(() => {
    fetchPokemons()
  }, [params])

  const fetchPokemons = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/type/${params.type}`)
      setPokemons(response.data.pokemon)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }


  return (
    <Layout>
      <Flex justifyContent={"space-between"}>
        <Heading color={"#ffffff"}>Pokemons do tipo <span>{params.type} ({pokemons.length})</span></Heading>
        {TypeModal()}
      </Flex>

      <Flex marginTop={"20px"} gap={"20px"} flexWrap={"wrap"}>
        {isLoading ||
          pokemons.map((pokemon) =>
          (<Skeleton key={pokemon.pokemon.name} isLoaded={!isLoading}>
            <Box filter={"auto"} brightness={pokedex.includes(pokemon.pokemon.name) ? '40%' : '100%'}>
              <Card pokemonName={pokemon.pokemon.name} />
            </Box>
          </Skeleton>)
          )}
      </Flex>

    </Layout>
  )
}

export default TypesPage