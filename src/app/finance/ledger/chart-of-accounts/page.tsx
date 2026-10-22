'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Bank,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  DownloadSimple,
  UploadSimple,
  DotsThree,
  MagnifyingGlass,
  Funnel,
  CaretLeft,
  CaretRight,
  CaretUp,
  CaretDown,
  Check,
  X,
  Buildings,
  ChartPieSlice,
  ChartBar,
  FileText,
  ArrowsDownUp,
  ArrowSquareOut,
} from '@phosphor-icons/react';

interface AccountItem {
  code: string;
  name: string;
  type: string; // 'Balance Sheet' | 'Income Statement'
  category: 'Assets' | 'Liabilities' | 'Equity' | 'Income' | 'Expenses';
  reportingGroup: string;
  status: 'Active' | 'Inactive';
  allowPosting: boolean;
  defaultTaxTreatment: string;
  // Detail panel specific
  parentAccount?: string;
  level?: number;
  normalBalance?: 'Debit' | 'Credit';
  controlAccount?: boolean;
  bankCashAccount?: boolean;
  description?: string;
}

export default function ChartOfAccountsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Assets' | 'Liabilities' | 'Equity' | 'Income' | 'Expenses'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCodes, setSelectedCodes] = useState<string[]>(['1000']);
  const [activeAccountCode, setActiveAccountCode] = useState<string>('1000');
  const [detailTab, setDetailTab] = useState<'Details' | 'Posting & Tax' | 'Notes' | 'Audit History'>('Details');
  const [rowsPerPage, setRowsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);

  // New account form state
  const [newAccCode, setNewAccCode] = useState('');
  const [newAccName, setNewAccName] = useState('');
  const [newAccCategory, setNewAccCategory] = useState<'Assets' | 'Liabilities' | 'Equity' | 'Income' | 'Expenses'>('Assets');
  const [newAccReportingGroup, setNewAccReportingGroup] = useState('Cash & Cash Equivalents');
  const [newAccTax, setNewAccTax] = useState('Standard (20%)');

  // Master accounts list matching screenshot
  const [accounts, setAccounts] = useState<AccountItem[]>([
    {
      code: '1000',
      name: 'Cash at Bank',
      type: 'Balance Sheet',
      category: 'Assets',
      reportingGroup: 'Cash & Cash Equivalents',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '1000 - Current Assets',
      level: 3,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: true,
      description: 'Main operating bank account for day-to-day transactions including receipts and payments.',
    },
    {
      code: '1010',
      name: 'Petty Cash',
      type: 'Balance Sheet',
      category: 'Assets',
      reportingGroup: 'Cash & Cash Equivalents',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '1000 - Current Assets',
      level: 3,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: true,
      description: 'Office petty cash float for minor day-to-day incidental expenses.',
    },
    {
      code: '1100',
      name: 'Accounts Receivable',
      type: 'Balance Sheet',
      category: 'Assets',
      reportingGroup: 'Trade Receivables',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '1100 - Current Assets',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: true,
      bankCashAccount: false,
      description: 'Trade debtors ledger tracking outstanding customer sales invoices.',
    },
    {
      code: '1200',
      name: 'Prepayments',
      type: 'Balance Sheet',
      category: 'Assets',
      reportingGroup: 'Other Current Assets',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Exempt (0%)',
      parentAccount: '1200 - Current Assets',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Expenses paid in advance of the accounting period to which they relate.',
    },
    {
      code: '1300',
      name: 'Inventory',
      type: 'Balance Sheet',
      category: 'Assets',
      reportingGroup: 'Inventory',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '1300 - Current Assets',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: true,
      bankCashAccount: false,
      description: 'Stock on hand held for sale or conversion in the normal course of trade.',
    },
    {
      code: '2000',
      name: 'Accounts Payable',
      type: 'Balance Sheet',
      category: 'Liabilities',
      reportingGroup: 'Trade Payables',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '2000 - Current Liabilities',
      level: 2,
      normalBalance: 'Credit',
      controlAccount: true,
      bankCashAccount: false,
      description: 'Amounts owed to suppliers for goods or services purchased on credit terms.',
    },
    {
      code: '2100',
      name: 'Accruals',
      type: 'Balance Sheet',
      category: 'Liabilities',
      reportingGroup: 'Other Current Liabilities',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Exempt (0%)',
      parentAccount: '2000 - Current Liabilities',
      level: 2,
      normalBalance: 'Credit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Expenses incurred during the period for which invoices have not yet been received.',
    },
    {
      code: '3000',
      name: 'Share Capital',
      type: 'Balance Sheet',
      category: 'Equity',
      reportingGroup: 'Equity',
      status: 'Active',
      allowPosting: false,
      defaultTaxTreatment: 'Exempt (0%)',
      parentAccount: '3000 - Equity',
      level: 1,
      normalBalance: 'Credit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Total value of equity shares issued to founders and shareholders.',
    },
    {
      code: '3100',
      name: 'Retained Earnings',
      type: 'Balance Sheet',
      category: 'Equity',
      reportingGroup: 'Equity',
      status: 'Active',
      allowPosting: false,
      defaultTaxTreatment: 'Exempt (0%)',
      parentAccount: '3000 - Equity',
      level: 1,
      normalBalance: 'Credit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Cumulative profits retained within the business after dividend distributions.',
    },
    {
      code: '4000',
      name: 'Sales Revenue',
      type: 'Income Statement',
      category: 'Income',
      reportingGroup: 'Sales Revenue',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '4000 - Operating Revenue',
      level: 2,
      normalBalance: 'Credit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Core revenue derived from billing customers for primary products and services.',
    },
    {
      code: '4100',
      name: 'Other Income',
      type: 'Income Statement',
      category: 'Income',
      reportingGroup: 'Other Income',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '4000 - Operating Revenue',
      level: 2,
      normalBalance: 'Credit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Incidental non-core earnings including interest, gains on disposal and rebates.',
    },
    {
      code: '5000',
      name: 'Cost of Sales',
      type: 'Income Statement',
      category: 'Expenses',
      reportingGroup: 'Cost of Sales',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '5000 - Direct Costs',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Direct expenditures directly attributable to the production of goods or delivery of services.',
    },
    {
      code: '6000',
      name: 'Staff Costs',
      type: 'Income Statement',
      category: 'Expenses',
      reportingGroup: 'Operating Expenses',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '6000 - Overheads',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Gross payroll, employer taxes, pension contributions, and staff welfare expenses.',
    },
    {
      code: '6100',
      name: 'Office Expenses',
      type: 'Income Statement',
      category: 'Expenses',
      reportingGroup: 'Operating Expenses',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '6000 - Overheads',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Office consumables, printing, stationery, refreshments and cleaning costs.',
    },
    {
      code: '6200',
      name: 'Professional Fees',
      type: 'Income Statement',
      category: 'Expenses',
      reportingGroup: 'Operating Expenses',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '6000 - Overheads',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Retainers and invoices from legal counsel, chartered accountants, and auditor fees.',
    },
    {
      code: '6300',
      name: 'IT & Software',
      type: 'Income Statement',
      category: 'Expenses',
      reportingGroup: 'Operating Expenses',
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: 'Standard (20%)',
      parentAccount: '6000 - Overheads',
      level: 2,
      normalBalance: 'Debit',
      controlAccount: false,
      bankCashAccount: false,
      description: 'Software subscription fees, cloud hosting, IT equipment maintenance and security services.',
    },
  ]);

  // Filter accounts
  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      const matchTab = activeTab === 'All' || acc.category === activeTab;
      const matchSearch =
        acc.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.reportingGroup.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [accounts, activeTab, searchQuery]);

  // Active account for right side pane
  const currentAccount = useMemo(() => {
    return accounts.find((a) => a.code === activeAccountCode) || accounts[0];
  }, [accounts, activeAccountCode]);

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedCodes.length === filteredAccounts.length) {
      setSelectedCodes([]);
    } else {
      setSelectedCodes(filteredAccounts.map((a) => a.code));
    }
  };

  const toggleSelectRow = (code: string) => {
    setSelectedCodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleAddNewAccount = () => {
    if (!newAccCode || !newAccName) return;
    const isIncome = newAccCategory === 'Income' || newAccCategory === 'Expenses';
    const newAcc: AccountItem = {
      code: newAccCode,
      name: newAccName,
      type: isIncome ? 'Income Statement' : 'Balance Sheet',
      category: newAccCategory,
      reportingGroup: newAccReportingGroup,
      status: 'Active',
      allowPosting: true,
      defaultTaxTreatment: newAccTax,
      parentAccount: `${newAccCode} - ${newAccCategory}`,
      level: 2,
      normalBalance: newAccCategory === 'Assets' || newAccCategory === 'Expenses' ? 'Debit' : 'Credit',
      controlAccount: false,
      bankCashAccount: false,
      description: `${newAccName} account created under ${newAccCategory}.`,
    };
    setAccounts((prev) => [...prev, newAcc]);
    setActiveAccountCode(newAcc.code);
    setSelectedCodes([newAcc.code]);
    setShowNewAccountModal(false);
    setNewAccCode('');
    setNewAccName('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '40px',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* 1. Page Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '14px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            Chart of Accounts
          </h1>
          <p
            style={{
              fontSize: '13px',
              color: '#64748B',
              marginTop: '4px',
              marginBottom: 0,
            }}
          >
            Maintain your chart of accounts, organise account structure and manage account settings.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setShowNewAccountModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#009A96',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0, 154, 150, 0.3)',
            }}
          >
            <Plus size={15} weight="bold" />
            <span>New account</span>
          </button>

          <button
            onClick={() => alert('Import Chart modal: Select CSV / Excel file to import accounts.')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              color: '#334155',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <UploadSimple size={15} weight="bold" />
            <span>Import chart</span>
          </button>

          <button
            onClick={() => alert('Exporting chart of accounts as CSV / XLSX...')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              color: '#334155',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <DownloadSimple size={15} weight="bold" />
            <span>Export</span>
          </button>

          <button
            onClick={() => alert('Options: Re-order hierarchy, Batch edit, Audit log')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: '#FFFFFF',
              color: '#334155',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            <DotsThree size={16} weight="bold" />
            <span>More</span>
            <CaretDown size={11} weight="bold" />
          </button>
        </div>
      </div>

      {/* 2. Top Metric KPI Summary Cards (5 Cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) repeat(4, minmax(0, 1fr)) minmax(0, 1fr)',
          gap: '14px',
        }}
      >
        {/* KPI 1: Total Active Accounts */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#E7F7F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10B981',
                flexShrink: 0,
              }}
            >
              <FileText size={22} weight="fill" />
            </div>
            <div>
              <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Total Active Accounts</div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
                1,248
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '3px', fontSize: '11px', color: '#64748B' }}>
                <span style={{ color: '#10B981', fontWeight: 600 }}>↑ 8%</span>
                <span>vs. previous period</span>
              </div>
            </div>
          </div>
          {/* Green Bar Trend graphic */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '24px' }}>
            <div style={{ width: '4px', height: '10px', background: '#10B981', borderRadius: '1px' }} />
            <div style={{ width: '4px', height: '16px', background: '#10B981', borderRadius: '1px' }} />
            <div style={{ width: '4px', height: '22px', background: '#10B981', borderRadius: '1px' }} />
          </div>
        </div>

        {/* KPI 2: Assets */}
        <div
          onClick={() => setActiveTab('Assets')}
          style={{
            background: '#FFFFFF',
            border: activeTab === 'Assets' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB',
              flexShrink: 0,
            }}
          >
            <Bank size={22} weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Assets</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
              412
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>33%</div>
          </div>
        </div>

        {/* KPI 3: Liabilities */}
        <div
          onClick={() => setActiveTab('Liabilities')}
          style={{
            background: '#FFFFFF',
            border: activeTab === 'Liabilities' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#FEF2F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EF4444',
              flexShrink: 0,
            }}
          >
            <Buildings size={22} weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Liabilities</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
              286
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>23%</div>
          </div>
        </div>

        {/* KPI 4: Equity */}
        <div
          onClick={() => setActiveTab('Equity')}
          style={{
            background: '#FFFFFF',
            border: activeTab === 'Equity' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#F5F3FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#8B5CF6',
              flexShrink: 0,
            }}
          >
            <ChartPieSlice size={22} weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Equity</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
              124
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>10%</div>
          </div>
        </div>

        {/* KPI 5: Income */}
        <div
          onClick={() => setActiveTab('Income')}
          style={{
            background: '#FFFFFF',
            border: activeTab === 'Income' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706',
              flexShrink: 0,
            }}
          >
            <ChartBar size={22} weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Income</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
              218
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>17%</div>
          </div>
        </div>

        {/* KPI 6: Expenses */}
        <div
          onClick={() => setActiveTab('Expenses')}
          style={{
            background: '#FFFFFF',
            border: activeTab === 'Expenses' ? '1.5px solid #009A96' : '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#E6F6F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#009A96',
              flexShrink: 0,
            }}
          >
            <FileText size={22} weight="fill" />
          </div>
          <div>
            <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500 }}>Expenses</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#0F172A', lineHeight: 1.15, marginTop: '2px' }}>
              208
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>17%</div>
          </div>
        </div>
      </div>

      {/* 3. Category Tab Pills & Search Filter Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'All', label: 'All accounts (1,248)' },
            { id: 'Assets', label: 'Assets (412)' },
            { id: 'Liabilities', label: 'Liabilities (286)' },
            { id: 'Equity', label: 'Equity (124)' },
            { id: 'Income', label: 'Income (218)' },
            { id: 'Expenses', label: 'Expenses (208)' },
          ].map((tab) => {
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  background: isTabActive ? '#2563EB' : '#FFFFFF',
                  color: isTabActive ? '#FFFFFF' : '#334155',
                  border: isTabActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '7px 14px',
                  fontSize: '12.5px',
                  fontWeight: isTabActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isTabActive ? '0 1px 3px rgba(37,99,235,0.2)' : 'none',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search & Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              position: 'relative',
              width: '280px',
            }}
          >
            <MagnifyingGlass
              size={15}
              color="#94A3B8"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              type="text"
              placeholder="Search accounts by code or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                fontSize: '12.5px',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                outline: 'none',
                background: '#FFFFFF',
                color: '#1E293B',
              }}
            />
            {searchQuery && (
              <X
                size={13}
                color="#94A3B8"
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
              />
            )}
          </div>

          <button
            onClick={() => setShowFilterModal((prev) => !prev)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '7px 12px',
              fontSize: '12.5px',
              fontWeight: 500,
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            <Funnel size={14} color="#64748B" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* 4. Main Two-Column Layout: Table (68%) & Details Panel (32%) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2.3fr) minmax(0, 1fr)',
          gap: '16px',
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT COLUMN: Data Table */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '780px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>
                  <th style={{ padding: '10px 10px', width: '32px' }}>
                    <button
                      onClick={toggleSelectAll}
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '4px',
                        border: selectedCodes.length === filteredAccounts.length ? '1px solid #2563EB' : '1.5px solid #CBD5E1',
                        background: selectedCodes.length === filteredAccounts.length ? '#2563EB' : '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      {selectedCodes.length === filteredAccounts.length && <Check size={11} color="#FFFFFF" weight="bold" />}
                    </button>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Account Code</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Account Name</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Type</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Category</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Reporting Group</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>Status</th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Allow Posting</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>Default Tax Treatment</span>
                      <ArrowsDownUp size={11} color="#94A3B8" />
                    </div>
                  </th>
                  <th style={{ padding: '10px 8px', width: '32px' }} />
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((acc) => {
                  const isSelected = selectedCodes.includes(acc.code);
                  const isRowActive = activeAccountCode === acc.code;

                  // Category badge colors matching screenshot
                  let catColor = '#2563EB';
                  let catBg = '#EFF6FF';
                  if (acc.category === 'Liabilities') {
                    catColor = '#EF4444';
                    catBg = '#FEF2F2';
                  } else if (acc.category === 'Equity') {
                    catColor = '#8B5CF6';
                    catBg = '#F5F3FF';
                  } else if (acc.category === 'Income') {
                    catColor = '#D97706';
                    catBg = '#FEF3C7';
                  } else if (acc.category === 'Expenses') {
                    catColor = '#009A96';
                    catBg = '#E6F6F6';
                  }

                  return (
                    <tr
                      key={acc.code}
                      onClick={() => setActiveAccountCode(acc.code)}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        background: isRowActive ? '#F0F9FF' : isSelected ? '#F8FAFC' : 'transparent',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isRowActive && !isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        if (!isRowActive && !isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      {/* Checkbox */}
                      <td
                        style={{ padding: '10px 10px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelectRow(acc.code);
                        }}
                      >
                        <button
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '4px',
                            border: isSelected ? '1px solid #2563EB' : '1.5px solid #CBD5E1',
                            background: isSelected ? '#2563EB' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          {isSelected && <Check size={11} color="#FFFFFF" weight="bold" />}
                        </button>
                      </td>

                      {/* Code */}
                      <td style={{ padding: '10px 8px', fontSize: '12.5px', fontWeight: 600, color: '#0F172A' }}>
                        {acc.code}
                      </td>

                      {/* Name */}
                      <td style={{ padding: '10px 8px', fontSize: '12.5px', fontWeight: 500, color: '#1E293B', whiteSpace: 'nowrap' }}>
                        {acc.name}
                      </td>

                      {/* Type Badge */}
                      <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#2563EB',
                            background: '#EFF6FF',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 500,
                          }}
                        >
                          {acc.type}
                        </span>
                      </td>

                      {/* Category Badge */}
                      <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            color: catColor,
                            background: catBg,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 500,
                          }}
                        >
                          {acc.category}
                        </span>
                      </td>

                      {/* Reporting Group */}
                      <td style={{ padding: '10px 8px', fontSize: '12px', color: '#475569', whiteSpace: 'nowrap' }}>
                        {acc.reportingGroup}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            color: '#10B981',
                            background: '#ECFDF5',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 600,
                          }}
                        >
                          {acc.status}
                        </span>
                      </td>

                      {/* Allow Posting */}
                      <td style={{ padding: '10px 8px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            color: acc.allowPosting ? '#10B981' : '#EF4444',
                            background: acc.allowPosting ? '#ECFDF5' : '#FEF2F2',
                            padding: '2px 8px',
                            borderRadius: '4px',
                            fontWeight: 600,
                          }}
                        >
                          {acc.allowPosting ? 'Yes' : 'No'}
                        </span>
                      </td>

                      {/* Default Tax Treatment */}
                      <td style={{ padding: '10px 8px', fontSize: '12px', color: '#475569', whiteSpace: 'nowrap' }}>
                        {acc.defaultTaxTreatment}
                      </td>

                      {/* More Menu */}
                      <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert(`Options for account: ${acc.code} - ${acc.name}`);
                          }}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                        >
                          <DotsThree size={16} weight="bold" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Footer: Pagination */}
          <div
            style={{
              padding: '12px 18px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#64748B',
            }}
          >
            <div>
              Showing 1–{filteredAccounts.length} of 1,248 accounts
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Pagination controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <CaretLeft size={12} weight="bold" />
                </button>

                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '6px',
                      border: currentPage === page ? '1px solid #2563EB' : '1px solid #E2E8F0',
                      background: currentPage === page ? '#2563EB' : '#FFFFFF',
                      color: currentPage === page ? '#FFFFFF' : '#334155',
                      fontWeight: currentPage === page ? 600 : 500,
                      cursor: 'pointer',
                      fontSize: '11.5px',
                    }}
                  >
                    {page}
                  </button>
                ))}

                <span>...</span>

                <button
                  onClick={() => setCurrentPage(78)}
                  style={{
                    width: '28px',
                    height: '26px',
                    borderRadius: '6px',
                    border: currentPage === 78 ? '1px solid #2563EB' : '1px solid #E2E8F0',
                    background: currentPage === 78 ? '#2563EB' : '#FFFFFF',
                    color: currentPage === 78 ? '#FFFFFF' : '#334155',
                    cursor: 'pointer',
                    fontSize: '11.5px',
                  }}
                >
                  78
                </button>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(78, p + 1))}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <CaretRight size={12} weight="bold" />
                </button>
              </div>

              {/* Rows per page dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Rows per page</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid #E2E8F0',
                    background: '#FFFFFF',
                    fontSize: '12px',
                    color: '#334155',
                    cursor: 'pointer',
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Account Detail Panel matching screenshot */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header of Right Panel */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2563EB',
                }}
              >
                <Bank size={20} weight="fill" />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>{currentAccount.code}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                  {currentAccount.name}
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: '11px',
                color: '#10B981',
                background: '#ECFDF5',
                padding: '3px 8px',
                borderRadius: '4px',
                fontWeight: 600,
              }}
            >
              {currentAccount.status}
            </span>
          </div>

          {/* Subtabs: Details, Posting & Tax, Notes, Audit History */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #E2E8F0',
              marginBottom: '16px',
              gap: '16px',
            }}
          >
            {[
              { id: 'Details', label: 'Details' },
              { id: 'Posting & Tax', label: 'Posting & Tax' },
              { id: 'Notes', label: 'Notes' },
              { id: 'Audit History', label: 'Audit History' },
            ].map((tab) => {
              const isTab = detailTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setDetailTab(tab.id as any)}
                  style={{
                    padding: '8px 0',
                    border: 'none',
                    borderBottom: isTab ? '2px solid #2563EB' : '2px solid transparent',
                    background: 'transparent',
                    color: isTab ? '#2563EB' : '#64748B',
                    fontWeight: isTab ? 600 : 500,
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1 Content: Details */}
          {detailTab === 'Details' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Account Information Section */}
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>
                  Account Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Account Code</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{currentAccount.code}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Account Name</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{currentAccount.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Type</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#2563EB',
                        background: '#EFF6FF',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 500,
                      }}
                    >
                      {currentAccount.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Category</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#2563EB',
                        background: '#EFF6FF',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 500,
                      }}
                    >
                      {currentAccount.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Reporting Group</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{currentAccount.reportingGroup}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Status</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#10B981',
                        background: '#ECFDF5',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      {currentAccount.status}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Allow Posting</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: currentAccount.allowPosting ? '#10B981' : '#EF4444',
                        background: currentAccount.allowPosting ? '#ECFDF5' : '#FEF2F2',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      {currentAccount.allowPosting ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Default Tax Treatment</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{currentAccount.defaultTaxTreatment}</span>
                  </div>
                </div>
              </div>

              {/* Hierarchy Section */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>
                  Hierarchy
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Parent Account</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563EB', fontWeight: 500 }}>
                      <span>{currentAccount.parentAccount || 'None'}</span>
                      <ArrowSquareOut size={12} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Level</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{currentAccount.level || 1}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Normal Balance</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#2563EB',
                        background: '#EFF6FF',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 500,
                      }}
                    >
                      {currentAccount.normalBalance || 'Debit'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Settings Section */}
              <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '12px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>
                  Additional Settings
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Control Account</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: currentAccount.controlAccount ? '#10B981' : '#EF4444',
                        background: currentAccount.controlAccount ? '#ECFDF5' : '#FEF2F2',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      {currentAccount.controlAccount ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#64748B' }}>Bank/Cash Account</span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: currentAccount.bankCashAccount ? '#10B981' : '#EF4444',
                        background: currentAccount.bankCashAccount ? '#ECFDF5' : '#FEF2F2',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 600,
                      }}
                    >
                      {currentAccount.bankCashAccount ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                    <span style={{ color: '#64748B' }}>Description</span>
                    <p style={{ color: '#334155', margin: 0, lineHeight: 1.4, fontSize: '11.5px' }}>
                      {currentAccount.description || 'No description provided.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Posting & Tax */}
          {detailTab === 'Posting & Tax' && (
            <div style={{ fontSize: '12px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Posting Status:</span>
                <strong style={{ color: '#0F172A' }}>Enabled</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Default Tax Code:</span>
                <strong style={{ color: '#0F172A' }}>VAT20 (Standard UK VAT 20%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Currency:</span>
                <strong style={{ color: '#0F172A' }}>GBP (£)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Reconciliation Required:</span>
                <strong style={{ color: '#0F172A' }}>Yes (Daily bank feed)</strong>
              </div>
            </div>
          )}

          {/* Tab 3: Notes */}
          {detailTab === 'Notes' && (
            <div style={{ fontSize: '12px', color: '#64748B' }}>
              <p style={{ margin: 0 }}>Linked to Barclays Corporate Account #812903. Direct automated bank reconciliation enabled.</p>
            </div>
          )}

          {/* Tab 4: Audit History */}
          {detailTab === 'Audit History' && (
            <div style={{ fontSize: '11.5px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>01 Apr 2025:</strong> Account created by Tenant Administrator</div>
              <div><strong>15 Apr 2025:</strong> Default tax updated to Standard 20%</div>
            </div>
          )}
        </div>
      </div>

      {/* 5. New Account Modal */}
      {showNewAccountModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              padding: '24px',
              width: '460px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Create New Account
              </h3>
              <X size={18} color="#64748B" style={{ cursor: 'pointer' }} onClick={() => setShowNewAccountModal(false)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  Account Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1020"
                  value={newAccCode}
                  onChange={(e) => setNewAccCode(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  Account Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Second Currency Account"
                  value={newAccName}
                  onChange={(e) => setNewAccName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  Category
                </label>
                <select
                  value={newAccCategory}
                  onChange={(e) => setNewAccCategory(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: '#FFFFFF',
                  }}
                >
                  <option value="Assets">Assets</option>
                  <option value="Liabilities">Liabilities</option>
                  <option value="Equity">Equity</option>
                  <option value="Income">Income</option>
                  <option value="Expenses">Expenses</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  Reporting Group
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cash & Cash Equivalents"
                  value={newAccReportingGroup}
                  onChange={(e) => setNewAccReportingGroup(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 500, color: '#334155', marginBottom: '4px' }}>
                  Default Tax Treatment
                </label>
                <select
                  value={newAccTax}
                  onChange={(e) => setNewAccTax(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #E2E8F0',
                    borderRadius: '6px',
                    fontSize: '13px',
                    background: '#FFFFFF',
                  }}
                >
                  <option value="Standard (20%)">Standard (20%)</option>
                  <option value="Exempt (0%)">Exempt (0%)</option>
                  <option value="Zero Rated (0%)">Zero Rated (0%)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button
                onClick={() => setShowNewAccountModal(false)}
                style={{
                  padding: '7px 14px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  color: '#64748B',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewAccount}
                style={{
                  padding: '7px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#009A96',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Save Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
