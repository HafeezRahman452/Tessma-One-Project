'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  House,
  EnvelopeSimple,
  CaretRight,
  CaretDown,
  PaperPlaneTilt,
  Eye,
  FloppyDisk,
  FilePdf,
  PencilSimple,
  ArrowSquareOut,
  UsersThree,
  CheckCircle,
  X,
  Buildings,
  TextB,
  TextItalic,
  TextUnderline,
  ListBullets,
  ListNumbers,
  TextAlignLeft,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  Calendar,
  Clock,
  Check
} from '@phosphor-icons/react';

interface Recipient {
  id: string;
  name: string;
  email: string;
  initials: string;
  role?: string;
  company?: string;
}

const STORAGE_KEY = 'tessma_send_invoice_form_data';

export default function SendInvoicePage() {
  // Form state
  const [toRecipients, setToRecipients] = useState<Recipient[]>([
    {
      id: '1',
      name: 'Sarah Lawson',
      email: 'sarah.lawson@abcsolutions.co.uk',
      initials: 'SL',
      role: 'Finance Manager',
      company: 'ABC Solutions Ltd'
    }
  ]);
  const [toInput, setToInput] = useState('');

  const [ccRecipients, setCcRecipients] = useState<Recipient[]>([
    {
      id: '2',
      name: 'Mark Stevens',
      email: 'mark.stevens@abcsolutions.co.uk',
      initials: 'MS',
      role: 'Operations Director',
      company: 'ABC Solutions Ltd'
    }
  ]);
  const [ccInput, setCcInput] = useState('');

  const [bccRecipients, setBccRecipients] = useState<Recipient[]>([]);
  const [bccInput, setBccInput] = useState('');

  const [replyTo, setReplyTo] = useState('accounts@yourcompany.co.uk');
  const [customerContact, setCustomerContact] = useState('Sarah Lawson (Finance Manager)');
  const [subject, setSubject] = useState('Invoice INV-2025-0042 from Your Company Ltd');
  const [message, setMessage] = useState(
`Dear {{contact_name}},

Please find attached invoice {{invoice_number}} for {{invoice_amount}}.
You can also make a secure payment using the link below.

If you have any questions, please don't hesitate to get in touch.

Kind regards,
Your Company Ltd`
  );

  // Checkbox options
  const [attachPdf, setAttachPdf] = useState(true);
  const [attachStatement, setAttachStatement] = useState(true);
  const [includePaymentLink, setIncludePaymentLink] = useState(true);
  const [includeTerms, setIncludeTerms] = useState(true);
  const [saveAsDefault, setSaveAsDefault] = useState(false);
  const [sendCopyToInternal, setSendCopyToInternal] = useState(false);

  // Send options
  const [sendType, setSendType] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('2025-04-01');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  // UI state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.toRecipients) setToRecipients(parsed.toRecipients);
        if (parsed.ccRecipients) setCcRecipients(parsed.ccRecipients);
        if (parsed.bccRecipients) setBccRecipients(parsed.bccRecipients);
        if (parsed.replyTo !== undefined) setReplyTo(parsed.replyTo);
        if (parsed.customerContact !== undefined) setCustomerContact(parsed.customerContact);
        if (parsed.subject !== undefined) setSubject(parsed.subject);
        if (parsed.message !== undefined) setMessage(parsed.message);
        if (parsed.attachPdf !== undefined) setAttachPdf(parsed.attachPdf);
        if (parsed.attachStatement !== undefined) setAttachStatement(parsed.attachStatement);
        if (parsed.includePaymentLink !== undefined) setIncludePaymentLink(parsed.includePaymentLink);
        if (parsed.includeTerms !== undefined) setIncludeTerms(parsed.includeTerms);
        if (parsed.saveAsDefault !== undefined) setSaveAsDefault(parsed.saveAsDefault);
        if (parsed.sendCopyToInternal !== undefined) setSendCopyToInternal(parsed.sendCopyToInternal);
        if (parsed.sendType !== undefined) setSendType(parsed.sendType);
        if (parsed.scheduleDate !== undefined) setScheduleDate(parsed.scheduleDate);
        if (parsed.scheduleTime !== undefined) setScheduleTime(parsed.scheduleTime);
      }
    } catch (e) {
      console.error('Failed to load saved form data:', e);
    }
  }, []);

  // Save to LocalStorage helper
  const saveFormData = (override?: Partial<any>) => {
    try {
      const data = {
        toRecipients,
        ccRecipients,
        bccRecipients,
        replyTo,
        customerContact,
        subject,
        message,
        attachPdf,
        attachStatement,
        includePaymentLink,
        includeTerms,
        saveAsDefault,
        sendCopyToInternal,
        sendType,
        scheduleDate,
        scheduleTime,
        ...override
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setIsSavedFeedback(true);
      setTimeout(() => setIsSavedFeedback(false), 2000);
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  // Auto-save on field changes
  useEffect(() => {
    const handler = setTimeout(() => {
      saveFormData();
    }, 600);
    return () => clearTimeout(handler);
  }, [
    toRecipients,
    ccRecipients,
    bccRecipients,
    replyTo,
    customerContact,
    subject,
    message,
    attachPdf,
    attachStatement,
    includePaymentLink,
    includeTerms,
    saveAsDefault,
    sendCopyToInternal,
    sendType,
    scheduleDate,
    scheduleTime
  ]);

  const removeToRecipient = (id: string) => {
    setToRecipients(prev => prev.filter(r => r.id !== id));
  };

  const removeCcRecipient = (id: string) => {
    setCcRecipients(prev => prev.filter(r => r.id !== id));
  };

  const removeBccRecipient = (id: string) => {
    setBccRecipients(prev => prev.filter(r => r.id !== id));
  };

  const addToRecipient = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && toInput.trim()) {
      e.preventDefault();
      const newRec: Recipient = {
        id: Date.now().toString(),
        name: toInput.trim(),
        email: toInput.trim(),
        initials: toInput.trim().substring(0, 2).toUpperCase()
      };
      setToRecipients(prev => [...prev, newRec]);
      setToInput('');
    }
  };

  const addCcRecipient = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ccInput.trim()) {
      e.preventDefault();
      const newRec: Recipient = {
        id: Date.now().toString(),
        name: ccInput.trim(),
        email: ccInput.trim(),
        initials: ccInput.trim().substring(0, 2).toUpperCase()
      };
      setCcRecipients(prev => [...prev, newRec]);
      setCcInput('');
    }
  };

  const addBccRecipient = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && bccInput.trim()) {
      e.preventDefault();
      const newRec: Recipient = {
        id: Date.now().toString(),
        name: bccInput.trim(),
        email: bccInput.trim(),
        initials: bccInput.trim().substring(0, 2).toUpperCase()
      };
      setBccRecipients(prev => [...prev, newRec]);
      setBccInput('');
    }
  };

  return (
    <div style={{ padding: '24px 32px', background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      
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

      {/* ── BREADCRUMB & HEADER ── */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '8px' }}>
          <Link href="/dashboard" style={{ color: '#64748B', display: 'flex', alignItems: 'center' }}>
            <House size={16} />
          </Link>
          <CaretRight size={12} />
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <CaretRight size={12} />
          <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding & Company Identity</Link>
          <CaretRight size={12} />
          <span style={{ color: '#0F172A', fontWeight: 600 }}>Send Invoice</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB',
              marginTop: '2px'
            }}>
              <EnvelopeSimple size={22} weight="bold" />
            </div>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                Send Invoice
              </h1>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
                Create and send your invoice to the customer via email with optional attachments and a payment link.
              </p>
            </div>
          </div>

          {/* Auto-save indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: isSavedFeedback ? '#059669' : '#94A3B8' }}>
            {isSavedFeedback ? (
              <>
                <Check size={14} weight="bold" color="#059669" />
                <span style={{ fontWeight: 600 }}>All changes saved locally</span>
              </>
            ) : (
              <span>Autosave active</span>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN TWO-COLUMN WORKSPACE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 1.7fr) minmax(380px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: EMAIL DETAILS, OPTIONS, SEND CONTROLS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Email Details Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 20px 0' }}>
              Email Details
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* To field */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  To <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: '#FFFFFF',
                  minHeight: '42px'
                }}>
                  {toRecipients.map(r => (
                    <div key={r.id} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      borderRadius: '999px',
                      padding: '3px 10px 3px 4px',
                      fontSize: '12px'
                    }}>
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#8B5CF6',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {r.initials}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#0F172A', lineHeight: 1.1 }}>{r.name}</span>
                        <span style={{ fontSize: '10.5px', color: '#64748B', lineHeight: 1.1 }}>{r.email}</span>
                      </div>
                      <button 
                        onClick={() => removeToRecipient(r.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '0 2px' }}
                      >
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}
                  
                  <input 
                    type="text"
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                    onKeyDown={addToRecipient}
                    placeholder={toRecipients.length === 0 ? "Add recipient..." : "Add another recipient..."}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '12.5px',
                      color: '#0F172A',
                      flex: 1,
                      minWidth: '140px',
                      padding: '4px'
                    }}
                  />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    <CaretDown size={14} color="#94A3B8" />
                    <button 
                      onClick={() => showToast('Select from contacts list opened')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0284C7',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <UsersThree size={15} />
                      <span>Select from contacts</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Cc field */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Cc
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: '#FFFFFF',
                  minHeight: '42px'
                }}>
                  {ccRecipients.map(r => (
                    <div key={r.id} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      borderRadius: '999px',
                      padding: '3px 10px 3px 4px',
                      fontSize: '12px'
                    }}>
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#0284C7',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {r.initials}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#0F172A', lineHeight: 1.1 }}>{r.name}</span>
                        <span style={{ fontSize: '10.5px', color: '#64748B', lineHeight: 1.1 }}>{r.email}</span>
                      </div>
                      <button 
                        onClick={() => removeCcRecipient(r.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '0 2px' }}
                      >
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}

                  <input 
                    type="text"
                    value={ccInput}
                    onChange={(e) => setCcInput(e.target.value)}
                    onKeyDown={addCcRecipient}
                    placeholder={ccRecipients.length === 0 ? "Add Cc recipient..." : "Add another recipient..."}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '12.5px',
                      color: '#0F172A',
                      flex: 1,
                      minWidth: '140px',
                      padding: '4px'
                    }}
                  />

                  <CaretDown size={14} color="#94A3B8" />
                </div>
              </div>

              {/* Bcc field */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Bcc
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: '#FFFFFF',
                  minHeight: '42px'
                }}>
                  {bccRecipients.map(r => (
                    <div key={r.id} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#F1F5F9',
                      border: '1px solid #E2E8F0',
                      borderRadius: '999px',
                      padding: '3px 10px 3px 4px',
                      fontSize: '12px'
                    }}>
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#64748B',
                        color: '#FFFFFF',
                        fontSize: '10px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {r.initials}
                      </div>
                      <span style={{ fontWeight: 600, color: '#0F172A' }}>{r.email}</span>
                      <button 
                        onClick={() => removeBccRecipient(r.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
                      >
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}

                  <input 
                    type="text"
                    value={bccInput}
                    onChange={(e) => setBccInput(e.target.value)}
                    onKeyDown={addBccRecipient}
                    placeholder="Add Bcc recipients..."
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '12.5px',
                      color: '#0F172A',
                      flex: 1,
                      minWidth: '140px',
                      padding: '4px'
                    }}
                  />

                  <CaretDown size={14} color="#94A3B8" />
                </div>
              </div>

              {/* Reply to field */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Reply to
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  background: '#FFFFFF'
                }}>
                  <input 
                    type="text"
                    value={replyTo}
                    onChange={(e) => setReplyTo(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      color: '#0F172A',
                      width: '100%'
                    }}
                  />
                  <CaretDown size={14} color="#94A3B8" />
                </div>
              </div>

              {/* Customer Contact field with badge card */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Customer Contact
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '12px', alignItems: 'center' }}>
                  <div style={{
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#FFFFFF'
                  }}>
                    <select 
                      value={customerContact}
                      onChange={(e) => setCustomerContact(e.target.value)}
                      style={{
                        border: 'none',
                        outline: 'none',
                        fontSize: '13px',
                        color: '#0F172A',
                        background: 'transparent',
                        width: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      <option>Sarah Lawson (Finance Manager)</option>
                      <option>Mark Stevens (Operations Director)</option>
                      <option>James Wilson (Account Manager)</option>
                    </select>
                  </div>

                  {/* Attached profile pill badge */}
                  <div style={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: '#8B5CF6',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        fontSize: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        SL
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0F172A' }}>Sarah Lawson</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>Finance Manager</div>
                        <div style={{ fontSize: '11px', color: '#64748B' }}>ABC Solutions Ltd</div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', fontSize: '11px', color: '#64748B' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', color: '#0284C7' }}>
                        <EnvelopeSimple size={13} color="#64748B" />
                        <span>sarah.lawson@abcsolutions.co.uk</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '3px' }}>
                        <span>📞</span>
                        <span>+44 20 7123 4567</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Subject field */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Email Subject <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  background: '#FFFFFF'
                }}>
                  <input 
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      color: '#0F172A',
                      width: '100%',
                      fontWeight: 500
                    }}
                  />
                </div>
              </div>

              {/* Message field with rich text toolbar */}
              <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'start', gap: '12px', marginTop: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', paddingTop: '8px' }}>
                  Message <span style={{ color: '#EF4444' }}>*</span>
                </label>
                
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF' }}>
                  {/* Rich Text Toolbar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderBottom: '1px solid #E2E8F0',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569', cursor: 'pointer' }}>
                        <span>Paragraph</span>
                        <CaretDown size={12} />
                      </div>
                      <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextB size={15} weight="bold" /></button>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextItalic size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextUnderline size={15} /></button>
                      <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><ListBullets size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><ListNumbers size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextAlignLeft size={15} /></button>
                      <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><LinkIcon size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><ImageIcon size={15} /></button>
                      <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><Code size={15} /></button>
                    </div>

                    {/* Insert variable dropdown */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#0284C7', fontWeight: 600, cursor: 'pointer' }}
                      onClick={() => {
                        setMessage(prev => prev + ' {{payment_link}}');
                        showToast('Inserted {{payment_link}} placeholder');
                      }}
                    >
                      <span>Insert variable</span>
                      <CaretDown size={12} />
                    </div>
                  </div>

                  {/* Textarea */}
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: 'none',
                      outline: 'none',
                      fontSize: '13px',
                      lineHeight: '1.6',
                      color: '#0F172A',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Additional Options Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
              Additional Options
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 28px' }}>
              
              {/* Option 1: Attach invoice PDF */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={attachPdf}
                  onChange={(e) => setAttachPdf(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Attach invoice PDF</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>Include the invoice as a PDF attachment</div>
                </div>
              </label>

              {/* Option 2: Include standard terms */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includeTerms}
                  onChange={(e) => setIncludeTerms(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Include standard terms & conditions</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>Append your default terms and conditions</div>
                </div>
              </label>

              {/* Option 3: Attach customer statement */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={attachStatement}
                  onChange={(e) => setAttachStatement(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Attach customer statement</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>Include latest statement of account</div>
                </div>
              </label>

              {/* Option 4: Save as default message */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={saveAsDefault}
                  onChange={(e) => setSaveAsDefault(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Save as default message</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>Use this message as default for future invoices</div>
                </div>
              </label>

              {/* Option 5: Include payment link */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={includePaymentLink}
                  onChange={(e) => setIncludePaymentLink(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Include payment link</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>Add a secure online payment link in the email</div>
                </div>
              </label>

              {/* Option 6: Send a copy to internal team */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={sendCopyToInternal}
                  onChange={(e) => setSendCopyToInternal(e.target.checked)}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Send a copy to internal team</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>Send a copy to finance@yourcompany.co.uk</div>
                </div>
              </label>

            </div>
          </div>

          {/* Send Options Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 16px 0' }}>
              Send Options
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
              
              {/* Radio 1: Send now */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="sendType"
                  value="now"
                  checked={sendType === 'now'}
                  onChange={() => setSendType('now')}
                  style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Send now</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Send the email immediately</div>
                </div>
              </label>

              {/* Radio 2: Schedule send */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input 
                    type="radio" 
                    name="sendType"
                    value="schedule"
                    checked={sendType === 'schedule'}
                    onChange={() => setSendType('schedule')}
                    style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#006666', cursor: 'pointer' }}
                  />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Schedule send</div>
                    <div style={{ fontSize: '11.5px', color: '#64748B' }}>Choose a date and time to send</div>
                  </div>
                </label>

                {/* Date Picker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  background: '#FFFFFF',
                  opacity: sendType === 'schedule' ? 1 : 0.6
                }}>
                  <Calendar size={14} color="#64748B" />
                  <input 
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    disabled={sendType !== 'schedule'}
                    style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', background: 'transparent' }}
                  />
                </div>

                {/* Time Picker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '6px 10px',
                  fontSize: '12px',
                  background: '#FFFFFF',
                  opacity: sendType === 'schedule' ? 1 : 0.6
                }}>
                  <Clock size={14} color="#64748B" />
                  <input 
                    type="text"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    disabled={sendType !== 'schedule'}
                    style={{ border: 'none', outline: 'none', fontSize: '12px', color: '#0F172A', width: '45px', background: 'transparent' }}
                  />
                  <CaretDown size={12} color="#64748B" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ════ RIGHT COLUMN: INVOICE PREVIEW & DOCUMENT SUMMARY & ACTIONS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Invoice Preview Thumbnail */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Invoice Preview
              </h3>
              <button 
                onClick={() => setIsPreviewOpen(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <ArrowSquareOut size={14} />
                <span>Open in new tab</span>
              </button>
            </div>

            {/* Thumbnail Canvas Representation */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '18px 20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              fontSize: '11px',
              lineHeight: 1.4,
              color: '#334155'
            }}>
              {/* Header inside preview */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                    <Buildings size={16} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A' }}>Your Company Ltd</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>INVOICE</div>
                  <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px' }}>Invoice No: <span style={{ color: '#0F172A', fontWeight: 600 }}>INV-2025-0042</span></div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>Issue Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>01 Apr 2025</span></div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>Due Date: <span style={{ color: '#0F172A', fontWeight: 600 }}>30 Apr 2025</span></div>
                </div>
              </div>

              {/* Client address */}
              <div style={{ marginBottom: '14px', fontSize: '10.5px', color: '#64748B' }}>
                <div style={{ fontWeight: 700, color: '#0F172A' }}>ABC Solutions Ltd</div>
                <div>123 Business Park</div>
                <div>London</div>
                <div>SW1A 1AA</div>
                <div>United Kingdom</div>
              </div>

              {/* Items table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #CBD5E1', textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '4px 0', fontWeight: 600 }}>Description</th>
                    <th style={{ padding: '4px 0', textAlign: 'center', fontWeight: 600 }}>Qty</th>
                    <th style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>Unit Price</th>
                    <th style={{ padding: '4px 0', textAlign: 'right', fontWeight: 600 }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '6px 0', color: '#0F172A' }}>Website Redesign</td>
                    <td style={{ padding: '6px 0', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '6px 0', textAlign: 'right' }}>£5,000.00</td>
                    <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£5,000.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '6px 0', color: '#0F172A' }}>Ongoing Support (Monthly)</td>
                    <td style={{ padding: '6px 0', textAlign: 'center' }}>3</td>
                    <td style={{ padding: '6px 0', textAlign: 'right' }}>£500.00</td>
                    <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£1,500.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '6px 0', color: '#0F172A' }}>Training & Onboarding</td>
                    <td style={{ padding: '6px 0', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '6px 0', textAlign: 'right' }}>£750.00</td>
                    <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 600 }}>£750.00</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', fontSize: '10.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                  <span>Subtotal</span>
                  <span>£7,250.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', color: '#64748B' }}>
                  <span>VAT (20%)</span>
                  <span>£1,450.00</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '130px', fontWeight: 800, color: '#0F172A', fontSize: '12px', borderTop: '1px solid #E2E8F0', paddingTop: '4px', marginTop: '2px' }}>
                  <span>Total</span>
                  <span>£8,700.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Document Summary */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Document Summary
              </h3>
              <button 
                onClick={() => showToast('Navigating to Invoice Editor...')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <PencilSimple size={14} />
                <span>Edit Invoice</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Invoice Number</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>INV-2025-0042</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Customer</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>ABC Solutions Ltd</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Invoice Amount</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>£8,700.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Due Date</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>
                  30 Apr 2025 <span style={{ color: '#16A34A', fontSize: '11.5px', fontWeight: 500 }}>(in 29 days)</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Template</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Standard Invoice</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748B' }}>Attachments</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#0F172A', fontWeight: 500 }}>
                  <FilePdf size={14} color="#64748B" />
                  <span>2 files (Invoice PDF, Statement)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Selected Contacts */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Selected Contacts
              </h3>
              <button 
                onClick={() => showToast('Edit contact selection modal')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <PencilSimple size={14} />
                <span>Edit</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#8B5CF6',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  SL
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '13px' }}>Sarah Lawson</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B' }}>Finance Manager</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>sarah.lawson@abcsolutions.co.uk</div>
                </div>
              </div>

              <span style={{
                background: '#E0F2FE',
                color: '#0284C7',
                padding: '2px 8px',
                borderRadius: '999px',
                fontSize: '11px',
                fontWeight: 600
              }}>
                Primary
              </span>
            </div>
          </div>

          {/* Card 4: Recent Delivery Activity */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Recent Delivery Activity
              </h3>
              <button 
                onClick={() => showToast('Full delivery logs view')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View all
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#E0F2FE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0284C7',
                  flexShrink: 0
                }}>
                  <EnvelopeSimple size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Draft created</div>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>Invoice ready to be sent</div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11.5px', color: '#64748B' }}>01 Apr 2025, 10:24</div>
                <div style={{ fontSize: '11px', color: '#94A3B8' }}>John Doe</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            paddingTop: '6px'
          }}>
            <button 
              onClick={() => showToast('Action cancelled')}
              style={{
                padding: '9px 16px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button 
              onClick={() => setIsPreviewOpen(true)}
              style={{
                padding: '9px 16px',
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#2563EB',
                cursor: 'pointer'
              }}
            >
              Preview email
            </button>

            <button 
              onClick={() => {
                saveFormData();
                showToast('Draft successfully saved with all filled details!');
              }}
              style={{
                padding: '9px 16px',
                background: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              Save draft
            </button>

            <button 
              onClick={() => {
                saveFormData();
                showToast(sendType === 'now' 
                  ? 'Invoice INV-2025-0042 sent successfully to Sarah Lawson!' 
                  : `Invoice scheduled to send on ${scheduleDate} at ${scheduleTime}!`
                );
              }}
              style={{
                padding: '9px 20px',
                background: '#006666',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <PaperPlaneTilt size={16} weight="bold" />
              <span>Send invoice</span>
            </button>
          </div>

        </div>

      </div>

      {/* ── EMAIL PREVIEW MODAL ── */}
      {isPreviewOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(3px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            width: '680px',
            maxWidth: '92%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '18px 24px',
              borderBottom: '1px solid #E2E8F0',
              background: '#F8FAFC'
            }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Email Preview
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
                  This is how the email will look to your recipient.
                </p>
              </div>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Email Message Content Body */}
            <div style={{ padding: '24px', overflowY: 'auto', flex: 1, fontSize: '13px', lineHeight: '1.6', color: '#0F172A' }}>
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px 16px', marginBottom: '18px', fontSize: '12px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#64748B', width: '60px' }}>From:</span>
                  <span style={{ fontWeight: 600 }}>Your Company &lt;{replyTo}&gt;</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#64748B', width: '60px' }}>To:</span>
                  <span style={{ fontWeight: 600 }}>{toRecipients.map(r => `${r.name} <${r.email}>`).join(', ')}</span>
                </div>
                {ccRecipients.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#64748B', width: '60px' }}>Cc:</span>
                    <span>{ccRecipients.map(r => `${r.name} <${r.email}>`).join(', ')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#64748B', width: '60px' }}>Subject:</span>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>{subject}</span>
                </div>
              </div>

              {/* Render dynamic message replacing placeholders */}
              <div style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
                {message
                  .replace(/\{\{contact_name\}\}/g, 'Sarah Lawson')
                  .replace(/\{\{invoice_number\}\}/g, 'INV-2025-0042')
                  .replace(/\{\{invoice_amount\}\}/g, '£8,700.00')}
              </div>

              {/* Payment Link Card if enabled */}
              {includePaymentLink && (
                <div style={{
                  background: '#ECFDF5',
                  border: '1px solid #A7F3D0',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#065F46' }}>Pay Online Securely</div>
                    <div style={{ fontSize: '12px', color: '#047857' }}>Card, Bank Transfer, or Apple Pay</div>
                  </div>
                  <button style={{
                    padding: '8px 16px',
                    background: '#059669',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontSize: '12.5px',
                    cursor: 'pointer'
                  }}>
                    Pay £8,700.00
                  </button>
                </div>
              )}

              {/* Attachments preview */}
              <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', marginBottom: '8px' }}>
                  Attachments ({attachPdf ? (attachStatement ? '2' : '1') : (attachStatement ? '1' : '0')})
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {attachPdf && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      <FilePdf size={16} color="#DC2626" weight="fill" />
                      <span>INV-2025-0042.pdf (184 KB)</span>
                    </div>
                  )}
                  {attachStatement && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 12px',
                      background: '#F1F5F9',
                      border: '1px solid #CBD5E1',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      <FilePdf size={16} color="#DC2626" weight="fill" />
                      <span>Statement_Apr2025.pdf (92 KB)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              padding: '14px 24px',
              borderTop: '1px solid #E2E8F0',
              background: '#F8FAFC'
            }}>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                style={{
                  padding: '8px 16px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Close preview
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
