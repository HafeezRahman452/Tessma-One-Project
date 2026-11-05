'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders,
  Plus,
  Eye,
  DotsThreeVertical,
  ArrowsOut,
  DownloadSimple,
  Printer,
  Minus,
  Check,
  CheckCircle,
  X,
  Sparkle,
  Info,
} from '@phosphor-icons/react';

interface TemplateCard {
  id: string;
  name: string;
  category: 'Standard' | 'Modern' | 'Professional Services';
  tags: { label: string; bg: string; text: string }[];
  description: string;
  isDefault?: boolean;
  accent: string;
  soft: string;
  bannerType: 'teal' | 'purple' | 'blue' | 'pink' | 'orange' | 'cyan';
  // Template specific realistic document data
  theme: {
    accentColor: string;
    lightAccent: string;
    bannerGradient: string;
    tableHeaderBg: string;
    totalBarBg: string;
    totalBarText: string;
    badgeBorder: string;
  };
}

export default function CreditNoteTemplateLibraryPage() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Standard' | 'Modern' | 'Professional Services'>('All');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('standard-professional');
  const [appliedTemplateId, setAppliedTemplateId] = useState<string>('standard-professional');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const templates: TemplateCard[] = [
    {
      id: 'standard-professional',
      name: 'Standard Professional',
      category: 'Standard',
      isDefault: true,
      accent: '#007D7D',
      soft: '#E6F4F1',
      bannerType: 'teal',
      tags: [
        { label: 'Standard', bg: '#EFF6FF', text: '#2563EB' },
        { label: 'Business', bg: '#ECFDF5', text: '#059669' },
      ],
      description: 'Clean and professional layout ideal for most businesses. Clear structure with all essential information.',
      theme: {
        accentColor: '#007D7D',
        lightAccent: '#E6F4F1',
        bannerGradient: 'linear-gradient(135deg, rgba(0,125,125,0.15) 0%, rgba(20,184,166,0.35) 100%)',
        tableHeaderBg: '#E6F4F1',
        totalBarBg: '#CCFBF1',
        totalBarText: '#0F766E',
        badgeBorder: '#007D7D',
      },
    },
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      category: 'Modern',
      accent: '#7C3AED',
      soft: '#F5F3FF',
      bannerType: 'purple',
      tags: [
        { label: 'Modern', bg: '#F5F3FF', text: '#7C3AED' },
        { label: 'Clean', bg: '#EFF6FF', text: '#0284C7' },
      ],
      description: 'Contemporary design with modern typography and a clean, minimal layout for a fresh look.',
      theme: {
        accentColor: '#7C3AED',
        lightAccent: '#F5F3FF',
        bannerGradient: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(167,139,250,0.35) 100%)',
        tableHeaderBg: '#F5F3FF',
        totalBarBg: '#EDE9FE',
        totalBarText: '#6D28D9',
        badgeBorder: '#7C3AED',
      },
    },
    {
      id: 'corporate-classic',
      name: 'Corporate Classic',
      category: 'Standard',
      accent: '#0284C7',
      soft: '#E0F2FE',
      bannerType: 'blue',
      tags: [
        { label: 'Standard', bg: '#EFF6FF', text: '#2563EB' },
        { label: 'Corporate', bg: '#F1F5F9', text: '#475569' },
      ],
      description: 'Traditional layout with strong visual hierarchy, suitable for established businesses.',
      theme: {
        accentColor: '#0284C7',
        lightAccent: '#E0F2FE',
        bannerGradient: 'linear-gradient(135deg, rgba(2,132,199,0.12) 0%, rgba(56,189,248,0.35) 100%)',
        tableHeaderBg: '#E0F2FE',
        totalBarBg: '#BAE6FD',
        totalBarText: '#0369A1',
        badgeBorder: '#0284C7',
      },
    },
    {
      id: 'consultancy-services',
      name: 'Consultancy Services',
      category: 'Professional Services',
      accent: '#E11D48',
      soft: '#FFE4E6',
      bannerType: 'pink',
      tags: [
        { label: 'Professional Services', bg: '#F5F3FF', text: '#7C3AED' },
        { label: 'Premium', bg: '#FFE4E6', text: '#E11D48' },
      ],
      description: 'Designed for consultants and advisors with a professional and elegant layout.',
      theme: {
        accentColor: '#E11D48',
        lightAccent: '#FFE4E6',
        bannerGradient: 'linear-gradient(135deg, rgba(225,29,72,0.12) 0%, rgba(251,113,133,0.35) 100%)',
        tableHeaderBg: '#FFE4E6',
        totalBarBg: '#FECDD3',
        totalBarText: '#BE123C',
        badgeBorder: '#E11D48',
      },
    },
    {
      id: 'retail-wholesale',
      name: 'Retail & Wholesale',
      category: 'Standard',
      accent: '#EA580C',
      soft: '#FFEDD5',
      bannerType: 'orange',
      tags: [
        { label: 'Standard', bg: '#EFF6FF', text: '#2563EB' },
        { label: 'Retail', bg: '#FEF3C7', text: '#D97706' },
      ],
      description: 'Optimised for product-based businesses with clear item breakdowns and quantity information.',
      theme: {
        accentColor: '#EA580C',
        lightAccent: '#FFEDD5',
        bannerGradient: 'linear-gradient(135deg, rgba(234,88,12,0.12) 0%, rgba(251,146,60,0.35) 100%)',
        tableHeaderBg: '#FFEDD5',
        totalBarBg: '#FED7AA',
        totalBarText: '#C2410C',
        badgeBorder: '#EA580C',
      },
    },
    {
      id: 'creative-agency',
      name: 'Creative Agency',
      category: 'Modern',
      accent: '#0D9488',
      soft: '#CCFBF1',
      bannerType: 'cyan',
      tags: [
        { label: 'Modern', bg: '#F5F3FF', text: '#7C3AED' },
        { label: 'Creative', bg: '#ECFDF5', text: '#059669' },
      ],
      description: 'Modern and creative design, perfect for agencies and creative businesses.',
      theme: {
        accentColor: '#0D9488',
        lightAccent: '#CCFBF1',
        bannerGradient: 'linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(45,212,191,0.35) 100%)',
        tableHeaderBg: '#CCFBF1',
        totalBarBg: '#99F6E4',
        totalBarText: '#115E59',
        badgeBorder: '#0D9488',
      },
    },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    if (selectedFilter === 'All') return true;
    return tpl.category === selectedFilter;
  });

  const activeTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Helper renderer for exact miniature document matching the user's uploaded images
  const renderMiniDocumentMock = (tpl: TemplateCard) => {
    return (
      <div
        style={{
          width: '100%',
          height: '160px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 14px 10px 14px',
        }}
      >
        {/* Top-Right Decorative Corner Curved Wave/Swoosh */}
        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '110px',
            height: '80px',
            borderRadius: '50%',
            background: tpl.theme.bannerGradient,
            opacity: 0.85,
            filter: 'blur(2px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '75px',
            height: '48px',
            borderBottomLeftRadius: '36px',
            background: tpl.theme.bannerGradient,
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />

        {/* 1. Header Row: Logo left + CREDIT NOTE right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          {/* Logo with polygon/cube graphic and brand text */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '4px',
                background: tpl.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 900,
              }}
            >
              ◆
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em', lineHeight: 1 }}>TESSMA</span>
              <span style={{ fontSize: '7.5px', fontWeight: 700, color: tpl.accent, letterSpacing: '0.06em' }}>ONE</span>
            </div>
          </div>

          <div style={{ fontSize: '10px', fontWeight: 800, color: tpl.bannerType === 'purple' ? '#5B21B6' : (tpl.bannerType === 'pink' ? '#9F1239' : '#0F172A'), letterSpacing: '0.05em' }}>
            CREDIT NOTE
          </div>
        </div>

        {/* 2. Middle Row: Company Info left & Metadata right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '6.5px', color: '#64748B', position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '7px' }}>Your Company Ltd</div>
            <div>123 Business Park</div>
            <div>Innovation Drive</div>
            <div>London SW1 1AA</div>
            <div>VAT No: GB123456789</div>
          </div>

          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <div><span style={{ color: '#94A3B8' }}>Credit No:</span> <b style={{ color: '#0F172A' }}>CN-2025-0012</b></div>
            <div><span style={{ color: '#94A3B8' }}>Orig Inv:</span> INV-2025-0423</div>
            <div><span style={{ color: '#94A3B8' }}>Date:</span> 15 May 2025</div>
            <div><span style={{ color: '#94A3B8' }}>Ref:</span> PO-44881</div>
          </div>
        </div>

        {/* 3. Mini Items Table Header with tinted pill bar */}
        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              background: tpl.theme.tableHeaderBg,
              borderRadius: '2px',
              padding: '2.5px 5px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '6px',
              fontWeight: 700,
              color: tpl.accent,
            }}
          >
            <span>Item / Desc</span>
            <span>Qty</span>
            <span>Price</span>
            <span>VAT</span>
            <span>Total</span>
          </div>

          {/* 2 Sample Mini Rows */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 5px', fontSize: '5.5px', color: '#475569', borderBottom: '1px solid #F8FAFC' }}>
            <span style={{ color: '#0F172A' }}>Website Dev</span>
            <span>-2</span>
            <span>£120</span>
            <span>20%</span>
            <span style={{ fontWeight: 600 }}>-£240</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 5px', fontSize: '5.5px', color: '#475569' }}>
            <span style={{ color: '#0F172A' }}>Project Mgmt</span>
            <span>-1</span>
            <span>£75</span>
            <span>20%</span>
            <span style={{ fontWeight: 600 }}>-£75</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px', color: '#0F172A' }}>
      
      {/* ── 1. BREADCRUMBS & TOP HEADER ───────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Credit Note Template Library</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Credit Note Template Library
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
            Choose a branded document layout for your credit notes. Each template is designed for different business types and can be customised with your company branding.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href="/finance/branding"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 14px',
              borderRadius: '6px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <Sliders size={16} color="#64748B" weight="bold" />
            <span>Manage branding</span>
          </Link>

          <button
            onClick={() => alert('Opening Custom Template Builder...')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '36px',
              padding: '0 16px',
              borderRadius: '6px',
              background: '#007D7D',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 125, 125, 0.3)',
            }}
          >
            <Plus size={16} weight="bold" />
            <span>Create custom template</span>
          </button>
        </div>
      </div>

      {/* ── 2. FILTER PILLS BAR ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {[
          { key: 'All', label: 'All templates', count: 6 },
          { key: 'Standard', label: 'Standard', count: 3 },
          { key: 'Modern', label: 'Modern', count: 2 },
          { key: 'Professional Services', label: 'Professional Services', count: 1 },
        ].map((f) => {
          const isSel = selectedFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setSelectedFilter(f.key as any)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                border: isSel ? '1px solid #007D7D' : '1px solid #CBD5E1',
                background: isSel ? '#E6F4F1' : '#FFFFFF',
                color: isSel ? '#007D7D' : '#475569',
                fontSize: '12.5px',
                fontWeight: isSel ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <span>{f.label}</span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '10px',
                  background: isSel ? '#007D7D' : '#F1F5F9',
                  color: isSel ? '#FFFFFF' : '#64748B',
                }}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── 3. MAIN CONTENT: TEMPLATE GRID (LEFT) + LIVE PREVIEW (RIGHT) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 1.45fr) minmax(360px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Side: 2x3 Template Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filteredTemplates.map((tpl) => {
            const isCurrentlyPreviewed = selectedTemplateId === tpl.id;
            const isAppliedDefault = appliedTemplateId === tpl.id;

            return (
              <div
                key={tpl.id}
                style={{
                  background: '#FFFFFF',
                  border: isCurrentlyPreviewed ? '2px solid #009A96' : '1px solid #E2E8F0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: isCurrentlyPreviewed ? '0 4px 14px rgba(0, 154, 150, 0.18)' : '0 1px 3px rgba(0,0,0,0.03)',
                  position: 'relative',
                  transition: 'all 0.15s ease',
                }}
              >
                {/* Default template pill badge */}
                {isAppliedDefault && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      zIndex: 10,
                      background: '#044E43',
                      color: '#FFFFFF',
                      fontSize: '10.5px',
                      fontWeight: 600,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Check size={12} weight="bold" />
                    <span>Default template</span>
                  </div>
                )}

                {/* Card Top: Accurate Miniature Document Mock */}
                {renderMiniDocumentMock(tpl)}

                {/* Card Body: Info */}
                <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                    {tpl.name}
                  </h3>

                  {/* Category / Tags */}
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                    {tpl.tags.map((tag) => (
                      <span
                        key={tag.label}
                        style={{
                          fontSize: '10.5px',
                          fontWeight: 600,
                          padding: '2px 7px',
                          borderRadius: '4px',
                          background: tag.bg,
                          color: tag.text,
                        }}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.45', margin: '0 0 16px 0', flex: 1 }}>
                    {tpl.description}
                  </p>

                  {/* Exact Buttons matching user image media_1793901739127_ad11d31d:
                      Top row: [ 👁 Preview ] [ : ]
                      Bottom row: [ Use template ] (Teal full-width button) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        onClick={() => setSelectedTemplateId(tpl.id)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          height: '34px',
                          borderRadius: '6px',
                          border: isCurrentlyPreviewed ? '1.5px solid #007D7D' : '1px solid #CBD5E1',
                          background: isCurrentlyPreviewed ? '#F0FDFA' : '#FFFFFF',
                          color: isCurrentlyPreviewed ? '#007D7D' : '#1E293B',
                          fontSize: '12.5px',
                          fontWeight: 600,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <Eye size={15} weight="bold" />
                        <span>Preview</span>
                      </button>

                      <button
                        onClick={() => alert(`More options for ${tpl.name}`)}
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '6px',
                          border: '1px solid #CBD5E1',
                          background: '#FFFFFF',
                          color: '#64748B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <DotsThreeVertical size={16} weight="bold" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedTemplateId(tpl.id);
                        setAppliedTemplateId(tpl.id);
                        alert(`Applied "${tpl.name}" as your active Credit Note template!`);
                      }}
                      style={{
                        width: '100%',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#007D7D',
                        color: '#FFFFFF',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 1px 3px rgba(0, 125, 125, 0.3)',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006666')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007D7D')}
                    >
                      Use template
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Side: Live Document Full Preview Pane (Dynamically updates on Preview click) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Template preview
                </h3>
                <span style={{ fontSize: '11px', color: '#007D7D', fontWeight: 600, background: '#E6F4F1', padding: '1px 8px', borderRadius: '4px' }}>
                  {activeTemplate.name}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0' }}>
                See how your credit note will look with this template.
              </p>
            </div>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer',
              }}
            >
              <ArrowsOut size={13} />
              <span>Full screen</span>
            </button>
          </div>

          {/* Document Viewer Frame */}
          <div
            style={{
              background: '#2D3748',
              borderRadius: '10px',
              padding: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Viewer Top Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#CBD5E1',
                fontSize: '12px',
                padding: '4px 8px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ cursor: 'pointer' }}>☰</span>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>1 / 1</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => setZoomLevel((z) => Math.max(z - 10, 50))} style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer' }}>-</button>
                  <span>{zoomLevel}%</span>
                  <button onClick={() => setZoomLevel((z) => Math.min(z + 10, 150))} style={{ background: 'none', border: 'none', color: '#CBD5E1', cursor: 'pointer' }}>+</button>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <DownloadSimple size={15} style={{ cursor: 'pointer' }} />
                <Printer size={15} style={{ cursor: 'pointer' }} />
                <DotsThreeVertical size={15} style={{ cursor: 'pointer' }} />
              </div>
            </div>

            {/* A4 White Paper Canvas with Theme of currently active template */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '4px',
                padding: '28px 24px',
                color: '#0F172A',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                fontSize: '11px',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top center',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Dynamic Decorative Watermark Header Arc based on selected template */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '200px',
                  height: '140px',
                  borderRadius: '50%',
                  background: activeTemplate.theme.bannerGradient,
                  opacity: 0.9,
                  pointerEvents: 'none',
                }}
              />

              {/* Header: Company + CREDIT NOTE Title */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', position: 'relative', zIndex: 2 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: activeTemplate.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontWeight: 800 }}>
                      ◆
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>TESSMA</div>
                      <div style={{ fontSize: '9px', fontWeight: 700, color: activeTemplate.accent }}>ONE</div>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '10.5px', color: '#475569', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>Your Company Ltd</div>
                    <div>123 Business Park</div>
                    <div>Innovation Drive</div>
                    <div>London SW1 1AA</div>
                    <div>United Kingdom</div>
                    <div>VAT No: GB123456789</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <h2 style={{ fontSize: '20px', fontWeight: 800, color: activeTemplate.accent, letterSpacing: '0.04em', margin: '0 0 10px 0' }}>
                    CREDIT NOTE
                  </h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '95px 100px', gap: '3px', fontSize: '10.5px', textAlign: 'left' }}>
                    <span style={{ color: '#64748B' }}>Credit Note No:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>CN-2025-0012</span>

                    <span style={{ color: '#64748B' }}>Original Invoice:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>INV-2025-0423</span>

                    <span style={{ color: '#64748B' }}>Credit Note Date:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>15 May 2025</span>

                    <span style={{ color: '#64748B' }}>Reference:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>PO-44881</span>

                    <span style={{ color: '#64748B' }}>Reason:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>Returned items</span>
                  </div>
                </div>
              </div>

              {/* Bill To & Contact Block */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: '16px',
                  background: activeTemplate.theme.lightAccent,
                  borderRadius: '6px',
                  padding: '12px 14px',
                  marginBottom: '20px',
                  border: `1px solid ${activeTemplate.accent}20`,
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: activeTemplate.accent, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Bill To:
                  </div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '11.5px' }}>ABC Ltd</div>
                  <div style={{ fontSize: '10.5px', color: '#475569', lineHeight: 1.4 }}>
                    <div>123 Business Park</div>
                    <div>Innovation Drive</div>
                    <div>London SW1 1AA</div>
                    <div>United Kingdom</div>
                    <div>VAT No: GB987654321</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: activeTemplate.accent, textTransform: 'uppercase', marginBottom: '4px' }}>
                    Contact:
                  </div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '11.5px' }}>Sarah Clarke</div>
                  <div style={{ fontSize: '10.5px', color: '#475569', lineHeight: 1.4 }}>
                    <div>Finance Manager</div>
                    <div style={{ color: activeTemplate.accent }}>sarah.clarke@abc-ltd.co.uk</div>
                    <div>+44 20 7123 4567</div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '16px' }}>
                <thead>
                  <tr style={{ background: activeTemplate.theme.tableHeaderBg, color: activeTemplate.accent, textAlign: 'left', fontWeight: 700 }}>
                    <th style={{ padding: '6px 8px', borderRadius: '4px 0 0 4px' }}>Description</th>
                    <th style={{ padding: '6px 8px', textAlign: 'right' }}>Qty</th>
                    <th style={{ padding: '6px 8px', textAlign: 'right' }}>Unit Price</th>
                    <th style={{ padding: '6px 8px', textAlign: 'right' }}>VAT</th>
                    <th style={{ padding: '6px 8px', textAlign: 'right', borderRadius: '0 4px 4px 0' }}>Amount (GBP)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px', color: '#0F172A' }}>Website Development</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>-2</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>£120.00</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>20%</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>-£240.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px', color: '#0F172A' }}>Project Management</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>-1</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>£75.00</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>20%</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>-£75.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px', color: '#0F172A' }}>Consultancy Services</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>-1</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>£150.00</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#64748B' }}>20%</td>
                    <td style={{ padding: '8px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>-£150.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Subtotal, VAT, Total Box */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '180px', fontSize: '10.5px' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>Subtotal</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>-£465.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '180px', fontSize: '10.5px' }}>
                  <span style={{ color: '#64748B', fontWeight: 600 }}>VAT (20%)</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>-£93.00</span>
                </div>
                
                {/* Total highlight bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '240px',
                    background: activeTemplate.theme.totalBarBg,
                    borderRadius: '4px',
                    padding: '6px 10px',
                    marginTop: '4px',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, color: activeTemplate.theme.totalBarText }}>Credit Note Total (GBP)</span>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: activeTemplate.theme.totalBarText }}>-£558.00</span>
                </div>
              </div>

              {/* Bottom: Reason Box + Thank you message */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px', borderTop: '1px solid #E2E8F0', paddingTop: '14px' }}>
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '4px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '9.5px', fontWeight: 700, color: activeTemplate.accent }}>Credit Note Reason</div>
                  <div style={{ fontSize: '10px', color: '#475569', marginTop: '2px' }}>Returned items - client request.</div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '10px', color: '#64748B', lineHeight: 1.4 }}>
                  <div style={{ fontWeight: 600, color: '#0F172A' }}>Thank you for your business.</div>
                  <div>If you have any questions, please contact us at support@yourcompany.co.uk or +44 20 7123 4567.</div>
                </div>
              </div>
            </div>

            {/* Bottom info banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#94A3B8', padding: '0 4px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#0284C7', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                i
              </div>
              <span>Templates automatically inherit your company branding, including logo, colours, company details and default styles.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
