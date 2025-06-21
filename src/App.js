import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';
import Home from './Home';
import { LoginProvider} from './LoginContext';
import Verification from './Verification';
import AdminPanel from './AdminPanel';
import Product from './Components/Product';
import {ToastContainer } from 'react-toastify';
import Cart from './Cart';
import Checkout from './Components/Checkout';

function App() {
  
  return (
    <>
  <BrowserRouter>
    <LoginProvider>
      <ToastContainer/>
  <Routes>
    
    <Route path="/" element={<LoginPage/>}/>
    <Route path='/signup' element={<SignupPage/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path="/admin/*" element={<Verification><AdminPanel/></Verification>} />
    <Route path="/product/*" element={<Product/>} />
    <Route path='/cart/*' element={<Cart/>} />
    <Route path='/checkout/*' element={<Checkout/>} />

  </Routes>
  </LoginProvider>
  </BrowserRouter>
    </>
    
  );
}

export default App;
