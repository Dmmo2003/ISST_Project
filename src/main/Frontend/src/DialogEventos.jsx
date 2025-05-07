import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import GooglePlacesAutocomplete from "react-google-autocomplete";
import config from "./config/config";
import { crearEvento } from "./api/eventos";
import { UserContext } from "./context/UserContext";

const API_GOOGLE_MAPS_KEY = config.googleMapsApiKey;

export default function DialogEventos() {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  const [evento, setEvento] = useState({
    nombre: "",
    fecha: "", // Asegúrate de formatear la fecha correctamente
    ubicacion: "",
    organizadorId: "", // El ID del organizador (usuario) que está creando el evento
    descripcion: "",
    categoria: "",
    precio: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prev) => ({
      ...prev,
      [name]: value,
      organizadorId: user.id, // Aseguramos que el organizador siempre sea el usuario actual
    }));
  };

  const handleUbicacionChange = (place) => {
    if (place && place.geometry) {
      setEvento((prev) => ({
        ...prev,
        ubicacion: place.formatted_address,
      }));
    }
  };

  const handleCrearEvento = async () => {
    if (!evento.nombre || !evento.fecha || !evento.ubicacion || !evento.descripcion || !evento.categoria || !evento.precio) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError(null); // Limpiar errores previos
    setLoading(true);

    try {
      await crearEvento(evento);
      setEvento({
        nombre: "",
        fecha: "",
        ubicacion: "",
        descripcion: "",
        categoria: "",
        precio: "",
        organizador: user.id,
      });
      setLoading(false);
      setOpen(false); // Cierra el diálogo
      window.location.reload(); // Recarga la página
      // onClose();

    } catch (err) {
      console.error("Error al crear el evento:", err);
      setLoading(false);
      setError("Hubo un problema al crear el evento. Intenta nuevamente.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mt-4 bg-[#FB8500] text-[#023047] hover:bg-[#023047] hover:text-[#FB8500]">Crear Evento</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Evento</DialogTitle>
          <DialogDescription>
            Completa los detalles de tu evento y presiona "Crear Evento".
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={evento.nombre}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nombre del evento"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha" className="text-right">Fecha</Label>
            <Input
              id="fecha"
              name="fecha"
              type="date"
              value={evento.fecha}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ubicacion" className="text-right">Ubicación</Label>
            <GooglePlacesAutocomplete
              apiKey={API_GOOGLE_MAPS_KEY}
              onPlaceSelected={handleUbicacionChange}
              options={{
                types: ["geocode"],
                componentRestrictions: { country: "es" }
              }}
              className="col-span-3 w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={evento.descripcion}
              onChange={handleChange}
              className="col-span-3 resize-none"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Categoría</Label>
            <Select onValueChange={(value) => setEvento({ ...evento, categoria: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Música">Música</SelectItem>
                <SelectItem value="Tecnología">Tecnología</SelectItem>
                <SelectItem value="Festival">Festival</SelectItem>
                <SelectItem value="Programación">Programación</SelectItem>
                <SelectItem value="Arte">Arte</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="precio" className="text-right">Precio (€)</Label>
            <Input
              id="precio"
              name="precio"
              type="number"
              min="0"
              step="0.01"
              value={evento.precio}
              onChange={handleChange}
              className="col-span-3"
              placeholder="0.00"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <DialogFooter>
          <Button onClick={handleCrearEvento} disabled={loading}>
            {loading ? "Creando..." : "Crear Evento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}