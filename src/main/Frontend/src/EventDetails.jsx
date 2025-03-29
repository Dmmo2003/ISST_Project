import React from "react";
 import { Card, CardContent, CardHeader } from "@/components/ui/card"; // shadcn
 import { Button } from "@/components/ui/button";
 
 const EventDetails = ({ event, groups }) => {
   return (
     <div className="container mx-auto p-4">
       <Card>
         <CardHeader>
           <h1 className="text-2xl font-bold">{event.name}</h1>
           <p className="text-gray-500">{event.date}</p>
         </CardHeader>
         <CardContent>
           <p>{event.description}</p>
         </CardContent>
       </Card>
 
       <div className="mt-6">
         <h2 className="text-xl font-semibold">Grupos asociados</h2>
         <GroupList groups={groups} />
       </div>
     </div>
   );
 };
 
 export default EventDetails;