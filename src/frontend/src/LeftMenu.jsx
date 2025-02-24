import React from "react";
import "./LeftMenu.css";

function LeftMenu() {
    return (
        <div className="menu-izquierda">
            <ul>
                {/* Ver como hacer para que segun donde estemos se remarque el boton */}
                <li><a href="#">Opción 1</a></li>
                <li><a href="#">Opción 2</a></li>
                <li><a href="#">Opción 3</a></li>
            </ul>
        </div>  
    )
}

export default LeftMenu