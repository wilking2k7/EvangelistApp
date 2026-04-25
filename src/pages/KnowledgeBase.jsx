import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getPublishedQuestions } from '../services/api';

const KnowledgeBase = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const data = await getPublishedQuestions();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching knowledge base:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuestions = questions.filter(q => 
    q.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.visit.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Base de Conocimiento</h2>
          <p className="text-slate-400 text-sm">Preguntas auditadas y respuestas oficiales para el estudio bíblico.</p>
        </div>
        <div className="w-full md:w-80 relative">
          <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
          <input
            type="text"
            placeholder="Buscar temática o pregunta..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-100 focus:border-indigo-accent outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <p className="text-slate-400 animate-pulse text-center py-20">Cargando base de conocimiento...</p>
        ) : (
          filteredQuestions.map((q) => (
            <Card key={q.id} className="group hover:border-indigo-accent/30 transition-all duration-300">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-1 rounded">
                    Temática: {q.visit.topic}
                  </span>
                  <span className="text-[10px] text-slate-500 italic">Auditado el {new Date(q.updatedAt).toLocaleDateString()}</span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Pregunta: {q.content}</h3>
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-accent"></div>
                    <p className="text-slate-300 leading-relaxed text-sm">
                      <span className="text-indigo-400 font-bold mr-2">Respuesta Oficial:</span>
                      {q.answer}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
        {!loading && filteredQuestions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 italic">No se encontraron resultados para tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
