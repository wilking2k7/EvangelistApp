import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import People from './pages/People'
import Scheduling from './pages/Scheduling'
import Audit from './pages/Audit'
import KnowledgeBase from './pages/KnowledgeBase'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personas" element={<People />} />
          <Route path="/programacion" element={<Scheduling />} />
          <Route path="/auditoria" element={<Audit />} />
          <Route path="/tematicas" element={<KnowledgeBase />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
