import { useState, useContext } from 'react';
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

import { UserContext } from "../../context/UserContext";

export function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const {login} = useContext(UserContext);

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
            } else {
                login(data);
                console.log(data);
                localStorage.setItem('usuario', JSON.stringify(data)); 
                alert("Inicio de sesión exitoso");
                navigate("/eventos");

            }

        } catch (error) {
            setError("Credenciales incorrectas. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card >
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Bienvenido de nuevo</CardTitle>
                    <CardDescription>
                        Inicia sesión con tu cuenta de GitHub o Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button className="w-full">
                                    Inicia sesión con GitHub
                                </Button>
                                <Button className="w-full">
                                    Inicia sesión con Google
                                </Button>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    O ingresa tus credenciales
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <a
                                            href="#"
                                            className="ml-auto text-sm underline-offset-4 hover:underline"
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
                                    <Button disabled type='submit'>
                                        <Loader2 className="animate-spin" />
                                        Iniciando sesión
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-[#FB8500] text-black hover:bg-[#FFB703]">
                                        Iniciar sesión
                                    </Button>
                                )}
                            </div>

                            <div className="text-center text-sm">
                                ¿No tienes una cuenta?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Regístrate
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="text-balance text-center text-xs text-white text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                Al continuar, aceptas los <a href="#">Términos y condiciones</a>{" "} y <a href="#">Políticas de privacidad</a>.
            </div>
        </div>
    );
}
