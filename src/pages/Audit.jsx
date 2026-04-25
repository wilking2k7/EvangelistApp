import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getPendingQuestions, approveQuestion } from '../services/api';

const Audit = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getPendingQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching pending questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!answer.trim()) return alert('Por favor escribe una respuesta antes de aprobar.');
    try {
      await approveQuestion(id, answer);
      setAnswer('');
      setSelectedId(null);
      fetchQuestions();
    } catch (error) {
      alert('Error al aprobar la pregunta');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Centro de Auditoría</h2>
        <span className="bg-amber-500/10 text-amber-500 px-4 py-1 rounded-full text-sm font-bold border border-amber-500/20">
          {questions.length} Pendientes
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <p className="text-slate-400 animate-pulse text-center py-20">Cargando preguntas pendientes...</p>
        ) : (
          questions.map((q) => (
            <Card key={q.id} className={`border-l-4 transition-all ${selectedId === q.id ? 'border-l-indigo-accent bg-white/[0.05]' : 'border-l-amber-500 bg-white/[0.02]'}`}>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pregunta de {q.visit.person.name}</span>
                    <span className="text-xs text-slate-600">•</span>
                    <span className="text-xs text-indigo-400 font-medium italic">Tema: {q.visit.topic}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 italic">"{q.content}"</h3>
                  <p className="text-sm text-slate-400">Capturada por: <span className="text-slate-200">{q.visit.leader.name}</span></p>
                </div>

                <div className="w-full md:w-1/3 flex flex-col gap-3">
                  {selectedId === q.id ? (
                    <div className="space-y-3 animate-in slide-in-from-right duration-300">
                      <textarea
                        autoFocus
                        placeholder="Escribe la respuesta oficial aquí..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-slate-100 text-sm focus:border-indigo-accent outline-none min-h-[120px]"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleApprove(q.id)}
                          className="flex-1 bg-indigo-accent hover:bg-indigo-500 text-white font-bold py-2 rounded-lg text-sm transition-colors"
                        >
                          Aprobar y Publicar
                        </button>
                        <button 
                          onClick={() => { setSelectedId(null); setAnswer(''); }}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-lg text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setSelectedId(q.id)}
                      className="w-full btn-primary !bg-amber-500 hover:!bg-amber-600 text-slate-950 shadow-amber-500/20"
                    >
                      Responder y Auditar
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
        {!loading && questions.length === 0 && (
          <Card className="text-center py-20">
            <span className="text-5xl mb-4 block">✅</span>
            <h3 className="text-xl font-bold text-white">¡Todo al día!</h3>
            <p className="text-slate-500 mt-2">No hay preguntas pendientes por auditar en este momento.</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Audit;
