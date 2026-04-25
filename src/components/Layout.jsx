import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white">Bienvenido de nuevo</h2>
            <p className="text-slate-400">Aquí tienes el resumen del evangelismo para hoy.</p>
          </div>
          <div className="flex space-x-4">
            <button className="glass-card px-4 py-2 text-sm hover:bg-white/10 transition-colors">
              🔔 Notificaciones
            </button>
            <button className="btn-primary text-sm">
              + Nueva Visita
            </button>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;
