import logo from "./images/Logo .svg";

const Nav = ({ setCurrentPage }) => {
  return (
    <nav className="Nav">
      <div className="site-inner">
        <img src={logo} alt="Logo" />
        <div className="nav-links">
          <button onClick={() => setCurrentPage('main')}>Home</button>
          <button onClick={() => setCurrentPage('about')}>About</button>
          <button onClick={() => setCurrentPage('menu')}>Menu</button>
          <button onClick={() => setCurrentPage('reservations')}>Reservations</button>
          <button onClick={() => setCurrentPage('order-online')}>Order Online</button>
          <button onClick={() => setCurrentPage('login')}>Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
