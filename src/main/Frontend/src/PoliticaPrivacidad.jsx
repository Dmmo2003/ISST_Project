import React from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage: "url('/images/fondoTerminos.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="p-6 max-w-3xl w-full bg-[#FB8500] text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-[#FFFFFF]">Política de Privacidad</h1>
        <p className="mb-4">
          Nos tomamos en serio tu privacidad y estamos comprometidos con la protección de tu información personal. En esta política, explicamos cómo recopilamos, utilizamos y protegemos tus datos.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">1. Información que Recopilamos</h2>
        <p className="mb-4">
          Podemos recopilar información personal como tu nombre, correo electrónico y otros datos cuando utilizas nuestro sitio web o nuestros servicios.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">2. Uso de la Información</h2>
        <p className="mb-4">
          La información recopilada se utiliza para mejorar nuestros servicios, personalizar tu experiencia y comunicarnos contigo cuando sea necesario.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">3. Protección de Datos</h2>
        <p className="mb-4">
          Implementamos medidas de seguridad para proteger tu información contra accesos no autorizados, alteraciones o divulgaciones indebidas.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">4. Compartición de Datos</h2>
        <p className="mb-4">
          No vendemos ni compartimos tu información personal con terceros, salvo en los casos en los que sea necesario para proporcionar nuestros servicios o cumplir con obligaciones legales.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">5. Tus Derechos</h2>
        <p className="mb-4">
          Tienes derecho a acceder, modificar o eliminar tus datos personales. Si deseas ejercer estos derechos, puedes contactarnos en{" "}
          <a href="mailto:soporte@ejemplo.com" className="text-[#FFD700] underline">soporte@eventconnect.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">6. Cambios en la Política</h2>
        <p>
          Nos reservamos el derecho de actualizar esta política en cualquier momento. Te recomendamos revisar esta página periódicamente.
        </p>

        <button
          className="mt-6 w-full px-6 py-3 bg-[#005F73] text-white rounded-md hover:bg-[#003d4c] transition"
          onClick={() => navigate("/")}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
