import React from "react";
import "./Header.css";

function Header({ toggleMenu, MenuIcon }) {
    return (
        <header id="main-header">

            <button id="boton-menu" className="boton-menu" onClick={toggleMenu}>
                <MenuIcon className="material-symbols-rounded" fontSize="large" />
            </button>

            <h1 id="main-title">Event Connect</h1>
            <button id="login-button">Login</button>

            {/* <div id="login-register-box">
                <button id="login-button">Login</button>
                <button id="register-button">Register</button>
            </div> */}
        </header>
    )
}

export default Header