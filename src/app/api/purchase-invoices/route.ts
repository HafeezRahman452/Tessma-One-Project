// GET /api/purchase-invoices
// POST /api/purchase-invoices

import { NextRequest, NextResponse } from 'next/server';
import { getAllPurchaseInvoices, createPurchaseInvoice, getPurchaseInvoiceStats } from '@/lib/services/purchase-invoices.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const filters = {
      search: searchParams.get('search') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      supplier: searchParams.get('supplier') ?? undefined,
    };
    const includeStats = searchParams.get('stats') === 'true';
    const invoices = getAllPurchaseInvoices(filters);
    const stats = includeStats ? getPurchaseInvoiceStats() : undefined;
    return NextResponse.json({ data: invoices, total: invoices.length, stats });
  } catch (err) {
    console.error('[GET /api/purchase-invoices]', err);
    return NextResponse.json({ error: 'Failed to fetch purchase invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const invoice = createPurchaseInvoice(body);
    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/purchase-invoices]', err);
    return NextResponse.json({ error: 'Failed to create purchase invoice' }, { status: 500 });
  }
}
