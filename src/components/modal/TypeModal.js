import React from 'react'
import { Button, Flex, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { goToTypes } from '../../routes/coordinator'
import { typePokemon } from '../../constants/type'



const TypeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const navigate = useNavigate()
  const types = []

  const handleTipos = () => {
    for (let i in typePokemon) {

      types.push(typePokemon[i])
    }
  }
  handleTipos()

  return (
    <>
      <Button
        onClick={() => onOpen()}>Tipos </Button>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent>
          <ModalHeader>Selecione o tipo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex padding={"8px"} gap={"16px"} flexWrap={"wrap"}>
              {
                types.map((tipo) => {
                  return (<>
                    <Image onClick={() => {
                      onClose()
                      goToTypes(navigate, `${tipo.valor}`)
                    }} src={tipo.urlImg} alt='Shield first attribute' />
                  </>)
                })
              }
            </Flex>

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}

export default TypeModal