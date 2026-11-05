// GET /api/customers — list with optional filters
// POST /api/customers — create new customer

import { NextRequest, NextResponse } from 'next/server';
import { getAllCustomers, createCustomer, getCustomerStats } from '@/lib/services/customers.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const filters = {
      search: searchParams.get('search') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      type: searchParams.get('type') ?? undefined,
      manager: searchParams.get('manager') ?? undefined,
    };

    const includeStats = searchParams.get('stats') === 'true';
    const customers = getAllCustomers(filters);
    const stats = includeStats ? getCustomerStats() : undefined;

    return NextResponse.json({ data: customers, total: customers.length, stats });
  } catch (err) {
    console.error('[GET /api/customers]', err);
    return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const customer = createCustomer(body);
    return NextResponse.json({ data: customer }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/customers]', err);
    return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 });
  }
}
