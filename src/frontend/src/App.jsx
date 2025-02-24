import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import LeftMenu from './LeftMenu.jsx'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const menu = document.querySelector('.menu-izquierda');
    menu.classList.add('encogido');
    if (menu) {
      menu.addEventListener('mouseover', () => {
        menu.classList.remove('encogido');
      });
    
      menu.addEventListener('mouseout', () => {
        menu.classList.add('encogido');
      });
    }
  }, []);



  // const menu = document.querySelector('.menu-izquierda');

  // menu.addEventListener('mouseover', () => {
  //   menu.classList.remove('encogido');
  // });

  // menu.addEventListener('mouseout', () => {
  //   menu.classList.add('encogido');
  // });

  return (
    <div id="root">
      <Header />
      <LeftMenu />
      {/* <nav className="menu-izquierda">
        <ul>
          <li><a href="#">Opción 1</a></li>
          <li><a href="#">Opción 2</a></li>
          <li><a href="#">Opción 3</a></li>
        </ul>
      </nav> */}

      <h1>Prueba2</h1>

      <Footer />
    </div>
  )
}

export default App
