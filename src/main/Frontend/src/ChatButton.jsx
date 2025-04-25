import React from "react";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ChatView from "./ChatView";

export default function ChatButton() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = async () => {
        setIsOpen(!isOpen)

    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="chat"
                        initial={{ opacity: 0, scale: 0, originX: 1, originY: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-[525px] h-[750px] bg-white rounded-2xl shadow-2xl p-4 flex flex-col"
                    >
                        {/* <div className="flex-1 overflow-auto">
                            <p className="text-sm text-gray-500">Chat aquí pronto...</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Cerrar
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
                            className="rounded-full w-14 h-14 shadow-lg bg-primary text-white hover:bg-primary/90 p-0"
                            onClick={handleClick}
                        >
                            <MessageCircle className="w-12 h-12" />
                        </Button>
                    </motion.div>
                </div>
            )}

        </div>
    )
}