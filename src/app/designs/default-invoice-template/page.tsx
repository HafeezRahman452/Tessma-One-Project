'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkle,
  Check,
  CheckCircle,
  Eye,
  FileText,
  Globe,
  Buildings,
  TreeStructure,
  MagnifyingGlass,
  Info,
  DotsThreeVertical,
  CaretLeft,
  CaretRight,
  ShieldCheck,
  X,
} from '@phosphor-icons/react';

interface TemplateOption {
  id: string;
  name: string;
  desc: string;
  tags: { label: string; bg: string; text: string }[];
  accent: string;
  headerCurve: 'teal' | 'purple' | 'blue' | 'orange';
  gradient: string;
}

export default function SetDefaultInvoiceTemplatePage() {
  // Current active default template
  const [selectedDefaultId, setSelectedDefaultId] = useState<string>('standard');
  
  // Right Column Scopes
  const [selectedScope, setSelectedScope] = useState<'all' | 'entity' | 'unit'>('all');

  // Application Rules Toggles
  const [applyToSales, setApplyToSales] = useState(true);
  const [applyToRecurring, setApplyToRecurring] = useState(true);
  const [allowOverride, setAllowOverride] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All categories');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Modal Preview
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  const availableTemplates: TemplateOption[] = [
    {
      id: 'standard',
      name: 'TESSMA Standard Invoice',
      desc: 'Clean and professional layout suitable for most business types.',
      tags: [
        { label: 'General', bg: '#EFF6FF', text: '#2563EB' },
        { label: 'Professional', bg: '#F1F5F9', text: '#475569' },
      ],
      accent: '#007D7D',
      headerCurve: 'teal',
      gradient: 'linear-gradient(135deg, rgba(0,125,125,0.15) 0%, rgba(20,184,166,0.35) 100%)',
    },
    {
      id: 'consulting',
      name: 'Consulting Invoice',
      desc: 'Modern and creative design ideal for consultants and advisors.',
      tags: [
        { label: 'Consulting', bg: '#F5F3FF', text: '#7C3AED' },
        { label: 'Modern', bg: '#EFF6FF', text: '#0284C7' },
      ],
      accent: '#7C3AED',
      headerCurve: 'purple',
      gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(167,139,250,0.35) 100%)',
    },
    {
      id: 'agency',
      name: 'Agency Invoice',
      desc: 'Contemporary layout perfect for marketing and digital agencies.',
      tags: [
        { label: 'Agency', bg: '#EFF6FF', text: '#0284C7' },
        { label: 'Creative', bg: '#ECFDF5', text: '#059669' },
      ],
      accent: '#0284C7',
      headerCurve: 'blue',
      gradient: 'linear-gradient(135deg, rgba(2,132,199,0.15) 0%, rgba(56,189,248,0.35) 100%)',
    },
    {
      id: 'recurring',
      name: 'Recurring Services Invoice',
      desc: 'Optimised for recurring billing and retainers with clear period details.',
      tags: [
        { label: 'Recurring', bg: '#FEF3C7', text: '#D97706' },
        { label: 'Subscription', bg: '#F5F3FF', text: '#7C3AED' },
      ],
      accent: '#EA580C',
      headerCurve: 'orange',
      gradient: 'linear-gradient(135deg, rgba(234,88,12,0.15) 0%, rgba(251,146,60,0.35) 100%)',
    },
  ];

  const currentDefaultTemplate = availableTemplates.find((t) => t.id === selectedDefaultId) || availableTemplates[0];

  const renderThumbnail = (tpl: TemplateOption) => {
    return (
      <div
        style={{
          width: '100%',
          height: '145px',
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          padding: '12px 14px 10px 14px',
        }}
      >
        {/* Top-right curved swoosh matching screenshot */}
        <div
          style={{
            position: 'absolute',
            top: '-25px',
            right: '-25px',
            width: '120px',
            height: '90px',
            borderRadius: '50%',
            background: tpl.gradient,
            opacity: 0.85,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '75px',
            height: '45px',
            borderBottomLeftRadius: '36px',
            background: tpl.gradient,
            opacity: 0.9,
            pointerEvents: 'none',
          }}
        />

        {/* Top: Logo left + INVOICE right */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div
              style={{
                width: '14px',
                height: '14px',
                borderRadius: '3px',
                background: tpl.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '9px',
                fontWeight: 900,
              }}
            >
              ◆
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '8.5px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>TESSMA</span>
              <span style={{ fontSize: '7px', fontWeight: 700, color: tpl.accent }}>ONE</span>
            </div>
          </div>

          <div style={{ fontSize: '9.5px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>
            INVOICE
          </div>
        </div>

        {/* Details row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '6px', color: '#64748B', position: 'relative', zIndex: 2 }}>
          <div>
            <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '6.5px' }}>Your Company Ltd</div>
            <div>123 Business Park</div>
            <div>London SW1 1AA</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div><span style={{ color: '#94A3B8' }}>Invoice No:</span> <b>INV-2025-0423</b></div>
            <div><span style={{ color: '#94A3B8' }}>Issue Date:</span> 15 Apr 2025</div>
          </div>
        </div>

        {/* Mini Table header */}
        <div style={{ marginTop: 'auto', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              background: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              borderBottom: '1px solid #E2E8F0',
              padding: '2px 4px',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '5.5px',
              fontWeight: 700,
              color: '#475569',
            }}
          >
            <span>Description</span>
            <span>Qty</span>
            <span>Price</span>
            <span>Amount</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px', fontSize: '5px', color: '#64748B' }}>
            <span>Consultancy Services</span>
            <span>10</span>
            <span>£150</span>
            <span style={{ fontWeight: 600, color: '#0F172A' }}>£1,500</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px', color: '#0F172A' }}>
      
      {/* ── 1. BREADCRUMBS & TOP TITLE ───────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '4px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Set Default Invoice Template</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Set Default Invoice Template
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0' }}>
            Choose the default invoice template for your business and configure how it is applied across your organisation.
          </p>
        </div>
      </div>

      {/* ── 2. TWO MAIN COLUMNS: LEFT (Current + Available) | RIGHT (Scope + Rules) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 1.8fr) minmax(340px, 1.1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ── LEFT COLUMN ──────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card A: Current default template */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Header with green icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#044E43', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={14} weight="bold" />
              </div>
              <div>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Current default template
                </h2>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '1px' }}>
                  This template is currently used for new invoices based on your selected scope.
                </div>
              </div>
            </div>

            {/* Content: Large Document Preview + Meta Specs + Right Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '170px 1fr 140px', gap: '20px', alignItems: 'center', background: '#F8FAFC', borderRadius: '10px', padding: '16px', border: '1px solid #E2E8F0' }}>
              {/* Document Mock */}
              <div
                style={{
                  width: '170px',
                  height: '210px',
                  background: '#FFFFFF',
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  border: '1px solid #CBD5E1',
                  padding: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '7px',
                }}
              >
                {/* Top-right swoop */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-30px',
                    right: '-30px',
                    width: '120px',
                    height: '90px',
                    borderRadius: '50%',
                    background: currentDefaultTemplate.gradient,
                    opacity: 0.9,
                    pointerEvents: 'none',
                  }}
                />

                {/* Top Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: currentDefaultTemplate.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '8px' }}>
                      ◆
                    </div>
                    <div>
                      <div style={{ fontSize: '7.5px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>TESSMA</div>
                      <div style={{ fontSize: '6px', fontWeight: 700, color: currentDefaultTemplate.accent }}>ONE</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '9px', fontWeight: 800, color: '#0F172A' }}>INVOICE</div>
                </div>

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', color: '#64748B', position: 'relative', zIndex: 2 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: '#0F172A' }}>Your Company Ltd</div>
                    <div>123 Business Park</div>
                    <div>London SW1 1AA</div>
                    <div>VAT No: GB123456789</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div><span style={{ color: '#94A3B8' }}>Invoice No:</span> <b>INV-2025-0423</b></div>
                    <div><span style={{ color: '#94A3B8' }}>Issue Date:</span> 15 Apr 2025</div>
                    <div><span style={{ color: '#94A3B8' }}>Due Date:</span> 15 May 2025</div>
                    <div><span style={{ color: '#94A3B8' }}>Service Period:</span> 01 Apr 2025 - 30 Apr 2025</div>
                  </div>
                </div>

                {/* Mini Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', fontSize: '6px', position: 'relative', zIndex: 2 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #CBD5E1', color: '#475569', textAlign: 'left', fontWeight: 700 }}>
                      <th style={{ padding: '2px 0' }}>Description</th>
                      <th style={{ padding: '2px 0', textAlign: 'right' }}>Qty</th>
                      <th style={{ padding: '2px 0', textAlign: 'right' }}>Unit Price</th>
                      <th style={{ padding: '2px 0', textAlign: 'right' }}>VAT</th>
                      <th style={{ padding: '2px 0', textAlign: 'right' }}>Amount (GBP)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '2px 0', color: '#0F172A' }}>Consultancy Services</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>10</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>£150.00</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>20%</td>
                      <td style={{ padding: '2px 0', textAlign: 'right', fontWeight: 600 }}>£1,500.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '2px 0', color: '#0F172A' }}>Project Planning</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>8</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>£120.00</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>20%</td>
                      <td style={{ padding: '2px 0', textAlign: 'right', fontWeight: 600 }}>£960.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '2px 0', color: '#0F172A' }}>Implementation Support</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>12</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>£120.00</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>20%</td>
                      <td style={{ padding: '2px 0', textAlign: 'right', fontWeight: 600 }}>£1,440.00</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '2px 0', color: '#0F172A' }}>Training & Handover</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>4</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>£100.00</td>
                      <td style={{ padding: '2px 0', textAlign: 'right' }}>20%</td>
                      <td style={{ padding: '2px 0', textAlign: 'right', fontWeight: 600 }}>£400.00</td>
                    </tr>
                  </tbody>
                </table>

                {/* Subtotals */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '6px', color: '#64748B' }}>
                  <div>Subtotal: <b style={{ color: '#0F172A' }}>£4,300.00</b></div>
                  <div>VAT (20%): <b style={{ color: '#0F172A' }}>£860.00</b></div>
                  <div style={{ fontSize: '7px', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>Total (GBP): £5,160.00</div>
                </div>
              </div>

              {/* Meta Specs Center */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: '#DCFCE7', color: '#16A34A', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                    Default template
                  </span>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: '2px 0 0' }}>
                  {currentDefaultTemplate.name}
                </h3>
                
                <p style={{ fontSize: '12.5px', color: '#64748B', lineHeight: '1.45', margin: 0 }}>
                  Clean and professional layout suitable for most business types. Includes your company branding and standard payment details.
                </p>

                <div style={{ display: 'flex', gap: '6px', margin: '4px 0' }}>
                  <span style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>General</span>
                  <span style={{ background: '#F1F5F9', color: '#475569', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>Professional</span>
                  <span style={{ background: '#F1F5F9', color: '#64748B', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px' }}>TESSMA default</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '6px', fontSize: '12px', marginTop: '4px' }}>
                  <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Buildings size={14} color="#007D7D" /> Legal entity scope
                  </span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>All legal entities</span>

                  <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <TreeStructure size={14} color="#007D7D" /> Business unit scope
                  </span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>All business units</span>

                  <span style={{ color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <FileText size={14} color="#007D7D" /> Last updated
                  </span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>15 Apr 2025 by John Doe</span>
                </div>
              </div>

              {/* Right Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => setPreviewTemplate(currentDefaultTemplate.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    height: '34px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <Eye size={15} />
                  <span>Preview output</span>
                </button>

                <button
                  onClick={() => alert('View Details modal')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    height: '34px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    background: '#FFFFFF',
                    color: '#334155',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <FileText size={15} />
                  <span>View details</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card B: Available invoice templates (Grid of 4) */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Header + Search bar + Category filter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#007D7D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={14} weight="bold" />
                </div>
                <div>
                  <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Available invoice templates
                  </h2>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '1px' }}>
                    Choose a template and set it as the default for your selected scope.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative' }}>
                  <MagnifyingGlass size={14} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      height: '32px',
                      paddingLeft: '30px',
                      paddingRight: '12px',
                      borderRadius: '6px',
                      border: '1px solid #CBD5E1',
                      fontSize: '12px',
                      outline: 'none',
                      width: '160px',
                    }}
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    height: '32px',
                    padding: '0 10px',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '12px',
                    color: '#334155',
                    background: '#FFFFFF',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <option>All categories</option>
                  <option>General</option>
                  <option>Consulting</option>
                  <option>Agency</option>
                  <option>Recurring</option>
                </select>
              </div>
            </div>

            {/* 4 Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {availableTemplates.map((tpl) => {
                const isDefault = selectedDefaultId === tpl.id;

                return (
                  <div
                    key={tpl.id}
                    style={{
                      background: '#FFFFFF',
                      border: isDefault ? '2px solid #009A96' : '1px solid #E2E8F0',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      boxShadow: isDefault ? '0 4px 12px rgba(0, 154, 150, 0.15)' : '0 1px 3px rgba(0,0,0,0.02)',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Teal round checkmark top-right if active default */}
                    {isDefault && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          zIndex: 10,
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#044E43',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={13} weight="bold" />
                      </div>
                    )}

                    {/* Miniature thumbnail */}
                    {renderThumbnail(tpl)}

                    {/* Card Info */}
                    <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                          {tpl.name}
                        </h4>
                        <DotsThreeVertical size={14} color="#94A3B8" style={{ cursor: 'pointer' }} />
                      </div>

                      <p style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.4', margin: '0 0 10px 0', flex: 1 }}>
                        {tpl.desc}
                      </p>

                      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                        {tpl.tags.map((t) => (
                          <span
                            key={t.label}
                            style={{
                              fontSize: '10px',
                              fontWeight: 600,
                              padding: '1px 6px',
                              borderRadius: '4px',
                              background: t.bg,
                              color: t.text,
                            }}
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <button
                          onClick={() => setSelectedDefaultId(tpl.id)}
                          style={{
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            borderRadius: '5px',
                            border: isDefault ? 'none' : '1px solid #CBD5E1',
                            background: isDefault ? '#007D7D' : '#FFFFFF',
                            color: isDefault ? '#FFFFFF' : '#334155',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {isDefault && <Check size={13} weight="bold" />}
                          <span>Set as default</span>
                        </button>

                        <button
                          onClick={() => setPreviewTemplate(tpl.name)}
                          style={{
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            borderRadius: '5px',
                            border: 'none',
                            background: 'transparent',
                            color: '#64748B',
                            fontSize: '11.5px',
                            fontWeight: 500,
                            cursor: 'pointer',
                          }}
                        >
                          <Eye size={13} />
                          <span>Preview</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #F1F5F9', fontSize: '12px', color: '#64748B' }}>
              <span>Showing 4 of 8 templates</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <CaretLeft size={12} />
                </button>
                <button style={{ width: '26px', height: '26px', borderRadius: '4px', border: 'none', background: '#007D7D', color: '#FFFFFF', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  1
                </button>
                <button style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  2
                </button>
                <button style={{ width: '26px', height: '26px', borderRadius: '4px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <CaretRight size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN: SCOPE & APPLICATION RULES ─────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Default template scope (Radio Cards) */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#007D7D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Globe size={14} weight="bold" />
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Default template scope
                </h3>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
                  Choose where this default template should be applied.
                </div>
              </div>
            </div>

            {/* Scope Option 1: Apply to all legal entities */}
            <div
              onClick={() => setSelectedScope('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                border: selectedScope === 'all' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
                background: selectedScope === 'all' ? '#F0FDFA' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedScope === 'all' ? '4.5px solid #007D7D' : '1.5px solid #CBD5E1', background: '#FFFFFF' }} />
              <Globe size={20} color="#007D7D" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Apply to all legal entities</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Use the same default template across your entire organisation.</div>
              </div>
            </div>

            {/* Scope Option 2: Apply by legal entity */}
            <div
              onClick={() => setSelectedScope('entity')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                border: selectedScope === 'entity' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
                background: selectedScope === 'entity' ? '#F0FDFA' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedScope === 'entity' ? '4.5px solid #007D7D' : '1.5px solid #CBD5E1', background: '#FFFFFF' }} />
              <Buildings size={20} color="#64748B" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Apply by legal entity</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Set different default templates for each legal entity.</div>
              </div>
            </div>

            {/* Scope Option 3: Apply by business unit */}
            <div
              onClick={() => setSelectedScope('unit')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '8px',
                border: selectedScope === 'unit' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
                background: selectedScope === 'unit' ? '#F0FDFA' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: selectedScope === 'unit' ? '4.5px solid #007D7D' : '1.5px solid #CBD5E1', background: '#FFFFFF' }} />
              <TreeStructure size={20} color="#64748B" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Apply by business unit</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Set different default templates for each business unit.</div>
              </div>
            </div>
          </div>

          {/* Card 2: Template application rules (Toggles) */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#007D7D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={14} weight="bold" />
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Template application rules
                </h3>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
                  Control when and how the default template is applied.
                </div>
              </div>
            </div>

            {/* Toggle 1: Apply to sales invoices */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div
                onClick={() => setApplyToSales(!applyToSales)}
                style={{
                  width: '38px',
                  height: '20px',
                  borderRadius: '10px',
                  background: applyToSales ? '#007D7D' : '#CBD5E1',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: applyToSales ? '20px' : '2px',
                    transition: 'left 0.2s ease',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Apply to sales invoices</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Use this template for all standard sales invoices.</div>
              </div>
              <Info size={15} color="#94A3B8" />
            </div>

            {/* Toggle 2: Apply to recurring invoices */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div
                onClick={() => setApplyToRecurring(!applyToRecurring)}
                style={{
                  width: '38px',
                  height: '20px',
                  borderRadius: '10px',
                  background: applyToRecurring ? '#007D7D' : '#CBD5E1',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: applyToRecurring ? '20px' : '2px',
                    transition: 'left 0.2s ease',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Apply to recurring invoices</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Also use this template for recurring and subscription invoices.</div>
              </div>
              <Info size={15} color="#94A3B8" />
            </div>

            {/* Toggle 3: Allow user override */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div
                onClick={() => setAllowOverride(!allowOverride)}
                style={{
                  width: '38px',
                  height: '20px',
                  borderRadius: '10px',
                  background: allowOverride ? '#007D7D' : '#CBD5E1',
                  position: 'relative',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.2s ease',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: allowOverride ? '20px' : '2px',
                    transition: 'left 0.2s ease',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Allow user override</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Let authorised users choose a different template when creating an invoice.</div>
              </div>
              <Info size={15} color="#94A3B8" />
            </div>

            {/* Blue Info Notice Box */}
            <div
              style={{
                background: '#F0F9FF',
                border: '1px solid #BAE6FD',
                borderRadius: '8px',
                padding: '12px 14px',
                display: 'flex',
                gap: '10px',
                fontSize: '11px',
                color: '#0369A1',
                lineHeight: 1.45,
              }}
            >
              <Info size={18} color="#0284C7" weight="fill" style={{ flexShrink: 0 }} />
              <div>
                <b style={{ color: '#0C4A6E' }}>Note</b>
                <div style={{ marginTop: '2px' }}>
                  Changes to the default template will only apply to new invoices. Existing invoices will keep the template that was used when they were created.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. BOTTOM STICKY ACTION BAR (Cancel, Preview output, Save changes) ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '12px',
          paddingTop: '16px',
          borderTop: '1px solid #E2E8F0',
          marginTop: '10px',
        }}
      >
        <button
          onClick={() => alert('Changes discarded')}
          style={{
            height: '38px',
            padding: '0 18px',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            background: '#FFFFFF',
            color: '#334155',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>

        <button
          onClick={() => setPreviewTemplate(currentDefaultTemplate.name)}
          style={{
            height: '38px',
            padding: '0 18px',
            borderRadius: '6px',
            border: '1px solid #CBD5E1',
            background: '#FFFFFF',
            color: '#334155',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
        >
          <Eye size={16} />
          <span>Preview output</span>
        </button>

        <button
          onClick={() => alert(`Saved "${currentDefaultTemplate.name}" as Default Invoice Template for ${selectedScope === 'all' ? 'All legal entities' : (selectedScope === 'entity' ? 'Selected legal entity' : 'Selected business unit')}!`)}
          style={{
            height: '38px',
            padding: '0 20px',
            borderRadius: '6px',
            border: 'none',
            background: '#007D7D',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0, 125, 125, 0.3)',
          }}
        >
          <FileText size={16} weight="bold" />
          <span>Save changes</span>
        </button>
      </div>

      {/* ── MODAL: PREVIEW OUTPUT ────────────────────────────────────────────── */}
      {previewTemplate && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.55)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              width: '540px',
              maxWidth: '90%',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: '#0F172A' }}>
                Preview: {previewTemplate}
              </h3>
              <button
                onClick={() => setPreviewTemplate(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12.5px', color: '#475569', lineHeight: 1.5 }}>
              Template output verified. Ready for high-resolution PDF rendering across all invoices generated under your selected scope.
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setPreviewTemplate(null)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '6px',
                  background: '#007D7D',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
