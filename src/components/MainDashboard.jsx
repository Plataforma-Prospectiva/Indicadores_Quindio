import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  Tooltip, Cell, BarChart, Bar, Legend, PieChart, Pie
} from 'recharts';
import { 
  Coffee, Leaf, TrendingUp, TrendingDown, Layers, FileText, 
  AlertTriangle, ArrowUpRight, PlusCircle, Globe, Activity 
} from 'lucide-react';

export default function MainDashboard() {
  // --- Estados de Flujo Presupuestal ---
  const [transacciones, setTransacciones] = useState([
    { id: 1, concepto: 'Subsidio insumos caficultores', monto: 120000000, tipo: 'egreso', origen: 'Público' },
    { id: 2, concepto: 'Recaudo Impuesto de Turismo', monto: 350000000, tipo: 'ingreso', origen: 'Público' },
    { id: 3, concepto: 'Inversión Hotelería Ecoturística', monto: 220000000, tipo: 'ingreso', origen: 'Privado' },
    { id: 4, concepto: 'Mantenimiento Vías Quimbaya', monto: 90000000, tipo: 'egreso', origen: 'Público' },
    { id: 5, concepto: 'Patrocinio Feria del Café', monto: 45000000, tipo: 'ingreso', origen: 'Privado' },
  ]);

  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('ingreso');
  const [origen, setOrigen] = useState('Público');

  const handleAddTransaccion = (e) => {
    e.preventDefault();
    if (!concepto || !monto) return;
    const nueva = {
      id: Date.now(),
      concepto,
      monto: parseFloat(monto),
      tipo,
      origen
    };
    setTransacciones([...transacciones, nueva]);
    setConcepto('');
    setMonto('');
  };

  // Calcular balance Público vs Privado
  const totalPublico = transacciones
    .filter(t => t.origen === 'Público')
    .reduce((acc, t) => acc + (t.tipo === 'ingreso' ? t.monto : -t.monto), 0);

  const totalPrivado = transacciones
    .filter(t => t.origen === 'Privado')
    .reduce((acc, t) => acc + (t.tipo === 'ingreso' ? t.monto : -t.monto), 0);

  const pieData = [
    { name: 'Público', value: Math.max(0, totalPublico) },
    { name: 'Privado', value: Math.max(0, totalPrivado) }
  ];

  // --- Estados de API Indicadores Quindío (Simulación de Carga) ---
  const [loadingApi, setLoadingApi] = useState(true);
  const [indicadoresApi, setIndicadoresApi] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndicadoresApi([
        { id: 1, nombre: 'Tasa de Desempleo', valor: '11.2%', sub: '-0.8% vs año anterior' },
        { id: 2, nombre: 'Índice de Competitividad', valor: '5.84 / 10', sub: 'Puesto 8 nacional' },
        { id: 3, nombre: 'Crecimiento PIB Anual', valor: '+2.4%', sub: 'Agro & Ecoturismo' },
        { id: 4, nombre: 'Cobertura Conectividad Rural', valor: '68.5%', sub: '+4.1% este trim.' }
      ]);
      setLoadingApi(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // --- Datos Estáticos Sección 1 ---
  const scatterData = [
    { name: 'Educación', datasets: 180, visitas: 15000, color: '#3b82f6' },
    { name: 'Transporte', datasets: 25, visitas: 340000, color: '#ef4444' },
    { name: 'Salud', datasets: 90, visitas: 85000, color: '#10b981' },
    { name: 'Hacienda', datasets: 60, visitas: 50000, color: '#d4af37' },
    { name: 'Cultura', datasets: 40, visitas: 20000, color: '#a855f7' }
  ];

  const barData = [
    { name: 'Armenia', datasets: 420, visitasPromedio: 150 },
    { name: 'Calarcá', datasets: 45, visitasPromedio: 1100 }
  ];

  const blockbusters = [
    { id: 1, nombre: 'Graduados por programa', visitas: 182500, calidad: 9.2 },
    { id: 2, nombre: 'Vehículos matriculados', visitas: 143200, calidad: 8.9 },
    { id: 3, nombre: 'Accidentes de tránsito', visitas: 128400, calidad: 8.5 },
    { id: 4, font: 'Uniquindio', nombre: 'Estudiantes Uniquindio', visitas: 95600, calidad: 9.0 },
    { id: 5, nombre: 'Propiedad Horizontal Armenia', visitas: 82100, calidad: 8.7 }
  ];

  // Custom Dark Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b130e] border border-white/10 p-3 rounded-lg shadow-xl text-xs text-slate-200">
          <p className="font-bold text-white mb-1">{payload[0].payload.name || payload[0].name}</p>
          {payload.map((p, idx) => (
            <p key={idx} style={{ color: p.color || '#fff' }}>
              {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="text-slate-200 space-y-6 animate-fade-in" style={{ padding: '0px' }}>
      
      {/* Main Grid: Dos columnas para distribuir los módulos principales */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* SECCIÓN 1: Análisis de Datos Abiertos Quindío */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3 font-display">
              <FileText size={18} className="text-emerald-400" />
              Análisis de Datos Abiertos Quindío
            </h3>

            {/* Fila de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Scatter / Burbujas */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monopolio Temático vs. Interés Ciudadano</h4>
                <p className="text-[11px] text-slate-400">Relación de cantidad de datasets vs total visitas por sector.</p>
                <div className="h-60 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 10, bottom: 10, left: 0 }}>
                      <XAxis 
                        type="number" 
                        dataKey="datasets" 
                        stroke="var(--text-secondary)" 
                        fontSize={10} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="visitas" 
                        stroke="var(--text-secondary)" 
                        fontSize={10} 
                        tickLine={false}
                        axisLine={false}
                      />
                      <ZAxis type="number" range={[100, 300]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Scatter name="Sectores" data={scatterData}>
                        {scatterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-2 justify-center flex-wrap mt-1">
                  {scatterData.map(s => (
                    <span key={s.name} className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-semibold">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bar Chart Armenia vs Calarcá */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Eficiencia Geográfica</h4>
                <p className="text-[11px] text-slate-400">Volumen de publicación frente a visitas promedio por dataset.</p>
                <div className="h-60 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" orientation="left" stroke="#d4af37" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={9} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ fontSize: '10px' }} />
                      <Bar yAxisId="left" dataKey="datasets" name="Total Datasets" fill="#d4af37" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="visitasPromedio" name="Visitas por Dataset" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* KPI / Progress bar: Alerta de Mantenimiento */}
            <div className="bg-[#e6a100]/5 border border-[#e6a100]/20 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle size={15} />
                  Alerta de Mantenimiento de Datos
                </span>
                <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                  Desactualizado
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Actualización Prometida: Semestral (180 días)</span>
                  <span className="font-bold text-amber-400">Promedio Real: 607 días de retraso</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Tabla de Blockbusters */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top 5 Datasets Más Vistos</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/5 text-slate-400">
                      <th className="py-2">Dataset</th>
                      <th className="py-2 text-right">Visitas</th>
                      <th className="py-2 text-right">Calidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockbusters.map((item, idx) => (
                      <tr key={item.id} className="border-b border-white/2 hover:bg-white/1 transition-colors">
                        <td className="py-2.5 font-medium text-slate-200 flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-white/5 text-[9px] font-bold text-slate-300">
                            {idx + 1}
                          </span>
                          {item.nombre}
                        </td>
                        <td className="py-2.5 text-right font-semibold text-slate-300">{item.visitas.toLocaleString()}</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                            {item.calidad}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Columnas Laterales (Sección 2 y Sección 4) */}
        <div className="space-y-6">
          
          {/* SECCIÓN 2: Módulo de Flujo Presupuestal */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 className="text-base font-bold text-white border-b border-white/5 pb-3 font-display">
              Registrar Flujo Presupuestal
            </h3>
            
            {/* Formulario */}
            <form onSubmit={handleAddTransaccion} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">CONCEPTO</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Insumos o Patrocinio"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid var(--panel-border)',
                      background: '#0d1611',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">VALOR (COP)</label>
                    <input
                      type="number"
                      required
                      placeholder="Monto"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--panel-border)',
                        background: '#0d1611',
                        color: 'var(--text-primary)',
                        fontSize: '13px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">ORIGEN CAPITAL</label>
                    <select
                      value={origen}
                      onChange={(e) => setOrigen(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid var(--panel-border)',
                        background: '#0d1611',
                        color: 'var(--text-primary)',
                        fontSize: '13px',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Público">Público</option>
                      <option value="Privado">Privado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1">TIPO DE FLUJO</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTipo('ingreso')}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                        tipo === 'ingreso' 
                          ? 'bg-emerald-500/25 border-emerald-500 text-emerald-400 shadow-sm' 
                          : 'border-white/10 text-slate-400 hover:bg-white/2'
                      }`}
                    >
                      Ingreso
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipo('egreso')}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                        tipo === 'egreso' 
                          ? 'bg-rose-500/25 border-rose-500 text-rose-400 shadow-sm' 
                          : 'border-white/10 text-slate-400 hover:bg-white/2'
                      }`}
                    >
                      Egreso
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg text-xs flex justify-center items-center gap-1.5 transition-colors cursor-pointer"
              >
                <PlusCircle size={14} />
                Agregar Flujo
              </button>
            </form>

            {/* Doughnut Chart de Balance Público vs Privado */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">Balance Público vs Privado</h4>
              <div className="h-40 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={60}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      <Cell fill="#3b82f6" />
                      <Cell fill="#d4af37" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-[11px] font-semibold">
                <span className="flex items-center gap-1.5 text-sky-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Público: ${(totalPublico).toLocaleString()}
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  Privado: ${(totalPrivado).toLocaleString()}
                </span>
              </div>
            </div>

          </div>

          {/* SECCIÓN 4: Integración API Indicadores Quindío */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h3 className="text-base font-bold text-white font-display">
                Indicadores Quindío
              </h3>
              <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 px-2 py-0.5 rounded-md text-[9px] font-extrabold flex items-center gap-1 tracking-wider uppercase">
                <Globe size={10} />
                DATOS API
              </span>
            </div>

            {loadingApi ? (
              // Skeleton loading simulation
              <div className="space-y-4 py-2">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="space-y-2 animate-pulse">
                    <div className="h-3 bg-white/10 rounded w-2/3"></div>
                    <div className="h-5 bg-white/5 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {indicadoresApi.map(item => (
                  <div key={item.id} className="p-3 bg-white/2 border border-white/5 rounded-xl hover:bg-white/4 transition-colors">
                    <span className="text-[11px] text-slate-400 block font-medium">{item.nombre}</span>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-base font-bold text-white">{item.valor}</span>
                      <span className="text-[10px] text-slate-400">{item.sub}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
