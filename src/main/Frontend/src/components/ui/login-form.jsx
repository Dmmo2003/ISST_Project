import { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from "../../api/auth";
import { AlertCircle, Loader2 } from "lucide-react";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";

export function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError("Por favor, ingresa tu correo y contraseña.");
            return;
        }

        setLoading(true);

        try {
            const data = await iniciarSesion(email, password);
            localStorage.setItem("token", data.token);
            alert("Inicio de sesión exitoso");
            navigate("/");
        } catch (error) {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="bg-[#FB8500] text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
                    <CardDescription className="text-white">
                        Inicia sesión con tu cuenta de GitHub o Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full bg-white text-[#FB8500] hover:bg-gray-200">
                                    Inicia sesión con GitHub
                                </Button>
                                <Button variant="outline" className="w-full bg-white text-[#FB8500] hover:bg-gray-200">
                                    Inicia sesión con Google
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white">
                                <span className="relative z-10 bg-[#FB8500] px-2 text-white">
                                    O ingresa tus credenciales
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-white">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="bg-white text-black placeholder-black"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password" className="text-white">Contraseña</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm text-white underline-offset-4 hover:underline"
                                        >
                                            Olvidaste tu contraseña?
                                        </a>
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Tu contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="bg-white text-black placeholder-black"
                                    />
                                </div>

                                {/* Mensaje de error */}
                                {error && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {error}
                                        </AlertDescription>
                                    </Alert>
                                )}

                                {loading ? (
                                    <Button disabled className="bg-white text-[#FB8500]">
                                        <Loader2 className="animate-spin" />
                                        Iniciando sesión
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-white text-[#FB8500] hover:bg-gray-200">
                                        Iniciar sesión
                                    </Button>
                                )}
                            </div>

                            <div className="text-center text-sm text-white">
                                ¿No tienes una cuenta?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Regístrate
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="text-balance text-center text-xs text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gray-300">
                Al continuar, aceptas los <a href="#">Términos y condiciones</a>{" "} y <a href="#">Políticas de privacidad</a>.
            </div>
        </div>
    );
}
