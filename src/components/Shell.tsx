'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SquaresFour,
  Bank,
  ChartLineUp,
  Briefcase,
  UsersThree,
  FileText,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Headset,
  ChartBar,
  Gear,
  CaretRight,
  CaretDown,
  CaretLeft,
  Sparkle,
  MagnifyingGlass,
  Bell,
  Question,
  LockSimple,
  X
} from '@phosphor-icons/react';
import { ALL_MODULES } from '@/lib/modules';
import { useSubscription } from '@/lib/SubscriptionContext';

const PHOSPHOR_ICONS: Record<string, React.ReactNode> = {
  SquaresFour: <SquaresFour size={18} weight="regular" />,
  Bank: <Bank size={18} weight="regular" />,
  ChartLineUp: <ChartLineUp size={18} weight="regular" />,
  Briefcase: <Briefcase size={18} weight="regular" />,
  UsersThree: <UsersThree size={18} weight="regular" />,
  FileText: <FileText size={18} weight="regular" />,
  ShieldCheck: <ShieldCheck size={18} weight="regular" />,
  ShoppingCart: <ShoppingCart size={18} weight="regular" />,
  Truck: <Truck size={18} weight="regular" />,
  Headset: <Headset size={18} weight="regular" />,
  ChartBar: <ChartBar size={18} weight="regular" />,
  Gear: <Gear size={18} weight="regular" />,
};

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isSubscribed, toggleSubscription } = useSubscription();
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    dashboard: true,
    finance: true,
  });
  const [expandedSubGroups, setExpandedSubGroups] = useState<Record<string, boolean>>({
    'Ledger': true,
  });
  const [showSubModal, setShowSubModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Determine current breadcrumbs based on route
  const getBreadcrumb = () => {
    if (pathname === '/' || pathname === '/dashboard') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <span>Dashboard</span>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Overview</span>
        </div>
      );
    }
    if (pathname === '/finance' || pathname === '/finance/overview') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <span>Finance</span>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Overview</span>
        </div>
      );
    }
    if (pathname === '/finance/vat' || pathname === '/finance/vat/vat-return') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/vat" style={{ color: '#64748B', textDecoration: 'none' }}>VAT</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>VAT return</span>
        </div>
      );
    }
    if (pathname === '/finance/branding') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Invoice Template Designer / Configuration</span>
        </div>
      );
    }
    if (pathname === '/finance/branding/template-preview') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Invoice Template Preview</span>
        </div>
      );
    }
    if (pathname === '/finance/sales-invoices') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Sales invoices</span>
        </div>
      );
    }
    if (pathname === '/finance/sales-invoices/new') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/sales-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Sales invoices</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>New invoice</span>
        </div>
      );
    }
    if (pathname === '/finance/sales/document-branding' || pathname === '/finance/sales-invoices/document-branding') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/sales-invoices" style={{ color: '#64748B', textDecoration: 'none' }}>Sales</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Document branding</span>
        </div>
      );
    }
    if (pathname === '/finance/branding/template-library') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Invoice Template Library</span>
        </div>
      );
    }
    if (pathname === '/finance/branding/invoice-selection') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Invoice Template Selection</span>
        </div>
      );
    }
    if (pathname === '/finance/branding/invoice-preview') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/branding" style={{ color: '#64748B', textDecoration: 'none' }}>Branding &amp; Company Identity</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Invoice Template Preview</span>
        </div>
      );
    }
    if (pathname === '/finance/banking/bank-accounts') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/banking/bank-accounts" style={{ color: '#64748B', textDecoration: 'none' }}>Banking</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Bank accounts</span>
        </div>
      );
    }
    if (pathname === '/finance/banking/reconciliations') {
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
          <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <Link href="/finance/banking/bank-accounts" style={{ color: '#64748B', textDecoration: 'none' }}>Banking</Link>
          <span style={{ color: '#94A3B8' }}>&gt;</span>
          <span style={{ color: '#0B1220', fontWeight: 600 }}>Bank reconciliation</span>
        </div>
      );
    }
    if (pathname.startsWith('/finance/')) {
      const parts = pathname.replace('/finance/', '').split('/').filter(Boolean);
      if (parts.length === 1) {
        const rawSub = parts[0];
        const formatted = rawSub.charAt(0).toUpperCase() + rawSub.slice(1).replace(/-/g, ' ');
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <span style={{ color: '#0B1220', fontWeight: 600 }}>{formatted}</span>
          </div>
        );
      } else if (parts.length >= 2) {
        const section = parts[0];
        const subFormatted = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ');
        const rawDetail = decodeURIComponent(parts[1]).replace(/-/g, ' ');
        const detailName = rawDetail.charAt(0).toUpperCase() + rawDetail.slice(1);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
            <Link href="/finance" style={{ color: '#64748B', textDecoration: 'none' }}>Finance</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <Link href={`/finance/${section}`} style={{ color: '#64748B', textDecoration: 'none' }}>{subFormatted}</Link>
            <span style={{ color: '#94A3B8' }}>&gt;</span>
            <span style={{ color: '#0B1220', fontWeight: 600 }}>{detailName}</span>
          </div>
        );
      }
    }
    const currentModule = ALL_MODULES.find(m => pathname.startsWith(m.href));
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#64748B' }}>
        <span>{currentModule ? currentModule.name : 'Modules'}</span>
        <span style={{ color: '#94A3B8' }}>&gt;</span>
        <span style={{ color: '#0B1220', fontWeight: 600 }}>Overview</span>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: 'var(--color-workspace)' }}>
      {/* FULL HEIGHT FIXED SIDEBAR */}
      <aside
        style={{
          width: isSidebarOpen ? 'var(--sidebar-width)' : '72px',
          transition: 'all 0.25s ease',
          backgroundColor: 'var(--color-nav-bg)',
          color: 'var(--color-nav-text)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          borderRight: '1px solid var(--color-nav-border)',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            height: '68px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            borderBottom: '1px solid var(--color-nav-border)',
            flexShrink: 0,
          }}
        >
          {/* Logo icon matching prototype: rounded teal square with white dot/grid */}
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '8px',
              background: '#007D7D',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 5px rgba(0, 125, 125, 0.3)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 6px)', gap: '3px' }}>
              <div style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '1.5px' }} />
              <div style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.7)', borderRadius: '1.5px' }} />
              <div style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.7)', borderRadius: '1.5px' }} />
              <div style={{ width: '6px', height: '6px', background: '#FFFFFF', borderRadius: '1.5px' }} />
            </div>
          </div>
          {isSidebarOpen && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  lineHeight: 1.1,
                }}
              >
                TESSMA
              </span>
              <span
                style={{
                  color: '#009A96',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  marginTop: '1px',
                }}
              >
                ONE
              </span>
            </div>
          )}
        </div>

                {/* MENU Label with Arrow Toggle Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isSidebarOpen ? 'space-between' : 'center',
            padding: isSidebarOpen ? '14px 18px 6px 18px' : '14px 8px 6px 8px',
            flexShrink: 0,
          }}
        >
          {isSidebarOpen && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-nav-text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              MENU
            </span>
          )}
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            title={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: '#009A96',
              border: 'none',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0, 154, 150, 0.4)',
              transition: 'transform 0.15s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            {isSidebarOpen ? <CaretLeft size={13} weight="bold" /> : <CaretRight size={13} weight="bold" />}
          </button>
        </div>

        {/* Scrollable Navigation List covering full middle */}
        <div
          className="sidebar-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
          }}
        >
          {ALL_MODULES.map((mod) => {
            const subscribed = isSubscribed(mod.id);
            const isDashboard = mod.id === 'dashboard';
            const isActive = isDashboard
              ? (pathname === '/' || pathname === '/dashboard' || pathname.startsWith('/dashboard/'))
              : (pathname === mod.href || pathname.startsWith(mod.href));
            const isExpanded = expandedModules[mod.id] ?? false;

            if (!subscribed) {
              return (
                <div
                  key={mod.id}
                  onClick={() => setShowSubModal(true)}
                  title={`${mod.name} is not in your current subscription. Click to enable.`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    opacity: 0.35,
                    cursor: 'pointer',
                    color: 'var(--color-nav-text-muted)',
                    fontSize: '13px',
                    fontWeight: 500,
                    userSelect: 'none',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {PHOSPHOR_ICONS[mod.icon] || <SquaresFour size={18} />}
                    </span>
                    {isSidebarOpen && <span style={{ whiteSpace: "nowrap" }}>{mod.name}</span>}
                  </div>
                  <LockSimple size={13} color="var(--color-nav-text-muted)" />
                </div>
              );
            }

            return (
              <div key={mod.id} style={{ display: 'flex', flexDirection: 'column' }}>
                <Link
                  href={isDashboard ? '/' : mod.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: isActive ? 'var(--color-nav-active)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--color-nav-text)',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                >
                  {/* Left active teal bar indicator */}
                  {isActive && (
                    <div
                      style={{
                        position: 'absolute',
                        left: '-10px',
                        top: '5px',
                        bottom: '5px',
                        width: '3px',
                        borderRadius: '0 3px 3px 0',
                        backgroundColor: '#009A96',
                      }}
                    />
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: isActive ? '#009A96' : 'var(--color-nav-text-muted)',
                      }}
                    >
                      {PHOSPHOR_ICONS[mod.icon] || <SquaresFour size={18} />}
                    </span>
                    {isSidebarOpen && <span style={{ whiteSpace: "nowrap" }}>{mod.name}</span>}
                  </div>

                  {isSidebarOpen && mod.subItems && mod.subItems.length > 0 && (
                    <span
                      onClick={(e) => toggleExpand(mod.id, e)}
                      style={{
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--color-nav-text-muted)',
                      }}
                    >
                      {isExpanded ? <CaretDown size={12} weight="bold" /> : <CaretRight size={12} weight="bold" />}
                    </span>
                  )}
                </Link>

                {/* Sub items dropdown */}
                {isSidebarOpen && mod.subItems && isExpanded && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '32px',
                      paddingTop: '2px',
                      paddingBottom: '4px',
                      gap: '2px',
                    }}
                  >
                    {mod.subItems.map((sub) => {
                      if (sub.children && sub.children.length > 0) {
                        const isGroupExpanded = expandedSubGroups[sub.name] ?? true;
                        const isAnyChildActive = sub.children.some((c) => pathname === c.href || pathname.startsWith(c.href));

                        return (
                          <div key={sub.name} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <div
                              onClick={() =>
                                setExpandedSubGroups((prev) => ({
                                  ...prev,
                                  [sub.name]: !isGroupExpanded,
                                }))
                              }
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '6px 10px',
                                borderRadius: '4px',
                                fontSize: '12.5px',
                                color: isAnyChildActive ? '#FFFFFF' : 'var(--color-nav-text-muted)',
                                fontWeight: 500,
                                cursor: 'pointer',
                                userSelect: 'none',
                              }}
                            >
                              <span>{sub.name}</span>
                              <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-nav-text-muted)' }}>
                                {isGroupExpanded ? <CaretDown size={11} weight="bold" /> : <CaretRight size={11} weight="bold" />}
                              </span>
                            </div>

                            {isGroupExpanded && (
                              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px', gap: '2px' }}>
                                {sub.children.map((child) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <Link
                                      key={child.name}
                                      href={child.href}
                                      style={{
                                        padding: '5px 10px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        color: isChildActive ? '#FFFFFF' : 'var(--color-nav-text-muted)',
                                        fontWeight: isChildActive ? 600 : 400,
                                        background: isChildActive ? '#007D7D' : 'transparent',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '7px',
                                        textDecoration: 'none',
                                      }}
                                    >
                                      <span
                                        style={{
                                          width: '4px',
                                          height: '4px',
                                          borderRadius: '50%',
                                          background: isChildActive ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                                        }}
                                      />
                                      <span>{child.name}</span>
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      }

                      const isSubActive =
                        (sub.href === '/' && (pathname === '/' || pathname === '/dashboard')) ||
                        (sub.href !== '/' && (pathname === sub.href || (sub.href !== '/finance' && pathname.startsWith(sub.href + '/'))));

                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '4px',
                            fontSize: '12.5px',
                            color: isSubActive ? '#FFFFFF' : 'var(--color-nav-text-muted)',
                            fontWeight: isSubActive ? 600 : 400,
                            background: isSubActive ? 'rgba(0, 125, 125, 0.25)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}
                        >
                          <span
                            style={{
                              width: '4px',
                              height: '4px',
                              borderRadius: '50%',
                              background: isSubActive ? '#009A96' : 'rgba(255,255,255,0.25)',
                            }}
                          />
                          <span>{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom User Card / Tenant Profile */}
        <div
          style={{
            borderTop: '1px solid var(--color-nav-border)',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-nav-surface)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#243350',
                color: '#FFFFFF',
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #334466',
              }}
            >
              JD
            </div>
            {isSidebarOpen && (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#E6EBF4', lineHeight: 1.2 }}>
                  John Doe
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-nav-text-muted)' }}>Managing Director</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowSubModal(true)}
            title="Subscription & Modules Manager"
            style={{
              padding: '6px',
              borderRadius: '6px',
              color: 'var(--color-nav-text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Gear size={16} />
          </button>
        </div>
      </aside>

      {/* MAIN VIEWPORT: HEADER + CONTENT */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh',
          marginLeft: isSidebarOpen ? 'var(--sidebar-width)' : '72px',
          width: isSidebarOpen ? 'calc(100vw - var(--sidebar-width))' : 'calc(100vw - 72px)',
          transition: 'all 0.25s ease',
        }}
      >
        {/* TOP HEADER */}
        <header
          style={{
            height: 'var(--header-height)',
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          {/* LEFT: Breadcrumb is strictly inside Header on top left */}
          <div style={{ display: 'flex', alignItems: 'center', minWidth: '180px' }}>
            {getBreadcrumb()}
          </div>

          {/* MIDDLE: Search Bar */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '420px', margin: '0 20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#F8FAFC',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-ui)',
                padding: '6px 12px',
                width: '100%',
                color: 'var(--color-text-secondary)',
                fontSize: '13px',
              }}
            >
              <MagnifyingGlass size={15} color="var(--color-text-muted)" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all modules..."
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '12.5px',
                  width: '100%',
                  color: 'var(--color-text-primary)',
                }}
              />
              <span
                style={{
                  fontSize: '10.5px',
                  color: 'var(--color-text-muted)',
                  border: '1px solid var(--color-border)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  background: '#FFFFFF',
                  fontWeight: 500,
                }}
              >
                ⌘K
              </span>
            </div>
          </div>

          {/* RIGHT: Ask TESSMA AI, Bell, Help, John Doe Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Ask TESSMA AI Button */}
            <button
              onClick={() => alert('Ask TESSMA AI: Intelligence assistant is ready across all connected modules.')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                height: '36px',
                padding: '0 14px',
                borderRadius: 'var(--radius-ui)',
                background: '#007D7D',
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: 500,
                boxShadow: '0 1px 2px rgba(0, 125, 125, 0.2)',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#009A96')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007D7D')}
            >
              <Sparkle size={15} weight="fill" />
              <span>Ask TESSMA AI</span>
            </button>

            {/* Notification Bell */}
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-ui)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-primary)',
                }}
              >
                <Bell size={17} />
              </button>
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#EF4444',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF',
                }}
              >
                3
              </span>
            </div>

            {/* Help Question Icon */}
            <button
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-ui)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-secondary)',
              }}
            >
              <Question size={18} />
            </button>

            {/* User Profile in Top Right: JD - John Doe */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                paddingLeft: '6px',
                borderLeft: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#3B82F6',
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                JD
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
                  John Doe
                </span>
                <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>Managing Director</span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <main style={{ flex: 1, padding: '24px 28px 48px', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      {/* SUBSCRIPTION SIMULATOR MODAL */}
      {showSubModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(3px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            className="animate-fade-in"
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '620px',
              boxShadow: 'var(--shadow-dropdown)',
              border: '1px solid var(--color-border)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '90vh',
            }}
          >
            <div
              style={{
                padding: '20px 24px',
                borderBottom: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Manage Tenant Subscriptions
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  Enable or disable modules to test the subscription filtering across the dashboard.
                </p>
              </div>
              <button
                onClick={() => setShowSubModal(false)}
                style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  padding: '4px 8px',
                }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '20px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ALL_MODULES.map((mod) => {
                const isAlwaysOn = mod.id === 'dashboard' || mod.id === 'settings';
                const active = isSubscribed(mod.id);

                return (
                  <div
                    key={mod.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: active ? 'var(--color-border)' : '#F1F5F9',
                      background: active ? '#FAFCFE' : '#F8FAFC',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: active ? 'var(--color-brand-teal-soft)' : '#F1F5F9',
                          color: active ? '#007D7D' : '#94A3B8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {PHOSPHOR_ICONS[mod.icon] || <SquaresFour size={18} />}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 600, color: active ? 'var(--color-text-primary)' : '#94A3B8' }}>
                            {mod.name}
                          </span>
                          {isAlwaysOn && (
                            <span
                              style={{
                                fontSize: '10.5px',
                                background: '#E2E8F0',
                                color: '#475569',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                fontWeight: 500,
                              }}
                            >
                              Core Platform
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                          {mod.description}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isAlwaysOn ? (
                        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                          Required
                        </span>
                      ) : (
                        <button
                          onClick={() => toggleSubscription(mod.id)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            background: active ? '#007D7D' : '#FFFFFF',
                            color: active ? '#FFFFFF' : 'var(--color-text-secondary)',
                            border: `1px solid ${active ? '#007D7D' : 'var(--color-border)'}`,
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {active ? 'Subscribed' : 'Enable'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                padding: '14px 24px',
                borderTop: '1px solid var(--color-border)',
                background: '#F8FAFC',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={() => setShowSubModal(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: '#007D7D',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
