import {
    Modal,
    ModalOverlay,
    ModalContent,
    Button,
    Flex,
    Heading,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalContext } from '../../contexts/GlobalContext'

const ModalPokemon = () => {
    const location = useLocation()
    const {isOpen,setIsOpen, flow} = useContext(GlobalContext)

    const handleFlow = () => {
        if (flow === 1) {
            return (
                <>
                    <Heading>Gotcha!</Heading>
                    <Text fontWeight={"bold"}>
                        O Pokémon foi adicionado a sua Pokédex
                    </Text>
                </>
            )
        }else {
           return (

                <>
                    <Heading>Oh, no!</Heading>
                    <Text fontWeight={"bold"}>
                        O Pokémon foi removido da sua Pokedéx
                    </Text>
                </>
           )
        }
    }
        return (
            <>
                <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <Flex
                            w={"450px"}
                            h={"220px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            flexDirection={"column"}
                        >
                            {handleFlow()}
                        </Flex>
                    </ModalContent>
                </Modal>
            </>

        )
    }
    export default ModalPokemon