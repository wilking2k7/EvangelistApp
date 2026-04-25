import React, { useState, useEffect } from 'react';
import { getLeaders, createPerson } from '../services/api';

const AddPersonModal = ({ isOpen, onClose, onRefresh }) => {
  const [leaders, setLeaders] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    type: 'AMIGO',
    status: 'INTERESADO',
    assignedLeaderId: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetchLeaders();
    }
  }, [isOpen]);

  const fetchLeaders = async () => {
    try {
      const data = await getLeaders();
      setLeaders(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, assignedLeaderId: data[0].id }));
      }
    } catch (error) {
      console.error('Error fetching leaders:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPerson(formData);
      onRefresh();
      onClose();
      setFormData({
        name: '',
        address: '',
        phone: '',
        type: 'AMIGO',
        status: 'INTERESADO',
        assignedLeaderId: leaders[0]?.id || '',
      });
    } catch (error) {
      console.error('Error creating person:', error);
      alert('Error al crear la persona');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-lg p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Registrar Nueva Persona</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Nombre Completo</label>
            <input
              required
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Tipo</label>
              <select
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="AMIGO">Amigo (Simpatizante)</option>
                <option value="HERMANO">Hermano de Iglesia</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Estado Espiritual</label>
              <select
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="INTERESADO">Interesado</option>
                <option value="CONSOLIDANDO">Consolidando</option>
                <option value="BAUTIZADO">Bautizado</option>
                <option value="LIDER_EN_FORMACION">Líder en formación</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Líder Asignado</label>
            <select
              required
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
              value={formData.assignedLeaderId}
              onChange={e => setFormData({ ...formData, assignedLeaderId: e.target.value })}
            >
              {leaders.map(l => (
                <option key={l.id} value={l.id}>{l.name} ({l.role})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Dirección</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 focus:border-indigo-accent outline-none"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="pt-4 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Guardar Registro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPersonModal;
