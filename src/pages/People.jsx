import React, { useState } from 'react';
import Card from '../components/Card';

const People = () => {
  const [filter, setFilter] = useState('Todos');

  const peopleData = [
    { id: 1, name: 'Andrés García', type: 'Amigo', status: 'Interesado', lastVisit: '2026-04-20', leader: 'Carlos R.' },
    { id: 2, name: 'María López', type: 'Hermano', status: 'Bautizado', lastVisit: '2026-04-22', leader: 'Ana M.' },
    { id: 3, name: 'Roberto Solís', type: 'Amigo', status: 'Consolidando', lastVisit: '2026-04-24', leader: 'Carlos R.' },
    { id: 4, name: 'Lucía Méndez', type: 'Hermano', status: 'Líder en formación', lastVisit: '2026-04-18', leader: 'Juan P.' },
  ];

  const filteredPeople = filter === 'Todos' 
    ? peopleData 
    : peopleData.filter(p => p.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Directorio de Personas</h2>
        <button className="btn-primary">+ Registrar Persona</button>
      </div>

      <div className="flex space-x-2 mb-4">
        {['Todos', 'Hermano', 'Amigo'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f 
              ? 'bg-indigo-accent text-white shadow-lg shadow-indigo-500/30' 
              : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden !p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Tipo</th>
              <th className="px-6 py-4 font-semibold">Estado Espiritual</th>
              <th className="px-6 py-4 font-semibold">Última Visita</th>
              <th className="px-6 py-4 font-semibold">Líder</th>
              <th className="px-6 py-4 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredPeople.map((person) => (
              <tr key={person.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-100">{person.name}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    person.type === 'Hermano' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {person.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-300">{person.status}</td>
                <td className="px-6 py-4 text-sm text-slate-400">{person.lastVisit}</td>
                <td className="px-6 py-4 text-sm text-slate-300">{person.leader}</td>
                <td className="px-6 py-4">
                  <button className="text-indigo-400 hover:text-indigo-300 text-sm font-bold">Ver Perfil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default People;
