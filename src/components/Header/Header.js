import { Button, Flex, Image, Link } from '@chakra-ui/react'
import pokemonLogo from "../../assets/pokemon-logo.svg"
import React, { useContext, useEffect, useState } from 'react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { goToHomePage, goToPokedex } from '../../routes/coordinator'
import { GlobalContext } from '../../contexts/GlobalContext'
import ModalPokemon from '../modal/ModalPokemon'

const Header = () => {
    const location = useLocation()

    const params = useParams()
    const navigate = useNavigate()
    const context = useContext(GlobalContext)


    useEffect(() => {
        context.fromLocalStorage()
    }, [])



    const buttonSwitch = () => {
        switch (location.pathname) {
            case "/pokedex":
                return <></>
            case `/pokemon/${params.pokemonName}`:
                return (
                    <>
                        {context.pokedex.includes(params.pokemonName) ?
                            <Button
                                onClick={() => {
                                    context.setFlow(2)
                                    context.handleChangePokedex(params.pokemonName, "remove")
                                    context.setIsOpen(true)
                                }}
                                bgColor={"#FF6262"}
                                color={"#FFFFFF"}
                                fontSize={"16px"}
                                padding={"28px 44px"}
                                marginRight={"40px"}
                                marginLeft={"auto"}
                                _hover={{
                                    bgColor: "#FF6262"
                                }}

                            >Excluir da Pokêdex</Button> :
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
                                onClick={() => {
                                    context.setFlow(1)
                                    context.handleChangePokedex(params.pokemonName, "add")
                                    context.setIsOpen(true)
                                }}

                            >Capturar</Button>
                        }
                    </>
                )
            default:
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
                        onClick={() => goToPokedex(navigate)}

                    >Pokêdex</Button>
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
                (location.pathname !== "/" &&
                    location.pathname !== `/page/${params.page}`) &&
                <Flex alignItems={"center"}
                    paddingLeft={"84px"}
                >
                    <ChevronLeftIcon h={"14px"} />
                    <Link
                        color={"#000000"}
                        fontWeight={"700"}
                        textDecoration={"underline"}
                        onClick={() => goToHomePage(navigate)}
                        fontSize={"24px"}
                    >Todos Pokémons</Link>
                </Flex>
            }
            <Image
                position={"absolute"}
                left={"40vw"}

                src={pokemonLogo} alt='Pokeon logo' />
            {buttonSwitch()}

            <ModalPokemon />
        </Flex>
    )
}

export default Header