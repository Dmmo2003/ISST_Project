import React, { useState, useContext } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UserContext } from "./context/UserContext";
import { crearGrupo } from "./api/grupos";

export default function DialogGrupos({ evento, onGrupoCreado }) {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [grupo, setGrupo] = useState({
    nombre: "",
    descripcion: "",
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGrupo((prev) => ({
      ...prev,
      [name]: value,
      admin: user.id,
    }));
  };

/*   const handleCrearGrupo = async () => {
    if (!grupo.nombre || !grupo.descripcion) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      const grupoConIds = {
        ...grupo,
        admin: { id: user.id },
        evento: { id: evento.id }
      };

      formData.append("grupo", new Blob([JSON.stringify(grupoConIds)], { type: "application/json" }));
      if (imagenFile) formData.append("imagen", imagenFile);

      await crearGrupo(grupoConIds, imagenFile);



      setGrupo({ nombre: "", descripcion: "" });
      setImagenFile(null);
      setOpen(false);
      onGrupoCreado?.(); // callback opcional para recargar lista de grupos
    } catch (err) {
      console.error("Error al crear grupo:", err);
      setError("Hubo un error al crear el grupo.");
    } finally {
      setLoading(false);
    }
  };
 */

  const handleCrearGrupo = async () => {
    if (!grupo.nombre || !grupo.descripcion) {
      setError("Todos los campos son obligatorios.");
      return;
    }
  
    setError(null);
    setLoading(true);
  
    try {
      const grupoConIds = {
        nombre: grupo.nombre,
        descripcion: grupo.descripcion,
        admin: { id: user.id },
        evento: { id: evento.id },
      };
  
      await crearGrupo(grupoConIds, imagenFile);
  
      setGrupo({ nombre: "", descripcion: "", admin: "" });
      setImagenFile(null);
      setOpen(false);
      onGrupoCreado?.(); // refresca lista si hace falta
    } catch (err) {
      console.error("Error al crear el grupo:", err);
      setError("Hubo un problema al crear el grupo.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-[#023047] hover:bg-[#014572] text-white">Crear Grupo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] text-[#023047]">
        <DialogHeader>
          <DialogTitle>Nuevo Grupo</DialogTitle>
          <DialogDescription>Crea un grupo asociado al evento "{evento.nombre}".</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">Nombre</Label>
            <Input
              id="nombre"
              name="nombre"
              value={grupo.nombre}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Nombre del grupo"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="descripcion" className="text-right">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={grupo.descripcion}
              onChange={handleChange}
              className="col-span-3 resize-none"
              placeholder="¿De qué trata el grupo?"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="imagen" className="text-right">Imagen</Label>
            <Input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(e) => setImagenFile(e.target.files[0])}
              className="col-span-3"
            />
          </div>
          {error && <p className="text-red-500 col-span-4 text-center">{error}</p>}
        </div>

        <DialogFooter>
          <Button onClick={handleCrearGrupo} disabled={loading} className="bg-[#FB8500] hover:bg-[#FFB703]">
            {loading ? "Creando..." : "Crear Grupo"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
