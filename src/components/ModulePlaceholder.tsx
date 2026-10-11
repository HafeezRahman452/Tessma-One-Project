'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { useSubscription } from '@/lib/SubscriptionContext';

interface ModulePlaceholderProps {
  moduleId: string;
  name: string;
  category: string;
  description: string;
  subfeatures: string[];
}

export default function ModulePlaceholder({
  moduleId,
  name,
  category,
  description,
  subfeatures,
}: ModulePlaceholderProps) {
  const { isSubscribed, toggleSubscription } = useSubscription();
  const subscribed = isSubscribed(moduleId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
      {/* Breadcrumb Header */}
      <div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>
          <span>Modules</span>
          <span style={{ margin: '0 6px' }}>›</span>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{name}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {subscribed ? (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#E7F5EF',
                  color: '#0F7A57',
                  border: '1px solid #CCEADF',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <CheckCircle2 size={14} /> Subscribed
              </span>
            ) : (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#FEF2F2',
                  color: '#B91C1C',
                  border: '1px solid #F87171',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              >
                <Lock size={14} /> Not Subscribed
              </span>
            )}
          </div>
        </div>
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          {description}
        </p>
      </div>

      {/* Main Container Card */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-ui)',
          padding: '32px 36px',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '12px',
            background: 'var(--color-brand-teal-soft)',
            color: 'var(--color-brand-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
          }}
        >
          <Layers size={28} />
        </div>

        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {name} Module Initialized
        </h2>
        <p
          style={{
            fontSize: '13.5px',
            color: 'var(--color-text-secondary)',
            maxWidth: '560px',
            margin: '8px auto 24px',
            lineHeight: 1.5,
          }}
        >
          {subscribed
            ? `Your tenant is entitled and subscribed to ${name}. Platform Core security boundaries, audit loggers, and context routing are fully initialized. Full submodule screens will be built in the next phase.`
            : `Your organization currently has this module disabled. To view live ${name} data in your consolidated overview, activate your subscription below.`}
        </p>

        {/* Feature Preview Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '12px',
            width: '100%',
            maxWidth: '680px',
            marginBottom: '28px',
            textAlign: 'left',
          }}
        >
          {subfeatures.map((feat, i) => (
            <div
              key={i}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '8px',
                padding: '12px 14px',
                background: '#FAFCFE',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-brand-teal)', fontSize: '11px', fontWeight: 600 }}>
                <ShieldCheck size={14} /> Ready for rollout
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '6px' }}>
                {feat}
              </div>
            </div>
          ))}
        </div>

        {/* Subscription toggle button */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => toggleSubscription(moduleId)}
            style={{
              padding: '9px 18px',
              borderRadius: 'var(--radius-ui)',
              background: subscribed ? '#EF4444' : 'var(--color-brand-teal)',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            {subscribed ? 'Simulate Unsubscribe' : 'Activate Module Subscription'}
          </button>

          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              borderRadius: 'var(--radius-ui)',
              border: '1px solid var(--color-border)',
              background: '#FFFFFF',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <span>Back to Dashboard</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
