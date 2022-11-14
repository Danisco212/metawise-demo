import React from 'react';
import LoginPage from './pages/Login';
import {Route, Routes} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TrackPage from './pages/Track/TrackPage';
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/track' element={<TrackPage />} />
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
