import { useEffect, useState } from "react";
import { obtenerImagenGrupo } from "./api/grupos";

function ImagenGrupo({ idGrupo }) {
    const [imagenURL, setImagenURL] = useState(null);

    useEffect(() => {
        obtenerImagenGrupo(idGrupo).then(setImagenURL);
    }, [idGrupo]);

    if (!imagenURL) return <p>Cargando imagen...</p>;

    return <img src={imagenURL} alt="Imagen del grupo" className="w-full h-full object-cover object-center" />
    ;
}

export default ImagenGrupo;
