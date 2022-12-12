import { Button, Flex, Heading, Image, Link,Modal, ModalContent, ModalOverlay, Text } from '@chakra-ui/react'
import pokemonLogo from "../../assets/pokemon-logo.svg"
import React, { useContext, useEffect, useState } from 'react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { goToHomePage, goToPokedex } from '../../routes/coordinator'
import { GlobalContext } from '../../contexts/GlobalContext'

const Header = () => {
    const location = useLocation()
    const params = useParams()
    const navigate = useNavigate()
    const context = useContext(GlobalContext)
    const [isOpen, setIsOpen] = useState(false)
    const [flow, setFlow] = useState(1)


    useEffect(()=>{
        context.fromLocalStorage()
    },[])



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
            case `/pokemon/${params.pokemonName}`:
                return (
                    <>
                    {context.pokedex.includes(params.pokemonName)?
                        <Button
                        onClick={()=>{
                            setFlow(2)
                            context.handleChangePokedex(params.pokemonName,"remove") 
                            setIsOpen(true)}}
                            bgColor={"#FF6262"}
                            color={"#FFFFFF"}
                            fontSize={"16px"}
                            padding={"28px 44px"}
                            marginRight={"40px"}
                            marginLeft={"auto"}
                            _hover={{
                                bgColor: "#FF6262"
                            }}
    
                        >Excluir da Pokêdex</Button>:
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
                        onClick={()=>{
                            setFlow(1)
                            context.handleChangePokedex(params.pokemonName,"add") 
                            setIsOpen(true)}}

                    >Capturar</Button>
                    } 
                    </>                 
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
                    <ChevronLeftIcon h={"14px"}/>
                    <Link
                        color={"#000000"}
                        fontWeight={"700"}
                        textDecoration={"underline"}
                        onClick={()=>goToHomePage(navigate)}
                        fontSize={"24px"}
                    >Todos Pokémons</Link>
                </Flex>
            }


            <Image
                position={"absolute"}
                right={"40%"}
                src={pokemonLogo} alt='Pokeon logo' />
            {buttonSwitch()}

        <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <Flex 
            w={"450px"}
            h={"220px"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}>
                {flow===1?
                    <>
                     <Heading>Gotcha!</Heading>            
                     <Text fontWeight={"bold"}>
                     O Pokémon foi adicionado a sua Pokédex
                     </Text>
                </>:
                 <>
                 
                 <Heading>Oh, no!</Heading>            
                 <Text fontWeight={"bold"}>
                 O Pokémon foi removido da sua Pokedéx
                 
                 </Text>
            </>


                }
           
            </Flex>
          </ModalContent>
        </Modal>
        </Flex>
    )
}

export default Header