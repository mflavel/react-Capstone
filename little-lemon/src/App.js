import Header from './Header';
import Nav from './pages/Nav';
import Footer from './pages/Footer';
import Main from './pages/Main';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import OrderOnline from './pages/OrderOnline';
import Login from './pages/Login';
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
        {/* routes to each link */}
        <Routes>
            <Route path="/" element={<Main />} />
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



