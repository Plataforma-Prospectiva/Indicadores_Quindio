import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, ExternalLink, ArrowUpDown, 
  RefreshCw, AlertCircle, Server, Info, X
} from 'lucide-react';
import indicadoresList from '../data/indicadores.json';

export default function ApiIndicators() {
  // Estados de Filtros y Búsqueda
  const [search, setSearch] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('TODOS');
  const [selectedCategoria, setSelectedCategoria] = useState('TODOS');
  const [sortBy, setSortBy] = useState('visitas'); // visitas, calidad, filas, nombre
  const [sortOrder, setSortOrder] = useState('desc'); // desc, asc

  // Estado para la previsualización del dataset seleccionado
  const [previewDataset, setPreviewDataset] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);

  // Obtener municipios y categorías únicas para los filtros
  const municipios = ['TODOS', ...new Set(indicadoresList.map(i => i.municipio || 'No especificado').filter(Boolean))].sort();
  const categorias = ['TODOS', ...new Set(indicadoresList.map(i => i.categoria || 'Sin categoría').filter(Boolean))].sort();

  // Filtrar y ordenar la lista localmente
  const filteredIndicadores = indicadoresList.filter(item => {
    const matchesSearch = 
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      item.entidad.toLowerCase().includes(search.toLowerCase());

    const matchesMunicipio = 
      selectedMunicipio === 'TODOS' || 
      item.municipio === selectedMunicipio;

    const matchesCategoria = 
      selectedCategoria === 'TODOS' || 
      item.categoria === selectedCategoria;

    return matchesSearch && matchesMunicipio && matchesCategoria;
  });

  // Ordenar
  const sortedIndicadores = [...filteredIndicadores].sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Cargar datos en vivo del dataset seleccionado
  const handleLoadPreview = async (dataset) => {
    setPreviewDataset(dataset);
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewData([]);

    try {
      // Ajustar URL de la API: añadir límite para no saturar
      const apiUrl = `${dataset.api}?$limit=6`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error en la consulta API: ${response.statusText}`);
      }
      const data = await response.json();
      setPreviewData(data);
    } catch (err) {
      console.error(err);
      setPreviewError('No se pudieron obtener registros reales de este dataset. Algunos endpoints requieren autenticación o no soportan peticiones cruzadas directas.');
    } finally {
      setPreviewLoading(false);
    }
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Cabecera Principal */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="font-display" style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-gold)', margin: 0 }}>
            Catálogo Integrado de Datos Abiertos Quindío
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
            Visualización y exploración de los <strong>{indicadoresList.length}</strong> datasets oficiales a nivel municipal y departamental.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="glass-panel" style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.02)' }}>
            <Server size={14} color="var(--accent-green-light)" />
            <span>Mostrando todos los registros ({sortedIndicadores.length})</span>
          </div>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          
          {/* Buscador de texto */}
          <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
            <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Buscar por indicador, descripción o entidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 40px',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)',
                background: 'rgba(255,255,255,0.02)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Filtro Municipio */}
          <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>MUNICIPIO</label>
            <select
              value={selectedMunicipio}
              onChange={(e) => setSelectedMunicipio(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)',
                background: '#0d1611',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {municipios.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Filtro Categoría */}
          <div style={{ minWidth: '180px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '600' }}>CATEGORÍA</label>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              style={{
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)',
                background: '#0d1611',
                color: 'var(--text-primary)',
                fontSize: '13px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              {categorias.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Info resumen de resultados */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
          <span>
            Encontrados: <strong>{sortedIndicadores.length}</strong> de {indicadoresList.length} indicadores.
          </span>
          {(search || selectedMunicipio !== 'TODOS' || selectedCategoria !== 'TODOS') && (
            <button
              onClick={() => {
                setSearch('');
                setSelectedMunicipio('TODOS');
                setSelectedCategoria('TODOS');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-gold)',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
                padding: 0
              }}
            >
              Limpiar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Tabla de Indicadores + Panel de Previsualización en Vivo */}
      <div style={{ display: 'grid', gridTemplateColumns: previewDataset ? '1.2fr 1fr' : '1fr', gap: '20px', transition: 'all 0.3s ease' }}>
        
        {/* Tabla de Indicadores */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sortedIndicadores.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-secondary)' }}>
              <Server size={40} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <span>No se encontraron datasets que coincidan con la búsqueda.</span>
            </div>
          ) : (
            <div style={{ overflowX: 'auto', maxHeight: '650px', overflowY: 'auto', paddingRight: '6px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--panel-border)', color: 'var(--accent-gold)', position: 'sticky', top: 0, background: '#070b08', zIndex: 1 }}>
                    <th style={{ padding: '12px 8px', cursor: 'pointer' }} onClick={() => toggleSort('nombre')}>
                      Nombre {sortBy === 'nombre' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th style={{ padding: '12px 8px' }}>Municipio / Entidad</th>
                    <th style={{ padding: '12px 8px' }}>Categoría</th>
                    <th style={{ padding: '12px 8px', cursor: 'pointer', textAlign: 'center' }} onClick={() => toggleSort('filas')}>
                      Filas {sortBy === 'filas' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th style={{ padding: '12px 8px', cursor: 'pointer', textAlign: 'center' }} onClick={() => toggleSort('visitas')}>
                      Visitas {sortBy === 'visitas' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th style={{ padding: '12px 8px', cursor: 'pointer', textAlign: 'center' }} onClick={() => toggleSort('calidad')}>
                      Calidad {sortBy === 'calidad' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </th>
                    <th style={{ padding: '12px 8px', textAlign: 'center' }}>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedIndicadores.map((row) => (
                    <tr 
                      key={row.uid} 
                      style={{ 
                        borderBottom: '1px solid rgba(255,255,255,0.02)',
                        background: previewDataset?.uid === row.uid ? 'rgba(255, 215, 0, 0.03)' : 'transparent',
                        transition: 'background 0.2s'
                      }}
                    >
                      <td style={{ padding: '12px 8px', maxWidth: '320px' }}>
                        <div>
                          <a 
                            href={row.url} 
                            target="_blank" 
                            rel="noreferrer" 
                            style={{ 
                              fontWeight: '600', 
                              color: 'var(--text-primary)', 
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              lineHeight: '1.4'
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--accent-gold)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-primary)'}
                          >
                            {row.nombre}
                            <ExternalLink size={12} style={{ flexShrink: 0, opacity: 0.7 }} />
                          </a>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', marginTop: '4px' }}>
                          {row.descripcion || 'Sin descripción disponible.'}
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <div style={{ fontWeight: '500' }}>{row.municipio || 'Departamental'}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{row.entidad}</div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{ 
                          padding: '3px 8px', 
                          borderRadius: '12px', 
                          fontSize: '11px', 
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}>
                          {row.categoria || 'General'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        {row.filas > 0 ? row.filas.toLocaleString() : 'N/A'}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--accent-green-light)', fontWeight: '600' }}>
                        {row.visitas.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <span style={{ 
                          color: row.calidad >= 8.0 ? 'var(--accent-green-light)' : row.calidad >= 5.0 ? 'var(--accent-gold)' : '#e57373',
                          fontWeight: 'bold' 
                        }}>
                          {row.calidad > 0 ? row.calidad.toFixed(2) : 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleLoadPreview(row)}
                            title="Previsualizar Datos en Vivo"
                            style={{
                              background: 'var(--accent-green-light)',
                              color: '#050b07',
                              border: 'none',
                              padding: '8px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: '600',
                              fontSize: '12px',
                              gap: '4px'
                            }}
                          >
                            <Eye size={14} />
                            <span>Ver Datos</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Panel Lateral de Previsualización en Vivo */}
        {previewDataset && (
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', height: 'fit-content', border: '1px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', tracking: '1px' }}>
                  Previsualizador en Vivo SODA
                </span>
                <h4 style={{ fontSize: '16px', fontWeight: '700', margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
                  {previewDataset.nombre}
                </h4>
              </div>
              <button 
                onClick={() => setPreviewDataset(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div><strong>ID del Dataset:</strong> {previewDataset.uid}</div>
              <div><strong>Entidad:</strong> {previewDataset.entidad}</div>
              {previewDataset.municipio && <div><strong>Municipio:</strong> {previewDataset.municipio}</div>}
              <div><strong>Total Registros:</strong> {previewDataset.filas > 0 ? previewDataset.filas.toLocaleString() : 'No especificado'}</div>
            </div>

            <div style={{ minHeight: '150px' }}>
              {previewLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '180px', gap: '10px' }}>
                  <RefreshCw size={24} className="animate-spin" color="var(--accent-gold)" />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Conectando con la API de Datos Abiertos...</span>
                </div>
              ) : previewError ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#e57373', fontSize: '12px', padding: '12px', borderRadius: '8px', background: 'rgba(229,115,115,0.05)', border: '1px solid rgba(229,115,115,0.15)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 'bold' }}>
                    <AlertCircle size={16} />
                    <span>Error al cargar datos</span>
                  </div>
                  <p style={{ margin: 0 }}>{previewError}</p>
                  <a href={previewDataset.url} target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', marginTop: '6px', display: 'inline-block' }}>
                    Ver dataset en el portal web externo
                  </a>
                </div>
              ) : previewData.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150px', color: 'var(--text-secondary)' }}>
                  <Info size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
                  <span style={{ fontSize: '12px' }}>Este dataset está vacío o no devolvió registros.</span>
                </div>
              ) : (
                <div>
                  <h5 style={{ fontSize: '12px', color: 'var(--accent-green-light)', fontWeight: '600', marginBottom: '8px' }}>
                    Muestra de Datos Reales (Primeros {previewData.length} registros):
                  </h5>
                  <div style={{ overflowX: 'auto', maxHeight: '250px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                      <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          {Object.keys(previewData[0]).slice(0, 4).map(key => (
                            <th key={key} style={{ padding: '8px 10px', textTransform: 'capitalize' }}>
                              {key.replace(/_/g, ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                            {Object.values(row).slice(0, 4).map((val, i) => (
                              <td key={i} style={{ padding: '8px 10px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                                {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            <a 
              href={previewDataset.url} 
              target="_blank" 
              rel="noreferrer"
              style={{
                display: 'block',
                textAlign: 'center',
                background: 'rgba(255,215,0,0.08)',
                color: 'var(--accent-gold)',
                border: '1px solid rgba(255,215,0,0.2)',
                padding: '10px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '13px',
                marginTop: '10px',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,215,0,0.15)'}
              onMouseLeave={(e) => e.target.style.background = 'rgba(255,215,0,0.08)'}
            >
              Acceder al Portal Oficial Completo
            </a>
          </div>
        )}

      </div>
    </div>
  );
}
