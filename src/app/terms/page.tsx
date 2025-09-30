"use client";
import Link from "next/link";

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-10 space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold">Terms &amp; Disclosures</h1>
        <p className="opacity-70 mt-1 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
      </div>

      {/* TL;DR */}
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <div className="font-medium mb-2">TL;DR (plain English)</div>
        <ul className="list-disc list-inside opacity-90 space-y-1 text-sm">
          <li>True Mint helps make launches fairer, not risk-free. Scams can still happen.</li>
          <li>We don’t hold your funds or keys. You interact directly with on-chain programs.</li>
          <li>Vesting, caps, and sealed LP are best-effort tools; they can fail due to bugs, chain conditions, or third-party issues.</li>
          <li>No investment advice. Tokens are highly risky and may go to zero.</li>
          <li>Do your own research. You’re responsible for your wallet, transactions, and legal compliance.</li>
        </ul>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1) What True Mint is</h2>
        <p className="opacity-80">
          True Mint is a non-custodial interface that helps creators launch Solana tokens using
          transparent, on-chain rules (e.g., sealed LP, dev-token vesting, anti-bundle wallet caps).
          We provide tooling to <b>reduce the chance of unfair behavior</b>—but we cannot eliminate it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2) No guarantees, no warranties</h2>
        <p className="opacity-80">
          We do not guarantee safety, performance, uptime, or specific outcomes. The fairness features
          (including sealed LP, vesting schedules, wallet caps, program fees, and auto-listing logic)
          are best-effort and may fail or behave unexpectedly due to smart-contract bugs, chain congestion,
          RPC failures, MEV/front-running, third-party DEX behavior, or malicious actors.
        </p>
        <p className="opacity-80">
          The platform is provided “as is” and “as available,” without warranties of any kind, express or implied.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3) Not investment advice / no securities</h2>
        <p className="opacity-80">
          Nothing on True Mint is investment, legal, or tax advice. We are not a broker-dealer, exchange,
          investment adviser, or custodian. Token launches using True Mint are user-initiated on-chain
          programs; we do not list or sell tokens on your behalf. You must determine whether your use is
          legal in your jurisdiction and whether any launch constitutes an offering of securities or other
          regulated instruments.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">4) Your responsibilities</h2>
        <ul className="list-disc list-inside opacity-80 space-y-1">
          <li>Keep your wallet, seed phrase, and devices secure. We never ask for your seed or custody your assets.</li>
          <li>Verify program addresses, parameters, and on-chain actions before signing transactions.</li>
          <li>Understand slippage, price impact, MEV risk, and permanent loss.</li>
          <li>Comply with applicable laws (sanctions, AML, KYC, securities, tax).</li>
          <li>Only connect wallets you control. Transactions are final and irreversible.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5) Fairness features & key limitations</h2>
        <ul className="list-disc list-inside opacity-80 space-y-1">
          <li><b>Sealed LP:</b> LP burn/lock relies on specific program logic and DEX integrations; failures or DEX policy changes may break assumptions.</li>
          <li><b>Dev-token vesting:</b> Intended to unlock linearly (e.g., ~1% of the dev allocation per day), but may be disrupted by bugs or chain conditions.</li>
          <li><b>Anti-bundle wallet caps:</b> Tiers are derived from public wallet age &amp; activity signals and enforced by attestations; signals can be incomplete or spoofed.</li>
          <li><b>Auto-listing/virtual liquidity:</b> Thresholds and transitions depend on third-party infra and can fail or be delayed.</li>
        </ul>
        <p className="opacity-80">
          We’ll continue to iterate and ship updates to improve safety and performance, but no version eliminates risk.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">6) Fees</h2>
        <p className="opacity-80">
          Program-level fees (e.g., a 1.00% fee scheduled to reduce toward 0.10%) are published in the UI and/or on-chain.
          Network fees (e.g., Solana transaction fees) are separate and paid by you. Fees are non-refundable unless required by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">7) Privacy & data</h2>
        <p className="opacity-80">
          We may use public blockchain data and request limited telemetry (e.g., RPC requests, wallet-age/tx lookups).
          We don’t store private keys. Third-party services (wallet adapters, RPC providers, analytics) may collect their own data
          per their policies. Use a private RPC if you prefer. See our Privacy notice if provided.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">8) Third-party services</h2>
        <p className="opacity-80">
          True Mint integrates third-party infrastructure (RPCs, wallets, DEXs, oracles, hosting). We don’t control them and aren’t
          responsible for their availability, security, or policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">9) Limitation of liability</h2>
        <p className="opacity-80">
          To the maximum extent permitted by law, True Mint and its contributors are not liable for lost profits, lost data, indirect,
          special, incidental, consequential, exemplary, or punitive damages, or any damages arising from smart-contract bugs,
          chain events, wallet compromise, market volatility, or third-party failures. Our aggregate liability will not exceed
          the greater of (a) USD $100 or (b) the total fees you paid to True Mint for the service giving rise to the claim.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">10) Indemnification</h2>
        <p className="opacity-80">
          You agree to indemnify and hold harmless True Mint and its contributors from any claims, losses, or expenses (including
          reasonable attorneys’ fees) arising out of your use of the platform, violation of these terms, or infringement of any
          rights of another.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">11) Changes</h2>
        <p className="opacity-80">
          We may update these terms at any time. Material changes will be reflected by a new “Last updated” date. Continued use after
          changes means you accept the updated terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">12) Contact</h2>
        <p className="opacity-80">
          Questions? Reach us on Telegram:{" "}
          <a className="underline" href="https://t.me/truemint" target="_blank" rel="noreferrer">t.me/truemint</a>
        </p>
      </section>

      <div className="pt-2">
        <Link href="/" className="rounded-lg border border-white/20 px-4 py-2 hover:bg-white/10">Back home</Link>
      </div>
    </section>
  );
}
