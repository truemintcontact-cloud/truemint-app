"use client";
import { useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { TOTAL_FEE_PCT, PLATFORM_FEE_PCT, CREATOR_FEE_PCT, STAKER_FEE_PCT, STAKER_REWARD_AS } from "@/lib/fees";
import Info from "@/components/Info";

type FormState = {
  name: string;
  ticker: string;
  supply: number | "";
  devPct: number | "";
  delayMins: number;
  logo?: File | null;
};

const MIN_SUPPLY = 1_000;
const MAX_SUPPLY = 10_000_000_000; // 10B
const MAX_DEV_PCT = 10;
const DELAY_OPTIONS = [5, 15, 30, 60, 360, 720, 1440]; // minutes (5m..24h)

export default function LaunchPage() {
  const [s, setS] = useState<FormState>({
    name: "",
    ticker: "",
    supply: "",
    devPct: "",
    delayMins: 5,
    logo: null,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const devAllocation = useMemo(() => {
    if (s.supply === "" || s.devPct === "") return null;
    const total = Number(s.supply);
    const pct = Number(s.devPct);
    if (isNaN(total) || isNaN(pct)) return null;
    if (total <= 0 || pct < 0) return null;
    const alloc = Math.floor((total * pct) / 100);
    const perDay = Math.max(1, Math.floor(alloc * 0.01)); // 1% of dev allocation per day
    return { alloc, perDay };
  }, [s.supply, s.devPct]);

  const isValid = useMemo(() => {
    const e: string[] = [];
    if (!s.name.trim()) e.push("Token name is required.");
    const t = s.ticker.toUpperCase();
    if (!/^[A-Z]{2,6}$/.test(t)) e.push("Ticker must be 2–6 letters (A–Z).");
    if (s.supply === "" || s.supply < MIN_SUPPLY || s.supply > MAX_SUPPLY) {
      e.push(`Supply must be between ${MIN_SUPPLY.toLocaleString()} and ${MAX_SUPPLY.toLocaleString()}.`);
    }
    if (s.devPct === "" || s.devPct < 0 || s.devPct > MAX_DEV_PCT) e.push(`Dev % must be 0–${MAX_DEV_PCT}.`);
    if (s.delayMins < 5 || s.delayMins > 1440) e.push("Delay must be 5 minutes to 24 hours.");
    setErrors(e);
    return e.length === 0;
  }, [s]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    const payload = {
      ...s,
      ticker: s.ticker.toUpperCase(),
      fakeLiquidityThresholdUSD: 50_000, // fixed for now
      platformFeeBps: 100,               // flat 1% on program buys & sells
      deployFeeUsd: 1,                   // $1 deploy fee (paid in SOL) to treasury
    };
    console.log("Launch draft:", payload);
    alert("Looks good! Saved form values to console.\n(Open DevTools → Console to view.)");
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold">Create a Launch</h1>
        <p className="opacity-80 mt-2 text-sm">
          Keep it simple. You can change advanced settings later before you go live.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Token Name
            <Info>Public name shown to everyone. Example: “SunCat”.</Info>
          </label>
          <input
            value={s.name}
            onChange={(e) => setS({ ...s, name: e.target.value })}
            placeholder="Your token name"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Ticker (2–6 letters)
            <Info>Short symbol in ALL CAPS. Example: SCAT</Info>
          </label>
          <input
            value={s.ticker}
            onChange={(e) =>
              setS({ ...s, ticker: e.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 6) })
            }
            placeholder="SCAT"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Total Supply
            <Info>How many tokens exist on day one. Min {MIN_SUPPLY.toLocaleString()}, max {MAX_SUPPLY.toLocaleString()}.</Info>
          </label>
          <input
            type="number"
            min={MIN_SUPPLY}
            max={MAX_SUPPLY}
            step={1}
            value={s.supply}
            onChange={(e) => setS({ ...s, supply: e.target.value === "" ? "" : Number(e.target.value) })}
            placeholder="1,000,000"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Dev Initial Buy % (locks; unlocks 1%/day)
            <Info>
              Max {MAX_DEV_PCT}% of total supply. Dev tokens unlock linearly at 1% of the dev allocation per day (100 days to fully unlock).
            </Info>
          </label>
          <input
            type="number"
            min={0}
            max={MAX_DEV_PCT}
            step={1}
            value={s.devPct}
            onChange={(e) => setS({ ...s, devPct: e.target.value === "" ? "" : Number(e.target.value) })}
            placeholder="0 – 10"
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 outline-none"
          />
          <p className="text-sm opacity-80 mt-1">
            Clear vesting: 1% of the dev allocation per day (not 1% of total supply).
          </p>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Launch Delay
            <Info>Announce now, trade later. Minimum 5 minutes; maximum 24 hours.</Info>
          </label>
          <select
            value={s.delayMins}
            onChange={(e) => setS({ ...s, delayMins: Number(e.target.value) })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2 outline-none"
          >
            {DELAY_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m < 60 ? `${m} minutes` : `${Math.round(m / 60)} hour${m >= 120 ? "s" : ""}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Logo (optional)
            <Info>Square image looks best. You can change or add it later.</Info>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setS({ ...s, logo: e.target.files?.[0] ?? null })}
            className="w-full rounded-lg bg-white/5 border border-white/10 px-4 py-2"
          />
        </div>

        {/* Friendly summary box */}
        <div className="rounded-xl border border-white/15 bg-white/[0.04] p-4 space-y-2">
          <div className="text-sm opacity-80">
            <b>Virtual Liquidity Threshold:</b> $50,000
          </div>
          <div className="text-sm opacity-80">
            <b>Platform fee:</b> 1% on platform buys & sells + $1 in SOL per deploy (to treasury)
          </div>
          <div className="text-sm opacity-80">
            <b>Per-wallet caps:</b> based on wallet age & on-chain history (enforced on-chain).
          </div>
          {devAllocation && (
            <div className="text-sm opacity-90">
              <b>Dev unlock math:</b> {devAllocation.alloc.toLocaleString()} tokens (
              {s.devPct}% of supply). Unlocks ~{devAllocation.perDay.toLocaleString()} / day (100 days to fully unlock).
            </div>
          )}
        </div>

        {errors.length > 0 && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4">
            <ul className="list-disc list-inside text-sm">
              {errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={!isValid}
            className={`rounded-lg px-4 py-2 ${
              isValid ? "bg-white text-black" : "bg-white/20 text-white/60 cursor-not-allowed"
            }`}
            title={!isValid ? "Fix the errors above" : "Continue"}
          >
            Continue
          </button>
          <Link href="/" className="border border-white/20 rounded-lg px-4 py-2 hover:bg-white/10">
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}


