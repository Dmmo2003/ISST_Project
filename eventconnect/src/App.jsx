import { useState } from 'react'
import './App.css'
import { Button } from "@/components/ui/button"
import Header from './Header'


function App() {

  return (
    <>
      <Header />
      <div className='columns-3'>
        <div className=" flex flex-col items-center justify-center min-h-svh">
        <Button variant="destructive">Destructive</Button>
        </div>
        <div className=" flex flex-col items-center justify-center min-h-svh">
          <Button>Click me</Button>
        </div>
        <div className=" flex flex-col items-center justify-center min-h-svh">
          <Button>Click me</Button>
        </div>
      </div>
    </>
  )
}

export default App
