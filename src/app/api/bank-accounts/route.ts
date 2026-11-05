// GET /api/bank-accounts
// POST /api/bank-accounts

import { NextRequest, NextResponse } from 'next/server';
import { getAllBankAccounts, createBankAccount } from '@/lib/services/accounts.service';

export async function GET() {
  try {
    const accounts = getAllBankAccounts();
    return NextResponse.json({ data: accounts, total: accounts.length });
  } catch (err) {
    console.error('[GET /api/bank-accounts]', err);
    return NextResponse.json({ error: 'Failed to fetch bank accounts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const account = createBankAccount(body);
    return NextResponse.json({ data: account }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/bank-accounts]', err);
    return NextResponse.json({ error: 'Failed to create bank account' }, { status: 500 });
  }
}
