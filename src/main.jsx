import React from 'react'
import ReactDOM from 'react-dom/client'
import MoodDisplay from './App.jsx'  // mesmo arquivo, novo nome
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MoodDisplay />
  </React.StrictMode>,
)