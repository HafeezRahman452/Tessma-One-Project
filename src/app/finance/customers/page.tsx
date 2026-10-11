'use client';

import React, { useState, useMemo } from 'react';
import {
  UsersThree,
  UserCheck,
  Warning,
  Coins,
  TrendUp,
  TrendDown,
  MagnifyingGlass,
  Funnel,
  DownloadSimple,
  Plus,
  ArrowClockwise,
  DotsThreeVertical,
  CaretRight,
  CaretDown,
  X,
  CaretUp,
  Check,
  Building,
  User,
  EnvelopeSimple,
  Phone,
  CurrencyGbp,
  CalendarBlank,
  FileText
} from '@phosphor-icons/react';

interface CustomerRecord {
  id: string;
  name: string;
  code: string;
  type: 'Corporate' | 'SME' | 'Government' | 'Individual';
  contactName: string;
  contactEmail: string;
  balance: string;
  overdue: string;
  lastInvoiceDate: string;
  paymentTerms: string;
  managerName: string;
  managerInitials: string;
  managerAvatarBg: string;
  status: 'Active' | 'Overdue' | 'On hold' | 'Inactive';
  avatarBg: string;
}

export default function CustomersListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All statuses');
  const [selectedType, setSelectedType] = useState<string>('All types');
  const [selectedManager, setSelectedManager] = useState<string>('All managers');
  
  // Dropdown open states
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openManagerDropdown, setOpenManagerDropdown] = useState(false);
  const [managerSearch, setManagerSearch] = useState('');

  // Modals
  const [showNewCustomerModal, setShowNewCustomerModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const [selectAll, setSelectAll] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Initial customer list matching screenshot exactly
  const initialCustomers: CustomerRecord[] = [
    {
      id: '1',
      name: 'ABC Ltd',
      code: 'CUS-001',
      type: 'Corporate',
      contactName: 'Sarah Clarke',
      contactEmail: 'sarah.clarke@abcltd.co.uk',
      balance: '£18,250.00',
      overdue: '£0.00',
      lastInvoiceDate: '12 Apr 2025',
      paymentTerms: 'Net 30 days',
      managerName: 'John Doe',
      managerInitials: 'JD',
      managerAvatarBg: '#2563EB',
      status: 'Active',
      avatarBg: '#2563EB',
    },
    {
      id: '2',
      name: 'Global Tech Solutions',
      code: 'CUS-002',
      type: 'Corporate',
      contactName: 'James Wilson',
      contactEmail: 'j.wilson@globaltech.co.uk',
      balance: '£24,500.00',
      overdue: '£4,500.00',
      lastInvoiceDate: '10 Apr 2025',
      paymentTerms: 'Net 34 days',
      managerName: 'Sarah Clarke',
      managerInitials: 'SC',
      managerAvatarBg: '#4F46E5',
      status: 'Overdue',
      avatarBg: '#059669',
    },
    {
      id: '3',
      name: 'Smith & Co',
      code: 'CUS-003',
      type: 'SME',
      contactName: 'Emma Roberts',
      contactEmail: 'emma@smithsanco.co.uk',
      balance: '£8,750.00',
      overdue: '£2,300.00',
      lastInvoiceDate: '02 Apr 2025',
      paymentTerms: 'Net 14 days',
      managerName: 'Michael Khan',
      managerInitials: 'MK',
      managerAvatarBg: '#0D9488',
      status: 'Overdue',
      avatarBg: '#10B981',
    },
    {
      id: '4',
      name: 'Bright Futures Ltd',
      code: 'CUS-004',
      type: 'Corporate',
      contactName: 'David Chen',
      contactEmail: 'd.chen@brightfutures.co.uk',
      balance: '£0.00',
      overdue: '£0.00',
      lastInvoiceDate: '05 Apr 2025',
      paymentTerms: 'Net 30 days',
      managerName: 'Lisa Turner',
      managerInitials: 'LT',
      managerAvatarBg: '#9333EA',
      status: 'Active',
      avatarBg: '#9333EA',
    },
    {
      id: '5',
      name: 'City Council',
      code: 'CUS-005',
      type: 'Government',
      contactName: 'Laura Green',
      contactEmail: 'laura.green@citycouncil.gov.uk',
      balance: '£12,400.00',
      overdue: '£0.00',
      lastInvoiceDate: '08 Apr 2025',
      paymentTerms: 'Net 30 days',
      managerName: 'John Doe',
      managerInitials: 'JD',
      managerAvatarBg: '#2563EB',
      status: 'Active',
      avatarBg: '#0284C7',
    },
    {
      id: '6',
      name: 'Tech Dynamics',
      code: 'CUS-006',
      type: 'SME',
      contactName: 'Robert Taylor',
      contactEmail: 'robert@techdynamics.co.uk',
      balance: '£5,200.00',
      overdue: '£5,200.00',
      lastInvoiceDate: '01 Apr 2025',
      paymentTerms: 'Net 10 days',
      managerName: 'Sarah Clarke',
      managerInitials: 'SC',
      managerAvatarBg: '#4F46E5',
      status: 'Overdue',
      avatarBg: '#D97706',
    },
    {
      id: '7',
      name: 'NextGen Systems',
      code: 'CUS-007',
      type: 'Corporate',
      contactName: 'Sophie Martin',
      contactEmail: 'sophie@nextgensystems.co.uk',
      balance: '£18,900.00',
      overdue: '£0.00',
      lastInvoiceDate: '14 Apr 2025',
      paymentTerms: 'Net 30 days',
      managerName: 'Michael Khan',
      managerInitials: 'MK',
      managerAvatarBg: '#0D9488',
      status: 'Active',
      avatarBg: '#2563EB',
    },
    {
      id: '8',
      name: 'Urban Developments',
      code: 'CUS-008',
      type: 'Corporate',
      contactName: 'Oliver Brown',
      contactEmail: 'oliver@urbandev.co.uk',
      balance: '£32,100.00',
      overdue: '£12,690.00',
      lastInvoiceDate: '10 Apr 2025',
      paymentTerms: 'Net 30 days',
      managerName: 'Lisa Turner',
      managerInitials: 'LT',
      managerAvatarBg: '#9333EA',
      status: 'Overdue',
      avatarBg: '#7C3AED',
    },
    {
      id: '9',
      name: 'Riverside Group',
      code: 'CUS-009',
      type: 'SME',
      contactName: 'Natalie Scott',
      contactEmail: 'natalie@riverside.co.uk',
      balance: '£3,800.00',
      overdue: '£0.00',
      lastInvoiceDate: '07 Apr 2025',
      paymentTerms: 'Net 14 days',
      managerName: 'John Doe',
      managerInitials: 'JD',
      managerAvatarBg: '#2563EB',
      status: 'Active',
      avatarBg: '#059669',
    },
    {
      id: '10',
      name: 'Summit Holdings',
      code: 'CUS-010',
      type: 'Corporate',
      contactName: 'Daniel Wright',
      contactEmail: 'daniel@summitholdings.co.uk',
      balance: '£27,450.00',
      overdue: '£3,200.00',
      lastInvoiceDate: '11 Apr 2025',
      paymentTerms: 'Net 30 days',
      managerName: 'Sarah Clarke',
      managerInitials: 'SC',
      managerAvatarBg: '#4F46E5',
      status: 'Overdue',
      avatarBg: '#0284C7',
    },
  ];

  // Filter logic
  const filteredCustomers = useMemo(() => {
    return initialCustomers.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === 'All statuses' || item.status === selectedStatus;
      const matchesType = selectedType === 'All types' || item.type === selectedType;
      const matchesManager = selectedManager === 'All managers' || item.managerName === selectedManager;

      return matchesSearch && matchesStatus && matchesType && matchesManager;
    });
  }, [searchQuery, selectedStatus, selectedType, selectedManager]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows({});
      setSelectAll(false);
    } else {
      const newSelected: Record<string, boolean> = {};
      filteredCustomers.forEach((c) => (newSelected[c.id] = true));
      setSelectedRows(newSelected);
      setSelectAll(true);
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All statuses');
    setSelectedType('All types');
    setSelectedManager('All managers');
  };

  // Badge renderers
  const renderTypeBadge = (type: string) => {
    switch (type) {
      case 'Corporate':
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#EFF6FF', color: '#1D4ED8', fontSize: '11.5px', fontWeight: 600 }}>Corporate</span>;
      case 'SME':
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', fontSize: '11.5px', fontWeight: 600 }}>SME</span>;
      case 'Government':
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#F3E8FF', color: '#6B21A8', fontSize: '11.5px', fontWeight: 600 }}>Government</span>;
      case 'Individual':
      default:
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#F5F3FF', color: '#7C3AED', fontSize: '11.5px', fontWeight: 600 }}>Individual</span>;
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#DCFCE7', color: '#15803D', fontSize: '11.5px', fontWeight: 600 }}>Active</span>;
      case 'Overdue':
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEE2E2', color: '#B91C1C', fontSize: '11.5px', fontWeight: 600 }}>Overdue</span>;
      case 'On hold':
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#FEF3C7', color: '#B45309', fontSize: '11.5px', fontWeight: 600 }}>On hold</span>;
      case 'Inactive':
      default:
        return <span style={{ padding: '3px 10px', borderRadius: '12px', background: '#F1F5F9', color: '#475569', fontSize: '11.5px', fontWeight: 600 }}>Inactive</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '40px' }}>
      
      {/* 1. PAGE HEADER TITLE */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
            Customers List
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', marginTop: '4px', margin: 0 }}>
            View and manage your customers, balances and account information.
          </p>
        </div>
      </div>

      {/* 2. TOP 4 KPI CARDS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
        
        {/* Card 1: Total Customers */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#007D7D', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <UsersThree size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Total Customers</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '12px', letterSpacing: '-0.02em' }}>156</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={14} weight="bold" />
              <span>6%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 28 C 15 25, 25 15, 38 18 C 50 20, 58 8, 68 4" stroke="#00A896" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 2: Active Customers */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <UserCheck size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Active Customers</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '12px', letterSpacing: '-0.02em' }}>142</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={14} weight="bold" />
              <span>8%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 26 C 15 22, 28 20, 40 14 C 52 8, 60 10, 68 4" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 3: Overdue Accounts */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Warning size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Overdue Accounts</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '12px', letterSpacing: '-0.02em' }}>18</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#DC2626', fontWeight: 600 }}>
              <TrendUp size={14} weight="bold" />
              <span>20%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 28 C 18 26, 32 18, 48 22 C 58 24, 62 10, 68 6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Card 4: Total Receivables */}
        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
                <Coins size={20} weight="fill" />
              </div>
              <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>Total Receivables</span>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', marginTop: '12px', letterSpacing: '-0.02em' }}>£480,000</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>
              <TrendUp size={14} weight="bold" />
              <span>12%</span>
              <span style={{ color: '#94A3B8', fontWeight: 400, marginLeft: '2px' }}>vs. previous month</span>
            </div>
          </div>
          {/* Sparkline curve */}
          <div style={{ width: '70px', height: '32px' }}>
            <svg width="70" height="32" viewBox="0 0 70 32" fill="none">
              <path d="M2 26 C 16 22, 28 20, 42 12 C 54 6, 62 8, 68 4" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </div>

      {/* 3. FILTER & TOOLBAR SECTION */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
        
        {/* Left Side: Search + 3 Dropdown Filters */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', flex: 1 }}>
          
          {/* Search Bar */}
          <div style={{ position: 'relative', width: '320px', minWidth: '220px' }}>
            <MagnifyingGlass size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers by name, contact, email or reference..."
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

          {/* Filter 1: Status Dropdown */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Status</div>
            <button
              onClick={() => {
                setOpenStatusDropdown(!openStatusDropdown);
                setOpenTypeDropdown(false);
                setOpenManagerDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '130px',
              }}
            >
              <span>{selectedStatus}</span>
              <CaretDown size={14} color="#64748B" />
            </button>

            {/* Status Dropdown Menu */}
            {openStatusDropdown && (
              <div style={{ position: 'absolute', top: '58px', left: 0, width: '160px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 30, padding: '6px' }}>
                {['All statuses', 'Active', 'On hold', 'Inactive'].map((status) => (
                  <div
                    key={status}
                    onClick={() => { setSelectedStatus(status); setOpenStatusDropdown(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      color: '#334155',
                      cursor: 'pointer',
                      background: selectedStatus === status ? '#F1F5F9' : 'transparent',
                    }}
                  >
                    <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedStatus === status ? '#007D7D' : '#FFFFFF', borderColor: selectedStatus === status ? '#007D7D' : '#CBD5E1' }}>
                      {selectedStatus === status && <Check size={10} color="#FFFFFF" weight="bold" />}
                    </div>
                    {status === 'Active' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }} />}
                    {status === 'On hold' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />}
                    {status === 'Inactive' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />}
                    <span>{status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter 2: Customer type Dropdown */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Customer type</div>
            <button
              onClick={() => {
                setOpenTypeDropdown(!openTypeDropdown);
                setOpenStatusDropdown(false);
                setOpenManagerDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '130px',
              }}
            >
              <span>{selectedType}</span>
              <CaretDown size={14} color="#64748B" />
            </button>

            {/* Customer Type Dropdown Menu */}
            {openTypeDropdown && (
              <div style={{ position: 'absolute', top: '58px', left: 0, width: '160px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 30, padding: '6px' }}>
                {['All types', 'Corporate', 'SME', 'Government', 'Individual'].map((t) => (
                  <div
                    key={t}
                    onClick={() => { setSelectedType(t); setOpenTypeDropdown(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '7px 10px',
                      borderRadius: '6px',
                      fontSize: '12.5px',
                      color: '#334155',
                      cursor: 'pointer',
                      background: selectedType === t ? '#F1F5F9' : 'transparent',
                    }}
                  >
                    <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1px solid #CBD5E1', display: 'flex', alignItems: 'center', justifyContent: 'center', background: selectedType === t ? '#007D7D' : '#FFFFFF', borderColor: selectedType === t ? '#007D7D' : '#CBD5E1' }}>
                      {selectedType === t && <Check size={10} color="#FFFFFF" weight="bold" />}
                    </div>
                    {t === 'Corporate' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB' }} />}
                    {t === 'SME' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B' }} />}
                    {t === 'Government' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7C3AED' }} />}
                    {t === 'Individual' && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EC4899' }} />}
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filter 3: Account manager Dropdown */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, marginBottom: '2px' }}>Account manager</div>
            <button
              onClick={() => {
                setOpenManagerDropdown(!openManagerDropdown);
                setOpenStatusDropdown(false);
                setOpenTypeDropdown(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                height: '36px',
                padding: '0 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontSize: '12.5px',
                color: '#1E293B',
                cursor: 'pointer',
                minWidth: '150px',
              }}
            >
              <span>{selectedManager}</span>
              <CaretDown size={14} color="#64748B" />
            </button>

            {/* Account Manager Dropdown Menu */}
            {openManagerDropdown && (
              <div style={{ position: 'absolute', top: '58px', left: 0, width: '210px', background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', zIndex: 30, padding: '8px' }}>
                <div style={{ position: 'relative', marginBottom: '6px' }}>
                  <MagnifyingGlass size={13} color="#94A3B8" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    value={managerSearch}
                    onChange={(e) => setManagerSearch(e.target.value)}
                    placeholder="Search managers..."
                    style={{ width: '100%', height: '28px', paddingLeft: '26px', fontSize: '11.5px', borderRadius: '4px', border: '1px solid #CBD5E1', outline: 'none' }}
                  />
                </div>

                <div
                  onClick={() => { setSelectedManager('All managers'); setOpenManagerDropdown(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', background: selectedManager === 'All managers' ? '#F1F5F9' : 'transparent' }}
                >
                  <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '1px solid #007D7D', background: selectedManager === 'All managers' ? '#007D7D' : '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedManager === 'All managers' && <Check size={10} color="#FFFFFF" weight="bold" />}
                  </div>
                  <span>All managers</span>
                </div>

                {[
                  { name: 'John Doe', initials: 'JD', bg: '#2563EB' },
                  { name: 'Sarah Clarke', initials: 'SC', bg: '#4F46E5' },
                  { name: 'Michael Khan', initials: 'MK', bg: '#0D9488' },
                  { name: 'Lisa Turner', initials: 'LT', bg: '#9333EA' },
                ]
                  .filter((m) => m.name.toLowerCase().includes(managerSearch.toLowerCase()))
                  .map((mgr) => (
                    <div
                      key={mgr.name}
                      onClick={() => { setSelectedManager(mgr.name); setOpenManagerDropdown(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', background: selectedManager === mgr.name ? '#F1F5F9' : 'transparent' }}
                    >
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: mgr.bg, color: '#FFFFFF', fontSize: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {mgr.initials}
                      </div>
                      <span>{mgr.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Clear filters, Export, + New customer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Clear filters button */}
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
              color: '#0284C7',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <ArrowClockwise size={15} />
            <span>Clear filters</span>
          </button>

          {/* Export Button */}
          <button
            onClick={() => alert('Exporting customers list to CSV...')}
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

          {/* + New Customer Button */}
          <button
            onClick={() => setShowNewCustomerModal(true)}
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
            <span>New customer</span>
          </button>

        </div>

      </div>

      {/* 4. CUSTOMERS MAIN DATA TABLE */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Table Title Header */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
            Customers ({filteredCustomers.length})
          </h2>
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
                <th style={{ padding: '12px 14px' }}>Customer ⇅</th>
                <th style={{ padding: '12px 14px' }}>Type ⇅</th>
                <th style={{ padding: '12px 14px' }}>Primary contact</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Balance ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>Overdue ⇅</th>
                <th style={{ padding: '12px 14px' }}>Last invoice Date ⇅</th>
                <th style={{ padding: '12px 14px' }}>Payment terms</th>
                <th style={{ padding: '12px 14px' }}>Account manager ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Status ⇅</th>
                <th style={{ padding: '12px 14px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    No customers found matching the search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const isChecked = !!selectedRows[cust.id];
                  const hasOverdue = cust.overdue !== '£0.00';

                  return (
                    <tr
                      key={cust.id}
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
                          onChange={() => toggleSelectRow(cust.id)}
                          style={{ cursor: 'pointer', accentColor: '#007D7D' }}
                        />
                      </td>

                      {/* Customer Name & Code */}
                      <td
                        onClick={() => setSelectedCustomer(cust)}
                        style={{ padding: '12px 14px', cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div
                            style={{
                              width: '30px',
                              height: '30px',
                              borderRadius: '50%',
                              background: cust.avatarBg,
                              color: '#FFFFFF',
                              fontSize: '12px',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {cust.name.charAt(0)}
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600, color: '#0F172A', lineHeight: 1.2 }}>{cust.name}</span>
                            <span style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{cust.code}</span>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={{ padding: '12px 14px' }}>{renderTypeBadge(cust.type)}</td>

                      {/* Primary Contact */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ color: '#1E293B', fontWeight: 500 }}>{cust.contactName}</span>
                          <span style={{ fontSize: '11px', color: '#64748B' }}>{cust.contactEmail}</span>
                        </div>
                      </td>

                      {/* Balance */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600, color: '#0F172A' }}>
                        {cust.balance}
                      </td>

                      {/* Overdue */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', fontWeight: 600, color: hasOverdue ? '#DC2626' : '#64748B' }}>
                        {cust.overdue}
                      </td>

                      {/* Last Invoice Date */}
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{cust.lastInvoiceDate}</td>

                      {/* Payment Terms */}
                      <td style={{ padding: '12px 14px', color: '#475569' }}>{cust.paymentTerms}</td>

                      {/* Account Manager */}
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: cust.managerAvatarBg,
                              color: '#FFFFFF',
                              fontSize: '10px',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {cust.managerInitials}
                          </div>
                          <span style={{ color: '#334155', fontWeight: 500 }}>{cust.managerName}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>{renderStatusBadge(cust.status)}</td>

                      {/* Actions */}
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#94A3B8' }}>
                          <button
                            onClick={() => setSelectedCustomer(cust)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748B' }}
                          >
                            <DotsThreeVertical size={16} />
                          </button>
                          <button
                            onClick={() => setSelectedCustomer(cust)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#64748B' }}
                          >
                            <CaretRight size={14} />
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

        {/* Table Footer Pagination */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '12.5px', color: '#64748B' }}>
          <div>
            Showing 1–{filteredCustomers.length} of 156 customers
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Rows per page dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Rows per page</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12px', background: '#FFFFFF' }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Pagination Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ‹
              </button>
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: page === currentPage ? '1px solid #007D7D' : '1px solid #E2E8F0',
                    background: page === currentPage ? '#E6F4F4' : '#FFFFFF',
                    color: page === currentPage ? '#007D7D' : '#334155',
                    fontWeight: page === currentPage ? 700 : 500,
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  {page}
                </button>
              ))}
              <span>...</span>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', fontSize: '12px' }}>
                16
              </button>
              <button style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #E2E8F0', background: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                ›
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* MODAL: CREATE NEW CUSTOMER */}
      {showNewCustomerModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '540px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#E6F4F4', color: '#007D7D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building size={18} weight="bold" />
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', margin: 0 }}>Add New Customer Account</h3>
              </div>
              <button onClick={() => setShowNewCustomerModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); alert('New customer created successfully!'); setShowNewCustomerModal(false); }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Company Name</label>
                  <input type="text" placeholder="e.g. Apex Holdings Ltd" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Customer Type</label>
                    <select required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}>
                      <option value="Corporate">Corporate</option>
                      <option value="SME">SME</option>
                      <option value="Government">Government</option>
                      <option value="Individual">Individual</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Payment Terms</label>
                    <select required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}>
                      <option value="Net 30 days">Net 30 days</option>
                      <option value="Net 14 days">Net 14 days</option>
                      <option value="Net 60 days">Net 60 days</option>
                      <option value="Due on receipt">Due on receipt</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Primary Contact Name</label>
                    <input type="text" placeholder="e.g. Sarah Jenkins" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Contact Email</label>
                    <input type="email" placeholder="sarah@apex.co.uk" required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12.5px', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '6px' }}>Account Manager</label>
                  <select required style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none', background: '#FFFFFF' }}>
                    <option value="John Doe">John Doe</option>
                    <option value="Sarah Clarke">Sarah Clarke</option>
                    <option value="Michael Khan">Michael Khan</option>
                    <option value="Lisa Turner">Lisa Turner</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '22px' }}>
                <button type="button" onClick={() => setShowNewCustomerModal(false)} style={{ padding: '9px 16px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ padding: '9px 20px', borderRadius: '6px', border: 'none', background: '#007D7D', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Create Customer Account</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CUSTOMER DETAIL PREVIEW DRAWER */}
      {selectedCustomer && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '12px', width: '100%', maxWidth: '500px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: selectedCustomer.avatarBg, color: '#FFFFFF', fontSize: '14px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', margin: 0 }}>{selectedCustomer.name}</h3>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>{selectedCustomer.code}</span>
                </div>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC', padding: '16px', borderRadius: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Customer Type</span>
                <div>{renderTypeBadge(selectedCustomer.type)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Primary Contact</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedCustomer.contactName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Email</span>
                <span style={{ color: '#0284C7' }}>{selectedCustomer.contactEmail}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Outstanding Balance</span>
                <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedCustomer.balance}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Overdue Balance</span>
                <span style={{ fontWeight: 700, color: selectedCustomer.overdue !== '£0.00' ? '#DC2626' : '#64748B' }}>{selectedCustomer.overdue}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Payment Terms</span>
                <span style={{ color: '#0F172A' }}>{selectedCustomer.paymentTerms}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B' }}>Account Manager</span>
                <span style={{ fontWeight: 600, color: '#0F172A' }}>{selectedCustomer.managerName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#64748B' }}>Account Status</span>
                <div>{renderStatusBadge(selectedCustomer.status)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setSelectedCustomer(null)} style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #CBD5E1', background: '#FFFFFF', color: '#475569', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Close
              </button>
              <button onClick={() => { alert(`Creating new sales invoice for ${selectedCustomer.name}`); setSelectedCustomer(null); }} style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', background: '#007D7D', color: '#FFFFFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Create Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
