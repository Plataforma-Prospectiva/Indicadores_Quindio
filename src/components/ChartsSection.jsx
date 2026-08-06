import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';

export default function ChartsSection({ transacciones }) {
  // Datos simulados de producción de café por municipio del Quindío
  const produccionPorMunicipio = [
    { name: 'Armenia', valor: 2800 },
    { name: 'Calarcá', valor: 3400 },
    { name: 'Salento', valor: 1900 },
    { name: 'Montenegro', valor: 3100 },
    { name: 'Quimbaya', valor: 2900 },
    { name: 'Filandia', valor: 2200 }
  ];

  // Datos simulados de turismo por mes
  const turismoTendencia = [
    { mes: 'Ene', visitantes: 42000 },
    { mes: 'Feb', visitantes: 38000 },
    { mes: 'Mar', visitantes: 45000 },
    { mes: 'Abr', visitantes: 52000 },
    { mes: 'May', visitantes: 48000 },
    { mes: 'Jun', visitantes: 65000 },
    { mes: 'Jul', visitantes: 72000 }
  ];

  // Colores para el gráfico de barras del café
  const COLORS = ['#d4af37', '#8d6e63', '#4caf50', '#2e7d32', '#81c784', '#a1887f'];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    }}>
      {/* Gráfico 1: Producción de Café por Municipio */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 className="font-display" style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-gold)' }}>
          Producción de Café por Municipio (Sacos / Mes)
        </h3>
        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={produccionPorMunicipio}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: '#0e2219',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
              <Bar dataKey="valor" radius={[4, 4, 0, 0]}>
                {produccionPorMunicipio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico 2: Flujo de Turistas */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 className="font-display" style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-green-light)' }}>
          Tendencia de Visitantes Mensuales (Ecoturismo)
        </h3>
        <div style={{ width: '100%', height: '260px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={turismoTendencia}>
              <defs>
                <linearGradient id="colorVisitantes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--accent-green-light)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--accent-green-light)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
              <XAxis dataKey="mes" stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
              <YAxis stroke="var(--text-secondary)" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: '#0e2219',
                  border: '1px solid var(--accent-green-light)',
                  borderRadius: '8px',
                  color: 'var(--text-primary)'
                }}
              />
              <Area type="monotone" dataKey="visitantes" stroke="var(--accent-green-light)" fillOpacity={1} fill="url(#colorVisitantes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
