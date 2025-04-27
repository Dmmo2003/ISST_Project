import React from "react";
import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/ui/login-form"


export default function LoginPage() {

  const handleGoogleLogin = () => {
    const clientId = "115444592766-bu0ml3k01thik945ed7vvlpd4p39ushe.apps.googleusercontent.com";  
    const redirectUri = "http://localhost:5173/auth/callback/google";
    const scope = "openid email profile";
    const responseType = "token"; 
    const state = "secure_random_state"; 
  
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
  
    window.location.href = authUrl;
  };
  

  return (
    // <div
    //   className="flex min-h-svh flex-col items-center justify-center gap-6 bg-cover bg-center p-6 md:p-10"
    //   // style={{ backgroundImage: "url('/images/fondoLogin.jpg')" }}
    // >
    //   <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-transparent p-6 md:p-10">


    //     <div className="flex w-full max-w-sm flex-col gap-6">

    //       <a href="/" className="flex items-center gap-2 self-center font-medium text-white">
    //         <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
    //           <GalleryVerticalEnd className="size-4" />
    //         </div>
    //         EventConnect
    //       </a>
    //       <LoginForm />
    //     </div>
    //   </div>
    // </div>
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
          <div className="flex w-full max-w-sm flex-col gap-6">
            <a href="/" className="flex items-center gap-2 self-center font-medium">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              EventConnect
            </a>
            <LoginForm />
          </div>
        </div>
  )
}