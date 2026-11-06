'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  EnvelopeSimple,
  CaretRight,
  CaretDown,
  PaperPlaneTilt,
  FloppyDisk,
  FilePdf,
  Plus,
  X,
  TextB,
  TextItalic,
  TextUnderline,
  ListBullets,
  ListNumbers,
  TextAlignLeft,
  Link as LinkIcon,
  Code,
  Calendar,
  Clock,
  DownloadSimple,
  ClockCounterClockwise,
  CheckCircle,
  DeviceMobile,
  Desktop,
  FileDoc,
  FileXls,
  Check
} from '@phosphor-icons/react';

interface RecipientTag {
  id: string;
  email: string;
}

interface AttachedDoc {
  id: string;
  name: string;
  size: string;
  type: 'pdf' | 'doc' | 'xls';
}

const STORAGE_KEY = 'tessma_send_invoice_email_v2';

export default function SendInvoiceEmailPage() {
  // Recipients
  const [toRecipients, setToRecipients] = useState<RecipientTag[]>([
    { id: '1', email: 'sarah.clarke@abc-ltd.co.uk' }
  ]);
  const [toInput, setToInput] = useState('');

  const [ccRecipients, setCcRecipients] = useState<RecipientTag[]>([
    { id: '2', email: 'accounts@abc-ltd.co.uk' }
  ]);
  const [ccInput, setCcInput] = useState('');

  const [bccRecipients, setBccRecipients] = useState<RecipientTag[]>([]);
  const [bccInput, setBccInput] = useState('');

  // Dropdowns / inputs
  const [fromAddress, setFromAddress] = useState('finance@tessmaone.co.uk (TESSMA ONE Finance)');
  const [replyTo, setReplyTo] = useState('sarah.clarke@tessmaone.co.uk');
  const [emailTemplate, setEmailTemplate] = useState('Invoice - Standard');
  const [subject, setSubject] = useState('Invoice INV-2025-0423 from TESSMA ONE');
  const [message, setMessage] = useState(
`Dear Sarah,

Please find attached invoice INV-2025-0423 for £16,320.00.

Payment is due by 15 May 2025 (Net 30). You can find the full invoice details in the attached PDF.

Thank you for your continued business. If you have any questions, please don't hesitate to get in touch.

Kind regards,
John Doe
TESSMA ONE Finance Team`
  );

  // Attachments
  const [attachments, setAttachments] = useState<AttachedDoc[]>([
    { id: '1', name: 'INV-2025-0423.pdf', size: '245 KB', type: 'pdf' },
    { id: '2', name: 'Project acceptance certificate.pdf', size: '1.2 MB', type: 'doc' },
    { id: '3', name: 'Detailed breakdown.xlsx', size: '340 KB', type: 'xls' }
  ]);

  // Delivery options
  const [deliveryType, setDeliveryType] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('2025-05-01');
  const [scheduleTime, setScheduleTime] = useState('09:00');

  // Toggle switches
  const [sendMeCopy, setSendMeCopy] = useState(true);
  const [requestReadReceipt, setRequestReadReceipt] = useState(false);
  const [saveAsDefault, setSaveAsDefault] = useState(false);

  // Preview device mode
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // UI toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSavedFeedback, setIsSavedFeedback] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load saved state from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.toRecipients) setToRecipients(parsed.toRecipients);
        if (parsed.ccRecipients) setCcRecipients(parsed.ccRecipients);
        if (parsed.bccRecipients) setBccRecipients(parsed.bccRecipients);
        if (parsed.fromAddress) setFromAddress(parsed.fromAddress);
        if (parsed.replyTo) setReplyTo(parsed.replyTo);
        if (parsed.emailTemplate) setEmailTemplate(parsed.emailTemplate);
        if (parsed.subject) setSubject(parsed.subject);
        if (parsed.message) setMessage(parsed.message);
        if (parsed.deliveryType) setDeliveryType(parsed.deliveryType);
        if (parsed.scheduleDate) setScheduleDate(parsed.scheduleDate);
        if (parsed.scheduleTime) setScheduleTime(parsed.scheduleTime);
        if (parsed.sendMeCopy !== undefined) setSendMeCopy(parsed.sendMeCopy);
        if (parsed.requestReadReceipt !== undefined) setRequestReadReceipt(parsed.requestReadReceipt);
        if (parsed.saveAsDefault !== undefined) setSaveAsDefault(parsed.saveAsDefault);
      }
    } catch (e) {
      console.error('Failed to load from storage:', e);
    }
  }, []);

  // Save to LocalStorage
  const saveFormData = (customMsg?: string) => {
    try {
      const payload = {
        toRecipients,
        ccRecipients,
        bccRecipients,
        fromAddress,
        replyTo,
        emailTemplate,
        subject,
        message,
        deliveryType,
        scheduleDate,
        scheduleTime,
        sendMeCopy,
        requestReadReceipt,
        saveAsDefault
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setIsSavedFeedback(true);
      setTimeout(() => setIsSavedFeedback(false), 2000);
      if (customMsg) showToast(customMsg);
    } catch (e) {
      console.error('Failed to save to storage:', e);
    }
  };

  // Auto-save on change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveFormData();
    }, 600);
    return () => clearTimeout(timer);
  }, [
    toRecipients,
    ccRecipients,
    bccRecipients,
    fromAddress,
    replyTo,
    emailTemplate,
    subject,
    message,
    deliveryType,
    scheduleDate,
    scheduleTime,
    sendMeCopy,
    requestReadReceipt,
    saveAsDefault
  ]);

  const removeTo = (id: string) => setToRecipients(prev => prev.filter(r => r.id !== id));
  const removeCc = (id: string) => setCcRecipients(prev => prev.filter(r => r.id !== id));
  const removeBcc = (id: string) => setBccRecipients(prev => prev.filter(r => r.id !== id));
  const removeAttachment = (id: string) => setAttachments(prev => prev.filter(a => a.id !== id));

  const handleAddTo = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && toInput.trim()) {
      e.preventDefault();
      setToRecipients(prev => [...prev, { id: Date.now().toString(), email: toInput.trim() }]);
      setToInput('');
    }
  };

  const handleAddCc = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && ccInput.trim()) {
      e.preventDefault();
      setCcRecipients(prev => [...prev, { id: Date.now().toString(), email: ccInput.trim() }]);
      setCcInput('');
    }
  };

  const handleAddBcc = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && bccInput.trim()) {
      e.preventDefault();
      setBccRecipients(prev => [...prev, { id: Date.now().toString(), email: bccInput.trim() }]);
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

      {/* ── BREADCRUMB & HEADER ROW ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B', marginBottom: '6px' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <CaretRight size={12} />
            <Link href="/finance/sales-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Sales</Link>
            <CaretRight size={12} />
            <Link href="/finance/sales-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Invoice INV-2025-0423</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>Send invoice</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Send invoice
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Send invoice INV-2025-0423 to your customer via email with attached documents.
          </p>
        </div>

        {/* Top Header Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Action cancelled')}
            style={{
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
            Cancel
          </button>

          <button 
            onClick={() => saveFormData('Draft saved successfully!')}
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
            <FloppyDisk size={16} />
            <span>Save draft</span>
          </button>

          <button 
            onClick={() => {
              saveFormData();
              showToast(deliveryType === 'now' 
                ? 'Invoice INV-2025-0423 sent successfully!' 
                : `Invoice scheduled to send on ${scheduleDate} at ${scheduleTime}!`
              );
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              background: '#006666',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <PaperPlaneTilt size={16} weight="bold" />
            <span>Send invoice</span>
          </button>
        </div>
      </div>

      {/* ── MAIN WORKSPACE: 2 COLUMNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(620px, 1.45fr) minmax(440px, 1fr)', gap: '24px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: EMAIL DETAILS, ATTACHMENTS & DELIVERY OPTIONS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Email Details Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
            
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#ECFDF5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#059669',
                marginTop: '1px'
              }}>
                <EnvelopeSimple size={18} weight="bold" />
              </div>
              <div>
                <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Email details
                </h2>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Compose and send invoice INV-2025-0423 to your customer.
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* To field */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  To <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: '#FFFFFF',
                  minHeight: '40px'
                }}>
                  {toRecipients.map(r => (
                    <div key={r.id} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '12px',
                      color: '#1D4ED8',
                      fontWeight: 500
                    }}>
                      <span>{r.email}</span>
                      <button 
                        onClick={() => removeTo(r.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#60A5FA', padding: 0, display: 'flex' }}
                      >
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}
                  <input 
                    type="text"
                    value={toInput}
                    onChange={(e) => setToInput(e.target.value)}
                    onKeyDown={handleAddTo}
                    placeholder="Add recipient..."
                    style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', flex: 1, minWidth: '120px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', fontSize: '12px', color: '#0284C7', fontWeight: 600 }}>
                    <span style={{ cursor: 'pointer' }}>Cc</span>
                    <span style={{ cursor: 'pointer' }}>Bcc</span>
                  </div>
                </div>
              </div>

              {/* CC field */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  CC
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: '#FFFFFF',
                  minHeight: '40px'
                }}>
                  {ccRecipients.map(r => (
                    <div key={r.id} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '12px',
                      color: '#1D4ED8',
                      fontWeight: 500
                    }}>
                      <span>{r.email}</span>
                      <button 
                        onClick={() => removeCc(r.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#60A5FA', padding: 0, display: 'flex' }}
                      >
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}
                  <input 
                    type="text"
                    value={ccInput}
                    onChange={(e) => setCcInput(e.target.value)}
                    onKeyDown={handleAddCc}
                    placeholder="Add recipient..."
                    style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', flex: 1, minWidth: '120px' }}
                  />
                </div>
              </div>

              {/* BCC field */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  BCC
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '8px',
                  background: '#FFFFFF',
                  minHeight: '40px'
                }}>
                  {bccRecipients.map(r => (
                    <div key={r.id} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '6px',
                      padding: '3px 8px',
                      fontSize: '12px',
                      color: '#1D4ED8',
                      fontWeight: 500
                    }}>
                      <span>{r.email}</span>
                      <button 
                        onClick={() => removeBcc(r.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#60A5FA', padding: 0, display: 'flex' }}
                      >
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}
                  <input 
                    type="text"
                    value={bccInput}
                    onChange={(e) => setBccInput(e.target.value)}
                    onKeyDown={handleAddBcc}
                    placeholder="Add recipient..."
                    style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', flex: 1, minWidth: '120px' }}
                  />
                </div>
              </div>

              {/* From field */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  From <span style={{ color: '#EF4444' }}>*</span>
                </label>
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
                    value={fromAddress}
                    onChange={(e) => setFromAddress(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                  >
                    <option>finance@tessmaone.co.uk (TESSMA ONE Finance)</option>
                    <option>billing@tessmaone.co.uk (TESSMA ONE Billing)</option>
                  </select>
                </div>
              </div>

              {/* Reply to field */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Reply to
                </label>
                <div style={{
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#FFFFFF'
                }}>
                  <input 
                    type="text"
                    value={replyTo}
                    onChange={(e) => setReplyTo(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#0F172A', width: '100%' }}
                  />
                  <CaretDown size={14} color="#94A3B8" />
                </div>
              </div>

              {/* Email template */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Email template
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#FFFFFF',
                    flex: 1
                  }}>
                    <FilePdf size={16} color="#64748B" />
                    <select 
                      value={emailTemplate}
                      onChange={(e) => setEmailTemplate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>Invoice - Standard</option>
                      <option>Invoice - Overdue Reminder</option>
                      <option>Invoice - Gentle Notice</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => showToast('Manage templates modal')}
                    style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12.5px', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    Manage templates
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  Subject <span style={{ color: '#EF4444' }}>*</span>
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
                    style={{ border: 'none', outline: 'none', fontSize: '13px', color: '#0F172A', width: '100%', fontWeight: 500 }}
                  />
                </div>
              </div>

              {/* Message */}
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'start', gap: '12px', marginTop: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', paddingTop: '8px' }}>
                  Message <span style={{ color: '#EF4444' }}>*</span>
                </label>
                
                <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', overflow: 'hidden', background: '#FFFFFF' }}>
                  {/* Rich Text Toolbar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 12px',
                    borderBottom: '1px solid #E2E8F0',
                    background: '#F8FAFC'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569', cursor: 'pointer' }}>
                      <span>Inter</span>
                      <CaretDown size={12} />
                    </div>
                    <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569', cursor: 'pointer' }}>
                      <span>Normal</span>
                      <CaretDown size={12} />
                    </div>
                    <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextB size={15} weight="bold" /></button>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextItalic size={15} /></button>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextUnderline size={15} /></button>
                    <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><ListBullets size={15} /></button>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><ListNumbers size={15} /></button>
                    <div style={{ width: '1px', height: '16px', background: '#CBD5E1' }}></div>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><TextAlignLeft size={15} /></button>
                    <button style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}><LinkIcon size={15} /></button>
                    <button 
                      onClick={() => {
                        setMessage(prev => prev + ' {payment_link}');
                        showToast('Inserted placeholder');
                      }}
                      style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', padding: '2px' }}
                    >
                      <Code size={15} />
                    </button>
                  </div>

                  {/* Message body */}
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={10}
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

          {/* Attachments Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ color: '#059669', display: 'flex' }}>
                  <EnvelopeSimple size={18} weight="bold" />
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Attachments
                  </h3>
                  <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '1px' }}>
                    The invoice PDF will always be attached. You can add additional supporting documents if required.
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  const newDoc: AttachedDoc = {
                    id: Date.now().toString(),
                    name: 'Supplementary_Doc.pdf',
                    size: '120 KB',
                    type: 'pdf'
                  };
                  setAttachments(prev => [...prev, newDoc]);
                  showToast('Document attached');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#0284C7',
                  cursor: 'pointer'
                }}
              >
                <Plus size={13} weight="bold" />
                <span>Add document</span>
              </button>
            </div>

            {/* Attachments Pill Cards */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {attachments.map(att => (
                <div key={att.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '12px'
                }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    background: att.type === 'pdf' ? '#FEE2E2' : (att.type === 'doc' ? '#DBEAFE' : '#DCFCE7'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: att.type === 'pdf' ? '#DC2626' : (att.type === 'doc' ? '#2563EB' : '#16A34A')
                  }}>
                    {att.type === 'pdf' && <FilePdf size={16} weight="fill" />}
                    {att.type === 'doc' && <FileDoc size={16} weight="fill" />}
                    {att.type === 'xls' && <FileXls size={16} weight="fill" />}
                  </div>

                  <div>
                    <div style={{ fontWeight: 600, color: '#0F172A' }}>{att.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>{att.size}</div>
                  </div>

                  <button 
                    onClick={() => removeAttachment(att.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px' }}
                  >
                    <X size={13} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Options Card */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <PaperPlaneTilt size={16} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Delivery options
              </h3>
            </div>

            {/* Radio Selectors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
              
              {/* Send Now Card */}
              <div 
                onClick={() => setDeliveryType('now')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: deliveryType === 'now' ? '2px solid #006666' : '1px solid #E2E8F0',
                  background: deliveryType === 'now' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid #006666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {deliveryType === 'now' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#006666' }} />}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Send now</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Send the invoice immediately</div>
                </div>
              </div>

              {/* Schedule Send Card */}
              <div 
                onClick={() => setDeliveryType('schedule')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: deliveryType === 'schedule' ? '2px solid #006666' : '1px solid #E2E8F0',
                  background: deliveryType === 'schedule' ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  flex: 1.5
                }}
              >
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  border: '2px solid #94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {deliveryType === 'schedule' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#006666' }} />}
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Schedule send</div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>Choose a date and time</div>
                </div>

                {/* Date Picker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  background: '#FFFFFF',
                  marginLeft: 'auto'
                }}>
                  <Calendar size={13} color="#64748B" />
                  <input 
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    disabled={deliveryType !== 'schedule'}
                    style={{ border: 'none', outline: 'none', fontSize: '11.5px', color: '#0F172A', background: 'transparent' }}
                  />
                </div>

                {/* Time Picker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  background: '#FFFFFF'
                }}>
                  <Clock size={13} color="#64748B" />
                  <input 
                    type="text"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    disabled={deliveryType !== 'schedule'}
                    style={{ border: 'none', outline: 'none', fontSize: '11.5px', color: '#0F172A', width: '38px', background: 'transparent' }}
                  />
                </div>
              </div>

            </div>

            {/* Three Toggle Switches */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              
              {/* Toggle 1: Send me a copy */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div 
                  onClick={() => setSendMeCopy(!sendMeCopy)}
                  style={{
                    width: '38px',
                    height: '20px',
                    borderRadius: '999px',
                    background: sendMeCopy ? '#006666' : '#CBD5E1',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    marginTop: '2px',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: sendMeCopy ? '20px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Send me a copy</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>Receive a copy of this email at john.doe@tessmaone.co.uk</div>
                </div>
              </div>

              {/* Toggle 2: Request read receipt */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div 
                  onClick={() => setRequestReadReceipt(!requestReadReceipt)}
                  style={{
                    width: '38px',
                    height: '20px',
                    borderRadius: '999px',
                    background: requestReadReceipt ? '#006666' : '#CBD5E1',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    marginTop: '2px',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: requestReadReceipt ? '20px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Request read receipt</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>Ask the recipient to confirm when they have read this email</div>
                </div>
              </div>

              {/* Toggle 3: Save as default message */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <div 
                  onClick={() => setSaveAsDefault(!saveAsDefault)}
                  style={{
                    width: '38px',
                    height: '20px',
                    borderRadius: '999px',
                    background: saveAsDefault ? '#006666' : '#CBD5E1',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    marginTop: '2px',
                    flexShrink: 0
                  }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    top: '2px',
                    left: saveAsDefault ? '20px' : '2px',
                    transition: 'left 0.2s'
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>Save as default message</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px' }}>Use this message as the default for future invoices</div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ════ RIGHT COLUMN: EMAIL PREVIEW (DESKTOP/MOBILE), ATTACHED DOCS & DELIVERY HISTORY ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Email Preview */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvelopeSimple size={16} color="#059669" weight="bold" />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Email preview
                  </h3>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    This is how the email will look to the recipient.
                  </div>
                </div>
              </div>

              {/* Desktop / Mobile Switcher */}
              <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '6px', padding: '2px' }}>
                <button 
                  onClick={() => setPreviewDevice('desktop')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '5px',
                    border: 'none',
                    background: previewDevice === 'desktop' ? '#FFFFFF' : 'transparent',
                    color: previewDevice === 'desktop' ? '#0F172A' : '#64748B',
                    fontWeight: 600,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    boxShadow: previewDevice === 'desktop' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <Desktop size={14} />
                  <span>Desktop</span>
                </button>
                <button 
                  onClick={() => setPreviewDevice('mobile')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '5px',
                    border: 'none',
                    background: previewDevice === 'mobile' ? '#FFFFFF' : 'transparent',
                    color: previewDevice === 'mobile' ? '#0F172A' : '#64748B',
                    fontWeight: 600,
                    fontSize: '11.5px',
                    cursor: 'pointer',
                    boxShadow: previewDevice === 'mobile' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  <DeviceMobile size={14} />
                  <span>Mobile</span>
                </button>
              </div>
            </div>

            {/* Simulated Email Container */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '16px 20px',
              fontSize: '12px',
              color: '#334155',
              maxWidth: previewDevice === 'mobile' ? '340px' : '100%',
              margin: '0 auto',
              transition: 'all 0.3s'
            }}>
              {/* Email metadata header */}
              <div style={{ borderBottom: '1px solid #F1F5F9', paddingBottom: '12px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11.5px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#64748B', width: '55px' }}>From:</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>TESSMA ONE Finance &lt;finance@tessmaone.co.uk&gt;</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#64748B', width: '55px' }}>To:</span>
                  <span style={{ color: '#0F172A' }}>{toRecipients.map(r => r.email).join(', ') || 'recipient@domain.com'}</span>
                </div>
                {ccRecipients.length > 0 && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#64748B', width: '55px' }}>Cc:</span>
                    <span style={{ color: '#0F172A' }}>{ccRecipients.map(r => r.email).join(', ')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#64748B', width: '55px' }}>Subject:</span>
                  <span style={{ fontWeight: 600, color: '#0F172A' }}>{subject}</span>
                </div>
              </div>

              {/* TESSMA ONE BRANDING LOGO */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#009A96',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <div style={{ width: '12px', height: '12px', border: '2.5px solid #FFFFFF', transform: 'rotate(45deg)' }} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.04em' }}>TESSMA</div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#009A96', marginTop: '-2px' }}>ONE</div>
                </div>
              </div>

              {/* Dynamic Email Body */}
              <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '12px', color: '#1E293B', marginBottom: '24px' }}>
                {message}
              </div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px', fontSize: '10.5px', color: '#94A3B8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#64748B' }}>TESSMA ONE</div>
                  <div>Smarter business management for professional services</div>
                </div>
                <span style={{ color: '#0284C7' }}>www.tessmaone.co.uk</span>
              </div>

            </div>
          </div>

          {/* Card 2: Attached Documents (2) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <EnvelopeSimple size={16} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Attached documents ({attachments.length})
                </h3>
              </div>
              <button 
                onClick={() => showToast('Downloading all attachments in a zip...')}
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
                <DownloadSimple size={14} />
                <span>Download all</span>
              </button>
            </div>

            {/* Document preview tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              
              {/* Tile 1 */}
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#FFFFFF'
              }}>
                <div style={{
                  width: '32px',
                  height: '40px',
                  borderRadius: '4px',
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#DC2626'
                }}>
                  <FilePdf size={20} weight="fill" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    INV-2025-0423.pdf
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>245 KB</div>
                </div>
                <button 
                  onClick={() => showToast('Downloading INV-2025-0423.pdf')}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                >
                  <DownloadSimple size={15} />
                </button>
              </div>

              {/* Tile 2 */}
              <div style={{
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#FFFFFF'
              }}>
                <div style={{
                  width: '32px',
                  height: '40px',
                  borderRadius: '4px',
                  background: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB'
                }}>
                  <FileDoc size={20} weight="fill" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Project acceptance certificate.pdf
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>1.2 MB</div>
                </div>
                <button 
                  onClick={() => showToast('Downloading Project acceptance certificate.pdf')}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '4px' }}
                >
                  <DownloadSimple size={15} />
                </button>
              </div>

            </div>
          </div>

          {/* Card 3: Delivery History */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ClockCounterClockwise size={16} color="#059669" weight="bold" />
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                    Delivery history
                  </h3>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    A record of emails sent for this invoice.
                  </div>
                </div>
              </div>

              <Link href="#" style={{ fontSize: '12px', color: '#0284C7', textDecoration: 'none', fontWeight: 600 }}>
                View all &gt;
              </Link>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Date & time</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Recipients</th>
                  <th style={{ padding: '6px 8px', fontWeight: 600 }}>Opened</th>
                  <th style={{ padding: '6px 4px', width: '20px' }}></th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 8px', color: '#0F172A' }}>15 Apr 2025, 14:32</td>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ background: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>Sent</span>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>sarah.clarke@abc-ltd.co.uk</td>
                  <td style={{ padding: '10px 8px', color: '#15803D', fontWeight: 600 }}>Yes</td>
                  <td style={{ padding: '10px 4px', color: '#94A3B8', cursor: 'pointer' }}>⋮</td>
                </tr>

                {/* Row 2 */}
                <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '10px 8px', color: '#0F172A' }}>12 Apr 2025, 09:15</td>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ background: '#DBEAFE', color: '#1D4ED8', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>Opened</span>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#64748B' }}>sarah.clarke@abc-ltd.co.uk</td>
                  <td style={{ padding: '10px 8px', color: '#15803D', fontWeight: 600 }}>Yes</td>
                  <td style={{ padding: '10px 4px', color: '#94A3B8', cursor: 'pointer' }}>⋮</td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td style={{ padding: '10px 8px', color: '#0F172A' }}>10 Apr 2025, 11:20</td>
                  <td style={{ padding: '10px 8px' }}>
                    <span style={{ background: '#F1F5F9', color: '#475569', padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 600 }}>Draft</span>
                  </td>
                  <td style={{ padding: '10px 8px', color: '#94A3B8' }}>—</td>
                  <td style={{ padding: '10px 8px', color: '#94A3B8' }}>—</td>
                  <td style={{ padding: '10px 4px', color: '#94A3B8', cursor: 'pointer' }}>⋮</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>

      </div>

    </div>
  );
}
