import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import People from './pages/People'
import Scheduling from './pages/Scheduling'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personas" element={<People />} />
          <Route path="/programacion" element={<Scheduling />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
