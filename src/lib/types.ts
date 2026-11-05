// ─── Shared TypeScript Types ───────────────────────────────────────────────

export interface Customer {
  id: number;
  name: string;
  code: string;
  type: 'Corporate' | 'SME' | 'Government' | 'Individual';
  contact_name: string;
  contact_email: string;
  balance: number;
  overdue: number;
  last_invoice_date: string | null;
  payment_terms: string;
  manager_name: string;
  manager_initials: string;
  manager_avatar_bg: string;
  status: 'Active' | 'Overdue' | 'On hold' | 'Inactive';
  avatar_bg: string;
  created_at: string;
  updated_at: string;
}

export type CustomerCreateInput = Omit<Customer, 'id' | 'created_at' | 'updated_at'>;
export type CustomerUpdateInput = Partial<CustomerCreateInput>;

// ───────────────────────────────────────────────────────────────────────────

export interface Invoice {
  id: number;
  invoice_no: string;
  po_ref: string;
  customer_name: string;
  tags: string; // JSON array stored as string
  issued_date: string;
  due_date: string;
  due_days: string;
  gross_amount: number;
  outstanding_amount: number;
  status: 'Draft' | 'Sent' | 'Overdue' | 'Part-paid' | 'Paid';
  created_at: string;
  updated_at: string;
}

export type InvoiceCreateInput = Omit<Invoice, 'id' | 'created_at' | 'updated_at'>;
export type InvoiceUpdateInput = Partial<InvoiceCreateInput>;

// ───────────────────────────────────────────────────────────────────────────

export interface Supplier {
  id: number;
  name: string;
  code: string;
  type: 'Corporate' | 'SME' | 'Government' | 'Individual';
  contact_name: string;
  contact_email: string;
  balance: number;
  overdue: number;
  last_bill_date: string | null;
  payment_terms: string;
  status: 'Active' | 'Overdue' | 'On hold' | 'Inactive';
  avatar_bg: string;
  created_at: string;
  updated_at: string;
}

export type SupplierCreateInput = Omit<Supplier, 'id' | 'created_at' | 'updated_at'>;
export type SupplierUpdateInput = Partial<SupplierCreateInput>;

// ───────────────────────────────────────────────────────────────────────────

export interface PurchaseInvoice {
  id: number;
  bill_no: string;
  supplier_name: string;
  issued_date: string;
  due_date: string;
  gross_amount: number;
  outstanding_amount: number;
  status: 'Draft' | 'Received' | 'Overdue' | 'Part-paid' | 'Paid';
  created_at: string;
  updated_at: string;
}

export type PurchaseInvoiceCreateInput = Omit<PurchaseInvoice, 'id' | 'created_at' | 'updated_at'>;
export type PurchaseInvoiceUpdateInput = Partial<PurchaseInvoiceCreateInput>;

// ───────────────────────────────────────────────────────────────────────────

export interface ChartOfAccount {
  id: number;
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  category: string;
  balance: number;
  is_active: boolean;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export type ChartOfAccountCreateInput = Omit<ChartOfAccount, 'id' | 'created_at' | 'updated_at'>;
export type ChartOfAccountUpdateInput = Partial<ChartOfAccountCreateInput>;

// ───────────────────────────────────────────────────────────────────────────

export interface BankAccount {
  id: number;
  name: string;
  account_number: string;
  sort_code: string;
  bank_name: string;
  currency: string;
  balance: number;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export type BankAccountCreateInput = Omit<BankAccount, 'id' | 'created_at' | 'updated_at'>;

// ───────────────────────────────────────────────────────────────────────────

export interface DashboardStats {
  customers: {
    total: number;
    active: number;
    overdue: number;
    total_receivables: number;
  };
  invoices: {
    draft: number;
    sent: number;
    overdue: number;
    part_paid: number;
    paid: number;
    total_outstanding: number;
  };
  suppliers: {
    total: number;
    active: number;
  };
  purchase_invoices: {
    total_payables: number;
    overdue: number;
  };
}

// ───────────────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  total?: number;
  page?: number;
  pageSize?: number;
}

export interface ApiError {
  error: string;
  message?: string;
}
