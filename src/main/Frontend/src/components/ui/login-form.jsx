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



//TODO LLAMADA AL SERVER PARA OBTENER LA INFORMACION DEL USUARIO
export function LoginForm({ className, ...props }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
   
        // Verificar las credenciales
        console.log('Email:', email);
        console.log('Password:', password);
   
        if (email && password) {
            // Guardar las credenciales en localStorage
            localStorage.setItem('userEmail', email);
   
            // Mostrar un mensaje de éxito
            alert('Inicio de sesión exitoso');
            navigate('/');
        } else {
            alert('Por favor, ingresa tus credenciales');
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Inicia sesión con tu cuenta de GitHub o Google
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <Button variant="outline" className="w-full">
                                    Inicia sesión con GitHub
                                </Button>
                                <Button variant="outline" className="w-full">
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full">
                                    Iniciar sesión
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                No tienes una cuenta?{" "}
                                <a href="/register" className="underline underline-offset-4">
                                    Regístrate
                                </a>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
                Al continuar, aceptas los <a href="#">Términos y condiciones</a>{" "}
                y <a href="#">Políticas de privacidad</a>.
            </div>
        </div>
    );
}
