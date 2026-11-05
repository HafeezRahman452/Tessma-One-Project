// ─── Schema + Seed ────────────────────────────────────────────────────────
// Creates all tables and seeds initial data from existing hardcoded values.
// Runs only once — skips if data already exists.

import Database from 'better-sqlite3';

export function runSeed(db: Database.Database): void {
  // ── CREATE TABLES ────────────────────────────────────────────────────────

  db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      name                TEXT NOT NULL,
      code                TEXT NOT NULL UNIQUE,
      type                TEXT NOT NULL DEFAULT 'Corporate',
      contact_name        TEXT NOT NULL DEFAULT '',
      contact_email       TEXT NOT NULL DEFAULT '',
      balance             REAL NOT NULL DEFAULT 0,
      overdue             REAL NOT NULL DEFAULT 0,
      last_invoice_date   TEXT,
      payment_terms       TEXT NOT NULL DEFAULT 'Net 30 days',
      manager_name        TEXT NOT NULL DEFAULT '',
      manager_initials    TEXT NOT NULL DEFAULT '',
      manager_avatar_bg   TEXT NOT NULL DEFAULT '#2563EB',
      status              TEXT NOT NULL DEFAULT 'Active',
      avatar_bg           TEXT NOT NULL DEFAULT '#2563EB',
      created_at          TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      invoice_no          TEXT NOT NULL UNIQUE,
      po_ref              TEXT NOT NULL DEFAULT '',
      customer_name       TEXT NOT NULL,
      tags                TEXT NOT NULL DEFAULT '[]',
      issued_date         TEXT NOT NULL,
      due_date            TEXT NOT NULL,
      due_days            TEXT NOT NULL DEFAULT '',
      gross_amount        REAL NOT NULL DEFAULT 0,
      outstanding_amount  REAL NOT NULL DEFAULT 0,
      status              TEXT NOT NULL DEFAULT 'Draft',
      created_at          TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS suppliers (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      name                TEXT NOT NULL,
      code                TEXT NOT NULL UNIQUE,
      type                TEXT NOT NULL DEFAULT 'Corporate',
      contact_name        TEXT NOT NULL DEFAULT '',
      contact_email       TEXT NOT NULL DEFAULT '',
      balance             REAL NOT NULL DEFAULT 0,
      overdue             REAL NOT NULL DEFAULT 0,
      last_bill_date      TEXT,
      payment_terms       TEXT NOT NULL DEFAULT 'Net 30 days',
      status              TEXT NOT NULL DEFAULT 'Active',
      avatar_bg           TEXT NOT NULL DEFAULT '#2563EB',
      created_at          TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS purchase_invoices (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      bill_no             TEXT NOT NULL UNIQUE,
      supplier_name       TEXT NOT NULL,
      issued_date         TEXT NOT NULL,
      due_date            TEXT NOT NULL,
      gross_amount        REAL NOT NULL DEFAULT 0,
      outstanding_amount  REAL NOT NULL DEFAULT 0,
      status              TEXT NOT NULL DEFAULT 'Draft',
      created_at          TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS chart_of_accounts (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      code                TEXT NOT NULL UNIQUE,
      name                TEXT NOT NULL,
      type                TEXT NOT NULL,
      category            TEXT NOT NULL DEFAULT '',
      balance             REAL NOT NULL DEFAULT 0,
      is_active           INTEGER NOT NULL DEFAULT 1,
      description         TEXT,
      created_at          TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bank_accounts (
      id                  INTEGER PRIMARY KEY AUTOINCREMENT,
      name                TEXT NOT NULL,
      account_number      TEXT NOT NULL,
      sort_code           TEXT NOT NULL DEFAULT '',
      bank_name           TEXT NOT NULL DEFAULT '',
      currency            TEXT NOT NULL DEFAULT 'GBP',
      balance             REAL NOT NULL DEFAULT 0,
      status              TEXT NOT NULL DEFAULT 'Active',
      created_at          TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  // ── SEED CUSTOMERS ────────────────────────────────────────────────────────
  const customerCount = (db.prepare('SELECT COUNT(*) as c FROM customers').get() as { c: number }).c;
  if (customerCount === 0) {
    const insertCustomer = db.prepare(`
      INSERT INTO customers (name, code, type, contact_name, contact_email, balance, overdue, last_invoice_date, payment_terms, manager_name, manager_initials, manager_avatar_bg, status, avatar_bg)
      VALUES (@name, @code, @type, @contact_name, @contact_email, @balance, @overdue, @last_invoice_date, @payment_terms, @manager_name, @manager_initials, @manager_avatar_bg, @status, @avatar_bg)
    `);

    const customers = [
      { name: 'ABC Ltd', code: 'CUS-001', type: 'Corporate', contact_name: 'Sarah Clarke', contact_email: 'sarah.clarke@abcltd.co.uk', balance: 18250, overdue: 0, last_invoice_date: '2025-04-12', payment_terms: 'Net 30 days', manager_name: 'John Doe', manager_initials: 'JD', manager_avatar_bg: '#2563EB', status: 'Active', avatar_bg: '#2563EB' },
      { name: 'Global Tech Solutions', code: 'CUS-002', type: 'Corporate', contact_name: 'James Wilson', contact_email: 'j.wilson@globaltech.co.uk', balance: 24500, overdue: 4500, last_invoice_date: '2025-04-10', payment_terms: 'Net 34 days', manager_name: 'Sarah Clarke', manager_initials: 'SC', manager_avatar_bg: '#4F46E5', status: 'Overdue', avatar_bg: '#059669' },
      { name: 'Smith & Co', code: 'CUS-003', type: 'SME', contact_name: 'Emma Roberts', contact_email: 'emma@smithsanco.co.uk', balance: 8750, overdue: 2300, last_invoice_date: '2025-04-02', payment_terms: 'Net 14 days', manager_name: 'Michael Khan', manager_initials: 'MK', manager_avatar_bg: '#0D9488', status: 'Overdue', avatar_bg: '#10B981' },
      { name: 'Bright Futures Ltd', code: 'CUS-004', type: 'Corporate', contact_name: 'David Chen', contact_email: 'd.chen@brightfutures.co.uk', balance: 0, overdue: 0, last_invoice_date: '2025-04-05', payment_terms: 'Net 30 days', manager_name: 'Lisa Turner', manager_initials: 'LT', manager_avatar_bg: '#9333EA', status: 'Active', avatar_bg: '#9333EA' },
      { name: 'City Council', code: 'CUS-005', type: 'Government', contact_name: 'Laura Green', contact_email: 'laura.green@citycouncil.gov.uk', balance: 12400, overdue: 0, last_invoice_date: '2025-04-08', payment_terms: 'Net 30 days', manager_name: 'John Doe', manager_initials: 'JD', manager_avatar_bg: '#2563EB', status: 'Active', avatar_bg: '#0284C7' },
      { name: 'Tech Dynamics', code: 'CUS-006', type: 'SME', contact_name: 'Robert Taylor', contact_email: 'robert@techdynamics.co.uk', balance: 5200, overdue: 5200, last_invoice_date: '2025-04-01', payment_terms: 'Net 10 days', manager_name: 'Sarah Clarke', manager_initials: 'SC', manager_avatar_bg: '#4F46E5', status: 'Overdue', avatar_bg: '#D97706' },
      { name: 'NextGen Systems', code: 'CUS-007', type: 'Corporate', contact_name: 'Sophie Martin', contact_email: 'sophie@nextgensystems.co.uk', balance: 18900, overdue: 0, last_invoice_date: '2025-04-14', payment_terms: 'Net 30 days', manager_name: 'Michael Khan', manager_initials: 'MK', manager_avatar_bg: '#0D9488', status: 'Active', avatar_bg: '#2563EB' },
      { name: 'Urban Developments', code: 'CUS-008', type: 'Corporate', contact_name: 'Oliver Brown', contact_email: 'oliver@urbandev.co.uk', balance: 32100, overdue: 12690, last_invoice_date: '2025-04-10', payment_terms: 'Net 30 days', manager_name: 'Lisa Turner', manager_initials: 'LT', manager_avatar_bg: '#9333EA', status: 'Overdue', avatar_bg: '#7C3AED' },
      { name: 'Riverside Group', code: 'CUS-009', type: 'SME', contact_name: 'Natalie Scott', contact_email: 'natalie@riverside.co.uk', balance: 3800, overdue: 0, last_invoice_date: '2025-04-07', payment_terms: 'Net 14 days', manager_name: 'John Doe', manager_initials: 'JD', manager_avatar_bg: '#2563EB', status: 'Active', avatar_bg: '#059669' },
      { name: 'Summit Holdings', code: 'CUS-010', type: 'Corporate', contact_name: 'Daniel Wright', contact_email: 'daniel@summitholdings.co.uk', balance: 27450, overdue: 3200, last_invoice_date: '2025-04-11', payment_terms: 'Net 30 days', manager_name: 'Sarah Clarke', manager_initials: 'SC', manager_avatar_bg: '#4F46E5', status: 'Overdue', avatar_bg: '#0284C7' },
    ];

    const insertMany = db.transaction((rows: typeof customers) => {
      for (const row of rows) insertCustomer.run(row);
    });
    insertMany(customers);
  }

  // ── SEED INVOICES ─────────────────────────────────────────────────────────
  const invoiceCount = (db.prepare('SELECT COUNT(*) as c FROM invoices').get() as { c: number }).c;
  if (invoiceCount === 0) {
    const insertInvoice = db.prepare(`
      INSERT INTO invoices (invoice_no, po_ref, customer_name, tags, issued_date, due_date, due_days, gross_amount, outstanding_amount, status)
      VALUES (@invoice_no, @po_ref, @customer_name, @tags, @issued_date, @due_date, @due_days, @gross_amount, @outstanding_amount, @status)
    `);

    const invoices = [
      { invoice_no: 'INV-2025-0423', po_ref: 'PO-4881', customer_name: 'ABC Ltd', tags: JSON.stringify(['Key Account', 'Web Design']), issued_date: '2025-04-15', due_date: '2025-05-15', due_days: '30 days', gross_amount: 16320, outstanding_amount: 16320, status: 'Overdue' },
      { invoice_no: 'INV-2025-0422', po_ref: 'PO-4873', customer_name: 'Tech Solutions Ltd', tags: JSON.stringify(['Standard']), issued_date: '2025-04-14', due_date: '2025-05-14', due_days: '29 days', gross_amount: 4800, outstanding_amount: 2400, status: 'Part-paid' },
      { invoice_no: 'INV-2025-0421', po_ref: 'PO-48576', customer_name: 'Global Services Group', tags: JSON.stringify(['Key Account', 'Consultancy']), issued_date: '2025-04-10', due_date: '2025-05-11', due_days: '25 days', gross_amount: 8400, outstanding_amount: 8400, status: 'Overdue' },
      { invoice_no: 'INV-2025-0420', po_ref: 'PO-48575', customer_name: 'Riverside Estates', tags: JSON.stringify(['Standard']), issued_date: '2025-04-05', due_date: '2025-05-05', due_days: '20 days', gross_amount: 2800, outstanding_amount: 0, status: 'Paid' },
      { invoice_no: 'INV-2025-0419', po_ref: 'PO-48532', customer_name: 'City Council', tags: JSON.stringify(['Government', 'Maintenance']), issued_date: '2025-04-02', due_date: '2025-05-02', due_days: '17 days', gross_amount: 5600, outstanding_amount: 5600, status: 'Overdue' },
      { invoice_no: 'INV-2025-0418', po_ref: 'PO-48531', customer_name: 'Mainway Retail Ltd', tags: JSON.stringify(['Standard']), issued_date: '2025-04-01', due_date: '2025-05-01', due_days: '16 days', gross_amount: 1200, outstanding_amount: 0, status: 'Paid' },
      { invoice_no: 'INV-2025-0417', po_ref: 'PO-48669', customer_name: 'Acme Trading Co', tags: JSON.stringify(['Standard']), issued_date: '2025-03-28', due_date: '2025-04-27', due_days: '12 days', gross_amount: 3750, outstanding_amount: 1875, status: 'Part-paid' },
      { invoice_no: 'INV-2025-0416', po_ref: 'PO-44865', customer_name: 'Bright Future Ltd', tags: JSON.stringify(['New Customer', 'Training']), issued_date: '2025-03-25', due_date: '2025-04-24', due_days: '9 days', gross_amount: 4500, outstanding_amount: 0, status: 'Sent' },
      { invoice_no: 'INV-2025-0415', po_ref: 'PO-44853', customer_name: 'Summit Healthcare', tags: JSON.stringify(['Standard']), issued_date: '2025-03-20', due_date: '2025-04-19', due_days: '4 days', gross_amount: 6900, outstanding_amount: 6900, status: 'Overdue' },
      { invoice_no: 'INV-2025-0414', po_ref: 'PO-44860', customer_name: 'Western Logistics', tags: JSON.stringify(['Standard']), issued_date: '2025-03-18', due_date: '2025-04-17', due_days: '2 days', gross_amount: 3200, outstanding_amount: 0, status: 'Paid' },
    ];

    const insertMany = db.transaction((rows: typeof invoices) => {
      for (const row of rows) insertInvoice.run(row);
    });
    insertMany(invoices);
  }

  // ── SEED SUPPLIERS ────────────────────────────────────────────────────────
  const supplierCount = (db.prepare('SELECT COUNT(*) as c FROM suppliers').get() as { c: number }).c;
  if (supplierCount === 0) {
    const insertSupplier = db.prepare(`
      INSERT INTO suppliers (name, code, type, contact_name, contact_email, balance, overdue, last_bill_date, payment_terms, status, avatar_bg)
      VALUES (@name, @code, @type, @contact_name, @contact_email, @balance, @overdue, @last_bill_date, @payment_terms, @status, @avatar_bg)
    `);

    const suppliers = [
      { name: 'Apex Supplies Ltd', code: 'SUP-001', type: 'Corporate', contact_name: 'Mark Hudson', contact_email: 'mark@apexsupplies.co.uk', balance: 12400, overdue: 0, last_bill_date: '2025-04-10', payment_terms: 'Net 30 days', status: 'Active', avatar_bg: '#2563EB' },
      { name: 'BuildRight Materials', code: 'SUP-002', type: 'SME', contact_name: 'Priya Patel', contact_email: 'priya@buildright.co.uk', balance: 8750, overdue: 2200, last_bill_date: '2025-04-05', payment_terms: 'Net 14 days', status: 'Overdue', avatar_bg: '#059669' },
      { name: 'CloudNet Services', code: 'SUP-003', type: 'Corporate', contact_name: 'Alex Stone', contact_email: 'alex@cloudnet.co.uk', balance: 5500, overdue: 0, last_bill_date: '2025-04-08', payment_terms: 'Net 30 days', status: 'Active', avatar_bg: '#9333EA' },
      { name: 'Delta Logistics', code: 'SUP-004', type: 'Corporate', contact_name: 'Karen Miles', contact_email: 'karen@deltalogistics.co.uk', balance: 19800, overdue: 6700, last_bill_date: '2025-04-02', payment_terms: 'Net 45 days', status: 'Overdue', avatar_bg: '#D97706' },
      { name: 'EcoPrint Solutions', code: 'SUP-005', type: 'SME', contact_name: 'Tom Baker', contact_email: 'tom@ecoprint.co.uk', balance: 3200, overdue: 0, last_bill_date: '2025-03-28', payment_terms: 'Net 21 days', status: 'Active', avatar_bg: '#10B981' },
    ];

    const insertMany = db.transaction((rows: typeof suppliers) => {
      for (const row of rows) insertSupplier.run(row);
    });
    insertMany(suppliers);
  }

  // ── SEED PURCHASE INVOICES ────────────────────────────────────────────────
  const piCount = (db.prepare('SELECT COUNT(*) as c FROM purchase_invoices').get() as { c: number }).c;
  if (piCount === 0) {
    const insertPi = db.prepare(`
      INSERT INTO purchase_invoices (bill_no, supplier_name, issued_date, due_date, gross_amount, outstanding_amount, status)
      VALUES (@bill_no, @supplier_name, @issued_date, @due_date, @gross_amount, @outstanding_amount, @status)
    `);

    const pis = [
      { bill_no: 'BILL-2025-0101', supplier_name: 'Apex Supplies Ltd', issued_date: '2025-04-10', due_date: '2025-05-10', gross_amount: 5400, outstanding_amount: 5400, status: 'Received' },
      { bill_no: 'BILL-2025-0100', supplier_name: 'BuildRight Materials', issued_date: '2025-04-05', due_date: '2025-04-19', gross_amount: 2200, outstanding_amount: 2200, status: 'Overdue' },
      { bill_no: 'BILL-2025-0099', supplier_name: 'CloudNet Services', issued_date: '2025-04-08', due_date: '2025-05-08', gross_amount: 1800, outstanding_amount: 0, status: 'Paid' },
      { bill_no: 'BILL-2025-0098', supplier_name: 'Delta Logistics', issued_date: '2025-04-02', due_date: '2025-05-17', gross_amount: 6700, outstanding_amount: 6700, status: 'Overdue' },
      { bill_no: 'BILL-2025-0097', supplier_name: 'EcoPrint Solutions', issued_date: '2025-03-28', due_date: '2025-04-18', gross_amount: 980, outstanding_amount: 0, status: 'Paid' },
    ];

    const insertMany = db.transaction((rows: typeof pis) => {
      for (const row of rows) insertPi.run(row);
    });
    insertMany(pis);
  }

  // ── SEED CHART OF ACCOUNTS ────────────────────────────────────────────────
  const coaCount = (db.prepare('SELECT COUNT(*) as c FROM chart_of_accounts').get() as { c: number }).c;
  if (coaCount === 0) {
    const insertCoa = db.prepare(`
      INSERT INTO chart_of_accounts (code, name, type, category, balance, is_active, description)
      VALUES (@code, @name, @type, @category, @balance, @is_active, @description)
    `);

    const accounts = [
      { code: '1000', name: 'Cash & Cash Equivalents', type: 'Asset', category: 'Current Assets', balance: 125000, is_active: 1, description: 'Bank and petty cash balances' },
      { code: '1100', name: 'Accounts Receivable', type: 'Asset', category: 'Current Assets', balance: 480000, is_active: 1, description: 'Amounts owed by customers' },
      { code: '1200', name: 'Prepaid Expenses', type: 'Asset', category: 'Current Assets', balance: 12500, is_active: 1, description: 'Expenses paid in advance' },
      { code: '1500', name: 'Property & Equipment', type: 'Asset', category: 'Fixed Assets', balance: 350000, is_active: 1, description: 'Tangible long-term assets' },
      { code: '1510', name: 'Accumulated Depreciation', type: 'Asset', category: 'Fixed Assets', balance: -85000, is_active: 1, description: 'Accumulated depreciation on fixed assets' },
      { code: '2000', name: 'Accounts Payable', type: 'Liability', category: 'Current Liabilities', balance: 67500, is_active: 1, description: 'Amounts owed to suppliers' },
      { code: '2100', name: 'VAT Payable', type: 'Liability', category: 'Current Liabilities', balance: 18400, is_active: 1, description: 'VAT collected and owed to HMRC' },
      { code: '2200', name: 'Accrued Liabilities', type: 'Liability', category: 'Current Liabilities', balance: 9800, is_active: 1, description: 'Expenses incurred but not yet paid' },
      { code: '2500', name: 'Long-term Loans', type: 'Liability', category: 'Non-current Liabilities', balance: 200000, is_active: 1, description: 'Bank loans due after 12 months' },
      { code: '3000', name: "Owner's Equity", type: 'Equity', category: 'Equity', balance: 500000, is_active: 1, description: 'Owner capital contribution' },
      { code: '3100', name: 'Retained Earnings', type: 'Equity', category: 'Equity', balance: 106800, is_active: 1, description: 'Accumulated profits' },
      { code: '4000', name: 'Sales Revenue', type: 'Revenue', category: 'Revenue', balance: 890000, is_active: 1, description: 'Income from product/service sales' },
      { code: '4100', name: 'Service Revenue', type: 'Revenue', category: 'Revenue', balance: 210000, is_active: 1, description: 'Income from professional services' },
      { code: '5000', name: 'Cost of Goods Sold', type: 'Expense', category: 'Direct Costs', balance: 420000, is_active: 1, description: 'Direct cost of products sold' },
      { code: '6000', name: 'Salaries & Wages', type: 'Expense', category: 'Operating Expenses', balance: 185000, is_active: 1, description: 'Employee salaries and wages' },
      { code: '6100', name: 'Rent & Rates', type: 'Expense', category: 'Operating Expenses', balance: 48000, is_active: 1, description: 'Office and premises rent' },
      { code: '6200', name: 'Utilities', type: 'Expense', category: 'Operating Expenses', balance: 12000, is_active: 1, description: 'Electricity, gas, water' },
      { code: '6300', name: 'Marketing & Advertising', type: 'Expense', category: 'Operating Expenses', balance: 22000, is_active: 1, description: 'Marketing costs' },
      { code: '6400', name: 'IT & Software', type: 'Expense', category: 'Operating Expenses', balance: 18500, is_active: 1, description: 'Software subscriptions and IT costs' },
    ];

    const insertMany = db.transaction((rows: typeof accounts) => {
      for (const row of rows) insertCoa.run(row);
    });
    insertMany(accounts);
  }

  // ── SEED BANK ACCOUNTS ────────────────────────────────────────────────────
  const bankCount = (db.prepare('SELECT COUNT(*) as c FROM bank_accounts').get() as { c: number }).c;
  if (bankCount === 0) {
    const insertBank = db.prepare(`
      INSERT INTO bank_accounts (name, account_number, sort_code, bank_name, currency, balance, status)
      VALUES (@name, @account_number, @sort_code, @bank_name, @currency, @balance, @status)
    `);

    const banks = [
      { name: 'Main Current Account', account_number: '12345678', sort_code: '12-34-56', bank_name: 'Barclays', currency: 'GBP', balance: 125000, status: 'Active' },
      { name: 'Euro Account', account_number: '87654321', sort_code: '65-43-21', bank_name: 'HSBC', currency: 'EUR', balance: 42500, status: 'Active' },
      { name: 'Savings Reserve', account_number: '11223344', sort_code: '11-22-33', bank_name: 'Lloyds', currency: 'GBP', balance: 80000, status: 'Active' },
    ];

    const insertMany = db.transaction((rows: typeof banks) => {
      for (const row of rows) insertBank.run(row);
    });
    insertMany(banks);
  }
}
