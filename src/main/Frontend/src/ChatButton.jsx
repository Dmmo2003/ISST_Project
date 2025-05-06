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
                        className="w-screen h-[80vh] md:w-[525px] md:h-[750px] bg-background rounded-t-2xl md:rounded-2xl shadow-2xl p-2 md:p-4 flex flex-col fixed bottom-0 left-0 right-0 mx-auto md:static"
                    >
                        {/* Botón de cerrar para móvil */}
                        {/* <div className="md:hidden absolute top-2 right-2 z-50">
                            <Button
                                variant="ghost"
                                className="rounded-full w-10 h-10 p-0"
                                onClick={handleClick}
                            >
                                <X className="w-6 h-6" />
                            </Button>
                        </div> */}
                        
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
                            className="rounded-full w-14 h-14 md:w-16 md:h-16 shadow-lg bg-primary hover:bg-primary/90 p-0"
                            onClick={handleClick}
                        >
                            <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />
                        </Button>
                    </motion.div>
                </div>
            )}
        </div>
    )
}