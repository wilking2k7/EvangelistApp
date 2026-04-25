import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import People from './pages/People'
import Scheduling from './pages/Scheduling'
import Audit from './pages/Audit'
import KnowledgeBase from './pages/KnowledgeBase'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'

const AppContent = () => {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/personas" element={<People />} />
          <Route path="/programacion" element={<Scheduling />} />
          <Route path="/auditoria" element={<Audit />} />
          <Route path="/tematicas" element={<KnowledgeBase />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
