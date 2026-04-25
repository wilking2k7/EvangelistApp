import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Panel de Control', icon: '📊', path: '/' },
    { name: 'Personas', icon: '👥', path: '/personas' },
    { name: 'Programación', icon: '📅', path: '/programacion' },
    { name: 'Lugares', icon: '📍', path: '/lugares' },
    { name: 'Temáticas', icon: '📖', path: '/tematicas' },
    { name: 'Auditoría', icon: '🛡️', path: '/auditoria' },
  ];

  return (
    <aside className="w-64 h-screen glass-sidebar fixed left-0 top-0 p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          EvangelistApp
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-indigo-accent/20 text-indigo-400 border border-indigo-accent/30' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'}
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center space-x-3 px-2">
          <div className="w-10 h-10 rounded-full bg-indigo-accent/40 flex items-center justify-center text-sm font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-slate-500 hover:text-red-400 cursor-pointer">Cerrar Sesión</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
