import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pubkey = req.nextUrl.searchParams.get("pubkey");
  if (!pubkey) {
    return NextResponse.json({ error: "missing pubkey" }, { status: 400 });
  }

  const base = process.env.TRUEMINT_RPC_URL!;
  const key  = process.env.TRUEMINT_RPC_KEY ?? "";

  const upstream = `${base}/wallet-stats?pubkey=${encodeURIComponent(pubkey)}`;

  const r = await fetch(upstream, {
    headers: { "x-api-key": key },
    cache: "no-store",
  });

  const text = await r.text();
  return new NextResponse(text, {
    status: r.status,
    headers: { "content-type": r.headers.get("content-type") ?? "application/json" },
  });
}
