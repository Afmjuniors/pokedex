import React, { useContext, useEffect, useState } from 'react'
import { Button, Flex, Heading, Image, Link, ScaleFade, Skeleton, Spinner, Stack, Text, } from '@chakra-ui/react'
import pokeBola from "../../assets/pokebola.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { goToDeatails } from '../../routes/coordinator'
import axios from 'axios'
import { BASE_URL } from '../../constants/BASE_URL'
import { typePokemon } from "../../constants/type";
import { GlobalContext } from '../../contexts/GlobalContext'

const Card = ({ pokemonName }) => {

    const context = useContext(GlobalContext)
    const { pokedex,
        handleChangePokedex,
        setIsOpen,
        setFlow,
    } = context
    const location = useLocation()
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState({})
    const [typesLocal, setTypesLocal] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    console.log();
    useEffect(() => {
        fetchPokemonByName()
    }, [])

    const fetchPokemonByName = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get(`${BASE_URL}/pokemon/${pokemonName}`)
            setPokemon(response.data)
            setTypesLocal([typePokemon[response.data.types[0].type.name], typePokemon[response.data.types[1]?.type.name]])
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    return (

        <>
            <ScaleFade initialScale={0.8} in={true}>
                <Flex
                    bgImage={pokeBola}
                    bgRepeat={"no-repeat"}
                    bgPosition={"right"}
                    w={"440px"}
                    h={"210px"}
                    borderRadius={"12px"}
                    bgColor={typesLocal[0] && typesLocal[0].color}
                    marginTop={"36px"}
                    justifyContent={isLoading ? "center" : "space-between"}
                >{isLoading ? <Spinner alignSelf={"center"} justifySelf={"center"} color={"white"} size={"xl"} /> :
                    <>
                        <Flex padding={"24px 0 24px 24px"}
                            flexDirection={"column"}>
                            <Skeleton isLoaded={!isLoading}>
                                <Stack color={"#ffffff"}>
                                    <Text fontSize={"16px"} fontWeight={"bold"} marginBottom={"-16px"}>#{pokemon.id < 100 ? pokemon.id < 10 ? `00${pokemon.id}` : `0${pokemon.id}` : pokemon.id}</Text>
                                    <Heading textTransform={"capitalize"} fontSize={"32px"}>{pokemon.name}</Heading>
                                </Stack>
                            </Skeleton>
                            <Skeleton isLoaded={!isLoading}>
                                <Flex paddingTop={"8px"} gap={"16px"}>
                                    {pokemon.types?.map((tipo) => {
                                        return <Image key={tipo.type.name} src={typePokemon[tipo.type.name]?.urlImg} alt='Shield first attribute' />
                                    })}
                                </Flex>
                            </Skeleton>
                            <Link
                                fontSize={"16px"}
                                fontWeight={"bold"}
                                textDecoration={"underline"}
                                color={"#ffffff"}
                                marginTop={"auto"}
                                onClick={() => goToDeatails(navigate, pokemonName)}
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
                                src={pokemon.sprites && pokemon.sprites?.other['official-artwork']['front_default']} alt='Pokemon Image' />

                            {location.pathname === "/pokedex" ?
                                <Button
                                    w={"146px"}
                                    marginTop={"auto"}
                                    marginBottom={"12px"}
                                    color={"#ffffff"}
                                    bgColor={"#FF6262"}
                                    onClick={() => {
                                        setFlow(2)
                                        handleChangePokedex(pokemonName, "remove")
                                        setIsOpen(true)
                                    }}
                                > Excluir</Button> :
                                <Button
                                    w={"146px"}
                                    marginTop={"auto"}
                                    marginBottom={"12px"}
                                    color={"#000000"}
                                    bgColor={"#ffffff"}
                                    onClick={() => {
                                        setFlow(1)
                                        handleChangePokedex(pokemonName, "add")
                                        if (!pokedex.includes(pokemonName)) {
                                            setIsOpen(true)
                                        }
                                    }}
                                > Capturar!</Button>

                            }
                        </Flex>
                    </>
                    }
                </Flex>
            </ScaleFade>
        </>

    )
}

export default Card