import React from 'react';
import { ArrowUpRight, ArrowDownRight, Coffee, ShieldAlert, Award } from 'lucide-react';

export default function TransactionList({ transacciones }) {
  return (
    <div className="glass-panel" style={{ padding: '20px', height: '100%' }}>
      <h3 className="font-display" style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-gold)' }}>
        Historial de Movimientos Presupuestales
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
        {transacciones.length === 0 ? (
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
            No se han registrado movimientos presupuestales aún.
          </p>
        ) : (
          transacciones.map((tx) => {
            const isIngreso = tx.tipo === 'ingreso';
            return (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.02)',
                  borderLeft: `4px solid ${isIngreso ? 'var(--accent-green-light)' : 'var(--accent-coffee)'}`
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>{tx.concepto}</h4>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'var(--text-secondary)'
                    }}>
                      {tx.categoria}
                    </span>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{tx.fecha}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: isIngreso ? 'var(--accent-green-light)' : '#e57373'
                  }}>
                    {isIngreso ? '+' : '-'}${tx.monto.toLocaleString()}
                  </span>
                  {isIngreso ? (
                    <ArrowUpRight size={16} color="var(--accent-green-light)" />
                  ) : (
                    <ArrowDownRight size={16} color="#e57373" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
