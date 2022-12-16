import { Flex, Heading, Skeleton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/Card/Card'
import { GlobalContext } from '../../contexts/GlobalContext'

const PokedexPage = () => {
  const context = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {

  }, [])



  return (
    <Layout>
      <Heading color={"#ffffff"}>Meus Pokémons {context.pokedex.length > 0 ? `(${context.pokedex.length})` : " - Sem pokemons na pokédex"} </Heading>
      <Flex marginTop={"20px"} gap={"20px"} flexWrap={"wrap"}>
        {context.pokedex?.map((pokemon) =>
        (<Skeleton key={pokemon} isLoaded={!isLoading}>
          <Card pokemonName={pokemon} />
        </Skeleton>
        ))}
      </Flex>
    </Layout>
  )
}

export default PokedexPage