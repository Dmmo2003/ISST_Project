import { useState, useContext, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from "../../api/auth";

import { AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserContext } from "../../context/UserContext";
import axios from 'axios';

export function LoginForm({ className, ...props }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      axios.post('http://localhost:8080/api/auth/google', { code })
        .then(response => {
          if (response.data) {
            login(response.data);
            window.location.href = "/eventos";
          } else {
            navigate('/login');
          }
        })
        .catch(error => {
          console.error('Error autenticando con Google:', error);
          navigate('/login');
        });
    }
  }, [login, navigate]);

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

      login(data);
      window.location.href = "/eventos";

    } catch (error) {
      setError("Credenciales incorrectas. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const clientId = "CLIENT_ID_AQUI";
    const redirectUri = "http://localhost:5173/login";
    const scope = "openid email profile";
    const responseType = "code";
    const state = "secure_random_state";

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;

    window.location.href = authUrl;
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
              <Button onClick={handleGoogleLogin} type="button" className="w-full bg-white text-black border hover:bg-gray-100">
                Iniciar sesión con Google
              </Button>
            </div>

            <div className="relative text-center text-sm text-muted-foreground">
              <span className="relative z-10 bg-white px-3">O usa tu cuenta</span>
              <div className="absolute inset-0 top-1/2 border-t border-border" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="ejemplo@correo.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Contraseña</Label>
                <a href="#" className="text-sm text-primary underline underline-offset-4">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-muted-foreground hover:text-primary" aria-label="Mostrar/ocultar contraseña">
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

            <Button type="submit" className="w-full bg-[#FB8500] text-black hover:bg-[#FFB703]" disabled={loading}>
              {loading ? (<><Loader2 className="animate-spin mr-2 h-4 w-4" />Iniciando sesión...</>) : ("Iniciar sesión")}
            </Button>

            <div className="text-center text-sm">
              ¿No tienes una cuenta? <a href="/register" className="underline underline-offset-4 hover:text-primary">Regístrate</a>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        Al continuar, aceptas nuestros <a href="/terms" className="underline underline-offset-4 hover:text-primary">Términos de Servicio</a> y <a href="/privacy" className="underline underline-offset-4 hover:text-primary">Políticas de Privacidad</a>.
      </div>
    </div>
  );
}
