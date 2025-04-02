import React from "react";
import { useNavigate } from "react-router-dom";

const TermsAndConditions = () => {
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
        <h1 className="text-3xl font-bold mb-4 text-[#FFFFFF]">Términos y Condiciones</h1>
        <p className="mb-4">
          Bienvenido a nuestra plataforma. Al acceder y utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con alguno de ellos, te recomendamos que no utilices nuestro sitio web.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">1. Uso del Servicio</h2>
        <p className="mb-4">
          Nuestros servicios están destinados únicamente para uso personal y no comercial. No puedes copiar, distribuir o modificar el contenido sin autorización previa.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">2. Privacidad</h2>
        <p className="mb-4">
          Respetamos tu privacidad. Consulta nuestra{" "}
          <a href="/privacy" className="text-[#FFD700] underline">Política de Privacidad</a> para conocer cómo manejamos tu información.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">3. Responsabilidad</h2>
        <p className="mb-4">
          No nos hacemos responsables por daños o pérdidas derivadas del uso de nuestros servicios. El usuario es responsable de utilizar la plataforma de manera adecuada.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">4. Modificaciones</h2>
        <p className="mb-4">
          Nos reservamos el derecho de actualizar o modificar estos términos en cualquier momento. Es tu responsabilidad revisar esta página periódicamente.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-[#FFF]">5. Contacto</h2>
        <p>
          Si tienes preguntas sobre estos términos, puedes contactarnos en{" "}
          <a href="mailto:soporte@ejemplo.com" className="text-[#FFD700] underline">soporte@eventconnect.com</a>.
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

export default TermsAndConditions;
