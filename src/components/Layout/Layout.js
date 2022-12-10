import { Flex } from '@chakra-ui/react'
import React from 'react'
import Header from '../Header/Header'

const Layout = (props) => {


    
  return (
    <Flex 
    flexDirection={"column"}
    w={"1440px"}
    margin={"0 auto"}

    >
        <Header />

    {props.children}
  
    </Flex>
  )
}

export default Layout