import { Box, Flex, Heading, Image, Progress, Skeleton, SlideFade, Stack, Text } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import pokeBola from "../../assets/pokebola2.svg"
import { GlobalContext } from '../../contexts/GlobalContext'
import { typePokemon } from '../../constants/type'
import PokemonNotFound from '../PageNotFound/PokemonNotFound'




const DeatailsPage = () => {
  const params = useParams()
  const { fetchPokemonByName,
    isLoading,
    type1,
    pokemon
  } = useContext(GlobalContext)

  const pokemonName = params.pokemonName

  useEffect(() => {
    fetchPokemonByName(pokemonName)

  }, [])

  return (
    <Layout>
      <Heading color={"#ffffff"}>Deatalhes</Heading>

      {
        !pokemon.name ?
          <PokemonNotFound /> :
          <SlideFade in offsetX={"-100%"} offsetY={"-100%"} animateopacity={"true"}  >
            <Flex
              position={"relative"}
              bgImage={pokeBola}
              bgRepeat={"no-repeat"}
              bgPosition={"right"}
              transition={" width 10s"}
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
                    padding={"32px"}
                    display={"flex"}
                  ><Image src={pokemon.sprites?.front_default} alt='sprite front default' /> </Box>
                  {pokemon.sprites && pokemon.sprites.back_default &&
                    <Box bgColor={"#ffffff"}
                      display={"flex"}
                      borderRadius={"8px"}
                      marginTop={"48px;"}
                      padding={"32px"}
                      w={"282px"}
                      h={"282px"}
                    >
                      <Image src={pokemon.sprites?.back_default} alt='sprite back default' />
                    </Box>
                  }
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
                    {pokemon.stats &&
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
                          fontWeight={"bold"}>
                          {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
                        </Text>
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
                      <Text fontSize={"16px"} fontWeight={"bold"} marginBottom={"-16px"}>
                        #{pokemon.id < 100 ? pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}` : pokemon.id}
                      </Text>
                      <Heading textTransform={"capitalize"} fontSize={"48px"}>{pokemon.name}</Heading>
                    </Stack>
                  </Skeleton>
                  <Skeleton isLoaded={!isLoading}>
                    <Flex paddingTop={"8px"} gap={"16px"}>
                      {pokemon.types?.map((tipo) => {
                        return <Image key={tipo.type.name} src={typePokemon[tipo.type.name]?.urlImg} alt='Shield first attribute' />
                      })}
                    </Flex>
                  </Skeleton>
                  <Image
                    position={"absolute"}
                    w={"270px"}
                    h={"270px"}
                    top={"-120px"}
                    right={"20px"}
                    src={pokemon.sprites.other['official-artwork']['front_default']} alt='Pokemon Image' />
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
                      {pokemon.moves &&
                        pokemon.moves
                          .filter((mv, i) => i < 6)
                          .map((move) => <Text
                            key={move.move.name}
                            textTransform={"capitalize"}
                            bgColor={"#ECECEC"}
                            padding={"6px"}
                            border={"1px dashed grey"}
                            borderRadius={"12px"}
                          >
                            {(move.move.name).replace("-", " ")}
                          </Text>)
                      }
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </SlideFade >

      }


    </Layout >
  )

}

export default DeatailsPage