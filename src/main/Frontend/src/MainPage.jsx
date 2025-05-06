// import { React, useState, useEffect, useContext } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./context/UserContext";

// const images = [
//   "/images/event1.jpg",
//   "/images/event2.jpg",
//   "/images/event3.jpg",
//   "/images/event4.jpg",
//   "/images/event5.jpg"
// ];

// const testimonials = [
//   `"He probado esta web muchas veces y me encanta, 100% recomendado." -Ana, 25 años.`,
//   `"Esta app ha facilitado mi vida al encontrar eventos que me interesan." -Carlos, 30 años.`,
//   `"Muy fácil de usar y he conocido mucha gente interesante." -Lucía, 28 años.`,
//   `"Excelente plataforma, siempre encuentro eventos cercanos a mi." -José, 35 años.`,
//   `"Me ayudó a asistir a conferencias que no me quería perder." -María, 26 años.`
// ];

// const MainPage = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const navigate = useNavigate(); // Hook de navegación
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 10000);

//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 10000);

//     return () => {
//       clearInterval(interval);
//       clearInterval(testimonialInterval);
//     };
//   }, []);

//   const handleButtonClick = () => {
//     if (user) {
//       // Si el usuario ya esta autenticado, navega al mapa de eventos
//       navigate('/eventos');
//     } else {
//       // Si el usuario no esta autenticado, navega a la página de login
//       navigate('/register');
//     }

//     // // Verifica si el usuario está autenticado
//     // const userEmail = localStorage.getItem('userEmail');
//     // if (userEmail) {
//     //   // Si está autenticado, navega al mapa de eventos
//     //   navigate('/eventos');
//     // } else {
//     //   // Si no está autenticado, navega a la página de registro
//     //   navigate('/register');
//     // }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       {/* Sección central con fondo dinámico */}
//       <div className="flex-1 relative overflow-hidden flex items-center justify-between px-10">
//         {/* Imágenes de fondo */}
//         <div className="absolute top-0 left-0 w-full h-full">
//           {images.map((src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt={`Evento ${index + 1}`}
//               className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
//             />
//           ))}
//         </div>

//         {/* Columna izquierda con texto */}
//         <div className="bg-[#FB8500]/70 p-8 w-[30%] h-full absolute top-0 left-0 z-10 flex flex-col justify-between">
//           {/* Imagen logoL */}
//           <div className="mb-8">
//             <img src="/images/logoL.png" alt="Logo L" className="w-96 mx-auto rounded-xl" />
//           </div>

//           {/* Título */}
//           <h2 className="text-3xl font-bold text-center text-white mb-10">
//             Únete a la mejor comunidad de eventos del mundo hoy mismo
//           </h2>

//           {/* Descripción */}
//           <p className="text-lg text-center text-white mb-10">
//             EventConnect es la plataforma definitiva para descubrir, unirte y participar en eventos de todo tipo. Ya sea que estés buscando actividades locales o eventos internacionales, ¡tenemos algo para ti! Únete hoy y comienza a explorar.
//           </p>

//           {/* Testimonios */}
//           <div className="text-center text-white font-semibold text-xl">
//             <p>{testimonials[currentTestimonial]}</p>
//           </div>
//         </div>

//         {/* Botón con frase y "Comencemos" */}
//         <div className="ml-auto mr-[162px]">
//           <Button
//             className="bg-[#FB8500] text-white text-4xl px-16 py-8 rounded-md shadow-md hover:bg-orange-600 relative z-30 text-center"
//             onClick={handleButtonClick} // Evento de clic
//           >
//             <div className="block">¡Comencemos!</div>
//           </Button>
//         </div>
//       </div>

//       {/* Sección inferior con información legal */}
//       <div className="bg-gray-800 text-white p-4 mt-auto">
//         <div className="max-w-screen-xl mx-auto flex justify-between items-center">
//           {/* Información legal */}
//           <p className="text-sm">© 2025 EventConnect. Todos los derechos reservados.</p>
//           <div className="flex gap-10">
//             <a href="/terms" className="text-blue-400 text-sm">Términos y condiciones</a>
//             <a href="/privacy" className="text-blue-400 text-sm">Política de privacidad</a>
//             <a href="mailto:contacto@eventconnect.com" className="text-blue-400 text-sm">Contacto</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;









// import { useState, useEffect, useContext } from "react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "./context/UserContext";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";

// const images = [
//   "/images/event1.jpg",
//   "/images/event2.jpg",
//   "/images/event3.jpg",
//   "/images/event4.jpg",
//   "/images/event5.jpg",
//   "/images/event6.jpg",

// ];

// const testimonials = [
//   `"He probado esta web muchas veces y me encanta, 100% recomendado." -Ana, 25 años.`,
//   `"Esta app ha facilitado mi vida al encontrar eventos que me interesan." -Carlos, 30 años.`,
//   `"Muy fácil de usar y he conocido mucha gente interesante." -Lucía, 28 años.`,
//   `"Excelente plataforma, siempre encuentro eventos cercanos a mi." -José, 35 años.`,
//   `"Me ayudó a asistir a conferencias que no me quería perder." -María, 26 años.`
// ];

// export default function MainPage() {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const navigate = useNavigate();
//   const { user } = useContext(UserContext);

//   useEffect(() => {
//     const imageInterval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 5000);

//     const testimonialInterval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => {
//       clearInterval(imageInterval);
//       clearInterval(testimonialInterval);
//     };
//   }, []);

//   const handleButtonClick = () => {
//     navigate(user ? "/eventos" : "/register");
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Contenido principal */}
//       <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-center lg:justify-between overflow-hidden">
//         {/* Fondo dinámico */}
//         <div className="absolute inset-0">
//           <AnimatePresence>
//             <motion.img
//               key={currentImage}
//               src={images[currentImage]}
//               alt={`Evento ${currentImage + 1}`}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 1 }}
//               className="absolute inset-0 w-full h-full object-cover object-center"
//             />
//           </AnimatePresence>
//         </div>

//         {/* Panel informativo */}
//         <motion.div
//           initial={{ x: -100, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10 bg-orange-500/80 p-4 lg:p-8 w-full lg:max-w-md h-auto lg:h-full flex flex-col justify-center items-center lg:items-start lg:rounded-r-2xl backdrop-blur-md shadow-xl mt-16 lg:mt-0"
//         >
//           <div className="mb-4 lg:mb-8">
//             <img 
//               src="/images/logoL.png" 
//               alt="Logo" 
//               className="w-48 lg:w-72 mx-auto rounded-xl lg:rounded-2xl shadow-md"
//             />
//           </div>

//           <h2 className="text-xl lg:text-3xl font-bold text-center text-white mb-4 lg:mb-6 px-2">
//             Únete a la mejor comunidad de eventos
//           </h2>

//           <p className="text-sm lg:text-lg text-white text-center mb-4 lg:mb-6 px-2">
//             Descubre, únete y participa en eventos de todo tipo
//           </p>

//           {/* Testimonios */}
//           <Card className="bg-white/10 border-none shadow-none w-full max-w-xs lg:max-w-none">
//             <CardContent className="p-2 lg:p-4 text-center text-white text-xs lg:text-base font-medium italic">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={currentTestimonial}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.8 }}
//                 >
//                   {testimonials[currentTestimonial]}
//                 </motion.p>
//               </AnimatePresence>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Botón de acción */}
//         <motion.div
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="relative z-10 w-full lg:w-auto flex justify-center lg:block mt-8 lg:mt-0 mb-8 lg:mb-0"
//         >
//           <Button
//             className="bg-[#FB8500] text-white text-xl lg:text-4xl px-8 lg:px-16 py-4 lg:py-8 rounded-lg lg:rounded-md shadow-md hover:bg-orange-600 mx-4 lg:mx-0"
//             onClick={handleButtonClick}
//           >
//             ¡Comencemos!
//           </Button>
//         </motion.div>
//       </div>

//       {/* Footer responsive */}
//       <footer className="bg-gray-900 text-white py-4 px-2">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-2 text-xs lg:text-sm">
//           <p className="order-2 md:order-1">© 2025 EventConnect. Todos los derechos reservados.</p>
//           <div className="order-1 md:order-2 flex flex-wrap justify-center gap-2 lg:gap-6">
//             <a href="/terms" className="text-blue-400 hover:underline">Términos</a>
//             <a href="/privacy" className="text-blue-400 hover:underline">Privacidad</a>
//             <a href="mailto:contacto@eventconnect.com" className="text-blue-400 hover:underline">Contacto</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }




import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const images = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
  "/images/event4.jpg",
  "/images/event5.jpg",
  "/images/event6.jpg",

];

const testimonials = [
  `"He probado esta web muchas veces y me encanta, 100% recomendado." - Ana, 25 años.`,
  `"Esta app ha facilitado mi vida al encontrar eventos que me interesan." - Carlos, 30 años.`,
  `"Muy fácil de usar y he conocido mucha gente interesante." - Lucía, 28 años.`,
  `"Excelente plataforma, siempre encuentro eventos cercanos a mí." - José, 35 años.`,
  `"Me ayudó a asistir a conferencias que no me quería perder." - María, 26 años.`
];

export default function MainPage() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(imageInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const handleButtonClick = () => {
    navigate(user ? "/eventos" : "/register");
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Fondo dinámico corregido */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence>
          {images.map((img, index) => (
            <motion.img
              key={index}
              src={img}
              alt={`Evento ${index + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentImage ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: -1 }}
            />
          ))}
        </AnimatePresence>
      </div>


      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col lg:flex-row flex-1 items-center justify-between min-h-screen overflow-hidden">

        {/* Panel informativo */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-orange-500/80 p-6 sm:p-8 w-full max-w-md lg:h-full flex flex-col justify-between shadow-xl rounded-none lg:rounded-r-2xl backdrop-blur-md"
        >

          {/* Panel informativo */}
          <div className="mb-4 sm:mb-8">
            <img src="/images/logoL.png" alt="Logo L" className="w-48 sm:w-72 mx-auto rounded-2xl shadow-xl" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-4 sm:mb-6">
            Únete a la mejor comunidad de eventos del mundo hoy mismo
          </h2>

          <p className="text-base sm:text-lg text-white text-center mb-4 sm:mb-6">
            EventConnect es la plataforma definitiva para descubrir, unirte y participar en eventos de todo tipo. ¡Únete hoy y comienza a explorar!
          </p>

          <Card className="bg-white/10 border-none shadow-none">
            <CardContent className="p-4 text-center text-white font-medium italic">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTestimonial}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {testimonials[currentTestimonial]}
                </motion.p>
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Botón de acción */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 my-6 lg:my-0 lg:mr-16"
        >
          <div className="mx-auto lg:mr-[162px]">
            <Button
              className="bg-[#FB8500] text-white text-xl sm:text-2xl lg:text-4xl px-8 sm:px-12 lg:px-16 py-4 sm:py-6 lg:py-8 rounded-md shadow-md hover:bg-orange-600"
              onClick={handleButtonClick}
            >
              ¡Comencemos!
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 z-10" >
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-center">
          <p className="mb-2 md:mb-0">© 2025 EventConnect. Todos los derechos reservados.</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-6">
            <a href="/terms" className="text-blue-400 hover:underline">Términos y condiciones</a>
            <a href="/privacy" className="text-blue-400 hover:underline">Política de privacidad</a>
            <a href="mailto:contacto@eventconnect.com" className="text-blue-400 hover:underline">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
