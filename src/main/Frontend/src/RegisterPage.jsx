import React from "react";
import { GalleryVerticalEnd } from "lucide-react";
import { RegisterForm } from "@/components/ui/register-form";

export default function RegisterPage() {
  return (
    //     <div
    //       className="flex min-h-svh flex-col items-center justify-center gap-6 bg-cover bg-center p-6 md:p-10"
    //       style={{ backgroundImage: "url('/images/fondoRegister.jpg')" }} 
    //     >
    // <div className="flex w-full max-w-sm flex-col gap-6 bg-[#023047] bg-opacity-90 p-6 rounded-lg shadow-lg">
    //         <a href="/" className="flex items-center gap-2 self-center font-medium text-[#FB8500]">
    //           <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#FB8500] text-white">
    //             <GalleryVerticalEnd className="size-4" />
    //           </div>
    //           EventConnect
    //         </a>
    //         <RegisterForm />
    //       </div>
    //     </div>
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          EventConnect
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}
