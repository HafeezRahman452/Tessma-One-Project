// ─── Suppliers Service ────────────────────────────────────────────────────

import { getDb } from '../db';
import type { Supplier, SupplierCreateInput, SupplierUpdateInput } from '../types';

export interface SupplierFilters {
  search?: string;
  status?: string;
  type?: string;
}

export function getAllSuppliers(filters: SupplierFilters = {}): Supplier[] {
  const db = getDb();
  let query = 'SELECT * FROM suppliers WHERE 1=1';
  const params: Record<string, string> = {};

  if (filters.search) {
    query += ' AND (name LIKE @search OR code LIKE @search OR contact_name LIKE @search OR contact_email LIKE @search)';
    params.search = `%${filters.search}%`;
  }
  if (filters.status && filters.status !== 'All statuses') {
    query += ' AND status = @status';
    params.status = filters.status;
  }
  if (filters.type && filters.type !== 'All types') {
    query += ' AND type = @type';
    params.type = filters.type;
  }

  query += ' ORDER BY name ASC';
  return db.prepare(query).all(params) as Supplier[];
}

export function getSupplierById(id: number): Supplier | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM suppliers WHERE id = ?').get(id) as Supplier) ?? null;
}

export function createSupplier(data: SupplierCreateInput): Supplier {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO suppliers (name, code, type, contact_name, contact_email, balance, overdue, last_bill_date, payment_terms, status, avatar_bg)
    VALUES (@name, @code, @type, @contact_name, @contact_email, @balance, @overdue, @last_bill_date, @payment_terms, @status, @avatar_bg)
  `);
  const result = stmt.run(data);
  return getSupplierById(result.lastInsertRowid as number)!;
}

export function updateSupplier(id: number, data: SupplierUpdateInput): Supplier | null {
  const db = getDb();
  const existing = getSupplierById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data, updated_at: new Date().toISOString() };
  db.prepare(`
    UPDATE suppliers SET
      name = @name, code = @code, type = @type, contact_name = @contact_name,
      contact_email = @contact_email, balance = @balance, overdue = @overdue,
      last_bill_date = @last_bill_date, payment_terms = @payment_terms,
      status = @status, avatar_bg = @avatar_bg, updated_at = @updated_at
    WHERE id = @id
  `).run({ ...merged, id });

  return getSupplierById(id);
}

export function deleteSupplier(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM suppliers WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getSupplierStats() {
  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM suppliers').get() as { c: number }).c;
  const active = (db.prepare("SELECT COUNT(*) as c FROM suppliers WHERE status = 'Active'").get() as { c: number }).c;
  const totalPayables = (db.prepare('SELECT COALESCE(SUM(balance), 0) as s FROM suppliers').get() as { s: number }).s;
  return { total, active, total_payables: totalPayables };
}
