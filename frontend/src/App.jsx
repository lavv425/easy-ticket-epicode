import { Suspense, useState } from 'react'
import { Provider } from 'react-redux';
import Loader from './Components/UI/Loader/Loader'
import { AppProvider } from './Contexts/App/AppContext'
import AppRouter from './Routes/AppRouter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={<Loader />} name='app-suspense'>
      <Provider>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </Provider>
    </Suspense>
  )
}

export default App
