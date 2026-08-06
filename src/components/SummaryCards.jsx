import React, { useState } from 'react';
import { 
  Users, DollarSign, TrendingUp, TrendingDown, Activity, 
  Award, ShieldCheck, X, Calendar, ArrowUpRight, ChevronRight
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export default function SummaryCards() {
  const [selectedIndicator, setSelectedIndicator] = useState(null);

  // Indicadores Agregados del Departamento con Serie Histórica (2020 - 2026)
  const aggregatedIndicators = [
    {
      id: 'poblacion',
      title: 'Población Departamental',
      value: '569,400 Hab.',
      subtitle: 'Proyección DANE 2026',
      icon: Users,
      color: '#3b82f6',
      glow: '0 0 20px rgba(59, 130, 246, 0.3)',
      trend: '+0.9% anual',
      isPositive: true,
      unit: 'Habitantes',
      description: 'Población total estimada en los 12 municipios del Quindío con mayor concentración urbana en Armenia, Calarcá y Montenegro.',
      history: [
        { year: '2020', value: 555200, label: '555,200' },
        { year: '2021', value: 558100, label: '558,100' },
        { year: '2022', value: 561000, label: '561,000' },
        { year: '2023', value: 563800, label: '563,800' },
        { year: '2024', value: 566100, label: '566,100' },
        { year: '2025', value: 568000, label: '568,000' },
        { year: '2026', value: 569400, label: '569,400' },
      ],
      milestone: 'Incremento de migración por calidad de vida y expansión del sector servicios.'
    },
    {
      id: 'pib',
      title: 'PIB Departamental',
      value: '$11.85 Trillones',
      subtitle: 'Valor Agregado (COP)',
      icon: DollarSign,
      color: 'var(--accent-gold)',
      glow: 'var(--neon-glow)',
      trend: '+2.4% crecimiento',
      isPositive: true,
      unit: 'Trillones COP',
      description: 'Producto Interno Bruto del Quindío impulsado por Agricultura (Café), Comercio, Ecoturismo y Construcción.',
      history: [
        { year: '2020', value: 9.80, label: '$9.80 T' },
        { year: '2021', value: 10.45, label: '$10.45 T' },
        { year: '2022', value: 11.10, label: '$11.10 T' },
        { year: '2023', value: 11.35, label: '$11.35 T' },
        { year: '2024', value: 11.55, label: '$11.55 T' },
        { year: '2025', value: 11.70, label: '$11.70 T' },
        { year: '2026', value: 11.85, label: '$11.85 T' },
      ],
      milestone: 'Consolidación del Paisaje Cultural Cafetero como motor de inversión turística.'
    },
    {
      id: 'desempleo',
      title: 'Tasa de Desempleo',
      value: '11.2%',
      subtitle: 'Promedio Departamental',
      icon: Activity,
      color: '#10b981',
      glow: 'var(--green-glow)',
      trend: '-0.8% desocupación',
      isPositive: true,
      unit: '% Desempleo',
      description: 'Proporción de la fuerza laboral desempleada en el departamento, mostrando una trayectoria continua de reducción.',
      history: [
        { year: '2020', value: 19.5, label: '19.5%' },
        { year: '2021', value: 16.2, label: '16.2%' },
        { year: '2022', value: 14.1, label: '14.1%' },
        { year: '2023', value: 12.8, label: '12.8%' },
        { year: '2024', value: 12.0, label: '12.0%' },
        { year: '2025', value: 11.6, label: '11.6%' },
        { year: '2026', value: 11.2, label: '11.2%' },
      ],
      milestone: 'Formalización de empleo en agroindustria y desarrollo de servicios tecnológicos.'
    },
    {
      id: 'competitividad',
      title: 'Índice de Competitividad',
      value: '5.84 / 10',
      subtitle: 'Puesto 8 a nivel nacional',
      icon: Award,
      color: '#a855f7',
      glow: '0 0 20px rgba(168, 85, 247, 0.3)',
      trend: '+0.63 ptos acumulados',
      isPositive: true,
      unit: 'Puntaje IDC (0-10)',
      description: 'Medición del Consejo Privado de Competitividad evaluando infraestructura, salud, educación y entorno de negocios.',
      history: [
        { year: '2020', value: 5.21, label: '5.21' },
        { year: '2021', value: 5.35, label: '5.35' },
        { year: '2022', value: 5.50, label: '5.50' },
        { year: '2023', value: 5.62, label: '5.62' },
        { year: '2024', value: 5.71, label: '5.71' },
        { year: '2025', value: 5.79, label: '5.79' },
        { year: '2026', value: 5.84, label: '5.84' },
      ],
      milestone: 'Quindío lidera el eje cafetero en pilar de sostenibilidad e innovación educativa.'
    },
    {
      id: 'cobertura',
      title: 'Cobertura de Servicios',
      value: '96.4%',
      subtitle: 'Acueducto & Energía Rural',
      icon: ShieldCheck,
      color: '#38bdf8',
      glow: '0 0 20px rgba(56, 189, 248, 0.3)',
      trend: '+5.2% en 6 años',
      isPositive: true,
      unit: '% Cobertura',
      description: 'Porcentaje global de viviendas rurales y urbanas integradas a la red pública de acueducto, saneamiento y energía.',
      history: [
        { year: '2020', value: 91.2, label: '91.2%' },
        { year: '2021', value: 92.5, label: '92.5%' },
        { year: '2022', value: 93.8, label: '93.8%' },
        { year: '2023', value: 94.7, label: '94.7%' },
        { year: '2024', value: 95.5, label: '95.5%' },
        { year: '2025', value: 96.0, label: '96.0%' },
        { year: '2026', value: 96.4, label: '96.4%' },
      ],
      milestone: 'Modernización de plantas de tratamiento de agua potable en Salento, Filandia y Pijao.'
    }
  ];

  // Tooltip personalizado para el gráfico modal
  const CustomModalTooltip = ({ active, payload, label, unit }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#050b07] border border-white/10 p-3 rounded-lg shadow-2xl text-xs text-slate-200">
          <p className="font-bold text-amber-400 mb-1">Año {label}</p>
          <p className="text-white font-semibold">
            Valor: <span className="text-emerald-400">{payload[0].payload.label || payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Activity size={14} className="text-amber-400" />
          Indicadores Agregados Departamentales (Haz clic para ver evolución histórica)
        </h4>
        <span className="text-[11px] text-slate-400">Quindío 2020 - 2026</span>
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px'
      }}>
        {aggregatedIndicators.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => setSelectedIndicator(card)}
              className="glass-panel animate-fade-in group"
              style={{
                padding: '20px',
                position: 'relative',
                overflow: 'hidden',
                borderLeft: `4px solid ${card.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '145px',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = card.color;
                e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--panel-border)';
                e.currentTarget.style.background = 'var(--panel-bg)';
              }}
            >
              {/* Background Glow */}
              <div style={{
                position: 'absolute',
                top: '-15px',
                right: '-15px',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: card.color,
                filter: 'blur(35px)',
                opacity: 0.15,
                pointerEvents: 'none'
              }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase' }}>
                    {card.title}
                  </span>
                  <h3 className="font-display" style={{ fontSize: '22px', fontWeight: '800', marginTop: '4px', color: '#ffffff' }}>
                    {card.value}
                  </h3>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  padding: '8px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: card.glow
                }}>
                  <Icon size={18} color={card.color} />
                </div>
              </div>

              {/* Mini Footer / Sparkline Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                <div>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0 }}>
                    {card.subtitle}
                  </p>
                  <span style={{ fontSize: '10px', color: card.color, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                    <TrendingUp size={11} />
                    {card.trend}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
                  <span>Ver Historia</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal / Overlay de Evolución Histórica */}
      {selectedIndicator && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedIndicator(null)}
        >
          <div 
            className="glass-panel w-full max-w-2xl p-6 space-y-6 bg-[#070e09] border border-amber-500/30 rounded-2xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="p-3 rounded-xl border border-white/10" 
                  style={{ background: `${selectedIndicator.color}15`, color: selectedIndicator.color }}
                >
                  {React.createElement(selectedIndicator.icon, { size: 24 })}
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Evolución Histórica Departamental
                  </span>
                  <h3 className="text-xl font-bold text-white font-display">
                    {selectedIndicator.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedIndicator(null)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Current Metrics Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/2 border border-white/5 p-3 rounded-xl">
                <span className="text-slate-400 block font-medium">Valor Actual (2026)</span>
                <span className="text-lg font-bold text-white mt-1 block">{selectedIndicator.value}</span>
              </div>
              <div className="bg-white/2 border border-white/5 p-3 rounded-xl">
                <span className="text-slate-400 block font-medium">Tendencia</span>
                <span className="text-lg font-bold text-emerald-400 mt-1 block flex items-center gap-1">
                  <TrendingUp size={16} />
                  {selectedIndicator.trend}
                </span>
              </div>
              <div className="bg-white/2 border border-white/5 p-3 rounded-xl col-span-2 sm:col-span-1">
                <span className="text-slate-400 block font-medium">Unidad de Medida</span>
                <span className="text-sm font-semibold text-slate-200 mt-1.5 block">{selectedIndicator.unit}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 leading-relaxed bg-white/1 p-3 rounded-lg border border-white/5">
              {selectedIndicator.description}
            </p>

            {/* Recharts Area Chart - Evolución Histórica (2020 - 2026) */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-400" />
                Serie Temporal de Evolución (2020 - 2026)
              </h4>
              <div className="h-64 bg-white/1 p-4 rounded-xl border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedIndicator.history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedIndicator.color} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={selectedIndicator.color} stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="var(--text-secondary)" fontSize={11} tickLine={false} />
                    <YAxis stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomModalTooltip unit={selectedIndicator.unit} />} />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={selectedIndicator.color} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorArea)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Historical Values Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Desglose Anual Histórico</h4>
              <div className="overflow-x-auto border border-white/5 rounded-lg">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/3 text-amber-400 border-b border-white/5 font-mono">
                      {selectedIndicator.history.map(h => (
                        <th key={h.year} className="py-2 px-3 text-center">{h.year}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {selectedIndicator.history.map(h => (
                        <td key={h.year} className="py-2.5 px-3 text-center text-slate-200 font-semibold border-b border-white/2">
                          {h.label}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Milestone Footer */}
            {selectedIndicator.milestone && (
              <div className="text-xs text-slate-400 bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                <strong className="text-amber-400 block mb-0.5">Hito de Desarrollo Regional:</strong>
                {selectedIndicator.milestone}
              </div>
            )}

            <button
              onClick={() => setSelectedIndicator(null)}
              className="w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 font-bold py-2.5 rounded-xl text-xs transition-colors border border-amber-500/30 cursor-pointer"
            >
              Cerrar Vista Histórica
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
