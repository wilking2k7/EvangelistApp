import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import People from './pages/People'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personas" element={<People />} />
          {/* Añadir más rutas aquí según se desarrollen */}
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
