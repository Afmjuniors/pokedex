import React from 'react'
import { Box, Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import grassI from "../../assets/img-criar/grass.png"
import poisonI from "../../assets/img-criar/poison.png"
import pokeBola from "../../assets/img-criar/pokebola.png"
import pokemon from "../../assets/img-criar/pokemon.png"
import { useLocation, useNavigate } from 'react-router-dom'
import { goToDeatails } from '../../routes/coordinator'

const Card = ({pokemonID}) => {
    const location = useLocation()
    const navigate = useNavigate()
    return (
        <Flex
            bgImage={pokeBola}
            bgRepeat={"no-repeat"}
            bgPosition={"right"}
            w={"440px"}
            h={"210px"}
            borderRadius={"12px"}
            bgColor={"#729F92"}
            marginTop={"36px"}
            
        >
            <Flex padding={"24px 0 24px 24px"}
                flexDirection={"column"}>
                <Stack color={"#ffffff"}>
                    <Text fontSize={"16px"} fontWeight={"bold"} marginBottom={"-16px"}>#01</Text>
                    <Heading fontSize={"32px"}>Bulbasaur</Heading>
                </Stack>
                <Flex paddingTop={"8px"} gap={"8px"}>
                    <Image src={grassI} alt='Shield first attribute' />
                    <Image src={poisonI} alt='Shield second attribute' />
                </Flex>
                <Link
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    textDecoration={"underline"}
                    color={"#ffffff"}
                    marginTop={"auto"}
                    onClick={()=>goToDeatails(`/pokemon/${pokemonID}`)}
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
                    src={pokemon} alt='Pokemon Image' />
                {location.pathname !== "/" ?
                    <Button
                        w={"146px"}
                        marginTop={"auto"}
                        marginBottom={"12px"}
                        color={"#000000"}
                        bgColor={"#ffffff"}
                    > Capturar!</Button> :
                    <Button
                        w={"146px"}
                        marginTop={"auto"}
                        marginBottom={"12px"}
                        color={"#ffffff"}
                        bgColor={"#FF6262"}
                    > Excluir</Button>

                }


            </Flex>
        </Flex>
    )
}

export default Card