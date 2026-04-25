import React, { useState } from 'react';
import { submitVisitReport } from '../services/api';

const VisitReportModal = ({ visit, isOpen, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    summary: '',
    location: '',
    newStatus: visit?.person.status || 'INTERESADO',
    questions: [''],
  });

  const handleAddQuestion = () => {
    setFormData({ ...formData, questions: [...formData.questions, ''] });
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({ 
          ...formData, 
          location: `${position.coords.latitude}, ${position.coords.longitude}` 
        });
      });
    } else {
      alert("Geolocalización no soportada");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const cleanQuestions = formData.questions.filter(q => q.trim() !== '');
      await submitVisitReport(visit.id, {
        ...formData,
        questions: cleanQuestions
      });
      onRefresh();
      onClose();
    } catch (error) {
      alert('Error al enviar el reporte');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl p-8 animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-white">Reporte de Visita</h3>
            <p className="text-sm text-slate-400">Visita a {visit.person.name}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Ubicación (GPS)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coordenadas"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 text-sm outline-none"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                />
                <button 
                  type="button" 
                  onClick={handleGetLocation}
                  className="px-3 bg-indigo-accent/20 text-indigo-400 rounded-lg border border-indigo-accent/30 text-xs font-bold"
                >
                  📍 Obtener
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Nuevo Estado Espiritual</label>
              <select
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-2 text-slate-100 text-sm outline-none"
                value={formData.newStatus}
                onChange={e => setFormData({ ...formData, newStatus: e.target.value })}
              >
                <option value="INTERESADO">Interesado</option>
                <option value="CONSOLIDANDO">Consolidando</option>
                <option value="BAUTIZADO">Bautizado</option>
                <option value="LIDER_EN_FORMACION">Líder en formación</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Resumen de la Charla / Hallazgos</label>
            <textarea
              required
              rows="4"
              placeholder="¿De qué hablaron? ¿Cómo se sintió la persona?..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-slate-100 text-sm outline-none focus:border-indigo-accent"
              value={formData.summary}
              onChange={e => setFormData({ ...formData, summary: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Preguntas Realizadas (Para Auditoría)</label>
            <div className="space-y-2">
              {formData.questions.map((q, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder="Escribe la pregunta aquí..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-slate-100 text-sm outline-none"
                  value={q}
                  onChange={e => handleQuestionChange(index, e.target.value)}
                />
              ))}
              <button 
                type="button" 
                onClick={handleAddQuestion}
                className="text-xs text-indigo-400 font-bold hover:text-indigo-300"
              >
                + Añadir otra pregunta
              </button>
            </div>
          </div>

          <div className="pt-4 flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 btn-primary py-3">Finalizar y Enviar Reporte</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitReportModal;
