// import React, { useState, useContext } from "react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
// import { AlertCircle, Loader2 } from "lucide-react";
// import { registrarUsuario } from "../../api/auth";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/UserContext";

// export function RegisterForm({ className, ...props }) {
//   const [formData, setFormData] = useState({
//     nombre: '',
//     primer_apellido: '',
//     segundo_apellido: '',
//     correo: '',
//     nombreUsuario: '',
//     fechaNacimiento: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   const { login } = useContext(UserContext);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       setError("Las contraseñas no coinciden");
//       return;
//     }

//     setLoading(true);

//     try {


//       const usuario = {
//         nombre: formData.nombre,
//         primer_Apellido: formData.primer_apellido,
//         segundo_Apellido: formData.segundo_apellido,
//         correo: formData.correo,
//         nombreUsuario: formData.nombreUsuario,
//         fechaNacimiento: formData.fechaNacimiento,
//         contraseña: formData.password,
//         tipo: 'persona',
//         CIF: null,
//       };

//       const data = await registrarUsuario(usuario);

//       if (data) {
//         localStorage.setItem('usuario', JSON.stringify(data));
//         login(data);
//         setSuccessMessage("Registro exitoso, redirigiendo...");
//         setError("");
//         setTimeout(() => navigate("/eventos"), 2000);
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message ||
//         err.message ||
//         "Error en el registro. Por favor verifica tus datos.";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader className="text-center">
//           <CardTitle className="text-xl">Crear cuenta</CardTitle>
//           <CardDescription>
//             Regístrate completando el siguiente formulario.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit}>
//             <div className="grid gap-6">

//               {/* Nombre y Primer Apellido */}
//               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <div className="grid gap-2">
//                   <Label htmlFor="nombre">Nombre</Label>
//                   <Input
//                     id="nombre"
//                     name="nombre"
//                     type="text"
//                     placeholder="Tu nombre"
//                     value={formData.nombre}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//                 <div className="grid gap-2">
//                   <Label htmlFor="primer_apellido">Primer Apellido</Label>
//                   <Input
//                     id="apellido1"
//                     name="primer_apellido"
//                     type="text"
//                     placeholder="Primer apellido"
//                     value={formData.primer_apellido}
//                     onChange={handleChange}
//                     required
//                     className="bg-white text-black placeholder-black"
//                   />
//                 </div>
//               </div>

//               {/* Segundo Apellido */}
//               <div className="grid gap-2">
//                 <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
//                 <Input
//                   id="apellido2"
//                   name="segundo_apellido"
//                   type="text"
//                   placeholder="Segundo apellido (opcional)"
//                   value={formData.segundo_apellido}
//                   onChange={handleChange}
//                   className="bg-white text-black placeholder-black"
//                 />
//               </div>

//               {/* Correo electrónico */}
//               <div className="grid gap-2">
//                 <Label htmlFor="correo">Correo electrónico</Label>
//                 <Input
//                   id="correo"
//                   name="correo"
//                   type="email"
//                   placeholder="correo@ejemplo.com"
//                   value={formData.correo}
//                   onChange={handleChange}
//                   required
//                   className="bg-white text-black placeholder-black"
//                 />
//               </div>

//               {/* Nombre de usuario */}
//               <div className="grid gap-2">
//                 <Label htmlFor="nombreUsuario">Nombre de usuario</Label>
//                 <Input
//                   id="nombreUsuario"
//                   name="nombreUsuario"
//                   type="text"
//                   placeholder="Nombre de usuario"
//                   value={formData.nombreUsuario}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Fecha de nacimiento */}
//               <div className="grid gap-2">
//                 <Label htmlFor="fechaNacimiento">Fecha de Nacimiento</Label>
//                 <Input
//                   id="fechaNacimiento"
//                   name="fechaNacimiento"
//                   type="date"
//                   value={formData.fechaNacimiento}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Contraseña */}
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Contraseña</Label>
//                 <Input
//                   id="password"
//                   name="password"
//                   type="password"
//                   placeholder="Contraseña"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Repetir contraseña */}
//               <div className="grid gap-2">
//                 <Label htmlFor="confirmPassword">Repetir Contraseña</Label>
//                 <Input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   placeholder="Repite la contraseña"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Mensajes de error y éxito */}
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4 " />
//                   <AlertTitle>Error</AlertTitle>
//                   <AlertDescription>
//                     {error}
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {successMessage && (
//                 <Alert variant="success">
//                   <AlertCircle className="h-4 w-4 mr-2" />
//                   <AlertTitle>Éxito</AlertTitle>
//                   <AlertDescription>
//                     {successMessage}
//                   </AlertDescription>
//                 </Alert>
//               )}

//               {/* Botón de Registro */}
//               {loading ? (
//                 <Button disabled className="w-full">
//                   <Loader2 className="animate-spin" />
//                   Registrando...
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full bg-[#FB8500] text-black hover:bg-[#FFB703]">
//                   Registrarse
//                 </Button>
//               )}

//               <div className="text-center text-sm">
//                 ¿Ya tienes una cuenta?{" "}
//                 <a href="/login" className="underline underline-offset-4">
//                   Inicia sesión
//                 </a>
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//       <div className="text-center text-xs text-muted-foreground">
//         Al registrarte, aceptas nuestros{" "}
//         <a href="/terms" className="underline underline-offset-4 hover:text-primary">
//           Términos de Servicio
//         </a>{" "}
//         y{" "}
//         <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
//           Política de Privacidad
//         </a>.
//       </div>
//     </div>
//   );
// }

import React, { useState, useContext } from "react";
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
import { UserContext } from "../../context/UserContext";

export function RegisterForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    correo: '',
    nombreUsuario: '',
    fechaNacimiento: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Las contraseñas no coinciden");
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const usuario = {
  //       nombre: formData.nombre,
  //       primer_Apellido: formData.primer_apellido,
  //       segundo_Apellido: formData.segundo_apellido,
  //       correo: formData.correo,
  //       nombreUsuario: formData.nombreUsuario,
  //       fechaNacimiento: formData.fechaNacimiento,
  //       contraseña: formData.password,
  //       tipo: 'persona',
  //       CIF: null,
  //     };

  //     const data = await registrarUsuario(usuario);

  //     if (data) {
  //       localStorage.setItem('usuario', JSON.stringify(data));
  //       login(data);
  //       setSuccessMessage("Registro exitoso, redirigiendo...");
  //       setError("");
  //       setTimeout(() => navigate("/eventos"), 2000);
  //     }
  //   } catch (err) {
  //     const errorMessage = err.response?.data?.message || err.message || "Error en el registro. Por favor verifica tus datos.";
  //     setError(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
  
    // Validación de la contraseña (mínimo 8 caracteres, al menos una mayúscula y un número)
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");
      return;
    }
  
    setLoading(true);
  
    try {
      const usuario = {
        nombre: formData.nombre,
        primer_Apellido: formData.primer_apellido,
        segundo_Apellido: formData.segundo_apellido,
        correo: formData.correo,
        nombreUsuario: formData.nombreUsuario,
        fechaNacimiento: formData.fechaNacimiento,
        contraseña: formData.password,
        tipo: 'persona',
        CIF: null,
      };
  
      const data = await registrarUsuario(usuario);
  
      if (data) {
        localStorage.setItem('usuario', JSON.stringify(data));
        login(data);
        setSuccessMessage("Registro exitoso, redirigiendo...");
        setError("");
        setTimeout(() => navigate("/eventos"), 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Error en el registro. Por favor verifica tus datos.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className={cn("grid gap-6 w-full max-w-2xl mx-auto", className)} {...props}>
      <Card className="shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Crear cuenta</CardTitle>
          <CardDescription>Regístrate completando el siguiente formulario</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Tu nombre" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="primer_apellido">Primer Apellido</Label>
                <Input id="primer_apellido" name="primer_apellido" value={formData.primer_apellido} onChange={handleChange} required placeholder="Primer apellido" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="segundo_apellido">Segundo Apellido</Label>
              <Input id="segundo_apellido" name="segundo_apellido" value={formData.segundo_apellido} onChange={handleChange} placeholder="Segundo apellido (opcional)" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="correo">Correo electrónico</Label>
              <Input id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} required placeholder="correo@ejemplo.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nombreUsuario">Nombre de usuario</Label>
              <Input id="nombreUsuario" name="nombreUsuario" value={formData.nombreUsuario} onChange={handleChange} required placeholder="Nombre de usuario" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <Input id="fechaNacimiento" name="fechaNacimiento" type="date" value={formData.fechaNacimiento} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} required placeholder="Contraseña" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Repetir contraseña</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repite la contraseña" />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {successMessage && (
              <Alert variant="success">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Éxito</AlertTitle>
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-[#FB8500] text-black hover:bg-[#FFB703]" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" /> Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </Button>

            <p className="text-center text-sm mt-4">
              ¿Eres una empresa?{' '}
              <a href="/registro-empresa" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">Pincha aquí</a>
            </p>

            <p className="text-center text-sm">
              ¿Ya tienes una cuenta?{' '}
              <a href="/login" className="underline underline-offset-4 text-blue-600 hover:text-blue-800">Inicia sesión</a>
            </p>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground">
        Al registrarte, aceptas nuestros{' '}
        <a href="/terms" className="underline underline-offset-4 hover:text-primary">Términos de Servicio</a>{' '}y{' '}
        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Política de Privacidad</a>.
      </p>
    </div>
  );
}
