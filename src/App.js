import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { GlobalContext } from './contexts/GlobalContext'
import Router from './routes/Router'


const context = {
  
}

const App = () => {
  return (
    <GlobalContext.Provider value={{}}>
      <ChakraProvider>
        <Router/>
      </ChakraProvider>
    </GlobalContext.Provider>
    
  )
}

export default App