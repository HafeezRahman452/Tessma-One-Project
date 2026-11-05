// GET /api/invoices — list with optional filters
// POST /api/invoices — create new invoice

import { NextRequest, NextResponse } from 'next/server';
import { getAllInvoices, createInvoice, getInvoiceStats } from '@/lib/services/invoices.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const filters = {
      search: searchParams.get('search') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      customer: searchParams.get('customer') ?? undefined,
      startDate: searchParams.get('startDate') ?? undefined,
      endDate: searchParams.get('endDate') ?? undefined,
    };

    const includeStats = searchParams.get('stats') === 'true';
    const invoices = getAllInvoices(filters);
    const stats = includeStats ? getInvoiceStats() : undefined;

    return NextResponse.json({ data: invoices, total: invoices.length, stats });
  } catch (err) {
    console.error('[GET /api/invoices]', err);
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const invoice = createInvoice(body);
    return NextResponse.json({ data: invoice }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/invoices]', err);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}
