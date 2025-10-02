import { useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Main from './Main';
import About from './About';
import Menu from './Menu';
import Reservations from './Reservations';
import OrderOnline from './OrderOnline';
import Login from './Login';
import Conformation from './pages/Conformation';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';

function App() {

  // render page based on currentPage

  return (
    <>
       <ChakraProvider>
        <Header />
        <Nav />
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/order-online" element={<OrderOnline />} />
            <Route path="/conformation" element={<Conformation />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default App;



