import { useEffect, useState } from "react";
import { obtenerImagenEvento } from "./api/eventos";

function ImagenEvento({ idEvento }) {
    const [imagenURL, setImagenURL] = useState(null);

    useEffect(() => {
        obtenerImagenEvento(idEvento).then(setImagenURL);
    }, [idEvento]);

    if (!imagenURL) return <p>Cargando imagen...</p>;

    return <img src={imagenURL} alt="Imagen del evento" className="max-w-full max-h-96 object-contain rounded-md" />
    ;
}

export default ImagenEvento;
