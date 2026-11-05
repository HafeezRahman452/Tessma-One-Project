// GET /api/chart-of-accounts
// POST /api/chart-of-accounts

import { NextRequest, NextResponse } from 'next/server';
import { getAllAccounts, createAccount } from '@/lib/services/accounts.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const filters = {
      search: searchParams.get('search') ?? undefined,
      type: searchParams.get('type') ?? undefined,
      is_active: searchParams.has('is_active') ? searchParams.get('is_active') === 'true' : undefined,
    };
    const accounts = getAllAccounts(filters);
    return NextResponse.json({ data: accounts, total: accounts.length });
  } catch (err) {
    console.error('[GET /api/chart-of-accounts]', err);
    return NextResponse.json({ error: 'Failed to fetch accounts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const account = createAccount(body);
    return NextResponse.json({ data: account }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/chart-of-accounts]', err);
    return NextResponse.json({ error: 'Failed to create account' }, { status: 500 });
  }
}
