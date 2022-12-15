import { Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import picachuDetective from "../../assets/picachu-detective.png"

const PageNotFound = () => {
  return (
    <Layout>

      <Flex alignItems={"center"} maxH={"100vh"} flexDirection={"column"}>
        <Heading color={"white"}>Pagina não encontrada</Heading>
        <Image
          margin={"0 auto"}
          h={"40vh"} src={picachuDetective} alt={"Picachu Detective"} />
      </Flex>
    </Layout>
  )
}

export default PageNotFound