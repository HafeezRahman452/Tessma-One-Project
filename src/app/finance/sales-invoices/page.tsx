'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  PaperPlaneTilt,
  Warning,
  Clock,
  CheckCircle,
  TrendUp,
  MagnifyingGlass,
  Funnel,
  DownloadSimple,
  Plus,
  ArrowClockwise,
  DotsThreeVertical,
  CaretRight,
  CaretDown,
  X,
  Check,
  Building,
  User,
  CalendarBlank,
  CurrencyGbp,
  Paperclip,
  Eye,
  EnvelopeSimple,
  Sparkle
} from '@phosphor-icons/react';

interface InvoiceItem {
  id: string;
  invoiceNo: string;
  poRef: string;
  customerName: string;
  tags: string[];
  issuedDate: string;
  dueDate: string;
  dueDays: string;
  grossAmount: string;
  outstandingAmount: string;
  status: 'Draft' | 'Sent' | 'Overdue' | 'Part-paid' | 'Paid';
}

export default function SalesInvoicesListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All statuses');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('All customers');
  const [startDate, setStartDate] = useState('2025-04-01');
  const [endDate, setEndDate] = useState('2025-04-30');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // Dropdown open states
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openCustomerDropdown, setOpenCustomerDropdown] = useState(false);

  // Modals & Drawers
  const [showNewInvoiceModal, setShowNewInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [pdfModalInvoice, setPdfModalInvoice] = useState<InvoiceItem | null>(null);
  const [sendPdfInvoice, setSendPdfInvoice] = useState<InvoiceItem | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  // Sample data matching screenshot exactly
  const initialInvoices: InvoiceItem[] = [
    {
      id: '1',
      invoiceNo: 'INV-2025-0423',
      poRef: 'PO-4881',
      customerName: 'ABC Ltd',
      tags: ['Key Account', 'Web Design'],
      issuedDate: '15 Apr 2025',
      dueDate: '15 May 2025',
      dueDays: '30 days',
      grossAmount: '£16,320.00',
      outstandingAmount: '£16,320.00',
      status: 'Overdue',
    },
    {
      id: '2',
      invoiceNo: 'INV-2025-0422',
      poRef: 'PO-4873',
      customerName: 'Tech Solutions Ltd',
      tags: ['Standard'],
      issuedDate: '14 Apr 2025',
      dueDate: '14 May 2025',
      dueDays: '29 days',
      grossAmount: '£4,800.00',
      outstandingAmount: '£2,400.00',
      status: 'Part-paid',
    },
    {
      id: '3',
      invoiceNo: 'INV-2025-0421',
      poRef: 'PO-48576',
      customerName: 'Global Services Group',
      tags: ['Key Account', 'Consultancy'],
      issuedDate: '10 Apr 2025',
      dueDate: '11 May 2025',
      dueDays: '25 days',
      grossAmount: '£8,400.00',
      outstandingAmount: '£8,400.00',
      status: 'Overdue',
    },
    {
      id: '4',
      invoiceNo: 'INV-2025-0420',
      poRef: 'PO-48575',
      customerName: 'Riverside Estates',
      tags: ['Standard'],
      issuedDate: '05 Apr 2025',
      dueDate: '05 May 2025',
      dueDays: '20 days',
      grossAmount: '£2,800.00',
      outstandingAmount: '£0.00',
      status: 'Paid',
    },
    {
      id: '5',
      invoiceNo: 'INV-2025-0419',
      poRef: 'PO-48532',
      customerName: 'City Council',
      tags: ['Government', 'Maintenance'],
      issuedDate: '02 Apr 2025',
      dueDate: '02 May 2025',
      dueDays: '17 days',
      grossAmount: '£5,600.00',
      outstandingAmount: '£5,600.00',
      status: 'Overdue',
    },
    {
      id: '6',
      invoiceNo: 'INV-2025-0418',
      poRef: 'PO-48531',
      customerName: 'Mainway Retail Ltd',
      tags: ['Standard'],
      issuedDate: '01 Apr 2025',
      dueDate: '01 May 2025',
      dueDays: '16 days',
      grossAmount: '£1,200.00',
      outstandingAmount: '£0.00',
      status: 'Paid',
    },
    {
      id: '7',
      invoiceNo: 'INV-2025-0417',
      poRef: 'PO-48669',
      customerName: 'Acme Trading Co',
      tags: ['Standard'],
      issuedDate: '28 Mar 2025',
      dueDate: '27 Apr 2025',
      dueDays: '12 days',
      grossAmount: '£3,750.00',
      outstandingAmount: '£1,875.00',
      status: 'Part-paid',
    },
    {
      id: '8',
      invoiceNo: 'INV-2025-0416',
      poRef: 'PO-44865',
      customerName: 'Bright Future Ltd',
      tags: ['New Customer', 'Training'],
      issuedDate: '25 Mar 2025',
      dueDate: '24 Apr 2025',
      dueDays: '9 days',
      grossAmount: '£4,500.00',
      outstandingAmount: '£0.00',
      status: 'Sent',
    },
    {
      id: '9',
      invoiceNo: 'INV-2025-0415',
      poRef: 'PO-44853',
      customerName: 'Summit Healthcare',
      tags: ['Standard'],
      issuedDate: '20 Mar 2025',
      dueDate: '19 Apr 2025',
      dueDays: '4 days',
      grossAmount: '£6,900.00',
      outstandingAmount: '£6,900.00',
      status: 'Overdue',
    },
    {
      id: '10',
      invoiceNo: 'INV-2025-0414',
      poRef: 'PO-44860',
      customerName: 'Western Logistics',
      tags: ['Standard'],
      issuedDate: '18 Mar 2025',
      dueDate: '17 Apr 2025',
      dueDays: '2 days',
      grossAmount: '£3,200.00',
      outstandingAmount: '£0.00',
      status: 'Paid',
    },
  ];

  // Filter logic
  const filteredInvoices = useMemo(() => {
    return initialInvoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.poRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'All statuses' || inv.status === selectedStatus;
      const matchesCustomer = selectedCustomer === 'All customers' || inv.customerName === selectedCustomer;

      return matchesSearch && matchesStatus && matchesCustomer;
    });
  }, [searchQuery, selectedStatus, selectedCustomer]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows({});
      setSelectAll(false);
    } else {
      const newSelected: Record<string, boolean> = {};
      filteredInvoices.forEach((inv) => (newSelected[inv.id] = true));
      setSelectedRows(newSelected);
      setSelectAll(true);
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All statuses');
    setSelectedCustomer('All customers');
    setMinAmount('');
    setMaxAmount('');
  };

  // Tag renderer
  const renderTag = (tag: string) => {
    switch (tag) {
      case 'Key Account':
        return <span key={tag} style={{ padding: '2px 8px', borderRadius: '4px', background: '#DBEAFE', color: '#1D4ED8', fontSize: '11px', fontWeight: 600 }}>Key Account</span>;
      case 'Web Design':
      case 'Consultancy':
      case 'Maintenance':
      case 'Training':
        return <span key={tag} style={{ padding: '2px 8px', borderRadius: '4px', background: '#F1F5F9', color: '#475569', fontSize: '11px', fontWeight: 500 }}>{tag}</span>;
      case 'Government':
        return <span key={tag} style={{ padding: '2px 8px', borderRadius: '4px', background: '#F3E8FF', color: '#6B21A8', fontSize: '11px', fontWeight: 600 }}>Government</span>;
      case 'New Customer':
        return <span key={tag} style={{ padding: '2px 8px', borderRadius: '4px', background: '#FAE8FF', color: '#86198F', fontSize: '11px', fontWeight: 600 }}>New Customer</span>;
      case 'Standard':
      default:
        return <span key={tag} style={{ padding: '2px 8px', borderRadius: '4px', background: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 500 }}>Standard</span>;
    }
  };

  // Status badge renderer
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '12px', background: '#DCFCE7', color: '#15803D', fontSize: '11.5px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#15803D' }} />
            Paid
          </span>
        );
      case 'Sent':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '12px', background: '#EFF6FF', color: '#1D4ED8', fontSize: '11.5px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1D4ED8' }} />
            Sent
          </span>
        );
      case 'Part-paid':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', fontSize: '11.5px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B45309' }} />
            Part-paid
          </span>
        );
      case 'Overdue':
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '11.5px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#B91C1C' }} />
            Overdue
          </span>
        );
      case 'Draft':
      default:
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 10px', borderRadius: '12px', background: '#F1F5F9', color: '#475569', fontSize: '11.5px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#475569' }} />
            Draft
          </span>
        );
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. PAGE HEADER TITLE */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Sales Invoices List
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View, manage and track all sales invoices issued to your customers.
          </p>
        </div>
      </div>

      {/* 2. TOP 5 SUMMARY KPI CARDS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        
        {/* Card 1: Draft Invoices */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F1F5F9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Draft Invoices</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>12</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>20%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. last month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '60px', height: '28px' }}>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
              <path d="M2 24 C 15 20, 25 18, 35 12 C 45 16, 52 8, 58 4" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Sent Invoices */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#2563EB', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PaperPlaneTilt size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Sent Invoices</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>28</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>12%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. last month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '60px', height: '28px' }}>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
              <path d="M2 22 C 14 18, 26 22, 38 12 C 48 8, 54 10, 58 4" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Overdue Invoices */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#EF4444', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Warning size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Overdue Invoices</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>8</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>33%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. last month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '60px', height: '28px' }}>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
              <path d="M2 26 C 16 22, 28 14, 40 18 C 50 20, 55 10, 58 4" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Part-paid Invoices */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#F59E0B', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Part-paid Invoices</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>6</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>50%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. last month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '60px', height: '28px' }}>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
              <path d="M2 24 C 14 20, 24 16, 36 20 C 46 14, 52 8, 58 4" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 5: Paid Invoices */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#10B981', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle size={18} weight="fill" />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>Paid Invoices</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '10px', letterSpacing: '-0.02em' }}>46</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={13} weight="bold" />
              <span>28%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. last month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '60px', height: '28px' }}>
            <svg width="60" height="28" viewBox="0 0 60 28" fill="none">
              <path d="M2 22 C 16 18, 28 20, 40 12 C 50 6, 55 8, 58 4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. FILTER & TOOLBAR SECTION (Two Rows) */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Top Row: Search + Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', width: '380px', maxWidth: '100%' }}>
            <MagnifyingGlass size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoices, customer name or reference..."
              style={{
                width: '100%',
                height: '36px',
                paddingLeft: '36px',
                paddingRight: '12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '12.5px',
                color: '#0F172A',
                outline: 'none',
                background: '#F8FAFC',
              }}
            />
          </div>

          {/* Right Buttons: Clear filters, Filters, + New invoice, Export */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={resetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: 'none',
                background: 'transparent',
                color: '#64748B',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <ArrowClockwise size={14} />
              <span>Clear filters</span>
            </button>

            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Funnel size={14} />
              <span>Filters</span>
              <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#007D7D', color: '#FFFFFF', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>0</span>
            </button>

            {/* + New Invoice Button */}
            <button
              onClick={() => setShowNewInvoiceModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 16px',
                borderRadius: '8px',
                border: 'none',
                background: '#007D7D',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(0, 125, 125, 0.3)',
              }}
            >
              <Plus size={15} weight="bold" />
              <span>New invoice</span>
            </button>

            {/* Export Dropdown */}
            <button
              onClick={() => alert('Exporting sales invoices...')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                height: '36px',
                padding: '0 14px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#334155',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <DownloadSimple size={15} />
              <span>Export</span>
              <CaretDown size={12} color="#64748B" />
            </button>
          </div>

        </div>

        {/* Bottom Row: Status, Customer, Date range, Amount range */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          
          {/* Status Dropdown */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Status</div>
            <button
              onClick={() => {
                setOpenStatusDropdown(!openStatusDropdown);
                setOpenCustomerDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
              }}
            >
              <span>{selectedStatus}</span>
              <CaretDown size={14} color="#64748B" />
            </button>

            {openStatusDropdown && (
              <div style={{ position: 'absolute', top: '60px', left: 0, width: '100%', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 30, padding: '6px' }}>
                {['All statuses', 'Draft', 'Sent', 'Overdue', 'Part-paid', 'Paid'].map((st) => (
                  <div
                    key={st}
                    onClick={() => { setSelectedStatus(st); setOpenStatusDropdown(false); }}
                    style={{ padding: '7px 10px', borderRadius: '6px', fontSize: '12.5px', color: '#334155', cursor: 'pointer', background: selectedStatus === st ? '#F1F5F9' : 'transparent' }}
                  >
                    {st}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customer Dropdown */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Customer</div>
            <button
              onClick={() => {
                setOpenCustomerDropdown(!openCustomerDropdown);
                setOpenStatusDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
              }}
            >
              <span>{selectedCustomer}</span>
              <CaretDown size={14} color="#64748B" />
            </button>

            {openCustomerDropdown && (
              <div style={{ position: 'absolute', top: '60px', left: 0, width: '100%', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 30, padding: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                {['All customers', 'ABC Ltd', 'Tech Solutions Ltd', 'Global Services Group', 'Riverside Estates', 'City Council', 'Mainway Retail Ltd', 'Acme Trading Co', 'Bright Future Ltd', 'Summit Healthcare', 'Western Logistics'].map((cust) => (
                  <div
                    key={cust}
                    onClick={() => { setSelectedCustomer(cust); setOpenCustomerDropdown(false); }}
                    style={{ padding: '7px 10px', borderRadius: '6px', fontSize: '12.5px', color: '#334155', cursor: 'pointer', background: selectedCustomer === cust ? '#F1F5F9' : 'transparent' }}
                  >
                    {cust}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Range Input */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Date range</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '0 10px', height: '36px' }}>
              <CalendarBlank size={15} color="#64748B" />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ border: 'none', fontSize: '12px', outline: 'none', color: '#0F172A', background: 'transparent' }} />
              <span style={{ color: '#94A3B8' }}>→</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ border: 'none', fontSize: '12px', outline: 'none', color: '#0F172A', background: 'transparent' }} />
            </div>
          </div>

          {/* Amount Range Input */}
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '4px' }}>Amount range</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <input
                type="number"
                placeholder="Min amount"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
              />
              <span style={{ color: '#94A3B8', fontSize: '12px' }}>to</span>
              <input
                type="number"
                placeholder="Max amount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                style={{ width: '100%', height: '36px', padding: '0 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* 4. SALES INVOICES DATA TABLE */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Table Title & Top Pagination Controls */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Invoices (100)
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12.5px', color: '#64748B' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Show</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', background: '#FFFFFF' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>per page</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #007D7D', background: '#007D7D', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer', fontSize: '12px' }}>1</button>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}>2</button>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}>3</button>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}>4</button>
              <span>...</span>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
            </div>
          </div>
        </div>

        {/* Scrollable Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569', fontSize: '11.5px', fontWeight: 600 }}>
                <th style={{ padding: '12px 14px', width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                    style={{ cursor: 'pointer', accentColor: '#007D7D' }}
                  />
                </th>
                <th style={{ padding: '12px 14px' }}>Invoice no ⇅</th>
                <th style={{ padding: '12px 14px' }}>Customer ⇅</th>
                <th style={{ padding: '12px 14px' }}>Issued ⇅</th>
                <th style={{ padding: '12px 14px' }}>Due ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Gross (GBP) ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Outstanding (GBP) ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Status ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    No sales invoices found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isChecked = !!selectedRows[inv.id];
                  const isOutstanding = inv.outstandingAmount !== '£0.00';

                  return (
                    <tr
                      key={inv.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        background: isChecked ? '#F0FDFA' : 'transparent',
                        transition: 'background 0.12s ease',
                      }}
                      onMouseEnter={(e) => { if (!isChecked) e.currentTarget.style.backgroundColor = '#F8FAFC'; }}
                      onMouseLeave={(e) => { if (!isChecked) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      {/* Checkbox */}
                      <td style={{ padding: '12px 14px' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelectRow(inv.id)}
                          style={{ cursor: 'pointer', accentColor: '#007D7D' }}
                        />
                      </td>

                      {/* Invoice No & PO Ref */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span
                            onClick={() => setSelectedInvoice(inv)}
                            style={{ color: '#2563EB', fontWeight: 600, cursor: 'pointer' }}
                          >
                            {inv.invoiceNo}
                          </span>
                          <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{inv.poRef}</span>
                        </div>
                      </td>

                      {/* Customer Name & Tags */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontWeight: 600, color: '#0F172A', marginRight: '4px' }}>{inv.customerName}</span>
                          {inv.tags.map((tg) => renderTag(tg))}
                        </div>
                      </td>

                      {/* Issued Date */}
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{inv.issuedDate}</td>

                      {/* Due Date & Days subtitle */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#0F172A', fontWeight: 500 }}>{inv.dueDate}</span>
                          <span style={{ fontSize: '11px', color: '#DC2626', fontWeight: 500, marginTop: '2px' }}>({inv.dueDays})</span>
                        </div>
                      </td>

                      {/* Gross (GBP) */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: '#0F172A' }}>
                        {inv.grossAmount}
                      </td>

                      {/* Outstanding (GBP) */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 700, color: isOutstanding ? '#DC2626' : '#0F172A' }}>
                        {inv.outstandingAmount}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>{renderStatusBadge(inv.status)}</td>

                      {/* Actions: View PDF, Send PDF, 3 Dots */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          
                          {/* View PDF */}
                          <button
                            onClick={() => setPdfModalInvoice(inv)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF',
                              color: '#334155',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <FileText size={13} color="#64748B" />
                            <span>View PDF</span>
                          </button>

                          {/* Send PDF */}
                          <button
                            onClick={() => setSendPdfInvoice(inv)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              border: '1px solid #E2E8F0',
                              background: '#FFFFFF',
                              color: '#334155',
                              fontSize: '11.5px',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                          >
                            <PaperPlaneTilt size={13} color="#2563EB" />
                            <span>Send PDF</span>
                          </button>

                          {/* 3 dots menu */}
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#94A3B8' }}
                          >
                            <DotsThreeVertical size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL: NEW INVOICE */}
      {showNewInvoiceModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '540px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#007D7D', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={18} weight="bold" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Create Sales Invoice</h3>
              </div>
              <button onClick={() => setShowNewInvoiceModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('Sales Invoice generated successfully!'); setShowNewInvoiceModal(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Select Customer</label>
                  <select required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}>
                    <option value="ABC Ltd">ABC Ltd</option>
                    <option value="Tech Solutions Ltd">Tech Solutions Ltd</option>
                    <option value="Global Services Group">Global Services Group</option>
                    <option value="Riverside Estates">Riverside Estates</option>
                    <option value="City Council">City Council</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>PO Reference</label>
                    <input type="text" defaultValue="PO-49001" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Issue Date</label>
                    <input type="date" defaultValue="2025-04-18" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Due Date</label>
                    <input type="date" defaultValue="2025-05-18" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Total Amount (£)</label>
                    <input type="text" defaultValue="12,500.00" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
                <button type="button" onClick={() => setShowNewInvoiceModal(false)} style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 20px', borderRadius: '6px', border: 'none', background: '#007D7D', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Generate & Send Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW PDF */}
      {pdfModalInvoice && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '640px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '14px', marginBottom: '18px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#007D7D', textTransform: 'uppercase' }}>PDF Document Preview</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{pdfModalInvoice.invoiceNo}</h3>
              </div>
              <button onClick={() => setPdfModalInvoice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            {/* Simulated PDF Layout */}
            <div style={{ border: '1px solid #CBD5E1', borderRadius: '8px', padding: '20px', background: '#FAFAFA', fontFamily: 'monospace', fontSize: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #CBD5E1', paddingBottom: '12px' }}>
                <div>
                  <strong style={{ fontSize: '15px', color: '#007D7D' }}>TESSMA ONE CORP</strong><br />
                  100 Financial Way, London, UK<br />
                  VAT Reg: GB9982341
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong style={{ fontSize: '14px', color: '#0F172A' }}>INVOICE #{pdfModalInvoice.invoiceNo}</strong><br />
                  PO Ref: {pdfModalInvoice.poRef}<br />
                  Date: {pdfModalInvoice.issuedDate}
                </div>
              </div>

              <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: '#64748B' }}>Billed To:</span><br />
                  <strong>{pdfModalInvoice.customerName}</strong><br />
                  Accounts Payable Department
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#64748B' }}>Amount Due:</span><br />
                  <strong style={{ fontSize: '16px', color: '#DC2626' }}>{pdfModalInvoice.outstandingAmount}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setPdfModalInvoice(null)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
              <button onClick={() => alert('Downloading PDF...')} style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#007D7D', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Download PDF File</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: SEND PDF VIA EMAIL */}
      {sendPdfInvoice && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PaperPlaneTilt size={18} weight="bold" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Send Invoice Email</h3>
              </div>
              <button onClick={() => setSendPdfInvoice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert(`Invoice ${sendPdfInvoice.invoiceNo} emailed successfully!`); setSendPdfInvoice(null); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Recipient Email</label>
                  <input type="email" defaultValue={`accounts@${sendPdfInvoice.customerName.toLowerCase().replace(/[^a-z]/g, '')}.co.uk`} required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Subject</label>
                  <input type="text" defaultValue={`Invoice ${sendPdfInvoice.invoiceNo} from TESSMA ONE`} required style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '4px' }}>Message</label>
                  <textarea rows={4} defaultValue={`Dear Customer,\n\nPlease find attached invoice ${sendPdfInvoice.invoiceNo} for amount ${sendPdfInvoice.grossAmount}.\n\nThank you,\nTESSMA Finance`} style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setSendPdfInvoice(null)} style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '8px 20px', borderRadius: '6px', border: 'none', background: '#2563EB', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Send Email Now</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INVOICE DETAILS DRAWER */}
      {selectedInvoice && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Invoice Summary</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{selectedInvoice.invoiceNo}</h3>
              </div>
              <button onClick={() => setSelectedInvoice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Customer</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedInvoice.customerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>PO Reference</span>
                <span style={{ color: '#0F172A' }}>{selectedInvoice.poRef}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Issued Date</span>
                <span style={{ color: '#0F172A' }}>{selectedInvoice.issuedDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Due Date</span>
                <span style={{ color: '#0F172A' }}>{selectedInvoice.dueDate} ({selectedInvoice.dueDays})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Gross Amount</span>
                <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '15px' }}>{selectedInvoice.grossAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>Outstanding Amount</span>
                <span style={{ fontWeight: 700, color: selectedInvoice.outstandingAmount !== '£0.00' ? '#DC2626' : '#0F172A', fontSize: '15px' }}>{selectedInvoice.outstandingAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748B' }}>Status</span>
                <div>{renderStatusBadge(selectedInvoice.status)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setSelectedInvoice(null)} style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
