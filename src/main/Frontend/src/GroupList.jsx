import React from "react";
 import { Card, CardContent } from "@/components/ui/card";
 
 const GroupList = ({ groups }) => {
   if (!groups || groups.length === 0) {
     return <p className="text-gray-500">No hay grupos disponibles.</p>;
   }
 
   return (
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
       {groups.map((group) => (
         <Card key={group.id} className="hover:shadow-lg">
           <CardContent>
             <h3 className="text-lg font-bold">{group.name}</h3>
             <p className="text-sm text-gray-500">{group.description}</p>
           </CardContent>
         </Card>
       ))}
     </div>
   );
 };
 
 export default GroupList;