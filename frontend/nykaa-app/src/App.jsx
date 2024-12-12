
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Bag from './components/Bag'
import Login from './components/Login'
import Register from './components/Register'
import Makeup from './components/Makeup';
import Skin from './components/Skin';
import Hair from './components/Hair';
import Men from './components/Men';


function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/skin" element={<Skin />} />
        <Route path="/men" element={<Men />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App