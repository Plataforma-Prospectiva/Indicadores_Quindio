import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';

export default function SavingsGoals({ metas, onAportar }) {
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '20px', height: '100%' }}>
      <h3 className="font-display" style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-gold)' }}>
        Planes y Metas de Desarrollo Regional
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {metas.map((meta) => {
          const porcentaje = Math.min(Math.round((meta.actual / meta.objetivo) * 100), 100);
          return (
            <div key={meta.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600' }}>{meta.nombre}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    Objetivo: ${meta.objetivo.toLocaleString()} COP
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--accent-green-light)' }}>
                    {porcentaje}%
                  </span>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    ${meta.actual.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{
                height: '8px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '10px',
                position: 'relative'
              }}>
                <div style={{
                  height: '100%',
                  width: `${porcentaje}%`,
                  background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-green-light) 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.4s ease-out'
                }} />
              </div>

              {/* Action Button */}
              {porcentaje < 100 ? (
                <button
                  onClick={() => onAportar(meta.id, 5000000)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--accent-gold)',
                    background: 'transparent',
                    color: 'var(--accent-gold)',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--accent-gold)';
                    e.currentTarget.style.color = '#050b07';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--accent-gold)';
                  }}
                >
                  + Asignar Presupuesto ($5M)
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green-light)', fontSize: '12px', fontWeight: '600' }}>
                  <CheckCircle2 size={14} />
                  Meta Financiada Exitosamente
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
