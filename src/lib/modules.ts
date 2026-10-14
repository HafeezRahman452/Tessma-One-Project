export interface SubItemDefinition {
  name: string;
  href: string;
  badge?: string;
  children?: { name: string; href: string; badge?: string }[];
}

export interface ModuleDefinition {
  id: string;
  name: string;
  icon: string;
  href: string;
  description: string;
  category: 'core' | 'operations' | 'management' | 'system';
  badge?: string;
  subItems?: SubItemDefinition[];
}

export const ALL_MODULES: ModuleDefinition[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: 'SquaresFour',
    href: '/dashboard',
    description: 'A consolidated view of your business performance across all modules.',
    category: 'core',
    subItems: [
      { name: 'Overview', href: '/' },
      { name: 'My tasks', href: '/dashboard/tasks' },
      { name: 'Approvals', href: '/dashboard/approvals' },
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: 'Bank',
    href: '/finance',
    description: 'Enterprise billing, multi-currency invoicing, VAT returns and ledger reconciliations.',
    category: 'operations',
    subItems: [
      { name: 'Overview', href: '/finance' },
      { name: 'Sales invoices', href: '/finance/sales-invoices' },
      { name: 'Purchase invoices', href: '/finance/purchase-invoices' },
      { name: 'Credit notes', href: '/finance/credit-notes' },
      { name: 'Customers', href: '/finance/customers' },
      { name: 'Suppliers', href: '/finance/suppliers' },
      { name: 'Payments', href: '/finance/payments' },
      { name: 'VAT', href: '/finance/vat' },
      {
        name: 'Banking',
        href: '/finance/banking/bank-accounts',
        children: [
          { name: 'Bank accounts', href: '/finance/banking/bank-accounts' },
          { name: 'Bank transactions', href: '/finance/payments' },
          { name: 'Reconciliations', href: '/finance/payments' },
          { name: 'Cash flow forecast', href: '/finance/payments' },
        ],
      },
      {
        name: 'Ledger',
        href: '/finance/ledger/trial-balance',
        children: [
          { name: 'Chart of accounts', href: '/finance/general-ledger' },
          { name: 'Financial periods', href: '/finance/general-ledger' },
          { name: 'Journals', href: '/finance/general-ledger' },
          { name: 'General ledger', href: '/finance/general-ledger' },
          { name: 'Trial balance', href: '/finance/ledger/trial-balance' },
        ],
      },
      { name: 'Reports', href: '/finance/reports' },
      {
        name: 'Branding & Company Identity',
        href: '/finance/branding',
        children: [
          { name: 'Invoice Library', href: '/finance/branding/template-library' },
        ],
      },
      { name: 'Settings', href: '/finance/settings' },
    ]
  },
  {
    id: 'sales-crm',
    name: 'Sales & CRM',
    icon: 'ChartLineUp',
    href: '/sales-crm',
    description: 'Pipeline tracking, contacts, deal stages, client communications and lead intelligence.',
    category: 'operations',
    subItems: [
      { name: 'Pipelines', href: '/sales-crm/pipelines' },
      { name: 'Contacts', href: '/sales-crm/contacts' },
      { name: 'Deals', href: '/sales-crm/deals' },
    ]
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: 'Briefcase',
    href: '/projects',
    description: 'Milestones, Gantt schedules, resource allocation and deliverable tracking.',
    category: 'operations',
    subItems: [
      { name: 'Active Projects', href: '/projects/active' },
      { name: 'Milestones', href: '/projects/milestones' },
      { name: 'Timesheets', href: '/projects/timesheets' },
    ]
  },
  {
    id: 'hr',
    name: 'HR',
    icon: 'UsersThree',
    href: '/hr',
    description: 'Employee profiles, leave management, onboarding workflows and payroll sync.',
    category: 'management',
    subItems: [
      { name: 'Directory', href: '/hr/directory' },
      { name: 'Leave Requests', href: '/hr/leave' },
      { name: 'Recruitment', href: '/hr/recruitment' },
    ]
  },
  {
    id: 'contracts',
    name: 'Contracts',
    icon: 'FileText',
    href: '/contracts',
    description: 'Master agreements, NDAs, SLA renewals, e-signatures and clause repository.',
    category: 'management',
    subItems: [
      { name: 'All Contracts', href: '/contracts/all' },
      { name: 'Expiring Soon', href: '/contracts/expiring' },
      { name: 'Templates', href: '/contracts/templates' },
    ]
  },
  {
    id: 'compliance',
    name: 'Compliance',
    icon: 'ShieldCheck',
    href: '/compliance',
    description: 'Regulatory audit readiness, risk registers, security certifications and GDPR checks.',
    category: 'management',
    subItems: [
      { name: 'Risk Register', href: '/compliance/risks' },
      { name: 'Audit Logs', href: '/compliance/audits' },
      { name: 'Policies', href: '/compliance/policies' },
    ]
  },
  {
    id: 'procurement',
    name: 'Procurement',
    icon: 'ShoppingCart',
    href: '/procurement',
    description: 'Vendor management, purchase orders, approval matrix and RFQ submissions.',
    category: 'operations',
    subItems: [
      { name: 'Purchase Orders', href: '/procurement/orders' },
      { name: 'Vendors', href: '/procurement/vendors' },
    ]
  },
  {
    id: 'it-assets',
    name: 'IT & Assets',
    icon: 'Truck',
    href: '/it-assets',
    description: 'Hardware tracking, software licenses, lifecycle replacements and device assignments.',
    category: 'operations',
    subItems: [
      { name: 'Device Inventory', href: '/it-assets/devices' },
      { name: 'Software Licenses', href: '/it-assets/licenses' },
    ]
  },
  {
    id: 'service-support',
    name: 'Service & Support',
    icon: 'Headset',
    href: '/service-support',
    description: 'Helpdesk tickets, SLA tracking, customer satisfaction scores and incident management.',
    category: 'operations',
    subItems: [
      { name: 'Tickets', href: '/service-support/tickets' },
      { name: 'SLA Dashboard', href: '/service-support/sla' },
      { name: 'Knowledge Base', href: '/service-support/kb' },
    ]
  },
  {
    id: 'reports',
    name: 'Reports',
    icon: 'ChartBar',
    href: '/reports',
    description: 'Cross-module business intelligence, automated scheduled exports and executive reports.',
    category: 'management',
    subItems: [
      { name: 'Financial Reports', href: '/reports/finance' },
      { name: 'Custom Builder', href: '/reports/builder' },
    ]
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: 'Gear',
    href: '/settings',
    description: 'Tenant administration, subscriptions, team members, integrations and security.',
    category: 'system',
    subItems: [
      { name: 'Subscription & Modules', href: '/settings' },
      { name: 'Organisation Profile', href: '/settings/profile' },
      { name: 'Security & SSO', href: '/settings/security' },
    ]
  }
];

export const INITIAL_SUBSCRIBED_MODULES = [
  'dashboard',
  'finance',
  'sales-crm',
  'projects',
  'hr',
  'contracts',
  'compliance',
  'procurement',
  'it-assets',
  'service-support',
  'reports',
  'settings'
];
