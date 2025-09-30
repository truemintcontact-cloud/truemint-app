import "@solana/wallet-adapter-react-ui/styles.css";
import type { Metadata } from "next";
import "./globals.css";
import { WalletContext } from "@/components/WalletProvider";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "True Mint — Fair by design. Fun by default.",
  description: "Solana launchpad enforcing on-chain fairness: sealed LP, vested dev tokens, anti-bundle caps, transparent rules from block one.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "True Mint — Fair by design.",
    description: "Sealed LP. Vested dev tokens. Anti-bundle caps. Transparent rules.",
    type: "website",
    url: "/",
    images: [{ url: "/favicon.ico" }],
  },
  twitter: {
    card: "summary",
    title: "True Mint — Fair by design.",
    description: "Sealed LP. Vested dev tokens. Anti-bundle caps. Transparent rules.",
    images: ["/favicon.ico"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B1220] text-white">
        <WalletContext>
          <AppShell>{children}</AppShell>
        </WalletContext>
      </body>
    </html>
  );
}
