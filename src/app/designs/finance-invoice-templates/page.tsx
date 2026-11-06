'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  PencilSimple,
  Buildings,
  CheckCircle,
  Eye,
  Check,
  DotsThreeVertical,
  DotsThree,
  UsersThree,
  Package,
  Sparkle
} from '@phosphor-icons/react';

interface TemplateCard {
  id: string;
  name: string;
  desc: string;
  category: 'service' | 'product';
  badge: string;
  isDefault?: boolean;
  accentBg: string;
}

const SERVICE_TEMPLATES: TemplateCard[] = [
  {
    id: 'prof-clean',
    name: 'Professional Clean',
    desc: 'Modern and clean layout for professional services.',
    category: 'service',
    badge: 'Popular',
    isDefault: true,
    accentBg: '#009A96'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Simple and elegant design with clean typography.',
    category: 'service',
    badge: 'Minimal',
    isDefault: false,
    accentBg: '#0284C7'
  },
  {
    id: 'modern-bold',
    name: 'Modern Bold',
    desc: 'Strong header design for a modern look.',
    category: 'service',
    badge: 'Modern',
    isDefault: false,
    accentBg: '#1E293B'
  },
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Traditional layout with a timeless design.',
    category: 'service',
    badge: 'Classic',
    isDefault: false,
    accentBg: '#D97706'
  }
];

const PRODUCT_TEMPLATES: TemplateCard[] = [
  {
    id: 'prod-standard',
    name: 'Product Standard',
    desc: 'Clear item table with product details and totals.',
    category: 'product',
    badge: 'Standard',
    isDefault: false,
    accentBg: '#009A96'
  },
  {
    id: 'prod-modern',
    name: 'Modern Product',
    desc: 'Showcases product images with a modern layout.',
    category: 'product',
    badge: 'Modern',
    isDefault: false,
    accentBg: '#8B5CF6'
  },
  {
    id: 'prod-detailed',
    name: 'Detailed Items',
    desc: 'Detailed itemisation for complex orders.',
    category: 'product',
    badge: 'Detailed',
    isDefault: false,
    accentBg: '#EA580C'
  },
  {
    id: 'prod-compact',
    name: 'Compact',
    desc: 'Compact layout for simple product invoices.',
    category: 'product',
    badge: 'Compact',
    isDefault: false,
    accentBg: '#059669'
  }
];

export default function FinanceInvoiceTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('prof-clean');
  const [defaultTemplate, setDefaultTemplate] = useState<string>('prof-clean');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUseTemplate = (id: string, name: string) => {
    setSelectedTemplate(id);
    showToast(`Template "${name}" selected for invoice creation!`);
  };

  const handleSetDefault = (id: string, name: string) => {
    setDefaultTemplate(id);
    showToast(`"${name}" set as default invoice template!`);
  };

  return (
    <div style={{ padding: '24px 32px 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: '8px',
          fontSize: '13px',
          fontWeight: 500,
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999
        }}>
          <CheckCircle size={18} color="#10B981" weight="fill" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. BREADCRUMB & HEADER ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Invoice templates</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Invoice templates
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Create professional invoices with templates that match your business. Templates automatically use your TESSMA ONE branding, including your logo, colours and company details.
          </p>
        </div>

        {/* Top Header Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link 
            href="/designs/document-branding"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#334155',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <PencilSimple size={16} />
            <span>Edit branding</span>
          </Link>

          {/* Branding status banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
            padding: '8px 14px',
            fontSize: '12px',
            color: '#1E40AF',
            fontWeight: 500
          }}>
            <Buildings size={16} />
            <span>Your company branding is applied automatically to all invoice templates.</span>
          </div>
        </div>
      </div>

      {/* ── 2. TWO-COLUMN LAYOUT: TEMPLATE GALLERY (LEFT) & TEMPLATE PREVIEW (RIGHT) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(650px, 1.4fr) minmax(420px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: SERVICE TEMPLATES & PRODUCT TEMPLATES ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* SECTION 1: Service templates */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UsersThree size={20} color="#059669" weight="bold" />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Service templates</h3>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Ideal for service-based businesses, consulting, and professional services.</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', color: '#64748B' }}>4 templates</span>
            </div>

            {/* 4 Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {SERVICE_TEMPLATES.map(tmpl => {
                const isCurDefault = defaultTemplate === tmpl.id;
                const isSelected = selectedTemplate === tmpl.id;
                return (
                  <div 
                    key={tmpl.id}
                    style={{
                      border: isSelected ? '2px solid #006666' : '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '12px',
                      background: isSelected ? '#F0FDF4' : '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    {isCurDefault && (
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#059669',
                        color: '#FFFFFF',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        Default
                      </span>
                    )}

                    {/* Thumbnail representation */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      height: '110px',
                      padding: '8px',
                      marginBottom: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      fontSize: '7.5px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: tmpl.accentBg }} />
                          <span style={{ fontWeight: 800 }}>TESSMA</span>
                        </div>
                        <span style={{ fontWeight: 700, color: '#64748B' }}>INVOICE</span>
                      </div>
                      <div style={{ width: '100%', height: '1px', background: '#E2E8F0' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <div style={{ width: '80%', height: '3px', background: '#E2E8F0', borderRadius: '1px' }} />
                        <div style={{ width: '60%', height: '3px', background: '#F1F5F9', borderRadius: '1px' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '3px' }}>
                        <span>Total</span>
                        <span style={{ fontWeight: 800 }}>£2,364.00</span>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{tmpl.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: 1.3 }}>{tmpl.desc}</div>
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                      <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>Service</span>
                      <span style={{ background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>{tmpl.badge}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button 
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '5px',
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: '#334155',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <Eye size={13} />
                        <span>Preview</span>
                      </button>

                      <button 
                        onClick={() => handleUseTemplate(tmpl.id, tmpl.name)}
                        style={{
                          padding: '6px',
                          background: isSelected ? '#006666' : '#FFFFFF',
                          border: isSelected ? 'none' : '1px solid #CBD5E1',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: isSelected ? '#FFFFFF' : '#334155',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Use template
                      </button>

                      <button 
                        onClick={() => handleSetDefault(tmpl.id, tmpl.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '10.5px',
                          color: isCurDefault ? '#059669' : '#64748B',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '2px'
                        }}
                      >
                        {isCurDefault ? <Check size={12} weight="bold" /> : '○'}
                        <span>{isCurDefault ? 'Default template' : 'Set as default'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: Product templates */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={20} color="#0284C7" weight="bold" />
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Product templates</h3>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Ideal for product-based businesses, retail, and equipment sales.</div>
                </div>
              </div>
              <span style={{ fontSize: '12px', color: '#64748B' }}>4 templates</span>
            </div>

            {/* 4 Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
              {PRODUCT_TEMPLATES.map(tmpl => {
                const isCurDefault = defaultTemplate === tmpl.id;
                const isSelected = selectedTemplate === tmpl.id;
                return (
                  <div 
                    key={tmpl.id}
                    style={{
                      border: isSelected ? '2px solid #006666' : '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '12px',
                      background: isSelected ? '#F0FDF4' : '#FFFFFF',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative'
                    }}
                  >
                    {isCurDefault && (
                      <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#059669',
                        color: '#FFFFFF',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        Default
                      </span>
                    )}

                    {/* Thumbnail representation */}
                    <div style={{
                      background: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      height: '110px',
                      padding: '8px',
                      marginBottom: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      fontSize: '7.5px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: tmpl.accentBg }} />
                          <span style={{ fontWeight: 800 }}>TESSMA</span>
                        </div>
                        <span style={{ fontWeight: 700, color: '#64748B' }}>INVOICE</span>
                      </div>
                      <div style={{ width: '100%', height: '1px', background: '#E2E8F0' }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ width: '22px', height: '22px', background: '#F1F5F9', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
                        <div style={{ width: '22px', height: '22px', background: '#F1F5F9', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🪑</div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '3px' }}>
                        <span>Total</span>
                        <span style={{ fontWeight: 800 }}>£4,520.00</span>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{tmpl.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: 1.3 }}>{tmpl.desc}</div>
                    </div>

                    {/* Badges */}
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                      <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>Product</span>
                      <span style={{ background: '#F1F5F9', color: '#475569', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>{tmpl.badge}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <button 
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '5px',
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: '#334155',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <Eye size={13} />
                        <span>Preview</span>
                      </button>

                      <button 
                        onClick={() => handleUseTemplate(tmpl.id, tmpl.name)}
                        style={{
                          padding: '6px',
                          background: isSelected ? '#006666' : '#FFFFFF',
                          border: isSelected ? 'none' : '1px solid #CBD5E1',
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: isSelected ? '#FFFFFF' : '#334155',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        Use template
                      </button>

                      <button 
                        onClick={() => handleSetDefault(tmpl.id, tmpl.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '10.5px',
                          color: isCurDefault ? '#059669' : '#64748B',
                          fontWeight: 600,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                          padding: '2px'
                        }}
                      >
                        {isCurDefault ? <Check size={12} weight="bold" /> : '○'}
                        <span>{isCurDefault ? 'Default template' : 'Set as default'}</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ════ RIGHT COLUMN: TEMPLATE PREVIEW ════ */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Template preview</h3>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#DCFCE7',
              color: '#15803D',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '999px'
            }}>
              <CheckCircle size={13} weight="fill" />
              <span>Default template</span>
            </span>
          </div>

          {/* Rendered Invoice Paper */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '24px',
            fontSize: '10px',
            color: '#334155',
            lineHeight: 1.5,
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginBottom: '20px'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#009A96', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                  <div style={{ width: '10px', height: '10px', border: '2px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>TESSMA</div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#009A96', marginTop: '-2px' }}>ONE</div>
                </div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '9px' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>Your Company Ltd</div>
                <div style={{ color: '#64748B' }}>123 Business Street<br />London, SW1 1AA<br />United Kingdom</div>
              </div>
            </div>

            {/* Title & Metadata */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  INVOICE
                </div>
                <div style={{ fontSize: '9px', color: '#64748B' }}>Invoice No: <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-2025-0042</span></div>
                <div style={{ fontSize: '9px', color: '#64748B' }}>Invoice Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>01 Apr 2025</span></div>
                <div style={{ fontSize: '9px', color: '#64748B' }}>Due Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>01 May 2025</span></div>
              </div>

              <div style={{ textAlign: 'right', fontSize: '9px' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>Bill To</div>
                <div style={{ fontWeight: 600, color: '#0F172A' }}>ABC Ltd</div>
                <div style={{ color: '#64748B' }}>456 Client Road<br />Manchester, M1 2AB<br />United Kingdom</div>
              </div>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '14px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #CBD5E1', textAlign: 'left', color: '#64748B' }}>
                  <th style={{ padding: '6px 0' }}>Description</th>
                  <th style={{ padding: '6px 0', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '6px 0', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '6px 0', textAlign: 'center' }}>VAT</th>
                  <th style={{ padding: '6px 0', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '6px 0', color: '#0F172A', fontWeight: 600 }}>Consultancy Services</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>10</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>£120.00</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>20%</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£1,200.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '6px 0', color: '#0F172A', fontWeight: 600 }}>Project Management</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>5</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>£100.00</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>20%</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£500.00</td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0', color: '#0F172A', fontWeight: 600 }}>Technical Support</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>3</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>£90.00</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>20%</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£270.00</td>
                </tr>
              </tbody>
            </table>

            {/* Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', fontSize: '9px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                <span>Subtotal</span>
                <span>£1,970.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                <span>VAT (20%)</span>
                <span>£394.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', fontWeight: 800, color: '#0F172A', fontSize: '11px', borderTop: '1px solid #CBD5E1', paddingTop: '4px', marginTop: '2px' }}>
                <span>Total</span>
                <span>£2,364.00</span>
              </div>
            </div>

            {/* Notes & Footer */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', fontSize: '8.5px', color: '#64748B' }}>
              <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Notes</div>
              <div>Thank you for your business. Payment is due within 30 days.</div>
            </div>

            <div style={{ textAlign: 'center', fontSize: '7.5px', color: '#94A3B8', marginTop: '16px' }}>
              Your Company Ltd | 123 Business Street, London, SW1 1AA | +44 20 7123 4567
            </div>
          </div>

          {/* Template Details Bottom Controls */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Professional Clean</h4>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: '#DCFCE7',
                color: '#15803D',
                fontSize: '11px',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '999px'
              }}>
                <CheckCircle size={13} weight="fill" />
                <span>Default template</span>
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 12px 0' }}>
              Modern and clean layout for professional services. Includes clear itemisation, totals and payment terms.
            </p>

            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              <span style={{ background: '#EFF6FF', color: '#1D4ED8', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Service</span>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600 }}>Popular</span>
            </div>

            {/* Actions Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => showToast('Preview modal opened')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <Eye size={16} />
                <span>Preview</span>
              </button>

              <button 
                onClick={() => showToast('Using Professional Clean template for invoices!')}
                style={{
                  padding: '8px 20px',
                  background: '#006666',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Use template
              </button>

              <button 
                onClick={() => showToast('More actions')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 12px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  fontSize: '13px',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <span>More actions</span>
                <CaretDown size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
