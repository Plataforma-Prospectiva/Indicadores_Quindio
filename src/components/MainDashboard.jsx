import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  Tooltip, Cell, BarChart, Bar, Legend, PieChart, Pie
} from 'recharts';
import { 
  Coffee, Leaf, TrendingUp, TrendingDown, Layers, FileText, 
  AlertTriangle, ArrowUpRight, PlusCircle, Globe, RefreshCw 
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

  // Asegurar que no grafiquemos valores negativos en el PieChart (usamos montos absolutos o flujos acumulados positivos)
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
        { id: 1, nombre: 'Tasa de Desempleo', valor: '11.2%', sub: '-0.8% vs año anterior', tendencia: 'up' },
        { id: 2, nombre: 'Índice de Competitividad', valor: '5.84 / 10', sub: 'Puesto 8 a nivel nacional', tendencia: 'up' },
        { id: 3, nombre: 'PIB Departamental (Crecimiento)', valor: '+2.4%', sub: 'Impulsado por Agro y Turismo', tendencia: 'up' },
        { id: 4, nombre: 'Cobertura Conectividad Rural', valor: '68.5%', sub: '+4.1% este trimestre', tendencia: 'up' }
      ]);
      setLoadingApi(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // --- Datos Estáticos Sección 1 ---
  const scatterData = [
    { name: 'Educación', datasets: 180, visitas: 15000, color: '#3b82f6' },
    { name: 'Transporte', datasets: 25, visitas: 340000, color: '#ef4444' },
    { name: 'Salud', datasets: 90, visitas: 85000, color: '#10b981' },
    { name: 'Hacienda', datasets: 60, visitas: 50000, color: '#f59e0b' },
    { name: 'Cultura', datasets: 40, visitas: 20000, color: '#8b5cf6' }
  ];

  const barData = [
    { name: 'Armenia', datasets: 420, visitasPromedio: 150 },
    { name: 'Calarcá', datasets: 45, visitasPromedio: 1100 }
  ];

  const blockbusters = [
    { id: 1, nombre: 'Graduados por programa', visitas: 182500, calidad: 9.2 },
    { id: 2, nombre: 'Vehículos matriculados', visitas: 143200, calidad: 8.9 },
    { id: 3, nombre: 'Accidentes de tránsito', visitas: 128400, calidad: 8.5 },
    { id: 4, nombre: 'Estudiantes Uniquindio', visitas: 95600, calidad: 9.0 },
    { id: 5, nombre: 'Propiedad Horizontal Armenia', visitas: 82100, calidad: 8.7 }
  ];

  return (
    <div className="bg-slate-50 min-height-screen text-slate-800 p-6 space-y-6">
      
      {/* SECCIÓN 3: Monitor de Café y Cosechas (Colocado arriba para vista general inmediata) */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Coffee className="text-amber-700" />
          Monitor de Café y Cosechas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-slate-400">Volumen Producido</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">15,300 Sacos</h4>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
                <TrendingUp size={14} />
                <span>+12.4% vs mes anterior</span>
              </div>
            </div>
            <div className="bg-amber-50 p-4 rounded-xl text-amber-700">
              <Coffee size={24} />
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-slate-400">Proyección de Cosecha</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">18,500 Sacos</h4>
              <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold mt-2">
                <TrendingUp size={14} />
                <span>+5.1% proyectado</span>
              </div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl text-emerald-700">
              <Leaf size={24} />
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-slate-400">Rendimiento por Hectárea</p>
              <h4 className="text-2xl font-bold text-slate-800 mt-1">1.45 Ton/Ha</h4>
              <div className="flex items-center gap-1 text-rose-600 text-xs font-semibold mt-2">
                <TrendingDown size={14} />
                <span>-2.3% por lluvias</span>
              </div>
            </div>
            <div className="bg-sky-50 p-4 rounded-xl text-sky-700">
              <Layers size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Dos columnas para distribuir los módulos principales */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* SECCIÓN 1: Análisis de Datos Abiertos Quindío (Ocupa 2/3 columnas en XL) */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="text-emerald-600" />
              Análisis de Datos Abiertos Quindío
            </h3>

            {/* Fila de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Scatter / Burbujas */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-700">Monopolio Temático vs. Interés Ciudadano</h4>
                <p className="text-xs text-slate-400">Educación satura oferta; Transporte tiene demanda masiva.</p>
                <div className="h-60 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                      <XAxis type="number" dataKey="datasets" name="Datasets publicados" label={{ value: 'Datasets', position: 'insideBottom', offset: -5, fontSize: 11 }} />
                      <YAxis type="number" dataKey="visitas" name="Visitas Totales" label={{ value: 'Visitas', angle: -90, position: 'insideLeft', fontSize: 11 }} />
                      <ZAxis type="number" range={[100, 400]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Sectores" data={scatterData} fill="#8884d8">
                        {scatterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Scatter>
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-3 justify-center flex-wrap mt-2">
                  {scatterData.map(s => (
                    <span key={s.name} className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }}></span>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bar Chart Armenia vs Calarcá */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-slate-700">Eficiencia Geográfica</h4>
                <p className="text-xs text-slate-400">Armenia publica alto volumen vs Calarcá con captación eficiente.</p>
                <div className="h-60 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" label={{ value: 'Datasets', angle: -90, position: 'insideLeft', offset: 0, fontSize: 10 }} />
                      <YAxis yAxisId="right" orientation="right" stroke="#10b981" label={{ value: 'Visitas Promedio', angle: 90, position: 'insideRight', offset: 0, fontSize: 10 }} />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36}/>
                      <Bar yAxisId="left" dataKey="datasets" name="Total Datasets" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar yAxisId="right" dataKey="visitasPromedio" name="Visitas por Dataset" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* KPI / Progress bar: Alerta de Mantenimiento */}
            <div className="bg-amber-50/50 border border-amber-200/60 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle size={16} />
                  Alerta de Mantenimiento de Datos
                </span>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                  Estado Crítico
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Actualización Prometida: Semestral (180 días)</span>
                  <span className="font-bold text-slate-700">Realidad: Promedio 607 días de retraso</span>
                </div>
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Tabla de Blockbusters */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-700">Top 5 Datasets Más Vistos (Blockbusters)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400">
                      <th className="py-2.5">Dataset</th>
                      <th className="py-2.5 text-right">Visitas</th>
                      <th className="py-2.5 text-right">Calidad Global</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blockbusters.map((item, idx) => (
                      <tr key={item.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-2.5 font-medium text-slate-800 flex items-center gap-2">
                          <span className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-700">
                            {idx + 1}
                          </span>
                          {item.nombre}
                        </td>
                        <td className="py-2.5 text-right font-semibold text-slate-700">{item.visitas.toLocaleString()}</td>
                        <td className="py-2.5 text-right">
                          <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md">
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
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
              Registrar Flujo Presupuestal
            </h3>
            
            {/* Formulario */}
            <form onSubmit={handleAddTransaccion} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">CONCEPTO</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Insumos agro"
                    value={concepto}
                    onChange={(e) => setConcepto(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none bg-slate-50 focus:bg-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">MONTO (COP)</label>
                  <input
                    type="number"
                    required
                    placeholder="Valor"
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none bg-slate-50 focus:bg-white focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">ORIGEN CAPITAL</label>
                  <select
                    value={origen}
                    onChange={(e) => setOrigen(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-none bg-slate-50 focus:bg-white focus:border-emerald-500"
                  >
                    <option value="Público">Público</option>
                    <option value="Privado">Privado</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">TIPO FLUJO</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTipo('ingreso')}
                      className={`py-2 rounded-lg text-xs font-semibold border ${
                        tipo === 'ingreso' 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700' 
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      Ingreso
                    </button>
                    <button
                      type="button"
                      onClick={() => setTipo('egreso')}
                      className={`py-2 rounded-lg text-xs font-semibold border ${
                        tipo === 'egreso' 
                          ? 'bg-rose-50 border-rose-500 text-rose-700' 
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      Egreso
                    </button>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg text-xs flex justify-center items-center gap-1.5 transition-colors"
              >
                <PlusCircle size={14} />
                Agregar Flujo
              </button>
            </form>

            {/* Doughnut Chart de Balance Público vs Privado */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 text-center">Distribución Acumulada Activa</h4>
              <div className="h-44 flex justify-center items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      <Cell fill="#0ea5e9" />
                      <Cell fill="#e879f9" />
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toLocaleString()} COP`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-xs">
                <span className="flex items-center gap-1.5 font-semibold text-sky-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                  Público: ${(totalPublico).toLocaleString()}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-fuchsia-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400"></span>
                  Privado: ${(totalPrivado).toLocaleString()}
                </span>
              </div>
            </div>

          </div>

          {/* SECCIÓN 4: Integración API Indicadores Quindío */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Indicadores Quindío
              </h3>
              <span className="bg-sky-50 border border-sky-100 text-sky-600 px-2 py-0.5 rounded-md text-[10px] font-extrabold flex items-center gap-1">
                <Globe size={10} />
                DATOS API
              </span>
            </div>

            {loadingApi ? (
              // Skeleton loading simulation
              <div className="space-y-4 py-2">
                {[1, 2, 3, 4].map(idx => (
                  <div key={idx} className="space-y-2 animate-pulse">
                    <div className="h-3.5 bg-slate-200 rounded w-2/3"></div>
                    <div className="h-5 bg-slate-100 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {indicadoresApi.map(item => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-50/80 transition-colors">
                    <span className="text-xs text-slate-400 block font-medium">{item.nombre}</span>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-lg font-bold text-slate-800">{item.valor}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{item.sub}</span>
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
