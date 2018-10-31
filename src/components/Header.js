import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import "../styles/Header.css";

const Header = () => {
  return (
    <nav className="menu">
      <img src={logo} alt="logo" className="logo"/>
      <div>
        <Link to="/" className="menu-item"> Home </Link>
        <Link to="/artists" className="menu-item"> Artistas </Link>
        <Link to="/contact" className="menu-item"> Contato </Link>
      </div>
    </nav> 
  )
}

export default Header