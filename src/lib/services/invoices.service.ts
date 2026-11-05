// ─── Invoices Service ─────────────────────────────────────────────────────

import { getDb } from '../db';
import type { Invoice, InvoiceCreateInput, InvoiceUpdateInput } from '../types';

export interface InvoiceFilters {
  search?: string;
  status?: string;
  customer?: string;
  startDate?: string;
  endDate?: string;
}

export function getAllInvoices(filters: InvoiceFilters = {}): Invoice[] {
  const db = getDb();
  let query = 'SELECT * FROM invoices WHERE 1=1';
  const params: Record<string, string> = {};

  if (filters.search) {
    query += ' AND (invoice_no LIKE @search OR po_ref LIKE @search OR customer_name LIKE @search)';
    params.search = `%${filters.search}%`;
  }
  if (filters.status && filters.status !== 'All statuses') {
    query += ' AND status = @status';
    params.status = filters.status;
  }
  if (filters.customer && filters.customer !== 'All customers') {
    query += ' AND customer_name = @customer';
    params.customer = filters.customer;
  }
  if (filters.startDate) {
    query += ' AND issued_date >= @startDate';
    params.startDate = filters.startDate;
  }
  if (filters.endDate) {
    query += ' AND issued_date <= @endDate';
    params.endDate = filters.endDate;
  }

  query += ' ORDER BY issued_date DESC';
  return db.prepare(query).all(params) as Invoice[];
}

export function getInvoiceById(id: number): Invoice | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM invoices WHERE id = ?').get(id) as Invoice) ?? null;
}

export function createInvoice(data: InvoiceCreateInput): Invoice {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO invoices (invoice_no, po_ref, customer_name, tags, issued_date, due_date, due_days, gross_amount, outstanding_amount, status)
    VALUES (@invoice_no, @po_ref, @customer_name, @tags, @issued_date, @due_date, @due_days, @gross_amount, @outstanding_amount, @status)
  `);
  const result = stmt.run(data);
  return getInvoiceById(result.lastInsertRowid as number)!;
}

export function updateInvoice(id: number, data: InvoiceUpdateInput): Invoice | null {
  const db = getDb();
  const existing = getInvoiceById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data, updated_at: new Date().toISOString() };
  db.prepare(`
    UPDATE invoices SET
      invoice_no = @invoice_no, po_ref = @po_ref, customer_name = @customer_name,
      tags = @tags, issued_date = @issued_date, due_date = @due_date, due_days = @due_days,
      gross_amount = @gross_amount, outstanding_amount = @outstanding_amount,
      status = @status, updated_at = @updated_at
    WHERE id = @id
  `).run({ ...merged, id });

  return getInvoiceById(id);
}

export function deleteInvoice(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM invoices WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getInvoiceStats() {
  const db = getDb();
  const byStatus = db.prepare(`
    SELECT status, COUNT(*) as count, COALESCE(SUM(outstanding_amount), 0) as outstanding
    FROM invoices GROUP BY status
  `).all() as { status: string; count: number; outstanding: number }[];

  const stats: Record<string, { count: number; outstanding: number }> = {};
  for (const row of byStatus) {
    stats[row.status] = { count: row.count, outstanding: row.outstanding };
  }

  return {
    draft: stats['Draft']?.count ?? 0,
    sent: stats['Sent']?.count ?? 0,
    overdue: stats['Overdue']?.count ?? 0,
    part_paid: stats['Part-paid']?.count ?? 0,
    paid: stats['Paid']?.count ?? 0,
    total_outstanding: byStatus.reduce((sum, r) => sum + r.outstanding, 0),
  };
}
