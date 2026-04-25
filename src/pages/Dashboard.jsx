import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getDashboardStats } from '../services/api';

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((stat) => (
          <Card key={stat.label} className="hover:translate-y-[-4px] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              {loading && <div className="w-8 h-4 bg-white/10 animate-pulse rounded"></div>}
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-white mt-1">
              {loading ? '...' : stat.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Visitas para Hoy">
          <p className="text-slate-500 italic text-sm">Conectando con el módulo de programación...</p>
        </Card>

        <Card title="Preguntas Recientes">
          <p className="text-slate-500 italic text-sm">Conectando con el módulo de auditoría...</p>
        </div>
      </Card>
    </>
  );
};

export default Dashboard;
