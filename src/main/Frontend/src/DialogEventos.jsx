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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function DialogEventos() {
  const [evento, setEvento] = useState({
    nombre: "",
    fecha: "",
    ubicacion: "",
    descripcion: "",
    categoria: ""
  });

  const handleChange = (e) => {
    setEvento({ ...evento, [e.target.name]: e.target.value });
  };

  const handleCategoriaChange = (value) => {
    setEvento({ ...evento, categoria: value });
  };

  const handleSubmit = () => {
    console.log("Evento creado:", evento);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full mt-4" >Crear Evento</Button>
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
            <Input id="ubicacion" name="ubicacion" value={evento.ubicacion} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">Descripción</Label>
            <Textarea id="descripcion" name="descripcion" value={evento.descripcion} onChange={handleChange} className="col-span-3 resize-none" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Categoría</Label>
            <Select onValueChange={handleCategoriaChange}>
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
          <Button onClick={handleSubmit}>Crear Evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}