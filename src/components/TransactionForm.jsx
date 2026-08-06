import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function TransactionForm({ onAgregar }) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('ingreso');
  const [categoria, setCategoria] = useState('Agro');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!concepto || !monto) return;
    onAgregar({
      id: Date.now(),
      concepto,
      monto: parseFloat(monto),
      tipo,
      categoria,
      fecha: new Date().toLocaleDateString()
    });
    setConcepto('');
    setMonto('');
  };

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <h3 className="font-display" style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--accent-gold)' }}>
        Registrar Flujo Presupuestal (Público / Privado)
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Concepto o Proyecto</label>
          <input
            type="text"
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="Ej. Inversión vías Salento"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--panel-border)',
              background: 'rgba(0,0,0,0.2)',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Monto (COP)</label>
            <input
              type="number"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
              placeholder="Monto"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)',
                background: 'rgba(0,0,0,0.2)',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Tipo de Movimiento</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)',
                background: '#0e2219',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            >
              <option value="ingreso">Ingreso (Recaudo/Apoyo)</option>
              <option value="gasto">Gasto (Inversión/Obra)</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>Categoría Sectorial</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--panel-border)',
              background: '#0e2219',
              color: 'var(--text-primary)',
              outline: 'none'
            }}
          >
            <option value="Agro">Agro & Café</option>
            <option value="Turismo">Turismo & Cultura</option>
            <option value="Infraestructura">Infraestructura Vial</option>
            <option value="Ambiental">Conservación Ambiental</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '8px',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--accent-gold)',
            color: '#050b07',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background 0.2s',
            boxShadow: 'var(--neon-glow)'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-gold-hover)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'var(--accent-gold)'}
        >
          <PlusCircle size={16} />
          Registrar Operación
        </button>
      </form>
    </div>
  );
}
