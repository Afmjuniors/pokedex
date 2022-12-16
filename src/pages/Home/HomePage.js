import { Box, Button, ButtonGroup, Flex, Heading, Skeleton } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import Card from '../../components/Card/Card'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { useNavigate, useParams } from 'react-router-dom'
import { goToHomeTurnPage } from '../../routes/coordinator'
import { GlobalContext } from '../../contexts/GlobalContext'
import TypeModal from '../../components/modal/TypeModal'

const HomePage = () => {
  const { pokedex } = useContext(GlobalContext)
  const [isLoading, setIsLoading] = useState(false)
  const [pokemons, setPokemons] = useState([])
  const [numbMin, setNumbMin] = useState(0)
  const [perPage, setPerPage] = useState(21)
  const [lastPage, setLastPage] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const navigate = useNavigate()
  const params = useParams()
  const [numberPokemon, setNumberPokemons] = useState('')



  const handlePageTurn = (value) => {
    if (value === 0) {
      setPageNumber(1)
      setNumbMin(0)
      goToHomeTurnPage(navigate, 1)
    } else if (value === lastPage) {
      setPageNumber(lastPage)
      setNumbMin((lastPage - 1) * perPage)
      goToHomeTurnPage(navigate, lastPage)
    } else {
      setPageNumber((pageNumber + value))
      setNumbMin(((pageNumber + value) - 1) * perPage)
      goToHomeTurnPage(navigate, pageNumber + value)
    }

  }

  useEffect(() => {
    if (params.page) {
      setNumbMin(Number(params.page) * perPage)
      setPageNumber(Number(params.page))
    }
  }, [])

  useEffect(() => {
    fetchPokemons()
  }, [pageNumber])

  const fetchPokemons = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${BASE_URL}/pokemon?offset=${numbMin}&limit=${perPage}`)
      setLastPage(Math.ceil(response.data.count / perPage))
      setNumberPokemons(response.data.count)
      setPokemons(response.data.results)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <Layout>
      <Flex justifyContent={"space-between"}>
        <Heading color={"#ffffff"}>
          Todos os Pokémons <span>{params.type} ({numberPokemon})</span>
        </Heading>
        {TypeModal()}
      </Flex>
      <Flex marginTop={"20px"} gap={"20px"} flexWrap={"wrap"}>
        {isLoading ||
          pokemons

            .map((pokemon) =>

            (<Skeleton key={pokemon.name} isLoaded={!isLoading}>
              <Box filter={"auto"} brightness={pokedex.includes(pokemon.name) ? '40%' : '100%'}>
                <Card pokemonName={pokemon.name} />
              </Box>
            </Skeleton>)
            )}
      </Flex>
      <ButtonGroup marginTop={"32px"}>
        {
          pageNumber !== 1 &&
          <Button onClick={() => handlePageTurn(0)} colorScheme='whiteAlpha'>Primeira Pagina</Button>
        }{pageNumber - 2 > 0 && <Button onClick={() => handlePageTurn(-2)} colorScheme='whiteAlpha'>{pageNumber - 2}</Button>
        }{pageNumber - 1 > 0 && <Button onClick={() => handlePageTurn(-1)} colorScheme='whiteAlpha'>{pageNumber - 1}</Button>}
        <Button colorScheme='blackAlpha'>{pageNumber}</Button>
        {pageNumber + 1 < lastPage && <Button onClick={() => handlePageTurn(1)} colorScheme='whiteAlpha'>{pageNumber + 1}</Button>
        }{pageNumber + 2 < lastPage && <Button onClick={() => handlePageTurn(2)} colorScheme='whiteAlpha'>{pageNumber + 2}</Button>
        }{pageNumber !== lastPage && <Button onClick={() => handlePageTurn(lastPage)} colorScheme='whiteAlpha'>Ultima Pagna({lastPage})</Button>
        }
      </ButtonGroup>
    </Layout>
  )
}

export default HomePage