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

function App() {
  const [currentPage, setCurrentPage] = useState('main'); // track current page

  // render page based on currentPage
  const renderPage = () => {
    switch (currentPage) {
      case 'about': return <About setCurrentPage={setCurrentPage} />;
      case 'menu': return <Menu setCurrentPage={setCurrentPage} />;
      case 'reservations': return <Reservations setCurrentPage={setCurrentPage} />;
      case 'order-online': return <OrderOnline setCurrentPage={setCurrentPage} />;
      case 'login': return <Login setCurrentPage={setCurrentPage} />;
      case 'conformation': return <Conformation setCurrentPage={setCurrentPage} />;
      default: return <Main setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <>
      <Header />
      <Nav setCurrentPage={setCurrentPage} /> {/* Pass setter to Nav */}
      <div className="page-content">
        {renderPage()}
      </div>
      <Footer />
    </>
  );
}

export default App;



