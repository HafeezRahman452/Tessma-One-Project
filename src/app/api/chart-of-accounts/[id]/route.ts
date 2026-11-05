// GET /api/chart-of-accounts/[id]
// PUT /api/chart-of-accounts/[id]
// DELETE /api/chart-of-accounts/[id]

import { NextRequest, NextResponse } from 'next/server';
import { getAccountById, updateAccount, deleteAccount } from '@/lib/services/accounts.service';

interface Params { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const account = getAccountById(Number(id));
    if (!account) return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    return NextResponse.json({ data: account });
  } catch (err) {
    console.error('[GET /api/chart-of-accounts/[id]]', err);
    return NextResponse.json({ error: 'Failed to fetch account' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const account = updateAccount(Number(id), body);
    if (!account) return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    return NextResponse.json({ data: account });
  } catch (err) {
    console.error('[PUT /api/chart-of-accounts/[id]]', err);
    return NextResponse.json({ error: 'Failed to update account' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const deleted = deleteAccount(Number(id));
    if (!deleted) return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/chart-of-accounts/[id]]', err);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
