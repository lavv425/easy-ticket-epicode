import { Suspense } from 'react'
import { Provider } from 'react-redux';
import Loader from './Components/UI/Loader/Loader'
import { AppProvider } from './Contexts/App/AppContext'
import AppRouter from './Routes/AppRouter'
import store from './Store/Store';

const App = () => (
  <Suspense fallback={<Loader />} name='app-suspense'>
    <Provider store={store}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </Provider>
  </Suspense>
);

export default App
