// GET /api/purchase-invoices/[id]
// PUT /api/purchase-invoices/[id]
// DELETE /api/purchase-invoices/[id]

import { NextRequest, NextResponse } from 'next/server';
import { getPurchaseInvoiceById, updatePurchaseInvoice, deletePurchaseInvoice } from '@/lib/services/purchase-invoices.service';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const invoice = getPurchaseInvoiceById(Number(id));
    if (!invoice) return NextResponse.json({ error: 'Purchase invoice not found' }, { status: 404 });
    return NextResponse.json({ data: invoice });
  } catch (err) {
    console.error('[GET /api/purchase-invoices/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch purchase invoice' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const invoice = updatePurchaseInvoice(Number(id), body);
    if (!invoice) return NextResponse.json({ error: 'Purchase invoice not found' }, { status: 404 });
    return NextResponse.json({ data: invoice });
  } catch (err) {
    console.error('[PUT /api/purchase-invoices/[id]]', err);
    return NextResponse.json({ error: 'Failed to update purchase invoice' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = deletePurchaseInvoice(Number(id));
    if (!deleted) return NextResponse.json({ error: 'Purchase invoice not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/purchase-invoices/[id]]', err);
    return NextResponse.json({ error: 'Failed to delete purchase invoice' }, { status: 500 });
  }
}
