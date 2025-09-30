"use client";
import Link from "next/link";
import { Shield } from "lucide-react";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-6">
      <div className="text-center py-20 md:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs opacity-90">
          <Shield size={14} /> Transparent Fair Rules
        </div>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold leading-tight">
          Fair by design.<br className="hidden md:block" /> Fun by default.
        </h1>
        <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto mt-4">
          Launch Solana tokens with sealed LP, vested dev tokens (100 days), anti-bundle wallet caps,
          and <b>transparent rules</b> from block one.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 items-center justify-center">
          <Link href="/launch" className="rounded-lg bg-white text-black px-5 py-2">Launch a Token</Link>
          <Link href="/rules" className="rounded-lg border border-white/20 px-5 py-2 hover:bg-white/10">Rules</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {[
          { title: "Sealed LP", desc: "Auto-burn LP on list. No sneaky pulls." },
        { title: "Vested Dev Tokens", desc: "1% of dev allocation unlocks per day (100 days)." },
          { title: "Anti-Bundle Caps", desc: "Per-wallet caps from wallet age & txs." },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-white/10 p-5 bg-white/5">
            <div className="font-medium mb-1">{f.title}</div>
            <div className="opacity-80 text-sm">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

