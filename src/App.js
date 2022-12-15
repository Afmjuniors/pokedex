import { ChakraProvider } from '@chakra-ui/react'
import GlobalState from './contexts/GlobalState'
import { GlobalContext } from './contexts/GlobalContext'
import Router from './routes/Router'




const App = () => {

  const context = GlobalState()

  return (
    <GlobalContext.Provider value={context}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </GlobalContext.Provider>

  )
}

export default App