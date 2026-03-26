import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { PageWrapper } from "@/components/page-wrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "ETNY — Private Wallet Transfers",
  description:
    "Transfer crypto wallet ownership off-chain. Zero gas. Zero trace. Powered by MPC and TEE.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="bg-surface-0 text-white font-sans antialiased overflow-x-hidden">
        {/* TEST BANNER — remove after vercel deploy check */}
        <div style={{ background: 'linear-gradient(90deg, #7c3aed, #2563eb)', textAlign: 'center', padding: '10px 16px', fontSize: '14px', fontFamily: 'monospace', letterSpacing: '0.05em' }}>
          🚀 Vercel deploy test — if you see this, it works!
        </div>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
