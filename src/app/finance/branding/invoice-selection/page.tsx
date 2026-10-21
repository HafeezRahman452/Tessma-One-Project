'use client';

import { useState } from 'react';

/* ─── Mini invoice thumbnail shared component ─────────────────────────────── */
function MiniInvoice({ accent = '#0d9488', headerBg = '#f0fdf4', style = 'consulting' }: {
  accent?: string; headerBg?: string; style?: string;
}) {
  const gradients: Record<string, string> = {
    consulting: 'linear-gradient(135deg,#0d9488 0%,#34d399 100%)',
    agency: 'linear-gradient(135deg,#7c3aed 0%,#a78bfa 100%)',
    professional: 'linear-gradient(135deg,#0891b2 0%,#67e8f9 100%)',
    recurring: 'linear-gradient(135deg,#ea580c 0%,#fb923c 100%)',
    retail: 'linear-gradient(135deg,#0d9488 0%,#2dd4bf 100%)',
    wholesale: 'linear-gradient(135deg,#d97706 0%,#fbbf24 100%)',
    inventory: 'linear-gradient(135deg,#2563eb 0%,#60a5fa 100%)',
    bold: 'linear-gradient(135deg,#dc2626 0%,#f87171 100%)',
  };
  const grad = gradients[style] || gradients.consulting;

  return (
    <div style={{ width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 6, overflow: 'hidden', fontFamily: 'sans-serif', fontSize: 5 }}>
      {/* gradient top bar */}
      <div style={{ height: 28, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <div style={{ width: 10, height: 10, background: 'rgba(255,255,255,0.9)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: accent, fontSize: 4, fontWeight: 900, lineHeight: 1 }}>T</span>
          </div>
          <div>
            <div style={{ color: '#fff', fontSize: 4.5, fontWeight: 700, lineHeight: 1 }}>TESSMA</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 3, lineHeight: 1 }}>ONE</div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#fff', fontSize: 7, fontWeight: 900, letterSpacing: 1 }}>INVOICE</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 3.5 }}>#INV-2024-001</div>
        </div>
      </div>
      {/* address row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px 2px', borderBottom: '0.5px solid #f3f4f6' }}>
        <div>
          <div style={{ color: '#6b7280', fontSize: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>From</div>
          <div style={{ color: '#111827', fontSize: 3.5, fontWeight: 600 }}>TESSMA Ltd</div>
          <div style={{ color: '#6b7280', fontSize: 3 }}>123 Business St</div>
          <div style={{ color: '#6b7280', fontSize: 3 }}>London, UK</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#6b7280', fontSize: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>Bill To</div>
          <div style={{ color: '#111827', fontSize: 3.5, fontWeight: 600 }}>Client Corp</div>
          <div style={{ color: '#6b7280', fontSize: 3 }}>456 Client Ave</div>
          <div style={{ color: '#6b7280', fontSize: 3 }}>Manchester</div>
        </div>
      </div>
      {/* table header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.4fr 0.4fr 0.4fr', background: accent, padding: '2px 8px', gap: 2 }}>
        {['Description','Qty','Rate','Amount'].map(h => (
          <div key={h} style={{ color: '#fff', fontSize: 3, fontWeight: 600 }}>{h}</div>
        ))}
      </div>
      {/* table rows */}
      {[['Consulting Service','8 hrs','£150','£1,200'],['Project Management','4 hrs','£120','£480'],['Technical Review','2 hrs','£180','£360']].map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 0.4fr 0.4fr 0.4fr', padding: '1.5px 8px', background: i % 2 === 0 ? '#fff' : '#f9fafb', gap: 2 }}>
          {row.map((cell, j) => (
            <div key={j} style={{ color: j === 0 ? '#374151' : '#6b7280', fontSize: 3 }}>{cell}</div>
          ))}
        </div>
      ))}
      {/* totals */}
      <div style={{ borderTop: '0.5px solid #e5e7eb', padding: '3px 8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
        {[['Subtotal','£2,040'],['VAT (20%)','£408'],['Total','£2,448']].map(([label, val], i) => (
          <div key={label} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ color: '#6b7280', fontSize: 3 }}>{label}</div>
            <div style={{ color: i === 2 ? accent : '#374151', fontSize: i === 2 ? 4.5 : 3, fontWeight: i === 2 ? 700 : 400 }}>{val}</div>
          </div>
        ))}
      </div>
      {/* footer */}
      <div style={{ background: accent, padding: '3px 8px', marginTop: 2 }}>
        <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 3 }}>Payment due within 30 days · Bank transfer preferred</div>
      </div>
    </div>
  );
}

/* ─── Template data ──────────────────────────────────────────────────────────*/
const serviceTemplates = [
  {
    id: 'consulting',
    name: 'Consulting',
    tag: 'Service business',
    recommended: true,
    accent: '#0d9488',
    style: 'consulting',
    desc: 'Clean and professional layout ideal for consultants and advisors. Clear service breakdown with totals and payment details.',
    features: ['Service itemised table', 'Consultant-friendly layout', 'Terms and payment details', 'Available in multiple colours'],
    intended: 'Consultancy, advisory and professional services',
    branding: 'Fully supports your company branding, colours and logo',
    customisable: 'Services, project details, terms, payment instructions',
  },
  {
    id: 'agency',
    name: 'Agency',
    tag: 'Service business',
    recommended: false,
    accent: '#7c3aed',
    style: 'agency',
    desc: 'Modern and creative design perfect for marketing and digital agencies.',
    features: ['Project and milestone layout', 'Modern creative design', 'Client-friendly format', 'Available in multiple colours'],
    intended: 'Marketing, creative and digital agencies',
    branding: 'Fully supports your company branding, colours and logo',
    customisable: 'Projects, milestones, deliverables, retainer terms',
  },
  {
    id: 'professional',
    name: 'Professional Services',
    tag: 'Service business',
    recommended: false,
    accent: '#0891b2',
    style: 'professional',
    desc: 'Classic and formal template for professional service firms.',
    features: ['Detailed service descriptions', 'Time and materials support', 'Professional and minimal', 'Available in multiple colours'],
    intended: 'Law firms, accountants and professional consultancies',
    branding: 'Fully supports your company branding, colours and logo',
    customisable: 'Services, time entries, disbursements, payment terms',
  },
  {
    id: 'recurring',
    name: 'Recurring Services',
    tag: 'Service business',
    recommended: false,
    accent: '#ea580c',
    style: 'recurring',
    desc: 'Optimised for recurring billing and retainers with clear period details.',
    features: ['Recurring service sections', 'Period and subscription details', 'Clear payment schedules', 'Available in multiple colours'],
    intended: 'SaaS, retainers and subscription-based services',
    branding: 'Fully supports your company branding, colours and logo',
    customisable: 'Billing period, service tiers, renewal terms',
  },
];

const productTemplates = [
  { id: 'retail', name: 'Retail Product', tag: 'Product business', accent: '#0d9488', style: 'retail' },
  { id: 'wholesale', name: 'Wholesale', tag: 'Product business', accent: '#d97706', style: 'wholesale' },
  { id: 'inventory', name: 'Inventory', tag: 'Product business', accent: '#2563eb', style: 'inventory' },
  { id: 'bold', name: 'Modern Bold', tag: 'Product business', accent: '#dc2626', style: 'bold' },
];

/* ─── Page ───────────────────────────────────────────────────────────────────*/
export default function InvoiceSelectionPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'service' | 'product'>('all');
  const [selectedId, setSelectedId] = useState('consulting');
  const [previewTemplate, setPreviewTemplate] = useState<typeof serviceTemplates[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selected = serviceTemplates.find(t => t.id === selectedId) || serviceTemplates[0];

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Inter, sans-serif' }}>
      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 40px 0' }}>

        {/* Title */}
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>Invoice Template Selection</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px' }}>
          Choose a branded invoice template for your business. Each template is designed for different business types and can be customised with your company branding.
        </p>

        {/* Tabs + Search row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 0, border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
            {[
              { key: 'all', label: 'All templates', count: 8 },
              { key: 'service', label: 'Service businesses', count: 4 },
              { key: 'product', label: 'Product businesses', count: 4 },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '9px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                  border: 'none',
                  background: activeTab === tab.key ? '#fff' : '#f8fafc',
                  color: activeTab === tab.key ? '#0f172a' : '#64748b',
                  boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  outline: activeTab === tab.key ? '2px solid #0d9488' : 'none',
                  outlineOffset: -2,
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
                <span style={{
                  background: activeTab === tab.key ? '#0d9488' : '#e2e8f0',
                  color: activeTab === tab.key ? '#fff' : '#64748b',
                  borderRadius: 12, padding: '1px 7px', fontSize: 11, fontWeight: 700
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', fontSize: 14 }}>🔍</span>
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search templates..."
              style={{
                paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 13, color: '#0f172a',
                background: '#fff', outline: 'none', width: 200
              }}
            />
          </div>
        </div>

        {/* ── Service business templates ────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'service') && (
          <section style={{ marginBottom: 32 }}>
            {/* Section header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: '#3b82f6', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 16 }}>ℹ️</span>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#1e40af' }}>Service business templates</div>
                <div style={{ fontSize: 12, color: '#3b82f6' }}>Professional templates designed for service-based businesses, consultancy and project work.</div>
              </div>
            </div>

            {/* Feature pills */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
              {[
                { icon: '🟢', title: 'Service-focused layouts', desc: 'Designed for time, services and projects' },
                { icon: '✏️', title: 'Professional and modern', desc: 'Clean, client-friendly layouts' },
                { icon: '🎨', title: 'Fully customisable', desc: 'Use your branding and colours' },
                { icon: '📄', title: 'Compliant templates', desc: 'Include all required information' },
              ].map(f => (
                <div key={f.title} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '10px 12px' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{f.title}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Template cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {serviceTemplates.filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase())).map(template => (
                <div
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  style={{
                    background: '#fff',
                    border: `2px solid ${selectedId === template.id ? '#0d9488' : '#e2e8f0'}`,
                    borderRadius: 12, padding: 0, cursor: 'pointer', overflow: 'hidden',
                    boxShadow: selectedId === template.id ? '0 0 0 3px rgba(13,148,136,0.12)' : '0 1px 3px rgba(0,0,0,0.06)',
                    transition: 'all 0.15s',
                    position: 'relative',
                  }}
                >
                  {/* Recommended badge */}
                  {template.recommended && (
                    <div style={{
                      position: 'absolute', top: 10, left: 10, zIndex: 10,
                      background: '#dcfce7', border: '1px solid #86efac', borderRadius: 20,
                      padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 4,
                      fontSize: 11, fontWeight: 600, color: '#15803d'
                    }}>
                      <span>✓</span> Recommended
                    </div>
                  )}

                  {/* Radio */}
                  <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: `2px solid ${selectedId === template.id ? '#0d9488' : '#d1d5db'}`,
                      background: selectedId === template.id ? '#0d9488' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {selectedId === template.id && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </div>

                  {/* Invoice preview */}
                  <div style={{ padding: '38px 12px 12px', background: '#f8fafc' }}>
                    <MiniInvoice accent={template.accent} style={template.style} />
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '12px 14px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{template.name}</span>
                    </div>
                    <span style={{
                      display: 'inline-block', background: '#f0fdf4', color: '#15803d',
                      border: '1px solid #bbf7d0', borderRadius: 20, padding: '2px 10px',
                      fontSize: 10, fontWeight: 600, marginBottom: 8
                    }}>
                      {template.tag}
                    </span>
                    <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 10px', lineHeight: 1.5 }}>{template.desc}</p>

                    {/* Feature list */}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {template.features.map(f => (
                        <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#374151' }}>
                          <span style={{ color: '#0d9488', fontSize: 12, flexShrink: 0 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>

                    {/* Preview button */}
                    <button
                      onClick={e => { e.stopPropagation(); setPreviewTemplate(template); }}
                      style={{
                        width: '100%', padding: '8px', marginBottom: 8,
                        background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 8,
                        fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                        transition: 'all 0.15s'
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#0d9488'; (e.currentTarget as HTMLButtonElement).style.color = '#0d9488'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#e2e8f0'; (e.currentTarget as HTMLButtonElement).style.color = '#374151'; }}
                    >
                      👁️ Preview
                    </button>

                    {/* Select template button */}
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedId(template.id); }}
                      style={{
                        width: '100%', padding: '8px',
                        background: selectedId === template.id ? '#0d9488' : '#134e4a',
                        border: 'none', borderRadius: 8,
                        fontSize: 12, fontWeight: 600, color: '#fff', cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {selectedId === template.id ? '✓ Selected' : 'Select template'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Product business templates ────────────────────────────────── */}
        {(activeTab === 'all' || activeTab === 'product') && (
          <section>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '12px 16px', marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, background: '#f97316', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 16 }}>📦</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#c2410c' }}>Product business templates</div>
                <div style={{ fontSize: 12, color: '#ea580c' }}>Specialised templates for product, retail and inventory-based businesses.</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: '#0d9488', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                View product templates →
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              {productTemplates.map(template => (
                <div
                  key={template.id}
                  style={{
                    background: '#fff', border: '2px solid #e2e8f0', borderRadius: 12,
                    overflow: 'hidden', cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#0d9488'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#e2e8f0'; }}
                >
                  <div style={{ padding: '12px', background: '#f8fafc' }}>
                    <MiniInvoice accent={template.accent} style={template.style} />
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{template.name}</div>
                    <span style={{
                      display: 'inline-block', background: '#eff6ff', color: '#1d4ed8',
                      border: '1px solid #bfdbfe', borderRadius: 20, padding: '2px 10px', fontSize: 10, fontWeight: 600
                    }}>
                      {template.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Right Sidebar ─────────────────────────────────────────────────── */}
      <div style={{
        width: 300, borderLeft: '1px solid #e2e8f0', background: '#fff',
        display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0
      }}>
        {/* Template comparison */}
        <div style={{ padding: '20px 18px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 16 }}>📊</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Template comparison</span>
          </div>
          <p style={{ fontSize: 11.5, color: '#64748b', margin: '0 0 14px' }}>Compare key details of our most popular templates.</p>

          {/* Two comparison cards side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 6, alignItems: 'center' }}>
            {/* Consulting */}
            <div style={{ border: '2px solid #0d9488', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#0d9488', padding: '4px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>Consulting</span>
                <span style={{ background: '#dcfce7', color: '#15803d', fontSize: 9, fontWeight: 700, borderRadius: 10, padding: '1px 6px' }}>Currently selected</span>
              </div>
              <div style={{ padding: 6, background: '#f8fafc' }}>
                <MiniInvoice accent="#0d9488" style="consulting" />
              </div>
              <div style={{ padding: '6px 8px', background: '#fff' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>Consulting</div>
                <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: 10, padding: '1px 6px', fontSize: 9, fontWeight: 600 }}>Service business</span>
                <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {['Clean and professional', 'Service itemised table', 'Consultant-friendly layout'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#374151' }}>
                      <span style={{ color: '#0d9488', fontSize: 10 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#94a3b8', fontSize: 14, fontWeight: 700 }}>
              <span>⇄</span>
            </div>

            {/* Agency */}
            <div style={{ border: '1.5px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ background: '#7c3aed', padding: '4px 8px' }}>
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>Agency</span>
              </div>
              <div style={{ padding: 6, background: '#f8fafc' }}>
                <MiniInvoice accent="#7c3aed" style="agency" />
              </div>
              <div style={{ padding: '6px 8px', background: '#fff' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>Agency</div>
                <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: 10, padding: '1px 6px', fontSize: 9, fontWeight: 600 }}>Service business</span>
                <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {['Modern and creative', 'Project and milestone layout', 'Client-friendly format'].map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, color: '#374151' }}>
                      <span style={{ color: '#7c3aed', fontSize: 10 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Selected template details */}
        <div style={{ padding: '18px 18px 20px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 16 }}>📋</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Selected template details</span>
            <span style={{ marginLeft: 'auto', background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', borderRadius: 20, padding: '2px 8px', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
              ✓ Currently selected
            </span>
          </div>

          {/* Template name + tag */}
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{selected.name}</div>
          <span style={{
            display: 'inline-block', background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0',
            borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 600, marginBottom: 12
          }}>
            {selected.tag}
          </span>

          {/* Mini preview + desc */}
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 10, marginBottom: 14 }}>
            <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid #e2e8f0' }}>
              <MiniInvoice accent={selected.accent} style={selected.style} />
            </div>
            <p style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.55, margin: 0 }}>{selected.desc}</p>
          </div>

          {/* Detail rows */}
          {[
            { icon: '🟠', color: '#f97316', label: 'Intended use', value: selected.intended },
            { icon: '🔴', color: '#ef4444', label: 'Branding compatibility', value: selected.branding },
            { icon: '🟣', color: '#8b5cf6', label: 'Customisable sections', value: selected.customisable },
          ].map(row => (
            <div key={row.label} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: `${row.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 14
              }}>
                {row.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{row.label}</div>
                <div style={{ fontSize: 10.5, color: '#64748b', marginTop: 2 }}>{row.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom actions */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{
            width: '100%', padding: '11px',
            background: 'linear-gradient(135deg,#0d9488 0%,#0f766e 100%)',
            border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700,
            color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            Continue with this template →
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <button
              onClick={() => setPreviewTemplate(selected)}
              style={{
                padding: '9px', background: '#fff', border: '1.5px solid #e2e8f0',
                borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#374151',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
              }}
            >
              👁️ Preview
            </button>
            <button style={{
              padding: '9px', background: '#fff', border: '1.5px solid #e2e8f0',
              borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#374151',
              cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* ── Preview Modal ──────────────────────────────────────────────────── */}
      {previewTemplate && (
        <div
          onClick={() => setPreviewTemplate(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: '#fff', borderRadius: 16, width: 700, maxHeight: '88vh',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}
          >
            {/* Modal header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{previewTemplate.name}</h2>
                <span style={{ background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>
                  {previewTemplate.tag}
                </span>
              </div>
              <button onClick={() => setPreviewTemplate(null)} style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', fontSize: 16 }}>✕</button>
            </div>

            {/* Modal body */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Preview left */}
              <div style={{ flex: 1, padding: 24, background: '#f8fafc', overflowY: 'auto' }}>
                <MiniInvoice accent={previewTemplate.accent} style={previewTemplate.style} />
              </div>
              {/* Details right */}
              <div style={{ width: 240, padding: '20px 18px', overflowY: 'auto', borderLeft: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>{previewTemplate.name}</h3>
                <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 14px', lineHeight: 1.5 }}>{previewTemplate.desc}</p>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>Features</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {previewTemplate.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#374151' }}>
                      <span style={{ color: previewTemplate.accent, fontSize: 12 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { setSelectedId(previewTemplate.id); setPreviewTemplate(null); }}
                  style={{
                    width: '100%', padding: '10px',
                    background: previewTemplate.accent, border: 'none',
                    borderRadius: 8, fontSize: 13, fontWeight: 700, color: '#fff', cursor: 'pointer', marginBottom: 8
                  }}
                >
                  Use this template
                </button>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  style={{ width: '100%', padding: '9px', background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#374151', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
