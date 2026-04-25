import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Panel de Control', icon: '📊', path: '/' },
    { name: 'Personas', icon: '👥', path: '/personas' },
    { name: 'Programación', icon: '📅', path: '/programacion' },
    { name: 'Lugares', icon: '📍', path: '/lugares' },
    { name: 'Temáticas', icon: '📖', path: '/tematicas' },
    { name: 'Auditoría', icon: '🛡️', path: '/auditoria' },
  ];

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '??';
  };

  return (
    <aside className="w-64 h-screen glass-sidebar fixed left-0 top-0 p-6 flex flex-col">
      <div className="mb-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
          EvangelistApp
        </h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `
              w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
              ${isActive 
                ? 'bg-indigo-accent/20 text-indigo-400 border border-indigo-accent/30 shadow-lg shadow-indigo-500/10' 
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
          <div className="w-10 h-10 rounded-full bg-indigo-accent/20 border border-indigo-accent/30 flex items-center justify-center text-sm font-bold text-indigo-400">
            {getInitials(user?.name)}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold text-slate-100 truncate">{user?.name}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">{user?.role}</p>
          </div>
          <button 
            onClick={logout}
            className="text-slate-500 hover:text-red-400 transition-colors text-lg"
            title="Cerrar Sesión"
          >
            🚪
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
