import React, { useContext, useEffect, useState } from 'react'
import { Button, Flex, Heading, Image, Link, Skeleton, Stack, Text } from '@chakra-ui/react'
import grassI from "../../assets/img-criar/grass.png"
import poisonI from "../../assets/img-criar/poison.png"
import pokeBola from "../../assets/pokebola.png"
import { useLocation, useNavigate } from 'react-router-dom'
import pokemonIMG from "../../assets/img-criar/pokemon.png"
import { goToDeatails } from '../../routes/coordinator'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { typePokemon } from "../../constants/type";
import { GlobalContext } from '../../contexts/GlobalContext'

const Card = ({ pokemonName }) => {
    const context = useContext(GlobalContext)
    const {  pokedex,
        handleChangePokedex
      } = context
    const location = useLocation()
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState({})
    const [type1, setType1] = useState({})
    const [type2, setType2] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetchPokemonByName()
    }, [])

    

    const fetchPokemonByName = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`)
            setPokemon(response.data)
            if (response.data.types[0]) {
                setType1(typePokemon[response.data.types[0].type.name])
                }
            if (response.data.types[1]) {
                console.log((typePokemon[response.data.types[0].type.name]))
                console.log((typePokemon[response.data.types[1].type.name]))
            setType2(typePokemon[response.data.types[1].type.name])
            }
            setIsLoading(false)

        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }



    return (
        <Skeleton isLoaded={!isLoading}>

        <Flex
            bgImage={pokeBola}
            bgRepeat={"no-repeat"}
            bgPosition={"right"}
            w={"440px"}
            h={"210px"}
            borderRadius={"12px"}
            bgColor={type1 && type1.color}
            marginTop={"36px"}


        >
            <Flex padding={"24px 0 24px 24px"}
                flexDirection={"column"}>
                <Skeleton isLoaded={!isLoading}>
                    <Stack color={"#ffffff"}>
                        <Text fontSize={"16px"} fontWeight={"bold"} marginBottom={"-16px"}>#{pokemon.id<100?pokemon.id<10?`00${pokemon.id}`:`0${pokemon.id}`:pokemon.id}</Text>
                        <Heading textTransform={"capitalize"} fontSize={"32px"}>{pokemon.name}</Heading>
                    </Stack>
                </Skeleton>
                <Skeleton isLoaded={!isLoading}>

                <Flex paddingTop={"8px"} gap={"8px"}>
                {pokemon.types &&
                <>
                <Image src={`./type/${pokemon.types[0].type.name}Label.svg` } alt='Shield first attribute' />
                {pokemon.types[1] &&
                  <Image src={`./type/${pokemon.types[1].type.name}Label.svg`} alt='Shield second attribute' />

                }
                </>}
                
              </Flex>
                </Skeleton>
                <Link
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                    color={"#ffffff"}
                    marginTop={"auto"}
                    onClick={() => goToDeatails(navigate,pokemonName)}
                >Detalhes</Link>
            </Flex>

            <Flex
                w={"220px"}
                position={"relative"}
                justifyContent={"center"}
            >
                <Image
                    position={"absolute"}
                    w={"193px"}
                    h={"193px"}
                    bottom={"70px"}
                    right={"12px"}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt='Pokemon Image' />


                {location.pathname === "/" ?
                    <Button
                        w={"146px"}
                        marginTop={"auto"}
                        marginBottom={"12px"}
                        color={"#000000"}
                        bgColor={"#ffffff"}
                        onClick={()=>handleChangePokedex(pokemonName,"add")}
                    > Capturar!</Button> :
                    <Button
                        w={"146px"}
                        marginTop={"auto"}
                        marginBottom={"12px"}
                        color={"#ffffff"}
                        bgColor={"#FF6262"}
                        onClick={()=>handleChangePokedex(pokemonName,"remove")}
                    > Excluir</Button>
                }


            </Flex>


        </Flex>
        </Skeleton >
    )
}

export default Card