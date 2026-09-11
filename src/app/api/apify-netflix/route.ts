import { NextResponse } from 'next/server';

const APIFY_TOKEN = process.env.APIFY_API_TOKEN || process.env.NEXT_PUBLIC_APIFY_TOKEN || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const datasetId = searchParams.get('datasetId') || 'ArI5EJKtMHM9AavEd';

  if (!APIFY_TOKEN) {
    return NextResponse.json({ ok: false, error: 'Apify API token not configured' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?token=${APIFY_TOKEN}&clean=true`, {
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json({ ok: true, count: data.length, items: data });
    }

    return NextResponse.json({ ok: false, error: 'Failed to fetch Apify dataset' }, { status: 500 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
