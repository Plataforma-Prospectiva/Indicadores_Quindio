import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import SummaryCards from './components/SummaryCards';
import ChartsSection from './components/ChartsSection';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SavingsGoals from './components/SavingsGoals';
import InvestmentCalc from './components/InvestmentCalc';
import ApiIndicators from './components/ApiIndicators';
import MainDashboard from './components/MainDashboard';
import { Calendar, HelpCircle, Trees, Shield } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Datos base
  const [cafeProduccion, setCafeProduccion] = useState(15300); // sacos proyectados
  const [turistasMes, setTuristasMes] = useState(57200);       // visitantes
  const [saldoPresupuesto, setSaldoPresupuesto] = useState(850000000); // 850 Millones COP

  // Estado de Transacciones de ejemplo
  const [transacciones, setTransacciones] = useState([
    { id: 1, concepto: 'Subsidio insumos caficultores', monto: 120000000, tipo: 'gasto', categoria: 'Agro', fecha: '04/08/2026' },
    { id: 2, concepto: 'Recaudo Impuesto de Turismo', monto: 350000000, tipo: 'ingreso', categoria: 'Turismo', fecha: '05/08/2026' },
    { id: 3, concepto: 'Mantenimiento de vías Salento - Cocora', monto: 180000000, tipo: 'gasto', categoria: 'Infraestructura', fecha: '06/08/2026' },
  ]);

  // Metas de Desarrollo del Quindío
  const [metas, setMetas] = useState([
    { id: 1, nombre: 'Renovación de Cafetales (Filandia)', objetivo: 150000000, actual: 95000000 },
    { id: 2, nombre: 'Corredor Ecoturístico Quindío', objetivo: 400000000, actual: 280000000 },
    { id: 3, nombre: 'Reforestación Cuenca Río Quindío', objetivo: 100000000, actual: 100000000 },
  ]);

  // Manejo de aportes a las metas de desarrollo
  const handleAportarMeta = (id, montoAporte) => {
    if (saldoPresupuesto < montoAporte) {
      alert("No hay presupuesto suficiente para asignar a este proyecto.");
      return;
    }
    setMetas(metas.map(meta => {
      if (meta.id === id) {
        const nuevoActual = meta.actual + montoAporte;
        return { ...meta, actual: Math.min(nuevoActual, meta.objetivo) };
      }
      return meta;
    }));
    setSaldoPresupuesto(prev => prev - montoAporte);
    setTransacciones([
      {
        id: Date.now(),
        concepto: `Aporte a meta de desarrollo`,
        monto: montoAporte,
        tipo: 'gasto',
        categoria: 'Ambiental',
        fecha: new Date().toLocaleDateString()
      },
      ...transacciones
    ]);
  };

  // Manejo de nuevas transacciones
  const handleAgregarTransaccion = (nuevaTx) => {
    setTransacciones([nuevaTx, ...transacciones]);
    if (nuevaTx.tipo === 'ingreso') {
      setSaldoPresupuesto(prev => prev + nuevaTx.monto);
      if (nuevaTx.categoria === 'Agro') {
        setCafeProduccion(prev => prev + Math.floor(nuevaTx.monto / 100000));
      } else if (nuevaTx.categoria === 'Turismo') {
        setTuristasMes(prev => prev + Math.floor(nuevaTx.monto / 200000));
      }
    } else {
      setSaldoPresupuesto(prev => prev - nuevaTx.monto);
    }
  };

  return (
    <div style={{ display: 'flex', padding: '20px', minHeight: '100vh', maxWidth: '1440px', margin: '0 auto' }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--panel-border)'
        }}>
          <div>
            <h1 className="font-display" style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Estadísticas del Departamento de Quindío
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Plataforma prospectiva y análisis de indicadores multidimensionales del Quindío.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="glass-panel" style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px'
            }}>
              <Calendar size={14} color="var(--accent-gold)" />
              <span style={{ fontWeight: '600' }}>Agosto, 2026</span>
            </div>
            <div className="glass-panel" style={{
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }} title="Quindío Seguro">
              <Shield size={16} color="var(--accent-green-light)" />
            </div>
          </div>
        </header>

        {/* Dynamic Navigation Content */}
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <SummaryCards
              cafeProduccion={cafeProduccion}
              turistasMes={turistasMes}
              saldoPresupuesto={saldoPresupuesto}
            />
            <MainDashboard />
          </div>
        )}

        {activeTab === 'api_data' && (
          <ApiIndicators />
        )}

        {activeTab === 'cafe' && (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
            <InvestmentCalc />
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 className="font-display" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--accent-gold)' }}>
                Indicadores Cafeteros del Quindío
              </h3>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                El departamento del Quindío es el corazón del Paisaje Cultural Cafetero. El café cosechado en esta región destaca por sus notas suaves, acidez media-alta y cuerpo balanceado.
              </p>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--accent-gold)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Denominación de Origen</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Garantiza los estándares más exigentes del grano cultivado en laderas andinas entre 1,200 y 1,800 msnm.
                </p>
              </div>
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', borderLeft: '4px solid var(--accent-green-light)' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>Sostenibilidad</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Más del 60% de los caficultores de Quindío están migrando a prácticas ecológicas con certificación de carbono neutro.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
