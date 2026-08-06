import React, { useState } from 'react';
import { Sprout, DollarSign, Calculator } from 'lucide-react';

export default function InvestmentCalc() {
  const [hectareas, setHectareas] = useState(5);
  const [precioSaco, setPrecioSaco] = useState(850000); // Pesos COP por saco
  const [sacosPorHectarea, setSacosPorHectarea] = useState(18); // Rendimiento promedio

  const produccionTotal = hectareas * sacosPorHectarea;
  const ingresosBrutos = produccionTotal * precioSaco;
  const costoProduccionEstimado = ingresosBrutos * 0.6; // 60% son costos operativos/insumos
  const beneficioNeto = ingresosBrutos - costoProduccionEstimado;

  return (
    <div className="glass-panel" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          background: 'var(--accent-coffee)',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Calculator size={20} color="#ffffff" />
        </div>
        <div>
          <h3 className="font-display" style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-gold)' }}>
            Calculadora de Rendimiento Cafetero
          </h3>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
            Simula ganancias proyectadas según tamaño del cultivo y cotización del saco.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Hectáreas Cultivadas */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span>Hectáreas Sembradas: <strong>{hectareas} ha</strong></span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={hectareas}
            onChange={(e) => setHectareas(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent-gold)',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Precio por saco */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span>Precio del Saco (COP): <strong>${precioSaco.toLocaleString()}</strong></span>
          </div>
          <input
            type="range"
            min="500000"
            max="1500000"
            step="50000"
            value={precioSaco}
            onChange={(e) => setPrecioSaco(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent-coffee)',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Rendimiento por Hectárea */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span>Sacos por Hectárea (Anual): <strong>{sacosPorHectarea} sacos</strong></span>
          </div>
          <input
            type="range"
            min="10"
            max="30"
            value={sacosPorHectarea}
            onChange={(e) => setSacosPorHectarea(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'var(--accent-green-light)',
              cursor: 'pointer'
            }}
          />
        </div>

        {/* Resultados */}
        <div style={{
          marginTop: '10px',
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(0, 0, 0, 0.25)',
          border: '1px solid var(--panel-border)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Producción Est.</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-coffee)' }}>{produccionTotal} sacos</span>
          </div>
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Ingreso Bruto Est.</span>
            <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--accent-gold)' }}>${ingresosBrutos.toLocaleString()}</span>
          </div>
          <div style={{ gridColumn: 'span 2', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Beneficio Neto Estimado (40%)</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--accent-green-light)' }}>
              ${beneficioNeto.toLocaleString()} COP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
