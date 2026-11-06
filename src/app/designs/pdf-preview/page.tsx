'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  DownloadSimple,
  Printer,
  PaperPlaneTilt,
  X,
  FileText,
  FilePdf,
  CheckCircle,
  Eye,
  ArrowSquareOut,
  ClockCounterClockwise,
  ArrowsClockwise
} from '@phosphor-icons/react';

export default function PdfPreviewPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div style={{ padding: '0 0 48px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
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
            <Link href="/designs/document-branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding & Company Identity</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>PDF Preview</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            PDF Preview
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Preview the generated PDF document with your selected branding and template.
          </p>
        </div>

        {/* Top Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Downloading TESSMA_ONE_Invoice_INV-2025-1042.pdf...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              background: '#006666',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <DownloadSimple size={16} weight="bold" />
            <span>Download PDF</span>
          </button>

          <button 
            onClick={() => showToast('Print dialog sent to printer')}
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
            <Printer size={16} />
            <span>Print</span>
          </button>

          <button 
            onClick={() => showToast('Send invoice dialog opened')}
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
              color: '#0284C7',
              cursor: 'pointer'
            }}
          >
            <PaperPlaneTilt size={16} weight="bold" />
            <span>Send</span>
            <CaretDown size={12} />
          </button>

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
              color: '#475569',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={15} weight="bold" />
            <span>Close Preview</span>
          </Link>
        </div>
      </div>

      {/* ── 2. MAIN WORKSPACE: 2 COLUMNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(640px, 1.75fr) minmax(340px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: EMBEDDED PDF VIEWER CANVAS ════ */}
        <div style={{
          background: '#334155',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
        }}>
          {/* PDF Viewer Dark Chrome Bar */}
          <div style={{
            background: '#1E293B',
            color: '#CBD5E1',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span>☰</span>
              <span style={{ fontWeight: 600, color: '#F8FAFC' }}>TESSMA_ONE_Invoice_INV-2025-1042.pdf</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ cursor: 'pointer' }}>‹</span>
                <span style={{ background: '#334155', padding: '2px 8px', borderRadius: '4px', color: '#FFFFFF' }}>1</span>
                <span>/ 1</span>
                <span style={{ cursor: 'pointer' }}>›</span>
              </div>

              <div style={{ width: '1px', height: '14px', background: '#475569' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ cursor: 'pointer' }}>-</span>
                <span style={{ background: '#334155', padding: '2px 8px', borderRadius: '4px', color: '#FFFFFF' }}>100% ▾</span>
                <span style={{ cursor: 'pointer' }}>+</span>
              </div>

              <div style={{ width: '1px', height: '14px', background: '#475569' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ cursor: 'pointer' }}>⛶</span>
                <DownloadSimple size={15} style={{ cursor: 'pointer' }} />
                <Printer size={15} style={{ cursor: 'pointer' }} />
                <span>⋮</span>
              </div>
            </div>
          </div>

          {/* White A4 PDF Sheet Container */}
          <div style={{ padding: '36px 40px', background: '#475569', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: '#FFFFFF',
              width: '100%',
              maxWidth: '820px',
              padding: '48px 48px',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              borderRadius: '2px',
              fontSize: '11px',
              color: '#334155',
              lineHeight: 1.6
            }}>
              
              {/* Header with TESSMA ONE Teal Building Logo & Details */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '6px',
                      background: '#009A96',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF'
                    }}>
                      <div style={{ width: '14px', height: '14px', border: '2.5px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', letterSpacing: '0.04em', lineHeight: 1.1 }}>
                        TESSMA <span style={{ color: '#009A96' }}>ONE</span>
                      </div>
                      <div style={{ fontSize: '8px', color: '#64748B', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        PEOPLE | PLACES | POSSIBILITIES
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right', fontSize: '10px', color: '#64748B' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '11px' }}>TESSMA ONE Limited</div>
                  <div>123 Innovation Drive</div>
                  <div>Manchester, M1 2AB</div>
                  <div>United Kingdom</div>
                  <div style={{ marginTop: '4px' }}>📞 +44 161 123 4567</div>
                  <div>✉ finance@tessmaone.com</div>
                  <div>🌐 www.tessmaone.com</div>
                </div>
              </div>

              {/* Teal decorative divider line */}
              <div style={{ width: '100%', height: '3px', background: '#009A96', marginBottom: '24px' }} />

              {/* Invoice Title & Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
                    Invoice
                  </h2>

                  <div>
                    <div style={{ fontWeight: 700, color: '#009A96', fontSize: '11px', marginBottom: '2px' }}>Bill To</div>
                    <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '12px' }}>ABC Facilities Management Ltd</div>
                    <div style={{ color: '#64748B' }}>Riverside House</div>
                    <div style={{ color: '#64748B' }}>2 Victoria Avenue</div>
                    <div style={{ color: '#64748B' }}>London, SW1 6NP</div>
                    <div style={{ color: '#64748B' }}>United Kingdom</div>
                  </div>
                </div>

                {/* Meta details table box */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '12px 16px', width: '220px', fontSize: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748B' }}>Invoice Number</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>INV-2025-1042</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748B' }}>Issue Date</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>01 Apr 2025</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748B' }}>Due Date</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>01 May 2025</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748B' }}>Account Number</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>CUS-000125</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>VAT Number</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>GB123456789</span>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '24px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #009A96', textAlign: 'left', color: '#0F172A' }}>
                    <th style={{ padding: '8px 6px', width: '30px' }}>#</th>
                    <th style={{ padding: '8px 10px' }}>Description</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', width: '70px' }}>Quantity</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', width: '100px' }}>Unit Price</th>
                    <th style={{ padding: '8px 10px', textAlign: 'center', width: '60px' }}>VAT</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', width: '110px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>1</td>
                    <td style={{ padding: '10px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>TESSMA ONE Core Platform</div>
                      <div style={{ fontSize: '9.5px', color: '#64748B' }}>Annual subscription (1 Apr 2025 – 31 Mar 2026)</div>
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'center', color: '#0F172A' }}>1</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: '#0F172A' }}>£12,000.00</td>
                    <td style={{ padding: '10px 10px', textAlign: 'center', color: '#64748B' }}>20%</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£12,000.00</td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>2</td>
                    <td style={{ padding: '10px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Additional User Licences</div>
                      <div style={{ fontSize: '9.5px', color: '#64748B' }}>10 x Standard User Licences</div>
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'center', color: '#0F172A' }}>10</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: '#0F172A' }}>£120.00</td>
                    <td style={{ padding: '10px 10px', textAlign: 'center', color: '#64748B' }}>20%</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£1,200.00</td>
                  </tr>

                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '10px 6px', color: '#64748B' }}>3</td>
                    <td style={{ padding: '10px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#0F172A' }}>Implementation Services</div>
                      <div style={{ fontSize: '9.5px', color: '#64748B' }}>Setup, configuration and data migration</div>
                    </td>
                    <td style={{ padding: '10px 10px', textAlign: 'center', color: '#0F172A' }}>1</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', color: '#0F172A' }}>£3,500.00</td>
                    <td style={{ padding: '10px 10px', textAlign: 'center', color: '#64748B' }}>20%</td>
                    <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>£3,500.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Payment Details (Left) & Totals (Right) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start', marginBottom: '32px' }}>
                {/* Payment Details */}
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '14px 16px', fontSize: '9.5px' }}>
                  <div style={{ fontWeight: 700, color: '#0284C7', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>🏛</span>
                    <span>Payment Details</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '3px', color: '#64748B' }}>
                    <span>Bank Name</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>HSBC Bank plc</span>
                    <span>Account Name</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>TESSMA ONE Limited</span>
                    <span>Sort Code</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>40-12-34</span>
                    <span>Account Number</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>12345678</span>
                    <span>IBAN</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>GB29 HBUK 4012 3412 3456 78</span>
                    <span>SWIFT / BIC</span>
                    <span style={{ color: '#0F172A', fontWeight: 600 }}>HBUKGB4B</span>
                  </div>
                </div>

                {/* Subtotals & Total Amount */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10.5px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>Subtotal</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>£16,700.00</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                    <span>VAT (20%)</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>£3,340.00</span>
                  </div>

                  {/* Highlight Total Amount */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ECFDF5',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginTop: '4px'
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#065F46' }}>Total Amount</span>
                    <span style={{ fontSize: '18px', fontWeight: 900, color: '#065F46' }}>£20,040.00</span>
                  </div>
                </div>
              </div>

              {/* Document Sign-off Footer */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: '9.5px', color: '#64748B' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Thank you for your business.</div>
                  <div>This invoice is generated electronically and does not require a signature.</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, fontSize: '12px', color: '#0F172A' }}>TESSMA <span style={{ color: '#009A96' }}>ONE</span></div>
                  <div style={{ fontSize: '7.5px', color: '#94A3B8', letterSpacing: '0.06em' }}>PEOPLE | PLACES | POSSIBILITIES</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN: DOCUMENT INFORMATION & RELATED ACTIONS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Document Information */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
              Document Information
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <FileText size={16} color="#0284C7" />
                  <span>Document Type</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Invoice</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <FilePdf size={16} color="#0284C7" />
                  <span>Invoice Number</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>INV-2025-1042</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>👥</span>
                  <span>Customer</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>ABC Facilities Management Ltd</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>📅</span>
                  <span>Issue Date</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>01 Apr 2025</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>📅</span>
                  <span>Due Date</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>01 May 2025</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>📋</span>
                  <span>Template Used</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>TESSMA ONE - Standard Invoice</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>👤</span>
                  <span>Created By</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>John Doe</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>🕒</span>
                  <span>Created On</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>01 Apr 2025, 10:24</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>🎨</span>
                  <span>Branding Profile</span>
                </div>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>TESSMA ONE (Default)</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B' }}>
                  <span style={{ color: '#0284C7' }}>⚙</span>
                  <span>Status</span>
                </div>
                <span style={{
                  background: '#DCFCE7',
                  color: '#15803D',
                  padding: '2px 8px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>●</span>
                  <span>Generated</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Related Actions */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
              Related Actions
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              {/* Action 1 */}
              <Link 
                href="/designs/finance-invoice-templates"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} color="#0284C7" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0F172A' }}>Switch Template</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>Preview this invoice with a different template</div>
                  </div>
                </div>
                <CaretRight size={14} color="#64748B" />
              </Link>

              {/* Action 2 */}
              <Link 
                href="/designs/sales-invoice-detail"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ArrowSquareOut size={18} color="#0284C7" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0F172A' }}>Open Source Invoice</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>View the original invoice record</div>
                  </div>
                </div>
                <CaretRight size={14} color="#64748B" />
              </Link>

              {/* Action 3 */}
              <Link 
                href="/designs/delivery-history"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  background: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ClockCounterClockwise size={18} color="#0284C7" />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '12.5px', color: '#0F172A' }}>View Delivery History</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>See when this invoice was sent and to whom</div>
                  </div>
                </div>
                <CaretRight size={14} color="#64748B" />
              </Link>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
