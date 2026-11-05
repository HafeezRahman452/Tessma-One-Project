'use client';

import React from 'react';
import Link from 'next/link';
import {
  Palette,
  Layout,
  Eye,
  FileText,
  Sliders,
  Sparkle,
  ArrowRight,
  CheckCircle,
} from '@phosphor-icons/react';

export default function DesignsOverviewPage() {
  const designCards = [
    {
      title: 'Invoice Template Designer',
      description: 'Customise headers, company branding, line items table, totals and payment blocks.',
      href: '/finance/branding',
      tag: 'Interactive Builder',
      badgeBg: '#EFF6FF',
      badgeText: '#2563EB',
    },
    {
      title: 'Template Library',
      description: 'Choose from Modern, Classic, Minimal and Enterprise invoice templates.',
      href: '/finance/branding/template-library',
      tag: 'Pre-built Templates',
      badgeBg: '#F0FDF4',
      badgeText: '#16A34A',
    },
    {
      title: 'Template Selection',
      description: 'Compare layouts side-by-side and set your organisation active default invoice style.',
      href: '/finance/branding/invoice-selection',
      tag: 'Quick Switch',
      badgeBg: '#FEF3C7',
      badgeText: '#D97706',
    },
    {
      title: 'Template Preview',
      description: 'Live full-screen PDF and print preview with realistic financial mock data.',
      href: '/finance/branding/template-preview',
      tag: 'Full Preview',
      badgeBg: '#F5F3FF',
      badgeText: '#7C3AED',
    },
    {
      title: 'Sales Document Branding',
      description: 'Configure typography, color palette, logo positioning and footer terms.',
      href: '/finance/sales/document-branding',
      tag: 'Branding Defaults',
      badgeBg: '#ECFEFF',
      badgeText: '#0891B2',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>Overview</span>
            <span style={{ fontSize: '12px', color: '#CBD5E1' }}>/</span>
            <span style={{ fontSize: '12px', color: '#009A96', fontWeight: 600 }}>Designs</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Designs &amp; Document Templates
          </h1>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '4px 0 0' }}>
            Design, customise and preview invoice layouts, brand identities and customer-facing PDF documents.
          </p>
        </div>

        <Link
          href="/finance/branding"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            height: '38px',
            padding: '0 16px',
            borderRadius: '8px',
            background: '#007D7D',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
            boxShadow: '0 1px 3px rgba(0, 125, 125, 0.3)',
          }}
        >
          <Sparkle size={16} weight="bold" />
          <span>Open Designer</span>
        </Link>
      </div>

      {/* Grid of design tools */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {designCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.15s ease',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#009A96';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.03)';
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span
                  style={{
                    padding: '3px 9px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    background: card.badgeBg,
                    color: card.badgeText,
                  }}
                >
                  {card.tag}
                </span>
                <Palette size={20} color="#009A96" weight="duotone" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px' }}>
                {card.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
                {card.description}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '18px',
                paddingTop: '14px',
                borderTop: '1px solid #F1F5F9',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#009A96',
              }}
            >
              <span>Explore design</span>
              <ArrowRight size={14} weight="bold" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
