import React, { useState } from "react";
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
import { LoadScript } from "@react-google-maps/api";
import config from "./config/config";

const API_GOOGLE_MAPS_KEY = config.googleMapsApiKey;

export default function DialogEventos() {
  const [evento, setEvento] = useState({
    nombre: "",
    fecha: "",
    ubicacion: "",
    latitud: "",
    longitud: "",
    descripcion: "",
    categoria: ""
  });

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleUbicacionChange = (place) => {
    if (place && place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setEvento({
        ...evento,
        ubicacion: place.formatted_address,
        latitud: lat,
        longitud: lng
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4">Crear Evento</Button>
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
            <Input id="nombre" name="nombre" value={evento.nombre} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="fecha" className="text-right">Fecha</Label>
            <Input id="fecha" name="fecha" type="date" value={evento.fecha} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ubicacion" className="text-right">Ubicación</Label>
            {/* <LoadScript googleMapsApiKey={API_GOOGLE_MAPS_KEY}> */}
            <GooglePlacesAutocomplete
              apiKey={API_GOOGLE_MAPS_KEY}
              onPlaceSelected={handleUbicacionChange}
              options={{
                types: ["geocode"],
                componentRestrictions: { country: "es" }
              }}
              className="col-span-3 w-full border rounded-md px-3 py-2"
            />
            {/* </LoadScript> */}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">Descripción</Label>
            <Textarea id="descripcion" name="descripcion" value={evento.descripcion} onChange={handleChange} className="col-span-3 resize-none" />
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
        </div>
        <DialogFooter>
          <Button onClick={() => console.log("Evento creado:", evento)}>Crear Evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
