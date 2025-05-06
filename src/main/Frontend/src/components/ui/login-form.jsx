// src/components/ui/login-form.jsx
import { useState, useContext } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from "../../api/auth";
import { AlertCircle, Loader2 } from "lucide-react";
import {
    Alert, AlertDescription, AlertTitle,
} from "@/components/ui/alert";
import { UserContext } from "../../context/UserContext";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError("Por favor, ingresa tu correo y contraseña.");
            return;
        }

        setLoading(true);

        try {
            const usuario = { correo: email, contraseña: password };
            const data = await iniciarSesion(usuario);

            if (!data) {
                setError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
                return;
            }

            console.log("Usuario autenticado:", data); // Depuración opcional
            login(data);
            localStorage.setItem('usuario', JSON.stringify(data));
            localStorage.setItem('userId', data.id); // ✅ Esta línea garantiza que funcione /perfil
            navigate("/eventos");

        } catch (error) {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("max-w-md mx-auto space-y-6", className)} {...props}>
            <Card className="shadow-xl rounded-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Bienvenido de nuevo</CardTitle>
                    <CardDescription>Inicia sesión para continuar</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-3">
                            <Button type="button" className="w-full bg-black text-white hover:bg-neutral-800">
                                Iniciar sesión con GitHub
                            </Button>
                            <Button type="button" className="w-full bg-white text-black border hover:bg-gray-100">
                                Iniciar sesión con Google
                            </Button>
                        </div>

                        <div className="relative text-center text-sm text-muted-foreground">
                            <span className="relative z-10 bg-white px-3">O usa tu cuenta</span>
                            <div className="absolute inset-0 top-1/2 border-t border-border" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="password">Contraseña</Label>
                                <a href="#" className="text-sm text-primary underline underline-offset-4">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Tu contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary"
                                    aria-label="Mostrar/ocultar contraseña"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-[#FB8500] text-black hover:bg-[#FFB703]"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </Button>

                        <div className="text-center text-sm">
                            ¿No tienes una cuenta?{" "}
                            <a href="/register" className="underline underline-offset-4 hover:text-primary">
                                Regístrate
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}








































// import { useState, useContext } from 'react';
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useNavigate } from 'react-router-dom';
// import { iniciarSesion } from "../../api/auth";
// import { AlertCircle, Loader2 } from "lucide-react";
// import {
//     Alert,
//     AlertDescription,
//     AlertTitle,
// } from "@/components/ui/alert";

// import { UserContext } from "../../context/UserContext";

// export function LoginForm({ className, ...props }) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const {login} = useContext(UserContext);

//     const handleLogin = async (event) => {
//         event.preventDefault();

//         if (!email || !password) {
//             setError("Por favor, ingresa tu correo y contraseña.");
//             return;
//         }

//         setLoading(true);

//         try {
//             const usuario = { correo: email, contraseña: password };
//             const data = await iniciarSesion(usuario);

//             if (!data) {
//                 setError("Correo o contraseña incorrectos. Inténtalo de nuevo.");
//                 return;
//             } else {
//                 login(data);
//                 console.log(data);
//                 localStorage.setItem('usuario', JSON.stringify(data)); 
//                 alert("Inicio de sesión exitoso");
//                 navigate("/eventos");

//             }

//         } catch (error) {
//             setError("Credenciales incorrectas. Inténtalo de nuevo.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className={cn("flex flex-col gap-6", className)} {...props}>
//             <Card >
//                 <CardHeader className="text-center">
//                     <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
//                     <CardDescription>
//                         Inicia sesión con tu cuenta de GitHub o Google
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleLogin}>
//                         <div className="grid gap-6">
//                             <div className="flex flex-col gap-4">
//                                 <Button className="w-full">
//                                     Inicia sesión con GitHub
//                                 </Button>
//                                 <Button className="w-full">
//                                     Inicia sesión con Google
//                                 </Button>
//                             </div>
//                             <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
//                                 <span className="relative z-10 bg-background px-2 text-muted-foreground">
//                                     O ingresa tus credenciales
//                                 </span>
//                             </div>
//                             <div className="grid gap-6">
//                                 <div className="grid gap-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         placeholder="m@ejemplo.com"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="grid gap-2">
//                                     <div className="flex items-center">
//                                         <Label htmlFor="password">Contraseña</Label>
//                                         <a
//                                             href="#"
//                                             className="ml-auto text-sm underline-offset-4 hover:underline"
//                                         >
//                                             Olvidaste tu contraseña?
//                                         </a>
//                                     </div>
//                                     <Input
//                                         id="password"
//                                         type="password"
//                                         placeholder="Tu contraseña"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                 </div>

//                                 {/* Mensaje de error */}
//                                 {error && (
//                                     <Alert variant="destructive">
//                                         <AlertCircle className="h-4 w-4" />
//                                         <AlertTitle>Error</AlertTitle>
//                                         <AlertDescription>
//                                             {error}
//                                         </AlertDescription>
//                                     </Alert>
//                                 )}

//                                 {loading ? (
//                                     <Button disabled type='submit'>
//                                         <Loader2 className="animate-spin" />
//                                         Iniciando sesión
//                                     </Button>
//                                 ) : (
//                                     <Button type="submit" className="w-full bg-[#FB8500] text-black hover:bg-[#FFB703]">
//                                         Iniciar sesión
//                                     </Button>
//                                 )}
//                             </div>

//                             <div className="text-center text-sm">
//                                 ¿No tienes una cuenta?{" "}
//                                 <a href="/register" className="underline underline-offset-4">
//                                     Regístrate
//                                 </a>
//                             </div>
//                         </div>
//                     </form>
//                 </CardContent>
//             </Card>

//             <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
//                 Al continuar, aceptas los <a href="/terms">Términos y condiciones</a>{" "} y <a href="/privacy">Políticas de privacidad</a>.
//             </div>
//         </div>
//     );
// }

