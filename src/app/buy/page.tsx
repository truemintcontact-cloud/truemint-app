"use client";
import ClientOnly from "@/components/ClientOnly";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Buy() {
  const { publicKey } = useWallet();
  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-4">Buy (Demo)</h1>
      <div className="mb-4"><ClientOnly><WalletMultiButton /></ClientOnly></div>
      {publicKey ? (
        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="mb-2">Connected wallet: <b>{publicKey.toBase58()}</b></div>
          <div className="text-sm opacity-80">
            Your buy-cap tier will be <b>computed automatically</b> at purchase time using a signed
            attestation (wallet age & tx count). No manual input, no IP checks.
          </div>
        </div>
      ) : (
        <div className="text-sm opacity-70">Connect a wallet to continue.</div>
      )}
    </main>
  );
}
