import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getDashboardStats } from '../services/api';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    activeLeaders: 0,
    newPeople: 0,
    pendingQuestions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Visitas Totales', value: stats.totalVisits, icon: '📈', color: 'indigo' },
    { label: 'Líderes Activos', value: stats.activeLeaders, icon: '👤', color: 'blue' },
    { label: 'Nuevas Personas', value: stats.newPeople, icon: '✨', color: 'emerald' },
    { label: 'Preguntas Pendientes', value: stats.pendingQuestions, icon: '❓', color: 'amber' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:translate-y-[-4px] transition-transform duration-300 border-b-4 border-b-indigo-500/20">
              <div className="flex justify-between items-start mb-4">
                <span className="text-2xl">{stat.icon}</span>
                {loading && <div className="w-8 h-4 bg-white/10 animate-pulse rounded"></div>}
              </div>
              <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-3xl font-bold text-white mt-1">
                {loading ? '...' : stat.value}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card title="Visitas para Hoy">
            <p className="text-slate-500 italic text-sm">Conectando con el módulo de programación...</p>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Progreso Semanal" className="h-48">
              <div className="h-full flex items-end gap-2">
                {[40, 70, 45, 90, 65, 30, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-indigo-accent/20 rounded-t-sm hover:bg-indigo-accent/40 transition-colors" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </Card>
            <Card title="Conversiones" className="h-48">
               <div className="flex items-center justify-center h-full">
                 <div className="relative w-24 h-24">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                     <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-indigo-accent" strokeDasharray="251.2" strokeDashoffset="60" />
                   </svg>
                   <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">75%</span>
                 </div>
               </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-2 opacity-10 text-6xl">✨</div>
            <h3 className="text-indigo-400 font-bold flex items-center gap-2 mb-4">
              <span>✨</span> Gemini AI Insights
            </h3>
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                "He analizado los reportes de esta semana. Se observa una tendencia recurrente de dudas sobre **'El Sufrimiento'**. Se recomienda reforzar esta temática en la próxima reunión de líderes."
              </p>
              <p className="text-xs text-slate-300 leading-relaxed bg-white/5 p-3 rounded-lg border border-white/5">
                "El líder **Carlos Líder** ha incrementado sus visitas en un 25% este mes. Considerar reconocimiento."
              </p>
            </div>
            <button className="w-full mt-4 py-2 bg-indigo-accent/20 hover:bg-indigo-accent/30 text-indigo-400 text-xs font-bold rounded-lg border border-indigo-accent/20 transition-all">
              Generar Nuevo Análisis
            </button>
          </Card>

          <Card title="Preguntas Recientes">
            <p className="text-slate-500 italic text-sm">Conectando con el módulo de auditoría...</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
