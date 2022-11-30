import React  from 'react';
import LoginPage from './pages/Login';
import {Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrackPage from './pages/Track/TrackPage';
import NFTData from './pages/Web3/NFTData';
import TokenData from './pages/Web3/TokenData';


function App() {



   return (

    <Provider store={store}>  
      <Routes >
      <Route path='/test'  />
        <Route path='/' element={<LoginPage />} />
        <Route path='/track' element={<TrackPage />}  />
        <Route path='/NFT' element={<NFTData />}  />
        <Route path='/tokens' element={<TokenData />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        /> 
    </Provider>
    

  );
}

export default App;
