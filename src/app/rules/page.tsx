import Link from "next/link";
import { CheckCircle, Shield, Lock, Timer, TrendingUp, Scale, Zap } from "lucide-react";
import {
  TOTAL_FEE_PCT, PLATFORM_FEE_PCT, CREATOR_FEE_PCT, STAKER_FEE_PCT, STAKER_REWARD_AS
} from "@/lib/fees";

function Row({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mt-1"><Icon size={18} className="opacity-80" /></div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="opacity-80 text-sm">{desc}</div>
      </div>
    </div>
  );
}

export default function RulesPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs opacity-90">
          <Shield size={14} /> Transparent Fair Rules
        </div>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold">Fair by design. Rules you can read.</h1>
        <p className="opacity-80 mt-2">
          True Mint enforces fairness on-chain. No hidden switches. Same rules for everyone.
        </p>
      </div>

      <div className="space-y-3">
        <Row icon={Lock} title="Sealed LP (auto-burn on list)"
          desc="Liquidity is locked on listing and LP tokens are auto-burned on the chosen DEX to prevent pulls." />
        <Row icon={CheckCircle} title="Vested dev tokens (100 days)"
          desc="Dev can buy up to 10% of total supply. That dev allocation unlocks linearly: 1% of the dev allocation per day (100 days to fully unlock)." />
        <Row icon={Scale} title="Anti-bundle caps (wallet tiers)"
          desc="Per-wallet max buy depends on on-chain age & history: < 30d/30tx → 0.5%, ≥100d/100tx → 1%, ≥300d/300tx → 2%, ≥600d/600tx → 3% (max). Caps are enforced on-chain." />
        <Row icon={Timer} title="Delayed launch"
          desc="After deploy, token is visible but not tradable until a timer you choose (5 minutes to 24 hours)." />
        <Row icon={TrendingUp} title="Virtual → real liquidity"
          desc="Tokens start on a virtual bonding curve. At $50,000 market cap, the vault auto-lists on the selected DEX and burns the LP tokens." />
        <Row icon={Zap} title="Platform fee → transparent split"
          desc={"Total " + TOTAL_FEE_PCT + " on curve & TrueMint AMM: " +
                PLATFORM_FEE_PCT + " platform, " +
                CREATOR_FEE_PCT + " creator, " +
                STAKER_FEE_PCT + " to stakers (paid in " + STAKER_REWARD_AS + ")."} />
        <Row icon={Shield} title="No influencer allowlists or presales"
          desc="No special deals. Same rules for everyone from block one." />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 mt-6 text-sm opacity-80">
        <b>Transparency:</b> all rule parameters are visible in-app and (when live) verified on-chain. Do your own research.
      </div>

      <div className="mt-6 flex gap-3">
        <Link href="/launch" className="rounded-lg bg-white text-black px-5 py-2">Launch a Token</Link>
        <Link href="/" className="rounded-lg border border-white/20 px-5 py-2 hover:bg-white/10">Back Home</Link>
      </div>
    </section>
  );
}
