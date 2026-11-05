// GET /api/suppliers/[id]
// PUT /api/suppliers/[id]
// DELETE /api/suppliers/[id]

import { NextRequest, NextResponse } from 'next/server';
import { getSupplierById, updateSupplier, deleteSupplier } from '@/lib/services/suppliers.service';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const supplier = getSupplierById(Number(id));
    if (!supplier) return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    return NextResponse.json({ data: supplier });
  } catch (err) {
    console.error('[GET /api/suppliers/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch supplier' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const supplier = updateSupplier(Number(id), body);
    if (!supplier) return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    return NextResponse.json({ data: supplier });
  } catch (err) {
    console.error('[PUT /api/suppliers/[id]]', err);
    return NextResponse.json({ error: 'Failed to update supplier' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = deleteSupplier(Number(id));
    if (!deleted) return NextResponse.json({ error: 'Supplier not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/suppliers/[id]]', err);
    return NextResponse.json({ error: 'Failed to delete supplier' }, { status: 500 });
  }
}
