// GET /api/customers/[id]
// PUT /api/customers/[id]
// DELETE /api/customers/[id]

import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById, updateCustomer, deleteCustomer } from '@/lib/services/customers.service';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const customer = getCustomerById(Number(id));
    if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    return NextResponse.json({ data: customer });
  } catch (err) {
    console.error('[GET /api/customers/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const customer = updateCustomer(Number(id), body);
    if (!customer) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    return NextResponse.json({ data: customer });
  } catch (err) {
    console.error('[PUT /api/customers/[id]]', err);
    return NextResponse.json({ error: 'Failed to update customer' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = deleteCustomer(Number(id));
    if (!deleted) return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/customers/[id]]', err);
    return NextResponse.json({ error: 'Failed to delete customer' }, { status: 500 });
  }
}
