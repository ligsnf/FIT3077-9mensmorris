import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameBoard from './components/GameBoard'

function App() {

  return (
    <div className="App">
      <section className="flex flex-col gap-8">
        <h1>Nine Men's Morris</h1>
        <div className="board flex justify-center">
          <GameBoard />
        </div>
        <p className="read-the-docs">
          Made by Three Men's Morris
        </p>
      </section>
      <div className="flex justify-center gap-2">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </div>
  )
}

export default App
