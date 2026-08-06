import React from 'react';
import { Coffee, Users, DollarSign, Trees } from 'lucide-react';

export default function SummaryCards({ cafeProduccion, turistasMes, saldoPresupuesto }) {
  const cards = [
    {
      title: 'Producción de Café',
      value: `${cafeProduccion.toLocaleString()} sacos`,
      subtitle: 'Cosecha proyectada (Mes)',
      icon: Coffee,
      color: 'var(--accent-coffee)',
      glow: '0 0 15px rgba(141, 110, 99, 0.2)'
    },
    {
      title: 'Turistas Activos',
      value: `${turistasMes.toLocaleString()}`,
      subtitle: 'Visitantes este mes',
      icon: Users,
      color: 'var(--accent-green-light)',
      glow: 'var(--green-glow)'
    },
    {
      title: 'Presupuesto Departamental',
      value: `$${(saldoPresupuesto / 1e6).toFixed(1)}M`,
      subtitle: 'Fondos disponibles (COP)',
      icon: DollarSign,
      color: 'var(--accent-gold)',
      glow: 'var(--neon-glow)'
    },
    {
      title: 'Municipios',
      value: '12 Municipios',
      subtitle: 'Área de cobertura total',
      icon: Trees,
      color: '#4db6ac',
      glow: '0 0 15px rgba(77, 182, 172, 0.2)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      marginBottom: '24px'
    }}>
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="glass-panel animate-fade-in"
            style={{
              padding: '20px',
              position: 'relative',
              overflow: 'hidden',
              animationDelay: `${i * 0.1}s`
            }}
          >
            {/* Background Glow Effect */}
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: card.color,
              filter: 'blur(30px)',
              opacity: 0.3
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>
                {card.title}
              </span>
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
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

            <h3 className="font-display" style={{ fontSize: '24px', fontWeight: '800', marginBottom: '4px' }}>
              {card.value}
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
