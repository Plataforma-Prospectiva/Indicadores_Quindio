import React, { useState, useEffect } from 'react';
import { 
  Search, Eye, ExternalLink, RefreshCw, AlertCircle, Server, Info, X, 
  Folder, FolderOpen, ChevronRight, ChevronDown, Shield, 
  Compass, DollarSign, Trees, BookOpen, FileText, Database, Activity
} from 'lucide-react';
import indicadoresList from '../data/indicadores.json';

export default function ApiIndicators() {
  // Estados de Filtros y Búsqueda
  const [search, setSearch] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('TODOS');
  
  // Estados de Expansión del Carbon Tree View
  const [expandedSectors, setExpandedSectors] = useState({
    'Económico productivo': true,
    'Físico-Ambiental': false,
    'Integral': false,
    'Político – Institucional': false,
    'Socio – Cultural': false
  });
  const [expandedMunis, setExpandedMunis] = useState({});

  // Estado para la previsualización del dataset seleccionado
  const [previewDataset, setPreviewDataset] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);

  // Mapear cada indicador a los 5 sectores temáticos requeridos
  const getSector = (item) => {
    const s = (item.entidad || '').toLowerCase();
    const c = (item.categoria || '').toLowerCase();
    
    if (
      c.includes('comercio') || c.includes('agricultura') || c.includes('ciencia') || 
      c.includes('tecnolog') || c.includes('hacienda') || c.includes('turismo') || 
      c.includes('econ') || s.includes('comercio') || s.includes('agricultura') || 
      s.includes('hacienda') || s.includes('turismo')
    ) {
      return 'Económico productivo';
    }
    if (
      c.includes('ambiente') || c.includes('transporte') || c.includes('vivienda') || 
      c.includes('sostenible') || c.includes('geogr') || s.includes('ambiente') || 
      s.includes('transporte') || s.includes('vias') || s.includes('vías')
    ) {
      return 'Físico-Ambiental';
    }
    if (
      c.includes('funci') || c.includes('control') || c.includes('justicia') || 
      c.includes('vigilancia') || c.includes('derecho') || c.includes('defensa') || 
      c.includes('seguridad') || c.includes('polít') || s.includes('funci') || 
      s.includes('control') || s.includes('justicia') || s.includes('concejo') || 
      s.includes('alcald') || s.includes('gobernac')
    ) {
      return 'Político – Institucional';
    }
    if (
      c.includes('salud') || c.includes('deporte') || c.includes('cultura') || 
      c.includes('educaci') || c.includes('social') || s.includes('salud') || 
      s.includes('deporte') || s.includes('cultura') || s.includes('educaci') ||
      s.includes('hospital') || s.includes('universidad')
    ) {
      return 'Socio – Cultural';
    }
    return 'Integral';
  };

  // Asignar el sector mapeado a cada indicador en la lista
  const indicadoresConSector = indicadoresList.map(item => ({
    ...item,
    sectorMapeado: getSector(item)
  }));

  // Obtener municipios únicos para el filtro rápido
  const municipios = ['TODOS', ...new Set(indicadoresList.map(i => i.municipio || 'No especificado').filter(Boolean))].sort();

  // Iconos por Sector
  const sectorIcons = {
    'Económico productivo': <DollarSign size={15} className="text-amber-400" />,
    'Físico-Ambiental': <Trees size={15} className="text-emerald-400" />,
    'Integral': <Compass size={15} className="text-sky-400" />,
    'Político – Institucional': <Shield size={15} className="text-rose-400" />,
    'Socio – Cultural': <BookOpen size={15} className="text-fuchsia-400" />
  };

  // Filtrar la lista
  const filteredIndicadores = indicadoresConSector.filter(item => {
    const matchesSearch = 
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(search.toLowerCase()) ||
      item.entidad.toLowerCase().includes(search.toLowerCase());

    const matchesMunicipio = 
      selectedMunicipio === 'TODOS' || 
      item.municipio === selectedMunicipio;

    return matchesSearch && matchesMunicipio;
  });

  // Auto-expandir todo si hay una búsqueda activa
  useEffect(() => {
    if (search) {
      setExpandedSectors({
        'Económico productivo': true,
        'Físico-Ambiental': true,
        'Integral': true,
        'Político – Institucional': true,
        'Socio – Cultural': true
      });
      
      const munisToExpand = {};
      filteredIndicadores.forEach(item => {
        const key = `${item.sectorMapeado}-${item.municipio || 'Departamental'}`;
        munisToExpand[key] = true;
      });
      setExpandedMunis(munisToExpand);
    }
  }, [search]);

  // Cargar datos en vivo de la API SODA
  const handleLoadPreview = async (dataset) => {
    setPreviewDataset(dataset);
    setPreviewLoading(true);
    setPreviewError(null);
    setPreviewData([]);

    try {
      const apiUrl = `${dataset.api}?$limit=6`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Error en la consulta API: ${response.statusText}`);
      }
      const data = await response.json();
      setPreviewData(data);
    } catch (err) {
      console.error(err);
      setPreviewError('No se pudieron obtener registros en vivo. El dataset podría estar inactivo o requerir autenticación.');
    } finally {
      setPreviewLoading(false);
    }
  };

  const toggleSector = (sector) => {
    setExpandedSectors(prev => ({ ...prev, [sector]: !prev[sector] }));
  };

  const toggleMuni = (sector, muni) => {
    const key = `${sector}-${muni}`;
    setExpandedMunis(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Agrupar los indicadores filtrados por Sector -> Municipio
  const hierarchyData = {};
  const sectoresPermitidos = ['Económico productivo', 'Físico-Ambiental', 'Integral', 'Político – Institucional', 'Socio – Cultural'];
  
  sectoresPermitidos.forEach(sec => {
    hierarchyData[sec] = {};
  });

  filteredIndicadores.forEach(item => {
    const sec = item.sectorMapeado;
    const muni = item.municipio || 'Departamental';
    if (!hierarchyData[sec]) hierarchyData[sec] = {};
    if (!hierarchyData[sec][muni]) hierarchyData[sec][muni] = [];
    hierarchyData[sec][muni].push(item);
  });

  return (
    <div className="animate-fade-in text-slate-200" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Cabecera Principal */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 className="font-display" style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-gold)', margin: 0 }}>
            Carbon Tree View: Indicadores por Sectores Temáticos
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', marginBottom: 0 }}>
            Navegación jerárquica inspirada en Carbon Design System. Explora carpetas y subcarpetas de datasets oficiales del Quindío.
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.02)' }}>
          <Activity size={14} className="text-emerald-400" />
          <span>Tree View v2.0 Activo</span>
        </div>
      </div>

      {/* Controles de Búsqueda y Filtros Rápidos */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        
        {/* Buscador */}
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search size={16} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Buscar por indicador, descripción o entidad en el árbol..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '6px',
              border: '1px solid var(--panel-border)',
              background: 'rgba(255,255,255,0.02)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>

        {/* Filtro Municipio */}
        <div style={{ minWidth: '200px' }}>
          <select
            value={selectedMunicipio}
            onChange={(e) => setSelectedMunicipio(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid var(--panel-border)',
              background: '#0d1611',
              color: 'var(--text-primary)',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="TODOS">Todos los Municipios</option>
            {municipios.filter(m => m !== 'TODOS').map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {search && (
          <button
            onClick={() => {
              setSearch('');
              setSelectedMunicipio('TODOS');
            }}
            className="text-xs text-amber-400 font-bold hover:underline"
          >
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* Grid: Carbon Tree View + Live Preview Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: previewDataset ? '1.3fr 1fr' : '1fr', gap: '20px', transition: 'all 0.3s ease' }}>
        
        {/* Carbon Design System Tree View */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '450px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
            <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Folder size={14} className="text-amber-400" />
              Árbol de Directorios (Sectores Temáticos)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Coincidencias: <strong className="text-amber-400">{filteredIndicadores.length}</strong> / {indicadoresList.length}
            </span>
          </div>

          {/* Tree View Structure Container */}
          <div className="font-mono text-xs select-none space-y-1" style={{ maxHeight: '650px', overflowY: 'auto', paddingRight: '4px' }}>
            
            {sectoresPermitidos.map(sector => {
              const munisObj = hierarchyData[sector] || {};
              const munisList = Object.keys(munisObj).sort();
              
              let countInSector = 0;
              munisList.forEach(m => {
                countInSector += munisObj[m].length;
              });

              const isSectorExpanded = expandedSectors[sector];

              return (
                <div key={sector} className="rounded border border-transparent">
                  
                  {/* CARBON TREE LEVEL 1: SECTOR */}
                  <div 
                    onClick={() => toggleSector(sector)}
                    className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-all duration-150 ${
                      isSectorExpanded ? 'bg-white/5 text-white font-bold' : 'text-slate-300 hover:bg-white/3'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 p-0.5 hover:text-white">
                        {isSectorExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      </span>
                      {isSectorExpanded ? (
                        <FolderOpen size={16} className="text-amber-400" />
                      ) : (
                        <Folder size={16} className="text-amber-400/80" />
                      )}
                      <span className="text-xs">{sector}</span>
                    </div>

                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-slate-400 font-bold border border-white/5">
                      {countInSector}
                    </span>
                  </div>

                  {/* CARBON TREE LEVEL 2: MUNICIPIOS */}
                  {isSectorExpanded && (
                    <div className="ml-3 pl-3 border-l border-white/10 space-y-1 my-1">
                      {countInSector === 0 ? (
                        <div className="text-[11px] text-slate-500 italic py-1 pl-4">No hay indicadores coincidentes.</div>
                      ) : (
                        munisList.map(muni => {
                          const indicators = munisObj[muni] || [];
                          const muniKey = `${sector}-${muni}`;
                          const isMuniExpanded = expandedMunis[muniKey];

                          return (
                            <div key={muni}>
                              
                              {/* CARBON SUB-FOLDER ROW */}
                              <div 
                                onClick={() => toggleMuni(sector, muni)}
                                className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer transition-all duration-150 ${
                                  isMuniExpanded ? 'bg-white/4 text-white font-semibold' : 'text-slate-300 hover:bg-white/2'
                                }`}
                              >
                                <div className="flex items-center gap-1.5">
                                  <span className="text-slate-400">
                                    {isMuniExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                                  </span>
                                  {isMuniExpanded ? (
                                    <FolderOpen size={14} className="text-sky-400" />
                                  ) : (
                                    <Folder size={14} className="text-sky-400/70" />
                                  )}
                                  <span className="text-xs">{muni}</span>
                                </div>

                                <span className="text-[10px] text-slate-500 font-bold">
                                  {indicators.length}
                                </span>
                              </div>

                              {/* CARBON TREE LEVEL 3: DATASET LEAF NODES */}
                              {isMuniExpanded && (
                                <div className="ml-3 pl-3 border-l border-white/10 space-y-1 my-1">
                                  {indicators.map(item => {
                                    const isSelected = previewDataset?.uid === item.uid;
                                    return (
                                      <div 
                                        key={item.uid}
                                        className={`group flex items-center justify-between py-1.5 px-2 rounded transition-all duration-150 border-l-2 ${
                                          isSelected 
                                            ? 'bg-amber-500/15 text-white border-amber-400' 
                                            : 'border-transparent text-slate-300 hover:bg-white/3'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 overflow-hidden flex-1 pr-2">
                                          <FileText size={14} className={isSelected ? 'text-amber-400 flex-shrink-0' : 'text-slate-400 flex-shrink-0'} />
                                          <a 
                                            href={item.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-slate-200 hover:text-amber-400 transition-colors truncate font-sans font-semibold flex items-center gap-1"
                                            title={item.nombre}
                                            style={{ textDecoration: 'none' }}
                                          >
                                            {item.nombre}
                                            <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                          </a>
                                        </div>

                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          <span className="text-[10px] text-slate-500 hidden sm:inline">
                                            {item.visitas.toLocaleString()} visitas
                                          </span>
                                          <button
                                            onClick={() => handleLoadPreview(item)}
                                            className="bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-sans font-bold flex items-center gap-1 transition-all cursor-pointer"
                                            title="Previsualizar registros en vivo"
                                          >
                                            <Eye size={11} />
                                            <span>Ver Datos</span>
                                          </button>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}

                            </div>
                          );
                        })
                      )}
                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </div>

        {/* Live Preview Panel */}
        {previewDataset && (
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', height: 'fit-content', border: '1px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '10px', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', tracking: '1px' }}>
                  Previsualizador en Vivo SODA
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '700', margin: '4px 0 0 0', color: 'var(--text-primary)' }}>
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

            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div><strong>ID del Dataset:</strong> {previewDataset.uid}</div>
              <div><strong>Sector Carbon:</strong> <span className="text-amber-400 font-bold">{previewDataset.sectorMapeado}</span></div>
              <div><strong>Entidad:</strong> {previewDataset.entidad}</div>
              <div><strong>Municipio:</strong> {previewDataset.municipio || 'Departamental'}</div>
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
