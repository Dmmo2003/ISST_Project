import React from "react";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ChatView from "./ChatView";

export default function ChatButton() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = async () => {
        setIsOpen(!isOpen)
    }



    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-screen h-[80vh] md:w-[525px] md:h-[750px] bg-background rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col fixed bottom-0 left-0 right-0 mx-auto md:static"
                    >
                        {/* Botón de cerrar para móvil */}
                        <ChatView handleClick={handleClick} />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <div className="absolute bottom-0 right-0">
                    <motion.div
                        key="button"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    >
                        <Button
                            variant="default"
                            size="lg"
                            className="rounded-full w-13 h-13 md:w-15 md:h-15 shadow-lg bg-[#023047] hover:text-[#023047] hover:bg-[#FB8500]  p-0"
                            onClick={handleClick}
                        >
                            {/* <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-[#FB8500]" /> */}
                            <MessageCircle
                                className="w-12 h-12 text-[#FB8500]"
                                strokeWidth={3}
                                style={{ stroke: '#FB8500' }}
                            />



                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    )

    // return (
    //     <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
    //         <AnimatePresence>
    //             {isOpen && (
    //                 <motion.div
    //                     key="chat"
    //                     initial={{ opacity: 0, scale: 0, originX: 1, originY: 1 }}
    //                     animate={{ opacity: 1, scale: 1 }}
    //                     exit={{ opacity: 0, scale: 0 }}
    //                     transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    //                     className="w-screen h-[80vh] md:w-[525px] md:h-[750px] bg-background rounded-t-2xl md:rounded-2xl shadow-2xl p-2 md:p-4 flex flex-col fixed bottom-0 left-0 right-0 mx-auto md:static"
    //                 >
    //                     {/* Botón de cerrar para móvil */}
    //                     <ChatView handleClick={handleClick} />
    //                 </motion.div>
    //             )}
    //         </AnimatePresence>

    //         {!isOpen && (
    //             <div className="absolute bottom-0 right-0">
    //                 <motion.div
    //                     key="button"
    //                     initial={{ opacity: 0, scale: 0 }}
    //                     animate={{ opacity: 1, scale: 1 }}
    //                     exit={{ opacity: 0, scale: 0 }}
    //                     transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    //                 >
    //                     <Button
    //                         variant="default"
    //                         size="lg"
    //                         className="rounded-full w-13 h-13 md:w-15 md:h-15 shadow-lg bg-[#023047] hover:bg-[#023047]/90 p-0"
    //                         onClick={handleClick}
    //                     >
    //                         {/* <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-[#FB8500]" /> */}
    //                         <MessageCircle
    //                             className="w-12 h-12 text-[#FB8500]"
    //                             strokeWidth={3}
    //                             style={{ stroke: '#FB8500' }}
    //                         />



    //                     </Button>
    //                 </motion.div>
    //             </div>
    //         )}
    //     </div>
    // )
}