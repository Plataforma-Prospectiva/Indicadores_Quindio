import React, { useState, useEffect } from 'react';
import { Compass, Coffee, MapPin, DollarSign, Trees, TrendingUp, RefreshCw, AlertCircle, Database } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Resumen General', icon: Compass },
    { id: 'api_data', label: 'Indicadores Quindío (API)', icon: Database },
    { id: 'cafe', label: 'Café & Cosechas', icon: Coffee },
    { id: 'turismo', label: 'Turismo & Destinos', icon: MapPin },
    { id: 'finanzas', label: 'Presupuesto Departamental', icon: DollarSign },
  ];

  return (
    <aside className="glass-panel" style={{
      width: '280px',
      height: 'calc(100vh - 40px)',
      position: 'sticky',
      top: '20px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginRight: '24px'
    }}>
      <div>
        {/* Logo / Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{
            background: 'var(--accent-gold)',
            padding: '8px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--neon-glow)'
          }}>
            <Trees size={24} color="#050b07" />
          </div>
          <div>
            <h2 className="font-display" style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '0.5px' }}>
              Quindío
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--accent-gold)', fontWeight: '600', textTransform: 'uppercase' }}>
              Estadísticas Premium
            </p>
          </div>
        </div>

        {/* Menu Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: isActive ? 'rgba(212, 175, 55, 0.15)' : 'transparent',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  borderLeft: isActive ? '3px solid var(--accent-gold)' : '3px solid transparent'
                }}
                className={isActive ? '' : 'sidebar-btn'}
              >
                <Icon size={18} color={isActive ? 'var(--accent-gold)' : 'var(--text-secondary)'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div style={{
        paddingTop: '20px',
        borderTop: '1px solid var(--panel-border)',
        fontSize: '12px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <TrendingUp size={14} color="var(--accent-green-light)" />
          <span>Región Cafetera</span>
        </div>
        <p style={{ fontSize: '11px', lineHeight: '1.4' }}>
          Visualización en tiempo real de indicadores del Quindío.
        </p>
      </div>
    </aside>
  );
}
