'use client';

import React from 'react';
import { ALL_MODULES } from '@/lib/modules';
import { useSubscription } from '@/lib/SubscriptionContext';
import { Check, ShieldCheck, Zap } from 'lucide-react';

export default function SettingsPage() {
  const { isSubscribed, toggleSubscription, subscribeAll, unsubscribeAll } = useSubscription();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
          <span>Settings</span>
          <span style={{ margin: '0 6px' }}>›</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Subscription & Modules</span>
        </div>
        <h1
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Tenant Subscription & Module Licensing
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          TESSMA ONE architecture features modular entitlement. Each module is enabled only when subscribed.
        </p>
      </div>

      {/* Bulk action buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={subscribeAll}
          style={{
            padding: '7px 14px',
            borderRadius: 'var(--radius-ui)',
            background: 'var(--color-brand-teal)',
            color: '#FFFFFF',
            fontSize: '12.5px',
            fontWeight: 600,
          }}
        >
          Subscribe to All Modules
        </button>
        <button
          onClick={unsubscribeAll}
          style={{
            padding: '7px 14px',
            borderRadius: 'var(--radius-ui)',
            border: '1px solid var(--color-border)',
            background: '#FFFFFF',
            color: 'var(--color-text-primary)',
            fontSize: '12.5px',
            fontWeight: 500,
          }}
        >
          Disable All Optional Modules
        </button>
      </div>

      {/* Module List Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: '14px',
        }}
      >
        {ALL_MODULES.map((mod) => {
          const isCore = mod.id === 'dashboard' || mod.id === 'settings';
          const active = isSubscribed(mod.id);

          return (
            <div
              key={mod.id}
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-ui)',
                padding: '18px 20px',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {mod.name}
                    </span>
                    {isCore && (
                      <span
                        style={{
                          fontSize: '11px',
                          background: '#E2E8F0',
                          color: '#334155',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontWeight: 500,
                        }}
                      >
                        Core
                      </span>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: active ? '#E7F5EF' : '#F1F5F9',
                      color: active ? '#0F7A57' : '#64748B',
                      border: `1px solid ${active ? '#CCEADF' : '#E2E8F0'}`,
                    }}
                  >
                    {active ? 'Active' : 'Unsubscribed'}
                  </span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--color-text-secondary)', marginTop: '6px', lineHeight: 1.4 }}>
                  {mod.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--color-text-muted)' }}>
                  Category: <b style={{ textTransform: 'capitalize' }}>{mod.category}</b>
                </span>

                {isCore ? (
                  <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Always Active</span>
                ) : (
                  <button
                    onClick={() => toggleSubscription(mod.id)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      background: active ? '#FEE2E2' : 'var(--color-brand-teal)',
                      color: active ? '#B91C1C' : '#FFFFFF',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {active ? 'Disable' : 'Subscribe'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
