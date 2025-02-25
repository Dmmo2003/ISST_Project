import React from "react";
import "./LeftMenu.css";

function LeftMenu({CloseIcon, toggleMenu}) {
    return (
        <div className="menu-izquierda">
            <button id="boton-encoger" className="boton-encoger" onClick={toggleMenu}>
                <CloseIcon/>
            </button>
            <ul>
                {/* Ver como hacer para que segun donde estemos se remarque el boton */}
                <li><a href="#">Opción 1</a></li>
                <li><a href="#">Opción 2</a></li>
                <li><a href="#">Opción 3</a></li>
            </ul>
            <ul className="sub-menu">
                <li><a href="#">Opción 4</a></li>
                <li><a href="#">Opción 5</a></li>
            </ul>
        </div>  
    )
}

export default LeftMenu