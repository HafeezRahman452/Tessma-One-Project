// GET /api/invoices/[id]
// PUT /api/invoices/[id]
// DELETE /api/invoices/[id]

import { NextRequest, NextResponse } from 'next/server';
import { getInvoiceById, updateInvoice, deleteInvoice } from '@/lib/services/invoices.service';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const invoice = getInvoiceById(Number(id));
    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    return NextResponse.json({ data: invoice });
  } catch (err) {
    console.error('[GET /api/invoices/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch invoice' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const invoice = updateInvoice(Number(id), body);
    if (!invoice) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    return NextResponse.json({ data: invoice });
  } catch (err) {
    console.error('[PUT /api/invoices/[id]]', err);
    return NextResponse.json({ error: 'Failed to update invoice' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = deleteInvoice(Number(id));
    if (!deleted) return NextResponse.json({ error: 'Invoice not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/invoices/[id]]', err);
    return NextResponse.json({ error: 'Failed to delete invoice' }, { status: 500 });
  }
}
