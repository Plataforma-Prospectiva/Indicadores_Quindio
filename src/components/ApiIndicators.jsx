import React, { useState, useEffect } from 'react';
import { RefreshCw, AlertCircle, ChevronLeft, ChevronRight, Server, FileText } from 'lucide-react';

export default function ApiIndicators() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // OData paginación
  const [skip, setSkip] = useState(0);
  const limit = 1000;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Usar endpoint SODA compatible con CORS en navegador con filtros SoQL simples
      const url = `https://www.datos.gov.co/resource/wa49-85xq.json?informaci_n_de_la_entidad_4=Quindío&$limit=${limit}&$offset=${skip}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error en la consulta: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result || []);
    } catch (err) {
      console.error(err);
      setError('No se pudieron obtener los datos de la API pública colombiana.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [skip]);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="font-display" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-gold)' }}>
            Consulta API Gubernamental: Dataset Quindío (wa49-85xq)
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Mostrando registros de <strong>Entidad 4 = Quindío</strong> en intervalos de <strong>1,000 registros</strong>
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          style={{
            background: 'var(--accent-green-light)',
            color: '#050b07',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {error && (
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', borderLeft: '4px solid #e57373' }}>
          <AlertCircle size={24} color="#e57373" />
          <div>
            <h4 style={{ fontWeight: '600' }}>Error al conectar con la API</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{error}</p>
          </div>
        </div>
      )}

      {/* Grid de registros */}
      <div className="glass-panel" style={{ padding: '20px', minHeight: '300px' }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', gap: '12px' }}>
            <RefreshCw size={40} className="animate-spin" color="var(--accent-gold)" />
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Descargando bloque de datos (hasta 1,000 registros)...</span>
          </div>
        ) : data.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-secondary)' }}>
            <Server size={48} style={{ marginBottom: '12px' }} />
            <span>No se encontraron registros de Quindío en este rango de paginación.</span>
          </div>
        ) : (
          <div>
            <div style={{ maxHeight: '500px', overflowY: 'auto', paddingRight: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--panel-border)', color: 'var(--accent-gold)' }}>
                    <th style={{ padding: '12px 8px' }}>Nombre del Dataset / Indicador</th>
                    <th style={{ padding: '12px 8px' }}>Entidad</th>
                    <th style={{ padding: '12px 8px' }}>Categoría</th>
                    <th style={{ padding: '12px 8px' }}>Visitas</th>
                    <th style={{ padding: '12px 8px' }}>Calidad Global</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={row.__id || index} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', hover: { background: 'rgba(255,255,255,0.01)' } }}>
                      <td style={{ padding: '12px 8px', fontWeight: '500' }}>
                        <a href={row.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                          {row.nombre || 'Sin nombre'}
                        </a>
                      </td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{row.informaci_n_de_la_entidad || 'N/A'}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{row.categor_a || 'Sin categoría'}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--accent-green-light)' }}>{row.visitas?.toLocaleString() || 0}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--accent-gold)' }}>{row.ndice_global_de_calidad || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--panel-border)' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Registros mostrados: <strong>{data.length}</strong> (Rango actual: {skip} - {skip + data.length})
              </span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setSkip(Math.max(0, skip - limit))}
                  disabled={skip === 0}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--panel-border)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: skip === 0 ? 0.5 : 1
                  }}
                >
                  <ChevronLeft size={16} />
                  Anterior 1,000
                </button>
                <button
                  onClick={() => setSkip(skip + limit)}
                  disabled={data.length < limit}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--panel-border)',
                    color: 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    opacity: data.length < limit ? 0.5 : 1
                  }}
                >
                  Siguiente 1,000
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
