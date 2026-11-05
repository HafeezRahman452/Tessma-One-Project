// ─── Customers Service ────────────────────────────────────────────────────

import { getDb } from '../db';
import type { Customer, CustomerCreateInput, CustomerUpdateInput } from '../types';

export interface CustomerFilters {
  search?: string;
  status?: string;
  type?: string;
  manager?: string;
}

export function getAllCustomers(filters: CustomerFilters = {}): Customer[] {
  const db = getDb();
  let query = 'SELECT * FROM customers WHERE 1=1';
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
  if (filters.manager && filters.manager !== 'All managers') {
    query += ' AND manager_name = @manager';
    params.manager = filters.manager;
  }

  query += ' ORDER BY name ASC';
  return db.prepare(query).all(params) as Customer[];
}

export function getCustomerById(id: number): Customer | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM customers WHERE id = ?').get(id) as Customer) ?? null;
}

export function createCustomer(data: CustomerCreateInput): Customer {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO customers (name, code, type, contact_name, contact_email, balance, overdue,
      last_invoice_date, payment_terms, manager_name, manager_initials, manager_avatar_bg, status, avatar_bg)
    VALUES (@name, @code, @type, @contact_name, @contact_email, @balance, @overdue,
      @last_invoice_date, @payment_terms, @manager_name, @manager_initials, @manager_avatar_bg, @status, @avatar_bg)
  `);
  const result = stmt.run(data);
  return getCustomerById(result.lastInsertRowid as number)!;
}

export function updateCustomer(id: number, data: CustomerUpdateInput): Customer | null {
  const db = getDb();
  const existing = getCustomerById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data, updated_at: new Date().toISOString() };
  db.prepare(`
    UPDATE customers SET
      name = @name, code = @code, type = @type, contact_name = @contact_name,
      contact_email = @contact_email, balance = @balance, overdue = @overdue,
      last_invoice_date = @last_invoice_date, payment_terms = @payment_terms,
      manager_name = @manager_name, manager_initials = @manager_initials,
      manager_avatar_bg = @manager_avatar_bg, status = @status, avatar_bg = @avatar_bg,
      updated_at = @updated_at
    WHERE id = @id
  `).run({ ...merged, id });

  return getCustomerById(id);
}

export function deleteCustomer(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  return result.changes > 0;
}

export function getCustomerStats() {
  const db = getDb();
  const total = (db.prepare('SELECT COUNT(*) as c FROM customers').get() as { c: number }).c;
  const active = (db.prepare("SELECT COUNT(*) as c FROM customers WHERE status = 'Active'").get() as { c: number }).c;
  const overdue = (db.prepare("SELECT COUNT(*) as c FROM customers WHERE status = 'Overdue'").get() as { c: number }).c;
  const totalReceivables = (db.prepare('SELECT COALESCE(SUM(balance), 0) as s FROM customers').get() as { s: number }).s;

  return { total, active, overdue, total_receivables: totalReceivables };
}
