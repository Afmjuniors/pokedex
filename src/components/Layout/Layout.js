import { Box, Collapse, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import Header from '../Header/Header'
import ModalPokemon from '../modal/ModalPokemon'
import ContactModal from '../modal/ContactModal'

const Layout = (props) => {



    return (
        <Flex
            flexDirection={"column"}
            w={"1440px"}
            margin={"0 auto"} >
            <Header />
            <Collapse in={true} animateOpacity transition={"1s"}>
                <ModalPokemon />

                <Box padding={"60px 40px"}>
                    {props.children}
                </Box>
            </Collapse>
            <Box position={"fixed"}
                right={"16px"}
                bottom={"16px"}
                w={"100px"}>

                <ContactModal />
            </Box>



        </Flex>
    )
}

export default Layout