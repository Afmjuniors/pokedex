import {
    Modal,
    ModalOverlay,
    ModalContent,
    Flex,
    ModalFooter,
    Button,
    ModalHeader,
    ModalCloseButton,
    Image,
    ModalBody,
    useDisclosure,
    Link,

} from '@chakra-ui/react'
import { useContext } from 'react'
import { GlobalContext } from '../../contexts/GlobalContext'
import gitHub from "../../assets/icons/Github-Dark.svg"
import linkedin from "../../assets/icons/LinkedIn.svg"
import whatsApp from "../../assets/icons/whatsApp-icon.svg"
import email from "../../assets/icons/mail.svg"
import pokegear from "../../assets/icons/pokegear.png"


const ContactModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <><Image src={pokegear} alt="pokegear" onClick={onOpen} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Entre em contato</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex

                            justifyContent={"space-between"}
                            padding={"24px"}
                            alignItems={"center"}
                        >
                            <Link href='https://github.com/Afmjuniors/projeto-react-apis' target="_blank" >
                                <Image w={"50px"} src={gitHub} alt={'GitHub Icon'} />
                            </Link>
                            <Link href='https://www.linkedin.com/in/afmjuniors/' target="_blank">
                                <Image w={"50px"} src={linkedin} alt={'Linkedin Icon'} />
                            </Link>
                            <Link href='https://api.whatsapp.com/send?phone=5531996828531&text=Ol%C3%A1%20vi%20seu%20site!' target="_blanck">
                                <Image w={"50px"} src={whatsApp} alt={'WhatsApp Icon'} />
                            </Link>
                            <Link href="mailto:afmjuniors@gmail.com" >
                                <Image w={"50px"} src={email} alt={'Email Icon'} />
                            </Link>
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
export default ContactModal
