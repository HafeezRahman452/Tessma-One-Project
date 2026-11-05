// ─── Chart of Accounts Service ───────────────────────────────────────────

import { getDb } from '../db';
import type { ChartOfAccount, ChartOfAccountCreateInput, ChartOfAccountUpdateInput, BankAccount, BankAccountCreateInput } from '../types';

export interface AccountFilters {
  search?: string;
  type?: string;
  is_active?: boolean;
}

type RawAccount = Omit<ChartOfAccount, 'is_active'> & { is_active: number };

function rawToAccount(row: RawAccount): ChartOfAccount {
  return { ...row, is_active: row.is_active === 1 };
}

export function getAllAccounts(filters: AccountFilters = {}): ChartOfAccount[] {
  const db = getDb();
  let query = 'SELECT * FROM chart_of_accounts WHERE 1=1';
  const params: Record<string, string | number> = {};

  if (filters.search) {
    query += ' AND (code LIKE @search OR name LIKE @search OR category LIKE @search)';
    params.search = `%${filters.search}%`;
  }
  if (filters.type && filters.type !== 'All types') {
    query += ' AND type = @type';
    params.type = filters.type;
  }
  if (filters.is_active !== undefined) {
    query += ' AND is_active = @is_active';
    params.is_active = filters.is_active ? 1 : 0;
  }

  query += ' ORDER BY code ASC';
  return (db.prepare(query).all(params) as RawAccount[]).map(rawToAccount);
}

export function getAccountById(id: number): ChartOfAccount | null {
  const db = getDb();
  const row = db.prepare('SELECT * FROM chart_of_accounts WHERE id = ?').get(id) as RawAccount | undefined;
  if (!row) return null;
  return rawToAccount(row);
}

export function createAccount(data: ChartOfAccountCreateInput): ChartOfAccount {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO chart_of_accounts (code, name, type, category, balance, is_active, description)
    VALUES (@code, @name, @type, @category, @balance, @is_active, @description)
  `);
  const result = stmt.run({ ...data, is_active: data.is_active ? 1 : 0 });
  return getAccountById(result.lastInsertRowid as number)!;
}

export function updateAccount(id: number, data: ChartOfAccountUpdateInput): ChartOfAccount | null {
  const db = getDb();
  const existing = getAccountById(id);
  if (!existing) return null;

  const merged = { ...existing, ...data, updated_at: new Date().toISOString() };
  db.prepare(`
    UPDATE chart_of_accounts SET
      code = @code, name = @name, type = @type, category = @category,
      balance = @balance, is_active = @is_active, description = @description,
      updated_at = @updated_at
    WHERE id = @id
  `).run({ ...merged, is_active: merged.is_active ? 1 : 0, id });

  return getAccountById(id);
}

export function deleteAccount(id: number): boolean {
  const db = getDb();
  const result = db.prepare('DELETE FROM chart_of_accounts WHERE id = ?').run(id);
  return result.changes > 0;
}

// ── Bank Accounts ──────────────────────────────────────────────────────────

export function getAllBankAccounts(): BankAccount[] {
  const db = getDb();
  return db.prepare('SELECT * FROM bank_accounts ORDER BY name ASC').all() as BankAccount[];
}

export function getBankAccountById(id: number): BankAccount | null {
  const db = getDb();
  return (db.prepare('SELECT * FROM bank_accounts WHERE id = ?').get(id) as BankAccount) ?? null;
}

export function createBankAccount(data: BankAccountCreateInput): BankAccount {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO bank_accounts (name, account_number, sort_code, bank_name, currency, balance, status)
    VALUES (@name, @account_number, @sort_code, @bank_name, @currency, @balance, @status)
  `);
  const result = stmt.run(data);
  return getBankAccountById(result.lastInsertRowid as number)!;
}
