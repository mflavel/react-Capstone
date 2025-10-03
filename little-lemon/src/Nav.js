import logo from "./images/Logo .svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation(); // get current path

  return (
    <nav className="Nav">
      <div className="site-inner">
        <img src={logo} alt="Logo" />
        <div className="nav-links"> 
          {/* Links for navigation bar */}
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          <Link to="/menu" className={location.pathname === "/menu" ? "active" : ""}>Menu</Link>
          <Link to="/reservations" className={location.pathname === "/reservations" ? "active" : ""}>Reservations</Link>
          <Link to="/order-online" className={location.pathname === "/order-online" ? "active" : ""}>Order Online</Link>
          <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

