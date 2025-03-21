import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function RegisterForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    correo: "",
    username: "",
    fechaNacimiento: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    //TODO : Logica de registro
    console.log("Datos de registro:", formData);
    setError("");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crear cuenta</CardTitle>
          <CardDescription>
            Regístrate completando el siguiente formulario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">

              {/*Nombre y Primer Apellido */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apellido1">Primer Apellido</Label>
                  <Input
                    id="apellido1"
                    name="apellido1"
                    type="text"
                    placeholder="Primer apellido"
                    value={formData.apellido1}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Segundo Apellido */}
              <div className="grid gap-2">
                <Label htmlFor="apellido2">Segundo Apellido</Label>
                <Input
                  id="apellido2"
                  name="apellido2"
                  type="text"
                  placeholder="Segundo apellido (opcional)"
                  value={formData.apellido2}
                  onChange={handleChange}
                />
              </div>
              {/* Correo electrónico */}
              <div className="grid gap-2">
                <Label htmlFor="correo">Correo electrónico</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Nombre de usuario */}
              <div className="grid gap-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Fecha de nacimiento */}
              <div className="grid gap-2">
                <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Contraseña */}
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Repetir contraseña */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Repetir Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Gestión de errores */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <div>
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </div>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-muted-foreground">
        Al registrarte, aceptas nuestros{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Términos de Servicio
        </a>{" "}
        y{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Política de Privacidad
        </a>.
      </div>
    </div>
  );
}
