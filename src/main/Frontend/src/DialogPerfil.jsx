import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function DialogPerfil() {
    const [open, setOpen] = useState(false);

    // Estado para el formulario de edición
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuarioName, setUsuarioName] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [error, setError] = useState('');

    const handleActualizarUsuario = async () => {
        if (contraseña && contraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            setError('');
            console.log('Guardando usuario:', { nombre, apellido, usuarioName, correo });

            // Simulación de actualización exitosa
            setOpen(false);
        } catch (error) {
            setError('Error al actualizar el perfil. Inténtalo de nuevo.');
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-white">
                    Editar perfil
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[450px] bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                        Editar Perfil
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Modifica la información de tu perfil.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombre" className="text-right">Nombre</Label>
                        <Input
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="col-span-3"
                            placeholder="Tu nombre"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="apellido" className="text-right">Apellido</Label>
                        <Input
                            id="apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            className="col-span-3"
                            placeholder="Tu apellido"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="usuario" className="text-right">Usuario</Label>
                        <Input
                            id="usuario"
                            value={usuarioName}
                            onChange={(e) => setUsuarioName(e.target.value)}
                            disabled
                            className="col-span-3 bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="correo" className="text-right">Correo</Label>
                        <Input
                            id="correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            className="col-span-3"
                            placeholder="correo@ejemplo.com"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="contraseña" className="text-right">Contraseña</Label>
                        <Input
                            id="contraseña"
                            type="password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            className="col-span-3"
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="confirmarContraseña" className="text-right">Confirmar</Label>
                        <Input
                            id="confirmarContraseña"
                            type="password"
                            value={confirmarContraseña}
                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                            className="col-span-3"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button
                        onClick={handleActualizarUsuario}
                        className="bg-primary hover:bg-primary/90 text-white"
                        disabled={!nombre || !correo}
                    >
                        Guardar cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
