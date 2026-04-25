import React from 'react'
import Layout from './components/Layout'

function App() {
  const stats = [
    { label: 'Visitas Totales', value: '245', icon: '📈', change: '+12%' },
    { label: 'Líderes Activos', value: '18', icon: '👤', change: '0%' },
    { label: 'Nuevas Personas', value: '12', icon: '✨', change: '+5%' },
    { label: 'Preguntas Pendientes', value: '5', icon: '❓', change: '-2' },
  ]

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card p-6 hover:translate-y-[-4px] transition-transform duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-400'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6">Visitas para Hoy</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-accent/20 flex items-center justify-center text-indigo-400">
                    🏠
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Visita a Familia Pérez</p>
                    <p className="text-xs text-slate-500">Calle 10 #23-45 • 2:00 PM</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400">En Curso</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-bold mb-6">Preguntas Recientes</h3>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
                <p className="text-sm italic text-slate-300 mb-2">
                  "¿Cómo podemos explicar la gracia de Dios a alguien que siente que no la merece?"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Líder: Carlos R.</span>
                  <button className="text-xs font-bold text-indigo-400 hover:underline">Ver Auditoría</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App
