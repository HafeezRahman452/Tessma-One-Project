// GET /api/dashboard — aggregated stats for all KPI cards

import { NextResponse } from 'next/server';
import { getCustomerStats } from '@/lib/services/customers.service';
import { getInvoiceStats } from '@/lib/services/invoices.service';
import { getSupplierStats } from '@/lib/services/suppliers.service';
import { getPurchaseInvoiceStats } from '@/lib/services/purchase-invoices.service';

export async function GET() {
  try {
    const [customers, invoices, suppliers, purchaseInvoices] = [
      getCustomerStats(),
      getInvoiceStats(),
      getSupplierStats(),
      getPurchaseInvoiceStats(),
    ];

    return NextResponse.json({
      data: { customers, invoices, suppliers, purchase_invoices: purchaseInvoices },
    });
  } catch (err) {
    console.error('[GET /api/dashboard]', err);
    return NextResponse.json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
  }
}
