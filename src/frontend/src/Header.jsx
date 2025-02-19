import React from "react";
import "./Header.css";

function Header() {
    return (
        <header id="main-header">
            <h1 id="main-title">Event Connect</h1>

            <div id="login-register-box">
                <button id="login-button">Login</button>
                <button id="register-button">Register</button>
            </div>
        </header>
    )
}

export default Header