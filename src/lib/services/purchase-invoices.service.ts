// ─── Purchase Invoices Service ────────────────────────────────────────────

import { getDb } from '../db';
import type { PurchaseInvoice, PurchaseInvoiceCreateInput, PurchaseInvoiceUpdateInput } from '../types';

export interface PurchaseInvoiceFilters {
  search?: string;
  status?: string;
  supplier?: string;
}

export function getAllPurchaseInvoices(filters: PurchaseInvoiceFilters = {}): PurchaseInvoice[] {
  const db = getDb();
  let query = 'SELECT * FROM purchase_invoices WHERE 1=1';
  const params: Record<string, string> = {};

  if (filters.search) {
    query += ' AND (bill_no LIKE @search OR supplier_name LIKE @search)';
    params.search = `%${filters.search}%`;
  }
  if (filters.status && filters.status !== 'All statuses') {
    query += ' AND status = @status';
    params.status = filters.status;
  }
  if (filters.supplier && filters.supplier !== 'All suppliers') {
    query += ' AND supplier_name = @supplier';
    params.supplier = filters.supplier;
  }

  query += ' ORDER BY issued_date DESC';
  return db.prepare(query).all(params) as PurchaseInvoice[];
}

export function getPurchaseInvoiceById(id: number): PurchaseInvoice | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM purchase_invoices WHERE id = ?').get(id) as PurchaseInvoice) ?? null;
}

export function createPurchaseInvoice(data: PurchaseInvoiceCreateInput): PurchaseInvoice {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO purchase_invoices (bill_no, supplier_name, issued_date, due_date, gross_amount, outstanding_amount, status)
    VALUES (@bill_no, @supplier_name, @issued_date, @due_date, @gross_amount, @outstanding_amount, @status)
  `);
  const result = stmt.run(data);
  return getPurchaseInvoiceById(result.lastInsertRowid as number)!;
}

export function updatePurchaseInvoice(id: number, data: PurchaseInvoiceUpdateInput): PurchaseInvoice | null {
  const db = getDb();
  const existing = getPurchaseInvoiceById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data, updated_at: new Date().toISOString() };
  db.prepare(`
    UPDATE purchase_invoices SET
      bill_no = @bill_no, supplier_name = @supplier_name, issued_date = @issued_date,
      due_date = @due_date, gross_amount = @gross_amount, outstanding_amount = @outstanding_amount,
      status = @status, updated_at = @updated_at
    WHERE id = @id
  `).run({ ...merged, id });

  return getPurchaseInvoiceById(id);
}

export function deletePurchaseInvoice(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM purchase_invoices WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getPurchaseInvoiceStats() {
  const db = getDb();
  const totalPayables = (db.prepare('SELECT COALESCE(SUM(outstanding_amount), 0) as s FROM purchase_invoices').get() as { s: number }).s;
  const overdue = (db.prepare("SELECT COUNT(*) as c FROM purchase_invoices WHERE status = 'Overdue'").get() as { c: number }).c;
  return { total_payables: totalPayables, overdue };
}
