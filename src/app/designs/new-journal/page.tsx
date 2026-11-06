'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CaretRight,
  CaretDown,
  CalendarBlank,
  CheckCircle,
  Gear,
  Plus,
  BookOpen,
  FileXls,
  DotsThreeVertical,
  PaperPlaneTilt,
  CloudArrowUp,
  MagnifyingGlass,
  Check,
  ArrowsClockwise,
  ListDashes,
  ChartBar,
  Calculator,
  ShieldCheck,
  Paperclip
} from '@phosphor-icons/react';

interface JournalLine {
  id: string;
  accountCode: string;
  accountName: string;
  department: string;
  project: string;
  description: string;
  debit: number;
  credit: number;
  taxCode: string;
}

export default function NewJournalPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Journal Header State
  const [journalNumber, setJournalNumber] = useState('JNL-2025-0047');
  const [date, setDate] = useState('15 Apr 2025');
  const [accountingPeriod, setAccountingPeriod] = useState('Apr 2025');
  const [description, setDescription] = useState('Accrual for office rent - April 2025');

  const [source, setSource] = useState('Manual journal');
  const [legalEntity, setLegalEntity] = useState('TESSMA Ltd (UK)');
  const [currency, setCurrency] = useState('GBP - British Pound');

  const [isReversalEnabled, setIsReversalEnabled] = useState(true);
  const [reversalDate, setReversalDate] = useState('30 Apr 2025');
  const [reversalDescription, setReversalDescription] = useState('Reverse accrual for office rent - April 2025');

  // Internal Note
  const [internalNote, setInternalNote] = useState('');

  // Journal Lines
  const [lines, setLines] = useState<JournalLine[]>([
    {
      id: '1',
      accountCode: '6000',
      accountName: 'Rent Expense',
      department: 'ADM',
      project: '—',
      description: 'April office rent accrual',
      debit: 12000.00,
      credit: 0.00,
      taxCode: 'STD'
    },
    {
      id: '2',
      accountCode: '2200',
      accountName: 'Accruals',
      department: 'ADM',
      project: '—',
      description: 'April office rent accrual',
      debit: 0.00,
      credit: 12000.00,
      taxCode: 'STD'
    },
    {
      id: '3',
      accountCode: '6100',
      accountName: 'Utilities Expense',
      department: 'ADM',
      project: 'OFF-001',
      description: 'Estimate utility charge',
      debit: 850.00,
      credit: 0.00,
      taxCode: 'STD'
    },
    {
      id: '4',
      accountCode: '2200',
      accountName: 'Accruals',
      department: 'ADM',
      project: '—',
      description: 'Estimate utility charge',
      debit: 0.00,
      credit: 850.00,
      taxCode: 'STD'
    },
    {
      id: '5',
      accountCode: '6200',
      accountName: 'Office Supplies',
      department: 'FIN',
      project: '—',
      description: 'Stationery accrual',
      debit: 320.00,
      credit: 0.00,
      taxCode: 'STD'
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Calculations
  const totalDebits = lines.reduce((acc, l) => acc + (l.debit || 0), 0);
  const totalCredits = lines.reduce((acc, l) => acc + (l.credit || 0), 0);
  const variance = Math.abs(totalDebits - totalCredits);
  const isBalanced = variance < 0.001;

  const handleDebitChange = (id: string, val: number) => {
    setLines(prev => prev.map(l => l.id === id ? { ...l, debit: Math.max(0, val) } : l));
  };

  const handleCreditChange = (id: string, val: number) => {
    setLines(prev => prev.map(l => l.id === id ? { ...l, credit: Math.max(0, val) } : l));
  };

  const addLine = () => {
    const newLine: JournalLine = {
      id: Date.now().toString(),
      accountCode: '2200',
      accountName: 'Accruals',
      department: 'ADM',
      project: '—',
      description: 'Accrual adjustment',
      debit: 0.00,
      credit: 320.00,
      taxCode: 'STD'
    };
    setLines(prev => [...prev, newLine]);
    showToast('Journal line added');
  };

  const removeLine = (id: string) => {
    setLines(prev => prev.filter(l => l.id !== id));
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
            <Link href="/finance/ledger/chart-of-accounts" style={{ color: '#64748B', textDecoration: 'none' }}>Ledger</Link>
            <CaretRight size={12} />
            <span style={{ color: '#0F172A', fontWeight: 600 }}>New journal</span>
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            New Journal
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0 0' }}>
            Create a manual journal entry to record accounting transactions in your ledger.
          </p>
        </div>

        {/* Top Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            onClick={() => showToast('Draft saved successfully!')}
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
            Save draft
          </button>

          <button 
            onClick={() => showToast('All checklist items validated successfully!')}
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
            <CheckCircle size={16} color="#059669" />
            <span>Validate</span>
          </button>

          <button 
            onClick={() => showToast(`Journal ${journalNumber} posted to general ledger!`)}
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
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <PaperPlaneTilt size={16} weight="bold" />
            <span>Post journal</span>
          </button>

          <button 
            onClick={() => showToast('Scheduled reversal for 30 Apr 2025')}
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
            <ArrowsClockwise size={16} />
            <span>Reverse later</span>
          </button>

          <button 
            onClick={() => showToast('More options')}
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
            <DotsThreeVertical size={16} weight="bold" />
            <span>More</span>
          </button>
        </div>
      </div>

      {/* ── 2. MAIN WORKSPACE: 2 COLUMNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(640px, 1.75fr) minmax(360px, 1fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* ════ LEFT COLUMN: JOURNAL HEADER & JOURNAL LINES ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Journal Header */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <div style={{ color: '#059669', display: 'flex' }}>
                <BookOpen size={18} weight="bold" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Journal header
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 28px', fontSize: '12.5px' }}>
              
              {/* Left Column Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Journal number */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Journal number <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={journalNumber} 
                      onChange={(e) => setJournalNumber(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', fontWeight: 600 }}
                    />
                    <Gear size={16} color="#64748B" style={{ cursor: 'pointer' }} />
                  </div>
                </div>

                {/* Date */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Date <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                    <CalendarBlank size={16} color="#64748B" />
                  </div>
                </div>

                {/* Accounting period */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Accounting period <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={accountingPeriod} 
                      onChange={(e) => setAccountingPeriod(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                    <CalendarBlank size={16} color="#64748B" />
                  </div>
                </div>

                {/* Description */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Description <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <input 
                      type="text" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Source */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Source <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <select 
                      value={source} 
                      onChange={(e) => setSource(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>Manual journal</option>
                      <option>Recurring journal</option>
                      <option>Imported journal</option>
                    </select>
                  </div>
                </div>

                {/* Legal entity */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#0F172A', fontWeight: 600 }}>Legal entity <span style={{ color: '#EF4444' }}>*</span></label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <select 
                      value={legalEntity} 
                      onChange={(e) => setLegalEntity(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>TESSMA Ltd (UK)</option>
                      <option>TESSMA US Inc</option>
                    </select>
                  </div>
                </div>

                {/* Currency */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Currency</label>
                  <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                    <select 
                      value={currency} 
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%', background: 'transparent', cursor: 'pointer' }}
                    >
                      <option>GBP - British Pound</option>
                      <option>EUR - Euro</option>
                      <option>USD - US Dollar</option>
                    </select>
                  </div>
                </div>

                {/* Reversal Toggle */}
                <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                  <label style={{ color: '#64748B', fontWeight: 500 }}>Reversal</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div 
                      onClick={() => setIsReversalEnabled(!isReversalEnabled)}
                      style={{
                        width: '36px',
                        height: '20px',
                        borderRadius: '999px',
                        background: isReversalEnabled ? '#006666' : '#CBD5E1',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
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
                        left: isReversalEnabled ? '18px' : '2px',
                        transition: 'left 0.2s'
                      }} />
                    </div>
                    <span style={{ fontSize: '12px', color: '#334155' }}>Create reversing journal automatically</span>
                  </div>
                </div>

                {/* Reversal date (if enabled) */}
                {isReversalEnabled && (
                  <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                    <label style={{ color: '#64748B', fontWeight: 500 }}>Reversal date</label>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                      <input 
                        type="text" 
                        value={reversalDate} 
                        onChange={(e) => setReversalDate(e.target.value)}
                        style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                      />
                      <CalendarBlank size={16} color="#64748B" />
                    </div>
                  </div>
                )}

                {/* Reversal description (if enabled) */}
                {isReversalEnabled && (
                  <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', alignItems: 'center', gap: '10px' }}>
                    <label style={{ color: '#64748B', fontWeight: 500 }}>Reversal description</label>
                    <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', background: '#FFFFFF' }}>
                      <input 
                        type="text" 
                        value={reversalDescription} 
                        onChange={(e) => setReversalDescription(e.target.value)}
                        style={{ border: 'none', outline: 'none', fontSize: '12.5px', color: '#0F172A', width: '100%' }}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Card 2: Journal Lines */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ListDashes size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Journal lines
                </h3>
              </div>

              {/* Action buttons on header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button 
                  onClick={addLine}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    borderRadius: '6px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#15803D',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={13} weight="bold" />
                  <span>Add line</span>
                </button>

                <button 
                  onClick={() => showToast('Template library opened')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  <BookOpen size={14} />
                  <span>Add from template</span>
                </button>

                <button 
                  onClick={() => showToast('Excel import wizard opened')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '6px',
                    padding: '5px 12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#334155',
                    cursor: 'pointer'
                  }}
                >
                  <FileXls size={15} color="#15803D" />
                  <span>Import from Excel</span>
                </button>

                <button 
                  onClick={() => showToast('Lines options')}
                  style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: '2px' }}
                >
                  <DotsThreeVertical size={16} weight="bold" />
                </button>
              </div>
            </div>

            {/* Journal Lines Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0', textAlign: 'left', color: '#64748B' }}>
                    <th style={{ padding: '8px 6px', width: '25px' }}>#</th>
                    <th style={{ padding: '8px 8px', width: '105px' }}>Account code *</th>
                    <th style={{ padding: '8px 10px' }}>Account name</th>
                    <th style={{ padding: '8px 8px', width: '70px' }}>Department</th>
                    <th style={{ padding: '8px 8px', width: '75px' }}>Project</th>
                    <th style={{ padding: '8px 10px' }}>Description *</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', width: '90px' }}>Debit (GBP)</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right', width: '90px' }}>Credit (GBP)</th>
                    <th style={{ padding: '8px 8px', width: '65px' }}>Tax code</th>
                    <th style={{ padding: '8px 6px', width: '20px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l, idx) => (
                    <tr key={l.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                      <td style={{ padding: '10px 6px', color: '#64748B' }}>{idx + 1}</td>
                      
                      {/* Account code */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          background: '#FFFFFF'
                        }}>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>{l.accountCode}</span>
                          <MagnifyingGlass size={12} color="#64748B" style={{ cursor: 'pointer' }} />
                        </div>
                      </td>

                      {/* Account name */}
                      <td style={{ padding: '10px 10px', color: '#0F172A', fontWeight: 500 }}>
                        {l.accountName}
                      </td>

                      {/* Department */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          background: '#FFFFFF'
                        }}>
                          <span>{l.department}</span>
                          <CaretDown size={10} color="#64748B" />
                        </div>
                      </td>

                      {/* Project */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          background: '#FFFFFF'
                        }}>
                          <span>{l.project}</span>
                          <CaretDown size={10} color="#64748B" />
                        </div>
                      </td>

                      {/* Description */}
                      <td style={{ padding: '10px 10px' }}>
                        <input 
                          type="text" 
                          value={l.description}
                          onChange={(e) => {
                            const val = e.target.value;
                            setLines(prev => prev.map(item => item.id === l.id ? { ...item, description: val } : item));
                          }}
                          style={{
                            width: '100%',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '4px 8px',
                            fontSize: '11.5px',
                            color: '#0F172A'
                          }}
                        />
                      </td>

                      {/* Debit */}
                      <td style={{ padding: '10px 10px', textAlign: 'right' }}>
                        <input 
                          type="number" 
                          value={l.debit || ''}
                          placeholder="0.00"
                          onChange={(e) => handleDebitChange(l.id, parseFloat(e.target.value) || 0)}
                          style={{
                            width: '85px',
                            textAlign: 'right',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            fontSize: '12px',
                            color: '#0F172A',
                            fontWeight: l.debit > 0 ? 600 : 400
                          }}
                        />
                      </td>

                      {/* Credit */}
                      <td style={{ padding: '10px 10px', textAlign: 'right' }}>
                        <input 
                          type="number" 
                          value={l.credit || ''}
                          placeholder="0.00"
                          onChange={(e) => handleCreditChange(l.id, parseFloat(e.target.value) || 0)}
                          style={{
                            width: '85px',
                            textAlign: 'right',
                            border: '1px solid #CBD5E1',
                            borderRadius: '6px',
                            padding: '4px 6px',
                            fontSize: '12px',
                            color: '#0F172A',
                            fontWeight: l.credit > 0 ? 600 : 400
                          }}
                        />
                      </td>

                      {/* Tax code */}
                      <td style={{ padding: '10px 8px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: '1px solid #CBD5E1',
                          borderRadius: '6px',
                          padding: '4px 6px',
                          background: '#FFFFFF'
                        }}>
                          <span>{l.taxCode}</span>
                          <CaretDown size={10} color="#64748B" />
                        </div>
                      </td>

                      {/* Action */}
                      <td style={{ padding: '10px 6px', textAlign: 'center' }}>
                        <button 
                          onClick={() => removeLine(l.id)}
                          style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '2px' }}
                        >
                          <DotsThreeVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total GBP Bar below table */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: '#F8FAFC',
              borderRadius: '8px',
              marginTop: '16px'
            }}>
              <button 
                onClick={addLine}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#0284C7',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={14} weight="bold" />
                <span>Add line</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '13px' }}>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>Total (GBP)</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>
                  {totalDebits.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>
                  {totalCredits.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Line Balance Validation Banner */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 20px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '10px',
              marginTop: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isBalanced ? '#DCFCE7' : '#FEE2E2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isBalanced ? '#16A34A' : '#DC2626'
                }}>
                  <CheckCircle size={20} weight="fill" />
                </div>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                    Line balance validation
                  </div>
                  <div style={{ fontSize: '12px', color: isBalanced ? '#16A34A' : '#DC2626', fontWeight: 600, marginTop: '2px' }}>
                    {isBalanced ? 'Journal is balanced' : 'Journal is out of balance'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    {isBalanced ? 'Total debits equal total credits.' : 'Please adjust debits and credits so that variance is £0.00.'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', fontSize: '12.5px' }}>
                <div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>Total debits</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>
                    £{totalDebits.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>Total credits</div>
                  <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>
                    £{totalCredits.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                <div>
                  <div style={{ color: '#64748B', fontSize: '11px' }}>Variance</div>
                  <div style={{ fontWeight: 700, color: isBalanced ? '#16A34A' : '#DC2626', fontSize: '14px' }}>
                    £{variance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* ════ RIGHT COLUMN: JOURNAL SUMMARY, TOTALS, VALIDATION CHECKLIST, ATTACHMENTS ════ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Card 1: Journal summary */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <ChartBar size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Journal summary
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Journal number</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{journalNumber}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Date</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{date}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Period</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{accountingPeriod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Description</span>
                <span style={{ fontWeight: 600, color: '#0F172A', textAlign: 'right', maxWidth: '180px' }}>{description}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Source</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{source}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Legal entity</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{legalEntity}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Currency</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{currency}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Totals (GBP) */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Calculator size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Totals (GBP)
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Total debits</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  £{totalDebits.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B' }}>
                <span>Total credits</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>
                  £{totalCredits.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Variance green banner */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: '#ECFDF5',
                borderRadius: '8px',
                marginTop: '6px'
              }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#065F46' }}>Variance</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#065F46' }}>
                  £{variance.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Validation checklist */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#059669" weight="bold" />
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                  Validation checklist
                </h3>
              </div>

              <button 
                onClick={() => showToast('Re-validated checklist!')}
                style={{ background: 'none', border: 'none', color: '#0284C7', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
              >
                Validate
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle size={16} weight="fill" color="#16A34A" />
                <span>Journal header is complete</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle size={16} weight="fill" color="#16A34A" />
                <span>At least one journal line added</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle size={16} weight="fill" color="#16A34A" />
                <span>Debits equal credits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle size={16} weight="fill" color="#16A34A" />
                <span>Valid account codes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle size={16} weight="fill" color="#16A34A" />
                <span>Valid period and date</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
                <CheckCircle size={16} weight="fill" color="#16A34A" />
                <span>All required fields completed</span>
              </div>
            </div>
          </div>

          {/* Card 4: Attachments & notes */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Paperclip size={18} color="#059669" weight="bold" />
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Attachments & notes
              </h3>
            </div>

            {/* Drop zone */}
            <div style={{
              border: '2px dashed #CBD5E1',
              borderRadius: '8px',
              padding: '20px 14px',
              textAlign: 'center',
              background: '#F8FAFC',
              cursor: 'pointer',
              marginBottom: '14px'
            }}
            onClick={() => showToast('Attachment file upload opened')}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px', color: '#0284C7' }}>
                <CloudArrowUp size={28} weight="bold" />
              </div>
              <div style={{ fontSize: '12px', color: '#334155' }}>
                <span style={{ fontWeight: 600 }}>Drop files here</span> or <span style={{ color: '#0284C7', fontWeight: 600 }}>click to upload</span>
              </div>
              <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
                PDF, XLSX, DOCX, JPG (max 10 MB)
              </div>
            </div>

            {/* Internal note */}
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
                Internal note (optional)
              </label>
              <textarea 
                value={internalNote}
                onChange={(e) => setInternalNote(e.target.value)}
                placeholder="Add a note about this journal entry..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#0F172A',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
