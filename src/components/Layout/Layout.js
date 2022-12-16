import { Box, Collapse, Flex } from '@chakra-ui/react'
import React from 'react'
import Header from '../Header/Header'
import ModalPokemon from '../modal/ModalPokemon'

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


        </Flex>
    )
}

export default Layout