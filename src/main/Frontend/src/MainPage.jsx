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

const MainPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
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
      <div className="flex-1 relative overflow-hidden">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Evento ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      
      {/* Espacio inferior reservado */}
      <div className="h-20 bg-gray-200"></div>
    </div>
  );
};

export default MainPage;
