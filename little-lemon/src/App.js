import './App.css';
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
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/conformation" element={<Conformation />} />
          <Route path="/order-online" element={<OrderOnline />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;


