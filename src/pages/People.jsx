import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import AddPersonModal from '../components/AddPersonModal';
import { getPeople } from '../services/api';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const People = () => {
  const [filter, setFilter] = useState('Todos');
  const [peopleData, setPeopleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, [filter]);

  const fetchPeople = async () => {
    try {
      setLoading(true);
      const data = await getPeople(filter);
      setPeopleData(data);
    } catch (error) {
      console.error('Error fetching people:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Directorio de Evangelismo - EvangelistApp', 20, 10);
    
    const tableColumn = ["Nombre", "Tipo", "Estado Espiritual", "Líder"];
    const tableRows = [];

    peopleData.forEach(person => {
      const personData = [
        person.name,
        person.type,
        person.status.replace(/_/g, ' '),
        person.assignedLeader?.name || 'N/A'
      ];
      tableRows.push(personData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`Directorio_${filter}_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Directorio de Personas</h2>
        <div className="flex gap-3">
          <button 
            onClick={exportToPDF}
            className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium border border-white/10 transition-colors"
          >
            📥 Exportar PDF
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary"
          >
            + Registrar Persona
          </button>
        </div>
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

      <Card className="overflow-hidden !p-0 min-h-[300px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p className="animate-pulse">Cargando directorio...</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Tipo</th>
                <th className="px-6 py-4 font-semibold">Estado Espiritual</th>
                <th className="px-6 py-4 font-semibold">Líder</th>
                <th className="px-6 py-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {peopleData.map((person) => (
                <tr key={person.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-100">{person.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-md ${
                      person.type === 'HERMANO' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {person.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {person.status.replace(/_/g, ' ')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {person.assignedLeader?.name || 'Sin asignar'}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-sm font-bold">Ver Perfil</button>
                  </td>
                </tr>
              ))}
              {peopleData.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500 italic">
                    No hay personas registradas aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </Card>

      <AddPersonModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchPeople}
      />
    </div>
  );
};

export default People;
