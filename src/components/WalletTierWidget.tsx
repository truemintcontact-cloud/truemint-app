"use client";
import { useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

type Stats = { ageDays: number; txCount: number; updatedAt?: number };

function computeTier(ageDays: number, txCount: number) {
  if (ageDays >= 600 && txCount >= 600) return 3;
  if (ageDays >= 300 && txCount >= 300) return 2;
  if (ageDays >= 100 && txCount >= 100) return 1;
  return 0.5;
}

const TTL_MS = 5 * 60 * 1000; // 5 minutes

export default function WalletTierWidget() {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const tier = useMemo(() => (stats ? computeTier(stats.ageDays, stats.txCount) : null), [stats]);

  function cacheKey(pk: string) { return `tm_tier_${pk}`; }

  async function fetchStats(pk: string, { bypassCache = false } = {}) {
    try {
      setError(null); setLoading(true);

      if (!bypassCache) {
        const raw = localStorage.getItem(cacheKey(pk));
        if (raw) {
          try {
            const cached: Stats = JSON.parse(raw);
            if (cached.updatedAt && Date.now() - cached.updatedAt < TTL_MS) {
              setStats(cached);
              setLoading(false);
              return;
            }
          } catch {}
        }
      }

      const r = await fetch(`/api/wallet-stats?pubkey=${pk}`, { cache: "no-store" });
      if (!r.ok) throw new Error(`RPC ${r.status}`);
      const data = await r.json(); // { ageDays, txCount } from our API
      const fresh: Stats = { ageDays: data.ageDays ?? 0, txCount: data.txCount ?? 0, updatedAt: Date.now() };
      setStats(fresh);
      localStorage.setItem(cacheKey(pk), JSON.stringify(fresh));
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch wallet stats");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (publicKey) fetchStats(publicKey.toBase58());
    else { setStats(null); setError(null); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey?.toBase58()]);

  if (!publicKey) return null;

  const isCached = !!stats?.updatedAt && Date.now() - (stats.updatedAt ?? 0) < TTL_MS;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <div className="rounded-xl border border-white/15 bg-black/70 backdrop-blur px-4 py-3 text-sm shadow-lg w-[300px]">
        <div className="font-medium mb-1">Wallet tier (preview)</div>
        {error ? (
          <div className="text-red-400">{error}</div>
        ) : stats ? (
          <>
            <div className="opacity-80">
              Age: <b>{stats.ageDays}</b> days {isCached && <span className="opacity-60 text-xs">(cached)</span>}
            </div>
            <div className="opacity-80">
              Tx: <b>{stats.txCount.toLocaleString()}</b>
            </div>
            <div className="opacity-80">
              Tier cap: <b>{tier}%</b> <span className="opacity-70">of total supply</span>
            </div>
          </>
        ) : (
          <div className="opacity-70">Loading…</div>
        )}
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => publicKey && fetchStats(publicKey.toBase58(), { bypassCache: true })}
            disabled={loading}
            className={`rounded-lg px-3 py-1 ${loading ? "bg-white/20 text-white/60 cursor-not-allowed" : "bg-white text-black"}`}
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <span className="opacity-60 text-xs">Final cap is enforced on-chain via signed attestation.</span>
        </div>
      </div>
    </div>
  );
}
