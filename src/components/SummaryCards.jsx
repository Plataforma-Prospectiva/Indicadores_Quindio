import React from 'react';
import { Coffee, Users, DollarSign, Trees, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function SummaryCards({ cafeProduccion, turistasMes, saldoPresupuesto }) {
  const cards = [
    {
      title: 'Producción de Café',
      value: `${cafeProduccion.toLocaleString()} sacos`,
      subtitle: 'Cosecha proyectada (Mes)',
      icon: Coffee,
      color: 'var(--accent-coffee)',
      glow: '0 0 20px rgba(141, 110, 99, 0.3)',
      trend: '+12.4% este mes',
      sparkline: [30, 40, 35, 50, 45, 60] // mock trend points
    },
    {
      title: 'Turistas Activos',
      value: `${turistasMes.toLocaleString()}`,
      subtitle: 'Visitantes este mes',
      icon: Users,
      color: 'var(--accent-green-light)',
      glow: 'var(--green-glow)',
      trend: '+8.2% vs año ant.',
      sparkline: [20, 25, 45, 30, 50, 65]
    },
    {
      title: 'Presupuesto Departamental',
      value: `$${(saldoPresupuesto / 1e6).toFixed(1)}M`,
      subtitle: 'Fondos disponibles (COP)',
      icon: DollarSign,
      color: 'var(--accent-gold)',
      glow: 'var(--neon-glow)',
      trend: '94% asignado',
      sparkline: [80, 75, 85, 90, 88, 94]
    },
    {
      title: 'Municipios de Cobertura',
      value: '12 Municipios',
      subtitle: 'Área de impacto total',
      icon: Trees,
      color: '#4db6ac',
      glow: '0 0 20px rgba(77, 182, 172, 0.3)',
      trend: '100% integrados',
      sparkline: [12, 12, 12, 12, 12, 12]
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              animationDelay: `${i * 0.1}s`,
              borderLeft: `4px solid ${card.color}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '160px',
              transition: 'transform 0.3s ease, border-color 0.3s',
              cursor: 'default'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--panel-border)';
            }}
          >
            {/* Background Glow Effect */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: card.color,
              filter: 'blur(40px)',
              opacity: 0.15,
              pointerEvents: 'none'
            }} />

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', tracking: '0.5px' }}>
                  {card.title}
                </span>
                <h3 className="font-display" style={{ fontSize: '24px', fontWeight: '800', marginTop: '6px', color: '#ffffff' }}>
                  {card.value}
                </h3>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '10px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: card.glow
              }}>
                <Icon size={20} color={card.color} />
              </div>
            </div>

            {/* Bottom Row / Sparkline and Trend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '20px' }}>
              <div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                  {card.subtitle}
                </p>
                <span style={{ fontSize: '10px', color: card.color, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '4px' }}>
                  <TrendingUp size={12} />
                  {card.trend}
                </span>
              </div>
              
              {/* Mini SVG Sparkline */}
              <svg width="60" height="24" style={{ overflow: 'visible', opacity: 0.8 }}>
                <path
                  d={`M ${card.sparkline.map((val, idx) => `${idx * 12},${24 - (val / 100) * 20}`).join(' L ')}`}
                  fill="none"
                  stroke={card.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
