'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  ArrowRight,
  Eye,
  CheckCircle,
  ArrowsOut,
  ArrowLeft,
  MagnifyingGlassMinus,
  MagnifyingGlassPlus,
  DotsThree,
  Download,
  Printer,
  Gear,
  Plus,
  Copy,
  Buildings,
  ShoppingCart,
  Star,
} from '@phosphor-icons/react';

const SERVICE_TEMPLATES = [
  {
    name: 'Professional Clean',
    recommended: true,
    description: 'A modern and professional layout ideal for consultants and professional services.',
    tags: [
      { label: 'Service business', color: '#0D9488', bg: '#F0FDFA' },
      { label: 'Popular', color: '#7C3AED', bg: '#F5F3FF' },
    ],
    accent: '#0D9488',
    gradient: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)',
  },
  {
    name: 'Modern Gradient',
    recommended: false,
    description: 'Contemporary design with subtle gradients, perfect for modern service firms.',
    tags: [
      { label: 'Service business', color: '#0D9488', bg: '#F0FDFA' },
    ],
    accent: '#7C3AED',
    gradient: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  },
  {
    name: 'Executive Classic',
    recommended: false,
    description: 'A timeless and elegant template for established professional services businesses.',
    tags: [
      { label: 'Service business', color: '#0D9488', bg: '#F0FDFA' },
    ],
    accent: '#0284C7',
    gradient: 'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)',
  },
  {
    name: 'Minimal Professional',
    recommended: false,
    description: 'Clean and minimal design with clear structure and excellent readability.',
    tags: [
      { label: 'Service business', color: '#0D9488', bg: '#F0FDFA' },
      { label: 'Minimal', color: '#64748B', bg: '#F1F5F9' },
    ],
    accent: '#374151',
    gradient: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
  },
];

const PRODUCT_TEMPLATES = [
  {
    name: 'Retail Product',
    recommended: false,
    description: 'Modern template for retail businesses with product images and item details.',
    tags: [
      { label: 'Product business', color: '#D97706', bg: '#FEF3C7' },
      { label: 'Retail', color: '#D97706', bg: '#FEF3C7' },
    ],
    accent: '#D97706',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  },
  {
    name: 'Wholesale',
    recommended: false,
    description: 'Designed for wholesale distributors with clear pricing and quantity breaks.',
    tags: [
      { label: 'Product business', color: '#D97706', bg: '#FEF3C7' },
      { label: 'Wholesale', color: '#059669', bg: '#ECFDF5' },
    ],
    accent: '#059669',
    gradient: 'linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 100%)',
  },
  {
    name: 'Inventory Product',
    recommended: false,
    description: 'Detailed product layout with SKU, stock codes and item specifications.',
    tags: [
      { label: 'Product business', color: '#D97706', bg: '#FEF3C7' },
      { label: 'Inventory', color: '#0284C7', bg: '#E0F2FE' },
    ],
    accent: '#0284C7',
    gradient: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
  },
  {
    name: 'Modern Bold',
    recommended: false,
    description: 'A bold and striking design for product-focused companies and e-commerce.',
    tags: [
      { label: 'Product business', color: '#D97706', bg: '#FEF3C7' },
      { label: 'Modern', color: '#DC2626', bg: '#FEF2F2' },
    ],
    accent: '#DC2626',
    gradient: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%)',
  },
];

const INVOICE_LINES = [
  { desc: 'Website Design', qty: 10, price: '£150.00', vat: '20%', amount: '£1,500.00' },
  { desc: 'Project Planning', qty: 8, price: '£120.00', vat: '20%', amount: '£960.00' },
  { desc: 'Implementation Support', qty: 12, price: '£120.00', vat: '20%', amount: '£1,440.00' },
  { desc: 'Training & Handover', qty: 4, price: '£100.00', vat: '20%', amount: '£400.00' },
];

export default function InvoiceTemplateLibraryPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'service' | 'product'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState(0); // index in SERVICE_TEMPLATES
  const [selectedCategory, setSelectedCategory] = useState<'service' | 'product'>('service');
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const toast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const currentTemplate = selectedCategory === 'service' ? SERVICE_TEMPLATES[selectedTemplate] : PRODUCT_TEMPLATES[selectedTemplate];
  const accentColor = currentTemplate?.accent || '#0D9488';

  const TABS = [
    { id: 'all', label: 'All templates', count: 8 },
    { id: 'service', label: 'Service businesses', count: 4 },
    { id: 'product', label: 'Product businesses', count: 4 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '100%', background: '#F8FAFC', paddingBottom: '40px' }}>

      {/* Toast */}
      {showToast && (
        <div style={{
          position: 'fixed', top: '20px', right: '24px', zIndex: 9999,
          background: '#0F766E', color: '#fff', padding: '12px 20px',
          borderRadius: '8px', fontSize: '13px', fontWeight: 600,
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <CheckCircle size={18} weight="fill" />
          {toastMsg}
        </div>
      )}

      {/* ── PAGE HEADER ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            Invoice Template Library
          </h1>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, maxWidth: '560px' }}>
            Choose a professional template for your invoices. Each template can be customised with your branding, colours and company details.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link
            href="/finance/branding"
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 14px',
              borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF',
              color: '#334155', fontSize: '12.5px', fontWeight: 500, cursor: 'pointer', textDecoration: 'none',
            }}>
            <Gear size={14} color="#475569" />
            Manage branding
          </Link>
          <button
            onClick={() => toast('Custom template creator opened!')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', height: '36px', padding: '0 16px',
              borderRadius: '6px', border: 'none', background: '#0D9488',
              color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(13,148,136,0.3)',
            }}>
            <Plus size={14} weight="bold" />
            Create custom template
          </button>
        </div>
      </div>

      {/* ── MAIN 2-COLUMN: Templates Grid + Right Preview ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', alignItems: 'start' }}>

        {/* ── LEFT: Filter Tabs + Templates ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '2px solid #E2E8F0' }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '7px',
                  padding: '9px 16px', background: 'none', border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid #0D9488' : '2px solid transparent',
                  marginBottom: '-2px',
                  color: activeTab === tab.id ? '#0D9488' : '#64748B',
                  fontSize: '13px', fontWeight: activeTab === tab.id ? 600 : 400, cursor: 'pointer',
                }}>
                {tab.label}
                <span style={{
                  fontSize: '11px', fontWeight: 700, padding: '1px 7px', borderRadius: '10px',
                  background: activeTab === tab.id ? '#0D9488' : '#E2E8F0',
                  color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
                }}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* ── SERVICE BUSINESS TEMPLATES ── */}
          {(activeTab === 'all' || activeTab === 'service') && (
            <div>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Buildings size={18} weight="bold" color="#0D9488" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Service business templates</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                      Professional templates designed for service-based businesses, consultancy and project work.
                    </div>
                  </div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                  View all <ArrowRight size={13} weight="bold" />
                </button>
              </div>

              {/* Template cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {SERVICE_TEMPLATES.map((tpl, idx) => {
                  const isSelected = selectedCategory === 'service' && selectedTemplate === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        border: `2px solid ${isSelected ? tpl.accent : '#E2E8F0'}`,
                        borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF',
                        cursor: 'pointer', transition: 'all 0.15s',
                        boxShadow: isSelected ? `0 0 0 3px ${tpl.accent}22` : '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                      onClick={() => { setSelectedTemplate(idx); setSelectedCategory('service'); }}>

                      {/* Thumbnail */}
                      <div style={{ background: tpl.gradient, padding: '10px 10px 6px', position: 'relative', minHeight: '90px' }}>
                        {tpl.recommended && (
                          <div style={{
                            position: 'absolute', top: '6px', left: '6px',
                            background: '#16A34A', color: '#FFFFFF', fontSize: '8px', fontWeight: 700,
                            padding: '2px 7px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '3px',
                          }}>
                            <CheckCircle size={9} weight="fill" />
                            Recommended
                          </div>
                        )}
                        {/* Mini TESSMA logo */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: tpl.recommended ? '14px' : '0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: tpl.accent, flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: '6px', fontWeight: 800, color: '#0F172A' }}>TESSMA</div>
                              <div style={{ fontSize: '4px', color: '#64748B' }}>ONE</div>
                            </div>
                          </div>
                          <span style={{ fontSize: '8px', fontWeight: 800, color: tpl.accent }}>INVOICE</span>
                        </div>
                        {/* Mini invoice lines */}
                        <div style={{ marginTop: '6px' }}>
                          {[90, 70, 80, 60, 75].map((w, i) => (
                            <div key={i} style={{
                              height: i === 0 ? '4px' : '2.5px',
                              background: i === 0 ? tpl.accent : (i % 2 === 0 ? '#CBD5E1' : '#E2E8F0'),
                              borderRadius: '1px', width: `${w}%`, marginBottom: '3px', opacity: i === 0 ? 1 : 0.7,
                            }} />
                          ))}
                          {/* Mini table */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', marginTop: '4px' }}>
                            {[...Array(9)].map((_, i) => (
                              <div key={i} style={{ height: '2px', background: i < 3 ? tpl.accent : '#E2E8F0', borderRadius: '1px', opacity: i < 3 ? 0.8 : 0.5 }} />
                            ))}
                          </div>
                        </div>
                        {/* Three dots */}
                        <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                          <DotsThree size={14} weight="bold" color="#94A3B8" />
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '10px 10px 8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{tpl.name}</div>
                        <p style={{ fontSize: '10.5px', color: '#64748B', margin: '0 0 7px', lineHeight: 1.5 }}>{tpl.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                          {tpl.tags.map(t => (
                            <span key={t.label} style={{ fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '8px', background: t.bg, color: t.color }}>{t.label}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); toast(`Previewing ${tpl.name}...`); }}
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                              height: '28px', borderRadius: '5px', border: '1px solid #CBD5E1',
                              background: '#FFFFFF', color: '#374151', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                            }}>
                            <Eye size={11} color="#475569" />
                            Preview
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); toast(`${tpl.name} template applied!`); }}
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                              height: '28px', borderRadius: '5px', border: 'none',
                              background: tpl.accent, color: '#FFFFFF', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                            }}>
                            Use template
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── PRODUCT BUSINESS TEMPLATES ── */}
          {(activeTab === 'all' || activeTab === 'product') && (
            <div>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <ShoppingCart size={18} weight="bold" color="#D97706" />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>Product business templates</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                      Specialised templates for product, retail and inventory-based businesses.
                    </div>
                  </div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
                  View all <ArrowRight size={13} weight="bold" />
                </button>
              </div>

              {/* Template cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {PRODUCT_TEMPLATES.map((tpl, idx) => {
                  const isSelected = selectedCategory === 'product' && selectedTemplate === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        border: `2px solid ${isSelected ? tpl.accent : '#E2E8F0'}`,
                        borderRadius: '10px', overflow: 'hidden', background: '#FFFFFF',
                        cursor: 'pointer', transition: 'all 0.15s',
                        boxShadow: isSelected ? `0 0 0 3px ${tpl.accent}22` : '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                      onClick={() => { setSelectedTemplate(idx); setSelectedCategory('product'); }}>

                      {/* Thumbnail */}
                      <div style={{ background: tpl.gradient, padding: '10px 10px 6px', position: 'relative', minHeight: '90px' }}>
                        {/* Mini TESSMA logo */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: tpl.accent, flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: '6px', fontWeight: 800, color: '#0F172A' }}>TESSMA</div>
                              <div style={{ fontSize: '4px', color: '#64748B' }}>ONE</div>
                            </div>
                          </div>
                          <span style={{ fontSize: '8px', fontWeight: 800, color: tpl.accent }}>INVOICE</span>
                        </div>
                        {/* Mini invoice lines */}
                        <div style={{ marginTop: '6px' }}>
                          {[85, 65, 80, 55, 70].map((w, i) => (
                            <div key={i} style={{
                              height: i === 0 ? '4px' : '2.5px',
                              background: i === 0 ? tpl.accent : (i % 2 === 0 ? '#CBD5E1' : '#E2E8F0'),
                              borderRadius: '1px', width: `${w}%`, marginBottom: '3px', opacity: i === 0 ? 1 : 0.7,
                            }} />
                          ))}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', marginTop: '4px' }}>
                            {[...Array(9)].map((_, i) => (
                              <div key={i} style={{ height: '2px', background: i < 3 ? tpl.accent : '#E2E8F0', borderRadius: '1px', opacity: i < 3 ? 0.8 : 0.5 }} />
                            ))}
                          </div>
                        </div>
                        <div style={{ position: 'absolute', top: '6px', right: '6px' }}>
                          <DotsThree size={14} weight="bold" color="#94A3B8" />
                        </div>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '10px 10px 8px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{tpl.name}</div>
                        <p style={{ fontSize: '10.5px', color: '#64748B', margin: '0 0 7px', lineHeight: 1.5 }}>{tpl.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                          {tpl.tags.map(t => (
                            <span key={t.label} style={{ fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '8px', background: t.bg, color: t.color }}>{t.label}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); toast(`Previewing ${tpl.name}...`); }}
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                              height: '28px', borderRadius: '5px', border: '1px solid #CBD5E1',
                              background: '#FFFFFF', color: '#374151', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                            }}>
                            <Eye size={11} color="#475569" />
                            Preview
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); toast(`${tpl.name} template applied!`); }}
                            style={{
                              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                              height: '28px', borderRadius: '5px', border: 'none',
                              background: tpl.accent, color: '#FFFFFF', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                            }}>
                            Use template
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Template Preview Panel ── */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', position: 'sticky', top: '16px' }}>

          {/* Preview header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Template preview</div>
              <div style={{ fontSize: '10.5px', color: '#64748B' }}>See how your invoice will look with this template.</div>
            </div>
            <button
              onClick={() => toast('Full screen preview...')}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: '1px solid #E2E8F0', borderRadius: '5px', padding: '5px 10px', color: '#475569', fontSize: '11.5px', fontWeight: 500, cursor: 'pointer' }}>
              <ArrowsOut size={12} />
              Full screen
            </button>
          </div>

          {/* Preview toolbar */}
          <div style={{ padding: '7px 12px', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#64748B', cursor: 'pointer' }}>☰</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowLeft size={11} color="#64748B" style={{ cursor: 'pointer' }} />
                <span style={{ fontSize: '11px', color: '#374151' }}>1 / 1</span>
                <ArrowRight size={11} color="#64748B" style={{ cursor: 'pointer' }} />
              </div>
              <MagnifyingGlassMinus size={12} color="#64748B" style={{ cursor: 'pointer' }} />
              <MagnifyingGlassPlus size={12} color="#64748B" style={{ cursor: 'pointer' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={13} color="#64748B" style={{ cursor: 'pointer' }} />
              <Printer size={13} color="#64748B" style={{ cursor: 'pointer' }} />
              <DotsThree size={16} weight="bold" color="#64748B" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          {/* Mini invoice */}
          <div style={{ padding: '10px', background: '#E8ECF0' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', overflow: 'hidden', fontSize: '7px' }}>

              {/* Invoice header */}
              <div style={{ padding: '12px 14px 10px', borderBottom: `2px solid ${accentColor}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '4px', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', padding: '3px' }}>
                      {[...Array(4)].map((_, i) => (
                        <div key={i} style={{ width: '4px', height: '4px', borderRadius: '1px', background: i === 3 ? '#99F6E4' : '#FFFFFF' }} />
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '7px', fontWeight: 800, color: '#0F172A' }}>TESSMA</div>
                    <div style={{ fontSize: '4.5px', color: '#64748B', letterSpacing: '0.06em' }}>ONE</div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: accentColor }}>INVOICE</div>
              </div>

              {/* Company + invoice details */}
              <div style={{ padding: '8px 14px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Your Company Ltd</div>
                  {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB123456789'].map(l => (
                    <div key={l} style={{ color: '#64748B', lineHeight: 1.7 }}>{l}</div>
                  ))}
                </div>
                <div>
                  {[['Invoice No:', 'INV-2025-0423'], ['Issue Date:', '15 Apr 2025'], ['Due Date:', '15 May 2025'], ['Service Period:', '01 Apr 2025 - 30 Apr 2025'], ['Reference:', 'PO-44881']].map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', gap: '6px', lineHeight: 1.8, justifyContent: 'flex-end' }}>
                      <span style={{ color: '#64748B' }}>{k}</span>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill To + Contact */}
              <div style={{ padding: '4px 10px 8px', display: 'flex', gap: '6px' }}>
                <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '3px', padding: '6px 8px' }}>
                  <div style={{ fontWeight: 700, color: '#94A3B8', fontSize: '5.5px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>Bill To:</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>ABC Ltd</div>
                  {['123 Business Park', 'Innovation Drive', 'London SW1 1AA', 'United Kingdom', 'VAT No: GB987654321'].map(l => (
                    <div key={l} style={{ color: '#64748B', lineHeight: 1.6 }}>{l}</div>
                  ))}
                </div>
                <div style={{ flex: 1, background: '#F8FAFC', borderRadius: '3px', padding: '6px 8px' }}>
                  <div style={{ fontWeight: 700, color: '#94A3B8', fontSize: '5.5px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '3px' }}>Contact:</div>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>Sarah Clarke</div>
                  <div style={{ color: '#64748B' }}>Finance Manager</div>
                  <div style={{ color: '#0284C7', fontSize: '6px' }}>sarah.clarke@abc-ltd.co.uk</div>
                  <div style={{ color: '#64748B' }}>+44 20 7123 4567</div>
                </div>
              </div>

              {/* Table */}
              <div style={{ padding: '0 8px 6px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '6.5px' }}>
                  <thead>
                    <tr style={{ background: accentColor }}>
                      {['Description', 'Qty', 'Unit Price', 'VAT', 'Amount (GBP)'].map((h, i) => (
                        <th key={h} style={{ padding: '4px 5px', color: '#FFFFFF', fontWeight: 700, textAlign: i === 0 ? 'left' : 'right' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {INVOICE_LINES.map((row, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                        <td style={{ padding: '3px 5px', color: '#374151' }}>{row.desc}</td>
                        <td style={{ padding: '3px 5px', textAlign: 'right', color: '#374151' }}>{row.qty}</td>
                        <td style={{ padding: '3px 5px', textAlign: 'right', color: '#374151' }}>{row.price}</td>
                        <td style={{ padding: '3px 5px', textAlign: 'right', color: '#374151' }}>{row.vat}</td>
                        <td style={{ padding: '3px 5px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div style={{ padding: '0 8px 8px', display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ minWidth: '130px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid #F1F5F9', fontSize: '6.5px' }}>
                    <span style={{ color: '#64748B' }}>Subtotal</span>
                    <span style={{ fontWeight: 600 }}>£4,300.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 0', borderBottom: '1px solid #F1F5F9', fontSize: '6.5px' }}>
                    <span style={{ color: '#64748B' }}>VAT (20%)</span>
                    <span style={{ fontWeight: 600 }}>£860.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 6px', background: accentColor, borderRadius: '3px', marginTop: '3px', fontSize: '7px' }}>
                    <span style={{ color: '#FFFFFF', fontWeight: 700 }}>Total (GBP)</span>
                    <span style={{ color: '#FFFFFF', fontWeight: 800 }}>£5,160.00</span>
                  </div>
                </div>
              </div>

              {/* Payment details */}
              <div style={{ padding: '6px 14px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', fontSize: '6px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '2px', fontSize: '6.5px' }}>Payment Details</div>
                  <div style={{ color: '#64748B' }}>Bank: Barclays Bank PLC</div>
                  <div style={{ color: '#64748B' }}>Sort Code: 20-12-34</div>
                  <div style={{ color: '#64748B' }}>Account No: 12345678</div>
                  <div style={{ color: '#64748B' }}>Account Name: Your Company Ltd</div>
                  <div style={{ color: '#64748B' }}>IBAN: GB29 BARC 2030 0012 3456 78</div>
                </div>
                <div style={{ textAlign: 'right', maxWidth: '110px' }}>
                  <div style={{ fontWeight: 600, color: accentColor, marginBottom: '3px', fontSize: '6.5px' }}>Thank you for your business.</div>
                  <div style={{ color: '#94A3B8', lineHeight: 1.5 }}>
                    If you have any questions, please contact our team at support@yourcompany.co.uk or +44 20 7123 4567
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom action bar */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px', background: '#FAFAFA' }}>
            <button
              onClick={() => toast('Opening full preview...')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                height: '34px', borderRadius: '6px', border: '1px solid #CBD5E1',
                background: '#FFFFFF', color: '#374151', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              }}>
              <Eye size={13} color="#475569" />
              Preview template
            </button>
            <button
              onClick={() => toast('Template duplicated!')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                height: '34px', borderRadius: '6px', border: '1px solid #CBD5E1',
                background: '#FFFFFF', color: '#374151', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              }}>
              <Copy size={13} color="#475569" />
              Duplicate
            </button>
            <button
              onClick={() => toast(`${currentTemplate?.name || 'Template'} applied successfully!`)}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                height: '34px', borderRadius: '6px', border: 'none',
                background: accentColor, color: '#FFFFFF', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                boxShadow: `0 1px 3px ${accentColor}44`,
              }}>
              <Plus size={13} weight="bold" />
              Use this template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
