import { Button, Flex, Image, Link, Text } from '@chakra-ui/react'
import pokemonLogo from "../../assets/pokemon-logo.svg"
import React from 'react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { goToHomePage, goToPokedex } from '../../routes/coordinator'

const Header = () => {
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    console.log(location);
    const buttonSwitch = () => {
        switch (location.pathname) {
            case "/":
                return (
                    <Button
                        bgColor={"#33A4F5"}
                        color={"#FFFFFF"}
                        fontSize={"24px"}
                        padding={"36px 92px"}
                        marginRight={"40px"}
                        marginLeft={"auto"}
                        _hover={{
                            bgColor: "#33A4F5"
                        }}
                        onClick={()=>goToPokedex(navigate)}

                    >Pokêdex</Button>
                )
            case `/pokemon/${params.pokemonID}`:
                return (
                    <Button
                        bgColor={"#FF6262"}
                        color={"#FFFFFF"}
                        fontSize={"16px"}
                        padding={"28px 44px"}
                        marginRight={"40px"}
                        marginLeft={"auto"}
                        _hover={{
                            bgColor: "#FF6262"
                        }}

                    >Excluir da Pokêdex</Button>
                )
        }
    }

    return (
        <Flex
            w={"1440px"}
            h={"160px"}
            bgColor={"#FFFFFF"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >

            {
                location.pathname !== "/" &&
                <Flex alignItems={"center"}
                    paddingLeft={"84px"}
                >
                    <ChevronLeftIcon />
                    <Link
                        color={"#000000"}
                        fontWeight={"700"}
                        textDecoration={"underline"}
                    >Todos Pokémons</Link>
                </Flex>
            }


            <Image
                position={"absolute"}
                right={"40%"}
                src={pokemonLogo} alt='Pokeon logo' />
            {buttonSwitch()}
        </Flex>
    )
}

export default Header