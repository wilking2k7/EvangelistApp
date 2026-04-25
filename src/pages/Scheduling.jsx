import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getVisits, getPeople, getLeaders, createVisit } from '../services/api';

const Scheduling = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Data for form
  const [people, setPeople] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    location: '',
    topic: '',
    personId: '',
    leaderId: '',
    assistantId: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vData, pData, lData] = await Promise.all([
        getVisits(),
        getPeople(),
        getLeaders()
      ]);
      setVisits(vData);
      setPeople(pData);
      setLeaders(lData);
      
      if (pData.length > 0) setFormData(prev => ({ ...prev, personId: pData[0].id }));
      if (lData.length > 0) setFormData(prev => ({ ...prev, leaderId: lData[0].id }));
    } catch (error) {
      console.error('Error fetching scheduling data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVisit(formData);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      alert('Error al programar la visita');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Programación de Visitas</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">+ Programar Visita</button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-slate-400 animate-pulse text-center py-20">Cargando agenda...</p>
        ) : (
          visits.map((visit) => (
            <Card key={visit.id} className="hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center bg-indigo-accent/10 px-4 py-2 rounded-xl border border-indigo-accent/20">
                    <p className="text-xs text-indigo-400 font-bold uppercase">
                      {new Date(visit.date).toLocaleDateString('es-ES', { month: 'short' })}
                    </p>
                    <p className="text-xl font-bold text-white">
                      {new Date(visit.date).getDate()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-lg">Visita a {visit.person.name}</h3>
                    <p className="text-sm text-slate-400 flex items-center gap-2">
                      📍 {visit.location || 'Ubicación no especificada'} • 🕒 {new Date(visit.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-xs text-indigo-400 mt-1 font-medium italic">Tema: {visit.topic || 'Sin tema asignado'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-300">Líder: {visit.leader.name}</p>
                  <p className="text-xs text-slate-500">Auxiliar: {visit.assistant?.name || 'N/A'}</p>
                  <span className={`inline-block mt-2 text-[10px] px-2 py-1 rounded-full font-bold ${
                    visit.isAudited ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {visit.isAudited ? 'AUDITADA' : 'PENDIENTE'}
                  </span>
                </div>
              </div>
            </Card>
          ))
        )}
        {!loading && visits.length === 0 && (
          <p className="text-slate-500 text-center py-20 italic">No hay visitas programadas.</p>
        )}
      </div>

      {/* Modal de Programación */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-8 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-white mb-6">Programar Nueva Visita</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Fecha y Hora</label>
                  <input
                    required
                    type="datetime-local"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Lugar</label>
                  <input
                    type="text"
                    placeholder="Ej. Casa de la persona"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Persona a Visitar</label>
                <select
                  required
                  className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                  value={formData.personId}
                  onChange={e => setFormData({ ...formData, personId: e.target.value })}
                >
                  {people.map(p => <option key={p.id} value={p.id}>{p.name} ({p.type})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Líder</label>
                  <select
                    required
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                    value={formData.leaderId}
                    onChange={e => setFormData({ ...formData, leaderId: e.target.value })}
                  >
                    {leaders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Auxiliar (Opcional)</label>
                  <select
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                    onChange={e => setFormData({ ...formData, assistantId: e.target.value })}
                  >
                    <option value="">Ninguno</option>
                    {leaders.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Tema / Tópico</label>
                <input
                  type="text"
                  placeholder="Ej. El Plan de Salvación"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                  onChange={e => setFormData({ ...formData, topic: e.target.value })}
                />
              </div>

              <div className="pt-4 flex space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 rounded-lg bg-white/5 text-slate-300">Cancelar</button>
                <button type="submit" className="flex-1 btn-primary">Programar</button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Scheduling;
