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
import { AlertCircle, Loader2 } from "lucide-react";
import { registrarUsuario } from "../../api/auth";
import { useNavigate } from "react-router-dom";

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
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      await registrarUsuario({
        nombre: formData.nombre,
        apellido1: formData.apellido1,
        apellido2: formData.apellido2,
        correo: formData.correo,
        username: formData.username,
        fechaNacimiento: formData.fechaNacimiento,
        password: formData.password,
      });

      setSuccessMessage("Registro exitoso, redirigiendo...");
      setError("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error en el registro");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#FB8500] text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Crear cuenta</CardTitle>
          <CardDescription className="text-white">
            Regístrate completando el siguiente formulario.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">

              {/* Nombre y Primer Apellido */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="nombre" className="text-white">Nombre</Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="bg-white text-black placeholder-black"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apellido1" className="text-white">Primer Apellido</Label>
                  <Input
                    id="apellido1"
                    name="apellido1"
                    type="text"
                    placeholder="Primer apellido"
                    value={formData.apellido1}
                    onChange={handleChange}
                    required
                    className="bg-white text-black placeholder-black"
                  />
                </div>
              </div>

              {/* Segundo Apellido */}
              <div className="grid gap-2">
                <Label htmlFor="apellido2" className="text-white">Segundo Apellido</Label>
                <Input
                  id="apellido2"
                  name="apellido2"
                  type="text"
                  placeholder="Segundo apellido (opcional)"
                  value={formData.apellido2}
                  onChange={handleChange}
                  className="bg-white text-black placeholder-black"
                />
              </div>

              {/* Correo electrónico */}
              <div className="grid gap-2">
                <Label htmlFor="correo" className="text-white">Correo electrónico</Label>
                <Input
                  id="correo"
                  name="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                  className="bg-white text-black placeholder-black"
                />
              </div>

              {/* Nombre de usuario */}
              <div className="grid gap-2">
                <Label htmlFor="username" className="text-white">Nombre de usuario</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="bg-white text-black placeholder-black"
                />
              </div>

              {/* Fecha de nacimiento */}
              <div className="grid gap-2">
                <Label htmlFor="fechaNacimiento" className="text-white">Fecha de Nacimiento</Label>
                <Input
                  id="fechaNacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  required
                  className="bg-white text-black placeholder-black"
                />
              </div>

              {/* Contraseña */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">Contraseña</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white text-black placeholder-black"
                />
              </div>

              {/* Repetir contraseña */}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword" className="text-white">Repetir Contraseña</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Repite la contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="bg-white text-black placeholder-black"
                />
              </div>

              {/* Mensajes de error y éxito */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4 " />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {successMessage && (
                <Alert variant="success">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <AlertTitle>Éxito</AlertTitle>
                  <AlertDescription>
                    {successMessage}
                  </AlertDescription>
                </Alert>
              )}

              {/* Botón de Registro */}
              {loading ? (
                <Button disabled className="bg-white text-[#FB8500]">
                  <Loader2 className="animate-spin" />
                  Registrando...
                </Button>
              ) : (
                <Button type="submit" className="w-full bg-white text-[#FB8500] hover:bg-gray-200">
                  Registrarse
                </Button>
              )}

              <div className="text-center text-sm text-white">
                ¿Ya tienes una cuenta?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Inicia sesión
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
