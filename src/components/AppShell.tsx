"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { TOTAL_FEE_PCT, PLATFORM_FEE_PCT, CREATOR_FEE_PCT, STAKER_FEE_PCT, STAKER_REWARD_AS } from "@/lib/fees";
import Logo from "@/components/Logo";
import WalletTierWidget from "@/components/WalletTierWidget";
import { Menu, X } from "lucide-react";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const Nav = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5">
      <Link onClick={onClick} href="/" className="opacity-80 hover:opacity-100">Home</Link>
      <Link onClick={onClick} href="/launch" className="opacity-80 hover:opacity-100">Launch</Link>
      <Link onClick={onClick} href="/launches" className="opacity-80 hover:opacity-100">Launches</Link>
      <Link onClick={onClick} href="/rules" className="opacity-80 hover:opacity-100">Rules</Link>
    </nav>
  );

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0B1220]/80 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Nav />
            <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs opacity-90">
  Fee split: {TOTAL_FEE_PCT} ({PLATFORM_FEE_PCT} / {CREATOR_FEE_PCT} / {STAKER_FEE_PCT}) — rewards in {STAKER_REWARD_AS}
</span> {mounted ? <WalletMultiButton /> : null}
          </div>

          <button onClick={() => setOpen((v) => !v)} className="md:hidden p-2 rounded-lg border border-white/10">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 px-4 pb-4">
            <div className="py-3"><Nav onClick={() => setOpen(false)} /></div>
            <div className="pb-4">
              <span className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs opacity-90">
  Fee split: {TOTAL_FEE_PCT} ({PLATFORM_FEE_PCT} / {CREATOR_FEE_PCT} / {STAKER_FEE_PCT}) — rewards in {STAKER_REWARD_AS}
</span> {mounted ? <WalletMultiButton /> : null}
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6">
          <div className="opacity-80">
            <Logo className="mb-2" />
            <p className="text-sm opacity-70">
              Fair by design. Fun by default. Solana launchpad enforcing on-chain fairness.
            </p>
          </div>
          <div>
            <div className="font-medium mb-2">Product</div>
            <ul className="space-y-1 opacity-80">
              <li><Link href="/launch" className="hover:opacity-100">Create Launch</Link></li>
              <li><Link href="/launches" className="hover:opacity-100">Explore Launches</Link></li>
              <li><Link href="/rules" className="hover:opacity-100">Rules</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-medium mb-2">Legal</div>
            <ul className="space-y-1 opacity-80">
              <li><Link href="/terms" className="hover:opacity-100">Terms</Link></li>
              <li><a className="hover:opacity-100" href="https://t.me/truemint" target="_blank">Telegram</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs opacity-60 pb-8">
          © {new Date().getFullYear()} True Mint. No financial advice.
        </div>
      </footer>

      {/* Bottom-right wallet tier widget */}
      {mounted ? <WalletTierWidget /> : null}
    </>
  );
}


