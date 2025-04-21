// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// export default function CardEventosPerfil({ title, eventos, navigate, onAction, actionText }) {
//     return (
//         (!eventos) ? (
//             <Card className="bg-[#023047]">
//                 <CardHeader>
//                     <CardTitle className="text-white">{title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="text-center py-4 text-white">Error al cargar los eventos</p>
//                 </CardContent>
//             </Card>
//         ) : (
//             <Card className="bg-[#023047]">
//                 <CardHeader>
//                     <CardTitle className="text-white">{title}</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     {eventos.length === 0 ? (
//                         <p className="text-center py-4 text-white">No hay eventos para mostrar</p>
//                     ) : (
//                         <AcordeonEventosPerfil />
//                     )}
//                 </CardContent>
//             </Card>
//         )
//     )
// }


import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CardEventosPerfil({ title, eventos, navigate, onAction, actionText }) {
  return (
    <Card className="bg-dark text-white shadow-lg rounded-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {eventos.length === 0 ? (
          <p className="text-center text-gray-400 py-4">No hay eventos para mostrar</p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id} className="flex justify-between items-center mb-4">
              <p>{evento.nombre}</p>
              <Button
                onClick={() => onAction(evento.id)}
                className="bg-danger text-white hover:bg-danger/90"
              >
                {actionText}
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
