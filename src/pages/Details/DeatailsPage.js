import { Box, Button, Collapse, Flex, Grid, GridItem, Heading, Image, Progress, ScaleFade, Skeleton, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import { BASE_URL } from '../../constants/BASE_URL'
import pokeBola from "../../assets/pokebola2.svg"
import { typePokemon } from '../../constants/type'
import styled from 'styled-components'




const DeatailsPage = ({isOpen=true}) => {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [pokemon, setPokemon] = useState({})
  const [moves, setMoves] = useState([])
  const [type1, setType1] = useState({})
  const [type2, setType2] = useState({})
  const pokemonName = params.pokemonName
  useEffect(() => {
    fetchPokemonByName()
  }, [])


  const fetchPokemonByName = async () => {
    try {
        setIsLoading(true)
        const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`)
        setPokemon(response.data)
        if (response.data.types[0].type.name) {
            setType1(typePokemon[response.data.types[0].type.name])
            if (response.data.types[1].type.name) {
              setType2(typePokemon[response.data.types[1].type.name])
              }
        }
        
        setIsLoading(false)

    } catch (error) {
        setIsLoading(false)
        console.log(error);
    }
}





  return (
    <Layout>
        
      <Heading color={"#ffffff"}>Deatalhes</Heading>
      

      <ScaleFade initialScale={0.9} in={true}>
      <Flex
        
        position={"relative"}
        bgImage={pokeBola}
        bgRepeat={"no-repeat"}
        bgPosition={"right"}
        w={"100%"}
        h={"664px"}
        borderRadius={"38px"}
        bgColor={type1.color && type1.color}
        marginTop={"36px"}
      >
        <Flex padding={"26px 44px"}>

          <Box>
            <Box bgColor={"#ffffff"}
              borderRadius={"8px"}
              w={"282px"}
              h={"282px"}
              display={"flex"}
            ><Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt='sprite front default' /> </Box>
            <Box bgColor={"#ffffff"}
              display={"flex"}
              borderRadius={"8px"}
              marginTop={"48px;"}
              w={"282px"}
              h={"282px"}
            ><Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png`} alt='sprite back default' /> </Box>
          </Box>
          <Box w={"343px"}
            h={"100%"}
            bgColor={"#ffffff"}
            margin={"0 34px"}
            borderRadius={"8px"}
            padding={"18px"}
          >
            <Heading>Base stats</Heading>
            <Flex flexDirection={"column"}
              borderTop={"1px grey solid"}
              marginTop={"16px"}>
              {pokemon.stats &&
                pokemon.stats.map((stat) => {
                  return (
                    <Flex
                      key={stat.stat.name}
                      borderBottom={"1px grey solid"}
                      h={"28px"}
                      alignItems={"center"} >
                      <Flex w="100px">
                        <Text w="60px"
                          textTransform={"capitalize"}
                          textAlign={"end"}
                          fontSize={"14px"}>
                          {stat.stat.name.replace("special-attack", "Sp. Atk").replace("special-defense", "Sp. Def")}</Text>
                        <Text
                          fontSize={"14px"}
                          margin={"auto"}
                        >{stat.base_stat}</Text>
                      </Flex>

                      <Progress w={"200px"}
                        borderRadius={"4px"}
                        bgColor={"#ffffff"}
                        colorScheme={stat.base_stat < 50 ? "orange" : stat.base_stat < 80 ? "yellow" : "green"} value={(stat.base_stat + 10)} />

                    </Flex>
                  )
                })}
              {
                pokemon.stats &&
                <Flex
                  borderBottom={"1px grey solid"}
                  h={"28px"}
                  alignItems={"center"}

                >
                  <Text
                    w={"60px"}
                    textTransform={"capitalize"}
                    textAlign={"end"}
                    fontSize={"14px"}>Total</Text>
                  <Text
                    margin={"8px"}
                    fontSize={"14px"}
                    fontWeight={"bold"}>{pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}</Text>
                </Flex>
              }
            </Flex>
          </Box>

          <Flex
            flexDirection={"column"}
            w={"292px"}
          >
            <Skeleton isLoaded={!isLoading}>
              <Stack color={"#ffffff"}>
                <Text fontSize={"16px"} fontWeight={"bold"} marginBottom={"-16px"}>#{pokemon.id < 100 ? pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}` : pokemon.id}</Text>
                <Heading textTransform={"capitalize"} fontSize={"48px"}>{pokemon.name}</Heading>
              </Stack>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Flex paddingTop={"8px"} gap={"16px"}>
              {pokemon.types &&
                <>
                <Image src={`../type/${pokemon.types[0].type.name}Label.svg` } alt='Shield first attribute' />
                {pokemon.types[1] &&
                  <Image src={`../type/${pokemon.types[1].type.name}Label.svg`} alt='Shield second attribute' />
                }
                </>}
                
              </Flex>
            </Skeleton>
            <Image
              position={"absolute"}
              w={"270px"}
              h={"270px"}
              top={"-120px"}
              right={"20px"}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt='Pokemon Image' />


            <Flex 
            marginTop={"44px"}
            bgColor={"#ffffff"} 
            h={"100%"} 
            borderRadius="8px"
            padding={"18px"}
            flexDirection={"column"}
            
           
            >
              <Heading marginBottom={"16px"} fontSize={"24px"}>Moves:</Heading>
              <Flex flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"16px"}
              > 

              {
                pokemon.moves &&
              
                pokemon.moves.filter((mv,i)=> i < 7)
                .map((move)=><Text 
                key={move.move.name}
                textTransform={"capitalize"}
                bgColor={"#ECECEC"}
                padding={"6px"}
                border={"1px dashed grey"}
                borderRadius={"12px"}
                
                >{(move.move.name).replace("-", " ")}</Text>)
               
                
               
              }
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      </ScaleFade>
    </Layout>
  )

}

export default DeatailsPage