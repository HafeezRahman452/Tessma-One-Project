// GET /api/suppliers
// POST /api/suppliers

import { NextRequest, NextResponse } from 'next/server';
import { getAllSuppliers, createSupplier, getSupplierStats } from '@/lib/services/suppliers.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const filters = {
      search: searchParams.get('search') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      type: searchParams.get('type') ?? undefined,
    };
    const includeStats = searchParams.get('stats') === 'true';
    const suppliers = getAllSuppliers(filters);
    const stats = includeStats ? getSupplierStats() : undefined;
    return NextResponse.json({ data: suppliers, total: suppliers.length, stats });
  } catch (err) {
    console.error('[GET /api/suppliers]', err);
    return NextResponse.json({ error: 'Failed to fetch suppliers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supplier = createSupplier(body);
    return NextResponse.json({ data: supplier }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/suppliers]', err);
    return NextResponse.json({ error: 'Failed to create supplier' }, { status: 500 });
  }
}
