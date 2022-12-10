import { Box, Button, Flex, Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../components/Layout/Layout'
import grassI from "../../assets/img-criar/grass.png"
import poisonI from "../../assets/img-criar/poison.png"
import pokeBola from "../../assets/img-criar/pokebola.png"
import pokemon from "../../assets/img-criar/pokemon.png"
import Card from '../../components/Card/Card'

const HomePage = () => {
  return (
    <Layout>
      <Heading color={"#ffffff"}>Todos os Pokémons</Heading>
      <Flex marginTop={"20px"} gap={"20px"} flexWrap={"wrap"}>
      <Card />
      <Card />
      <Card />
      <Card />
      </Flex>

    </Layout>
  )
}

export default HomePage