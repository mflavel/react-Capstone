import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/Logo .svg";


const Nav = () => {
    return (
        <nav className="Nav">
            <div className="site-inner">
                <img src={logo} alt="Logo" />
                <div className="nav-links">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/menu">Menu</NavLink>
                    <NavLink to="/reservations">Reservations</NavLink>
                    <NavLink to="/order-online">Order Online</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Nav;