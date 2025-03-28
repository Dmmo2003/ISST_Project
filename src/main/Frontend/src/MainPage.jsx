import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Search } from "lucide-react";

const images = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
  "/images/event4.jpg",
  "/images/event5.jpg"
];

const testimonials = [
  "He probado esta web en varias ocasiones y me encanta, 100% recomendado. -Ana María, 25 años.",
  "Esta app ha facilitado mi vida al encontrar eventos que me interesan. -Carlos, 30 años.",
  "Muy fácil de usar y he conocido mucha gente interesante. -Lucía, 28 años.",
  "Excelente plataforma, siempre encuentro eventos cercanos a mi. -José, 35 años.",
  "Me ayudó a asistir a conferencias que no me quería perder. -María, 26 años."
];

const MainPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
        {/* Logo y nombre */}
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">EventConnect</span>
        </div>
        
        {/* Barra de búsqueda */}
        <div className="flex-1 mx-4 max-w-md relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input type="text" placeholder="Buscar eventos..." className="w-full bg-gray-800 text-white border-gray-600 pl-10" />
        </div>
        
        {/* Botón de login */}
        <Button className="flex items-center gap-2 bg-orange-500 text-white hover:bg-orange-600">
          <User className="w-5 h-5" />
          <span className="block">Login</span>
        </Button>
      </nav>
      
      {/* Sección central con fondo dinámico */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-between px-10">
        {/* Imágenes de fondo */}
        <div className="absolute top-0 left-0 w-full h-full">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Evento ${index + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        {/* Columna izquierda con texto */}
        <div className="bg-[#FFB703] p-8 w-1/3 relative z-10">
          {/* Título */}
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Únete a la mejor comunidad de eventos del mundo hoy mismo
          </h2>

          {/* Descripción */}
          <p className="text-lg text-center text-white mb-8">
            EventConnect es la plataforma definitiva para descubrir, unirte y participar en eventos de todo tipo. Ya sea que estés buscando actividades locales o eventos internacionales, ¡tenemos algo para ti! Únete hoy y comienza a explorar.
          </p>

          {/* Testimonios */}
          <div className="text-center text-white font-semibold text-xl">
            <p>{testimonials[currentTestimonial]}</p>
          </div>
        </div>

        {/* Botón a la derecha */}
        <Button className="bg-orange-500 text-white text-4xl px-16 py-8 rounded-md shadow-md hover:bg-orange-600 relative z-30 -ml-10">
          Comencemos
        </Button>
      </div>
      
      {/* Espacio inferior reservado */}
      <div className="h-20 bg-gray-200"></div>
    </div>
  );
};

export default MainPage;
