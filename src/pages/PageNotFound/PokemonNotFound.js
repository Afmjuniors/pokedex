import { Flex, Heading, Image, ScaleFade } from '@chakra-ui/react'
import React from 'react'
import notFoundPokemon from "../../assets/notFound.png"

const PokemonNotFound = () => {
    return (
        <ScaleFade initialScale={0.8} in={true}>
            <Flex alignItems={"center"} maxH={"100vh"} flexDirection={"column"}>
                <Heading color={"white"}>Pokemon não encontrado</Heading>
                <Image
                    margin={"0 auto"}
                    h={"40vh"} src={notFoundPokemon} alt={"Picachu Detective"} />
            </Flex>
        </ScaleFade>

    )
}

export default PokemonNotFound